import { AuthorizationServerI } from "./AuthorizationServerI";
import AuthPayloadI from "./AuthPayloadI";
import GrantI from "./grants/GrantI";
import * as Promise from 'bluebird';
import TokenResponseI from "./responses/TokenResponseI";
import AccessTokenI from "./AccessTokenI";
import TokenResponseEntityI from "./responses/TokenResponseEntityI";
import BearerTokenResponse from "./responses/BearerTokenResponse";
import {default as CryptKey, CryptKeyI} from "./CryptKey";
import AccessTokenRequestI from "./requests/AccessTokenRequestI";
import { ServerOptionsI } from "./ServerOptionsI";
import ClientRepositoryI from "./repositories/ClientRepositoryI";
import TokenRepositoryI from "./repositories/TokenRepositoryI";
import PasswordGrant from "./grants/PasswordGrant";
import UserRepositoryI from "./repositories/UserRepositoryI";
import RefreshTokenGrant from "./grants/RefreshTokenGrant";
import Encryptor from "./Encryptor";

export default class AuthorizationServer implements AuthorizationServerI{

    private accessTokenResponse: TokenResponseI = null;
    private privateKey: CryptKeyI = null;
    private enabledGrants: { [key:string]: GrantI } = {};
    private tokenRepository: TokenRepositoryI;
    private clientRepository: ClientRepositoryI;
    private userRepository: UserRepositoryI;
    private accessTokenTTL: number;
    private encryptor: Encryptor;

    constructor(options?: ServerOptionsI){

        this.encryptor = new Encryptor();

        if(options !== undefined){
            if(options.privateKey !== undefined){
                this.setPrivateKey(options.privateKey);
            }

            if(options.encryptionKey !== undefined){
                this.encryptor.setKey(options.encryptionKey);
            }

            this.setTokenExpiry(options.tokenExpiryMins ?
                options.tokenExpiryMins : 60);

            this.setTokenRepository(options.tokenRepository);
            this.setClientRepository(options.clientRepository);
            this.setUserRepository(options.userRepository);
        }

        this.enableDefaultGrants();

    }


    /**
     * Gets an access token for the provided credentials
     *
     * @param {AuthPayloadI} payload
     * @returns {Bluebird<any>}
     */
    getAccessToken(payload: AuthPayloadI): Promise<any> {

        const request = AuthorizationServer.makeAccessTokenRequestPayload(payload);

        return new Promise(((resolve, reject) => {

            let isGrantTypeSupported = false;

            for (let grantType in this.enabledGrants) {
                if(this.enabledGrants[grantType].canRespondToAccessTokenRequest(request)){

                    this.bindRepositoriesToGrant(this.enabledGrants[grantType]);

                    isGrantTypeSupported = true;

                    this.enabledGrants[grantType].respondToAccessTokenRequest(request)
                        .then(accessToken => {
                            // We have an access token
                            resolve(this.makeAccessTokenResponsePayload(accessToken));
                        })
                        .catch(error => reject(error));

                    // Only one grant type per access token request
                    // Therefore if we already match a grant, we proceed with that
                    break;
                }
            }

            if(!isGrantTypeSupported){
                // If we're ever here, then the requested grant type is not valid/supported
                reject('Invalid grant type: ' + payload.grant_type);
            }

        }))
    }

    enableGrant(grant: GrantI, accessTokenTTL: number): void {
        grant.setAccessTokenTTL(accessTokenTTL);
        grant.setEncryptor(this.encryptor);
        this.enabledGrants[grant.getIdentifier()] = grant;
    }


    /**
     * Makes the needed access token response payload
     * @param {AccessTokenI} accessToken
     * @returns {TokenResponseEntityI}
     */
    private makeAccessTokenResponsePayload(accessToken: AccessTokenI) : TokenResponseEntityI{
        if(this.accessTokenResponse === null){
            this.accessTokenResponse = new BearerTokenResponse(this.encryptor);
        }

        // We set up the access token response
        this.accessTokenResponse.setPrivateKey(this.privateKey);
        this.accessTokenResponse.setAccessToken(accessToken);

        return this.accessTokenResponse.getTokenResponseEntity();
    }


    /**
     * Makes the needed request data for access token
     * @param {AuthPayloadI} payload
     * @returns {AccessTokenRequestI}
     */
    private static makeAccessTokenRequestPayload(payload: AuthPayloadI): AccessTokenRequestI{
        return {
            grant_type: payload.grant_type,
            payload: {
                client: payload.client,
                user: payload.user,
                refreshToken: payload.refresh_token
            }
        }
    }


    public setPrivateKey(keyPath: string) : AuthorizationServerI{
        this.privateKey = new CryptKey(keyPath);
        return this;
    }


    public setTokenRepository(tokens: TokenRepositoryI) : AuthorizationServerI {
        this.tokenRepository = tokens;
        return this;
    }

    public setClientRepository(clients: ClientRepositoryI) : AuthorizationServerI {
        this.clientRepository = clients;
        return this;
    }


    public setUserRepository(users: UserRepositoryI) : AuthorizationServerI{
        this.userRepository = users;
        return this;
    }

    public setTokenExpiry(numMins: number) : AuthorizationServerI{
        this.accessTokenTTL = numMins;
        return this;
    }


    public setEncryptionKey(key: string) : AuthorizationServerI{
        this.encryptor.setKey(key);
        return this;
    }


    private bindRepositoriesToGrant(grant: GrantI) : void {
        grant.setClientRepository(this.clientRepository);
        grant.setTokenRepository(this.tokenRepository);
        grant.setUserRepository(this.userRepository);
    }


    private enableDefaultGrants(){
        // Password Grant
        this.enableGrant(new PasswordGrant(), this.accessTokenTTL);

        // Refresh token grant
        this.enableGrant(new RefreshTokenGrant(), this.accessTokenTTL);
    }
}