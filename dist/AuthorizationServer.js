"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BearerTokenResponse_1 = require("./responses/BearerTokenResponse");
const CryptKey_1 = require("./CryptKey");
const PasswordGrant_1 = require("./grants/PasswordGrant");
const RefreshTokenGrant_1 = require("./grants/RefreshTokenGrant");
const Encryptor_1 = require("./Encryptor");
/**
 * Authorization server for generation of access tokens
 *
 * @author Bright Antwi Boasiako <bright@omnile.com>
 */
class AuthorizationServer {
    constructor(options) {
        this.accessTokenResponse = null;
        this.privateKey = null;
        this.enabledGrants = {};
        this.encryptor = new Encryptor_1.default();
        if (options !== undefined) {
            if (options.privateKey !== undefined) {
                this.setPrivateKey(options.privateKey);
            }
            if (options.encryptionKey !== undefined) {
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
     * @returns {Promise<any>}
     */
    getAccessToken(payload) {
        const request = AuthorizationServer.makeAccessTokenRequestPayload(payload);
        return new Promise(((resolve, reject) => {
            let isGrantTypeSupported = false;
            for (let grantType in this.enabledGrants) {
                if (this.enabledGrants[grantType].canRespondToAccessTokenRequest(request)) {
                    this.bindRepositoriesToGrant(this.enabledGrants[grantType]);
                    isGrantTypeSupported = true;
                    this.enabledGrants[grantType].respondToAccessTokenRequest(request)
                        .then((accessToken) => {
                        // We have an access token
                        resolve(this.makeAccessTokenResponsePayload(accessToken));
                    })
                        .catch((error) => reject(error));
                    // Only one grant type per access token request
                    // Therefore if we already match a grant, we proceed with that
                    break;
                }
            }
            if (!isGrantTypeSupported) {
                // If we're ever here, then the requested grant type is not valid/supported
                reject('Invalid grant type: ' + payload.grant_type);
            }
        }));
    }
    /**
     * Enables a grant
     * @param {GrantI} grant
     * @param {number} accessTokenTTL
     */
    enableGrant(grant, accessTokenTTL) {
        grant.setAccessTokenTTL(accessTokenTTL);
        grant.setEncryptor(this.encryptor);
        this.enabledGrants[grant.getIdentifier()] = grant;
    }
    /**
     * Makes the needed access token response payload
     * @param {AccessTokenI} accessToken
     * @returns {TokenResponseEntityI}
     */
    makeAccessTokenResponsePayload(accessToken) {
        if (this.accessTokenResponse === null) {
            this.accessTokenResponse = new BearerTokenResponse_1.default(this.encryptor);
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
    static makeAccessTokenRequestPayload(payload) {
        return {
            grant_type: payload.grant_type,
            payload: {
                client: payload.client,
                user: payload.user,
                refreshToken: payload.refresh_token
            }
        };
    }
    /**
     * Sets the private key
     * @param {string} keyPath
     * @returns {AuthorizationServerI}
     */
    setPrivateKey(keyPath) {
        this.privateKey = new CryptKey_1.default(keyPath);
        return this;
    }
    /**
     * Sets the token repository
     * @param {TokenRepositoryI} tokens
     * @returns {AuthorizationServerI}
     */
    setTokenRepository(tokens) {
        this.tokenRepository = tokens;
        return this;
    }
    /**
     * Sets the client repository
     * @param {ClientRepositoryI} clients
     * @returns {AuthorizationServerI}
     */
    setClientRepository(clients) {
        this.clientRepository = clients;
        return this;
    }
    /**
     * Sets the user repository
     * @param {UserRepositoryI} users
     * @returns {AuthorizationServerI}
     */
    setUserRepository(users) {
        this.userRepository = users;
        return this;
    }
    /**
     * Sets the token expiration in minutes
     * @param {number} numMins
     * @returns {AuthorizationServerI}
     */
    setTokenExpiry(numMins) {
        this.accessTokenTTL = numMins;
        return this;
    }
    /**
     * Sets the encryption key
     * @param {string} key
     * @returns {AuthorizationServerI}
     */
    setEncryptionKey(key) {
        this.encryptor.setKey(key);
        return this;
    }
    /**
     * Binds repositories to a grant
     * @param {GrantI} grant
     */
    bindRepositoriesToGrant(grant) {
        grant.setClientRepository(this.clientRepository);
        grant.setTokenRepository(this.tokenRepository);
        grant.setUserRepository(this.userRepository);
    }
    /**
     * Enables the default grants
     */
    enableDefaultGrants() {
        // Password Grant
        this.enableGrant(new PasswordGrant_1.default(), this.accessTokenTTL);
        // Refresh token grant
        this.enableGrant(new RefreshTokenGrant_1.default(), this.accessTokenTTL);
    }
}
exports.default = AuthorizationServer;
//# sourceMappingURL=AuthorizationServer.js.map