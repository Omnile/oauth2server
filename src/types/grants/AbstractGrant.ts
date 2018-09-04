
import GrantI from './GrantI'
import ClientRepositoryI from '../repositories/ClientRepositoryI'
import TokenRepositoryI from '../repositories/TokenRepositoryI'
import AccessTokenRequestI from '../requests/AccessTokenRequestI'
import ClientEntityI from '../entities/ClientEntityI'
import UserEntityI from "../entities/UserEntityI";
import UserRepositoryI from "../repositories/UserRepositoryI";
import AccessToken from "../AccessToken";
import UserIdentifierEntityI from "../entities/UserIdentifierEntityI";
import EncryptorI from "../EncryptorI";

export default class AbstractGrant implements GrantI {

    accessTokenTTL: number = 60;
    clientRepository: ClientRepositoryI = null;
    accessTokenRepository: TokenRepositoryI;
    userRepository: UserRepositoryI = null;
    encryptor: EncryptorI;

    setAccessTokenTTL(accessTokenTTL: number): void {
        this.accessTokenTTL = accessTokenTTL;
    }

    setClientRepository(clients: ClientRepositoryI): void {
        this.clientRepository = clients;
    }

    setTokenRepository(tokens: TokenRepositoryI): void {
        this.accessTokenRepository = tokens;
    }


    setUserRepository(users: UserRepositoryI): void {
        this.userRepository = users;
    }

    setEncryptor(encryptor: EncryptorI) : void {
        this.encryptor = encryptor;
    }

    canRespondToAccessTokenRequest(request: AccessTokenRequestI): boolean {
        return request.grant_type === this.getIdentifier();
    }

    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number): Promise<any> {
        return new Promise(((resolve, reject) => reject('Abstract grant cannot respond to requests')))
    }

    getIdentifier(): string {
        return 'abstract';
    }

    protected validateClient(client: ClientEntityI) : Promise<any> {
        return this.clientRepository
                    .validateClient(client)
    }


    /**
     * Validates a user
     * @param {UserEntityI} user
     * @param {string} grantType
     * @param {ClientEntityI} client
     * @returns {Promise<any>}
     */
    protected validateUser(user: UserEntityI, grantType?: string, client?: ClientEntityI) : Promise<UserEntityI> {
        return new Promise((resolve, reject) => {
            this.userRepository.getUserEntityByCredentials(
                user.username,
                user.password,
                grantType,
                client
            ).then(user => {
                if(user) resolve(user);
                else reject(user);
            }).catch(error => reject(error))
        })
    }


    /**
     * Issues a new access token
     * @param client
     * @param {UserIdentifierEntityI} userIdentifier
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    protected issueAccessToken(
        client: ClientEntityI,
        userIdentifier : UserIdentifierEntityI,
        accessTokenTTL?: number
    ) : Promise<any> {

        accessTokenTTL = (accessTokenTTL) ? accessTokenTTL : this.accessTokenTTL;

        let accessToken = new AccessToken();

        accessToken.setClient(client);
        accessToken.setUserIdentifier(userIdentifier);
        accessToken.setExpirationDateTime(accessTokenTTL);
        accessToken.setIdentifier(AbstractGrant.generateUniqueIdentifier());
        accessToken.setRefreshTokenIdentifier(AbstractGrant.generateUniqueIdentifier());

        return new Promise((resolve, reject) => {
            this.accessTokenRepository.persistNewToken(accessToken)
                .then(() => {
                    resolve(accessToken);
                }).catch(error => reject(error));
        })
    }


    /**
     * Generates a unique identifier
     * @param {number} length
     * @returns {string}
     */
    private static generateUniqueIdentifier(length: number = 40): string {
        let uid = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charsLength = chars.length;

        for (let i = 0; i < length; ++i) {
            uid += chars[AbstractGrant.getRandomInt(0, charsLength - 1)];
        }

        return uid.toLowerCase();
    }

    private static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}
