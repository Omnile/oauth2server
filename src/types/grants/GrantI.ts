
import ClientRepositoryI from '../repositories/ClientRepositoryI'
import AccessTokenRequestI from '../requests/AccessTokenRequestI'
import TokenRepositoryI from "../repositories/TokenRepositoryI";
import UserRepositoryI from "../repositories/UserRepositoryI";
import EncryptorI from "../EncryptorI";

export default interface GrantI {
    /**
     * Sets the access token TTL
     * @param  accessTokenTTL [description]
     * @return                [description]
     *
     */
    setAccessTokenTTL(accessTokenTTL: number) : void


    /**
     * Sets the client repository of the grant
     * @param {ClientRepositoryI} clients
     * @returns {void}
     */
    setClientRepository(clients: ClientRepositoryI) : void


    /**
     * Sets the token repository
     * @param {TokenRepositoryI} tokens
     * @returns {void}
     */
    setTokenRepository(tokens: TokenRepositoryI) : void


    /**
     * Sets the user repository
     * @param {UserRepositoryI} users
     */
    setUserRepository(users: UserRepositoryI) : void


    /**
     * Checks if the grant can respond to access token request
     * @param {} request
     * @returns {boolean}
     */
    canRespondToAccessTokenRequest(request: AccessTokenRequestI) : boolean


    /**
     * Responds to access token request
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number) : Promise<any>


    /**
     * Gets the identifier for the grant
     * @returns {string}
     */
    getIdentifier() : string


    /**
     * Sets the encryption key for the grant
     * @param {string} encryptor
     */
    setEncryptor(encryptor: EncryptorI) : void


}
