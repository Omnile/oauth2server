import GrantI from './GrantI';
import ClientRepositoryI from '../repositories/ClientRepositoryI';
import TokenRepositoryI from '../repositories/TokenRepositoryI';
import AccessTokenRequestI from '../requests/AccessTokenRequestI';
import ClientEntityI from '../entities/ClientEntityI';
import UserEntityI from "../entities/UserEntityI";
import UserRepositoryI from "../repositories/UserRepositoryI";
import UserIdentifierEntityI from "../entities/UserIdentifierEntityI";
import EncryptorI from "../EncryptorI";
export default class AbstractGrant implements GrantI {
    accessTokenTTL: number;
    clientRepository: ClientRepositoryI;
    accessTokenRepository: TokenRepositoryI;
    userRepository: UserRepositoryI;
    encryptor: EncryptorI;
    setAccessTokenTTL(accessTokenTTL: number): void;
    setClientRepository(clients: ClientRepositoryI): void;
    setTokenRepository(tokens: TokenRepositoryI): void;
    setUserRepository(users: UserRepositoryI): void;
    setEncryptor(encryptor: EncryptorI): void;
    canRespondToAccessTokenRequest(request: AccessTokenRequestI): boolean;
    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number): Promise<any>;
    getIdentifier(): string;
    protected validateClient(client: ClientEntityI): Promise<any>;
    /**
     * Validates a user
     * @param {UserEntityI} user
     * @param {string} grantType
     * @param {ClientEntityI} client
     * @returns {Promise<any>}
     */
    protected validateUser(user: UserEntityI, grantType?: string, client?: ClientEntityI): Promise<UserEntityI>;
    /**
     * Issues a new access token
     * @param client
     * @param {UserIdentifierEntityI} userIdentifier
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    protected issueAccessToken(client: ClientEntityI, userIdentifier: UserIdentifierEntityI, accessTokenTTL?: number): Promise<any>;
    /**
     * Generates a unique identifier
     * @param {number} length
     * @returns {string}
     */
    private static generateUniqueIdentifier;
    private static getRandomInt;
}
