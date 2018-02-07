
import AuthPayloadI from './AuthPayloadI'
import GrantI from './grants/GrantI'
import * as Promise from 'bluebird';
import UserRepositoryI from "./repositories/UserRepositoryI";
import TokenRepositoryI from "./repositories/TokenRepositoryI";
import ClientRepositoryI from "./repositories/ClientRepositoryI";

export interface AuthorizationServerI{

    /**
     * Gets an access token
     *
     * @param {AuthPayloadI} payload
     * @returns {Promise<any>}
     */
    getAccessToken(payload: AuthPayloadI) : Promise<any>

    /**
     * Enables a grant
     * @param {GrantI} grant
     * @param {number} accessTokenTTL
     */
    enableGrant(grant: GrantI, accessTokenTTL: number) : void


    setUserRepository(users: UserRepositoryI) : AuthorizationServerI
    setTokenRepository(tokens: TokenRepositoryI) : AuthorizationServerI
    setClientRepository(clients: ClientRepositoryI) : AuthorizationServerI
    setTokenExpiry(numMins: number) : AuthorizationServerI
    setPrivateKey(keyPath: string) : AuthorizationServerI
    setEncryptionKey(key: string) : AuthorizationServerI
}