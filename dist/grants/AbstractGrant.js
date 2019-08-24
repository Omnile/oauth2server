"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessToken_1 = require("../AccessToken");
class AbstractGrant {
    constructor() {
        this.accessTokenTTL = 60;
        this.clientRepository = null;
        this.userRepository = null;
    }
    setAccessTokenTTL(accessTokenTTL) {
        this.accessTokenTTL = accessTokenTTL;
    }
    setClientRepository(clients) {
        this.clientRepository = clients;
    }
    setTokenRepository(tokens) {
        this.accessTokenRepository = tokens;
    }
    setUserRepository(users) {
        this.userRepository = users;
    }
    setEncryptor(encryptor) {
        this.encryptor = encryptor;
    }
    canRespondToAccessTokenRequest(request) {
        return request.grant_type === this.getIdentifier();
    }
    respondToAccessTokenRequest(request, accessTokenTTL) {
        return new Promise(((resolve, reject) => reject('Abstract grant cannot respond to requests')));
    }
    getIdentifier() {
        return 'abstract';
    }
    validateClient(client) {
        return this.clientRepository
            .validateClient(client);
    }
    /**
     * Validates a user
     * @param {UserEntityI} user
     * @param {string} grantType
     * @param {ClientEntityI} client
     * @returns {Promise<any>}
     */
    validateUser(user, grantType, client) {
        return new Promise((resolve, reject) => {
            this.userRepository.getUserEntityByCredentials(user.username, user.password, grantType, client).then(user => {
                if (user)
                    resolve(user);
                else
                    reject(user);
            }).catch(error => reject(error));
        });
    }
    /**
     * Issues a new access token
     * @param client
     * @param {UserIdentifierEntityI} userIdentifier
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    issueAccessToken(client, userIdentifier, accessTokenTTL) {
        accessTokenTTL = (accessTokenTTL) ? accessTokenTTL : this.accessTokenTTL;
        let accessToken = new AccessToken_1.default();
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
        });
    }
    /**
     * Generates a unique identifier
     * @param {number} length
     * @returns {string}
     */
    static generateUniqueIdentifier(length = 40) {
        let uid = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charsLength = chars.length;
        for (let i = 0; i < length; ++i) {
            uid += chars[AbstractGrant.getRandomInt(0, charsLength - 1)];
        }
        return uid.toLowerCase();
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.default = AbstractGrant;
//# sourceMappingURL=AbstractGrant.js.map