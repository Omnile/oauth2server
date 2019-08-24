import { AuthorizationServerI } from "./AuthorizationServerI";
import AuthPayloadI from "./AuthPayloadI";
import GrantI from "./grants/GrantI";
import ServerOptionsI from "./ServerOptionsI";
import ClientRepositoryI from "./repositories/ClientRepositoryI";
import TokenRepositoryI from "./repositories/TokenRepositoryI";
import UserRepositoryI from "./repositories/UserRepositoryI";
/**
 * Authorization server for generation of access tokens
 *
 * @author Bright Antwi Boasiako <bright@omnile.com>
 */
export default class AuthorizationServer implements AuthorizationServerI {
    private accessTokenResponse;
    private privateKey;
    private enabledGrants;
    private tokenRepository;
    private clientRepository;
    private userRepository;
    private accessTokenTTL;
    private encryptor;
    constructor(options?: ServerOptionsI);
    /**
     * Gets an access token for the provided credentials
     *
     * @param {AuthPayloadI} payload
     * @returns {Promise<any>}
     */
    getAccessToken(payload: AuthPayloadI): Promise<any>;
    /**
     * Enables a grant
     * @param {GrantI} grant
     * @param {number} accessTokenTTL
     */
    enableGrant(grant: GrantI, accessTokenTTL: number): void;
    /**
     * Makes the needed access token response payload
     * @param {AccessTokenI} accessToken
     * @returns {TokenResponseEntityI}
     */
    private makeAccessTokenResponsePayload;
    /**
     * Makes the needed request data for access token
     * @param {AuthPayloadI} payload
     * @returns {AccessTokenRequestI}
     */
    private static makeAccessTokenRequestPayload;
    /**
     * Sets the private key
     * @param {string} keyPath
     * @returns {AuthorizationServerI}
     */
    setPrivateKey(keyPath: string): AuthorizationServerI;
    /**
     * Sets the token repository
     * @param {TokenRepositoryI} tokens
     * @returns {AuthorizationServerI}
     */
    setTokenRepository(tokens: TokenRepositoryI): AuthorizationServerI;
    /**
     * Sets the client repository
     * @param {ClientRepositoryI} clients
     * @returns {AuthorizationServerI}
     */
    setClientRepository(clients: ClientRepositoryI): AuthorizationServerI;
    /**
     * Sets the user repository
     * @param {UserRepositoryI} users
     * @returns {AuthorizationServerI}
     */
    setUserRepository(users: UserRepositoryI): AuthorizationServerI;
    /**
     * Sets the token expiration in minutes
     * @param {number} numMins
     * @returns {AuthorizationServerI}
     */
    setTokenExpiry(numMins: number): AuthorizationServerI;
    /**
     * Sets the encryption key
     * @param {string} key
     * @returns {AuthorizationServerI}
     */
    setEncryptionKey(key: string): AuthorizationServerI;
    /**
     * Binds repositories to a grant
     * @param {GrantI} grant
     */
    private bindRepositoriesToGrant;
    /**
     * Enables the default grants
     */
    private enableDefaultGrants;
}
