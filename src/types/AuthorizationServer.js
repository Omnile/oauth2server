"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var BearerTokenResponse_1 = require("./responses/BearerTokenResponse");
var CryptKey_1 = require("./CryptKey");
var PasswordGrant_1 = require("./grants/PasswordGrant");
var RefreshTokenGrant_1 = require("./grants/RefreshTokenGrant");
var AuthorizationServer = (function () {
    function AuthorizationServer(options) {
        this.accessTokenResponse = null;
        this.privateKey = null;
        if (options.privateKey !== undefined) {
            this.setPrivateKey(options.privateKey);
        }
        this.setTokenExpiry(options.tokenExpiryMins ?
            options.tokenExpiryMins : 60);
        this.enableDefaultGrants();
        this.setTokenRepository(options.tokenRepository);
        this.setClientRepository(options.clientRepository);
        this.setUserRepository(options.userRepository);
    }
    /**
     * Gets an access token for the provided credentials
     *
     * @param {AuthPayloadI} payload
     * @returns {Bluebird<any>}
     */
    AuthorizationServer.prototype.getAccessToken = function (payload) {
        var _this = this;
        // We bind repositories to grants
        this.bindRepositoriesToGrants();
        var request = AuthorizationServer.makeAccessTokenRequestPayload(payload);
        return new Promise((function (resolve, reject) {
            for (var grantType in _this.enabledGrants) {
                if (_this.enabledGrants[grantType].canRespondToAccessTokenRequest(request)) {
                    _this.enabledGrants[grantType].respondToAccessTokenRequest(request)
                        .then(function (accessToken) {
                        // We have an access token
                        resolve(_this.makeAccessTokenResponsePayload(accessToken));
                    })
                        .catch(function (error) { return reject(error); });
                }
            }
            // If we're ever here, then the requested grant type is not valid/supported
            reject('Invalid grant type: ' + payload.grant_type);
        }));
    };
    AuthorizationServer.prototype.enableGrant = function (grant, accessTokenTTL) {
        grant.setAccessTokenTTL(accessTokenTTL);
        this.enabledGrants[grant.getIdentifier()] = grant;
    };
    /**
     * Makes the needed access token response payload
     * @param {AccessTokenI} accessToken
     * @returns {TokenResponseEntityI}
     */
    AuthorizationServer.prototype.makeAccessTokenResponsePayload = function (accessToken) {
        if (this.accessTokenResponse === null) {
            this.accessTokenResponse = new BearerTokenResponse_1.default();
        }
        // We set up the access token response
        this.accessTokenResponse.setPrivateKey(this.privateKey);
        this.accessTokenResponse.setAccessToken(accessToken);
        return this.accessTokenResponse.getTokenResponseEntity();
    };
    /**
     * Makes the needed request data for access token
     * @param {AuthPayloadI} payload
     * @returns {AccessTokenRequestI}
     */
    AuthorizationServer.makeAccessTokenRequestPayload = function (payload) {
        return {
            grant_type: payload.grant_type,
            payload: {
                client: payload.client,
                user: payload.user,
                refreshToken: payload.refresh_token
            }
        };
    };
    AuthorizationServer.prototype.setPrivateKey = function (keyPath) {
        this.privateKey = new CryptKey_1.default(keyPath);
    };
    AuthorizationServer.prototype.setTokenRepository = function (tokens) {
        this.tokenRepository = tokens;
        return this;
    };
    AuthorizationServer.prototype.setClientRepository = function (clients) {
        this.clientRepository = clients;
        return this;
    };
    AuthorizationServer.prototype.setUserRepository = function (users) {
        this.userRepository = users;
        return this;
    };
    AuthorizationServer.prototype.setTokenExpiry = function (numMins) {
        this.accessTokenTTL = numMins;
        return this;
    };
    AuthorizationServer.prototype.bindRepositoriesToGrants = function () {
        for (var grantType in this.enabledGrants) {
            this.enabledGrants[grantType].setClientRepository(this.clientRepository);
            this.enabledGrants[grantType].setTokenRepository(this.tokenRepository);
            this.enabledGrants[grantType].setUserRepository(this.userRepository);
        }
    };
    AuthorizationServer.prototype.enableDefaultGrants = function () {
        // Password Grant
        this.enableGrant(new PasswordGrant_1.default(), this.accessTokenTTL);
        // Refresh token grant
        this.enableGrant(new RefreshTokenGrant_1.default(), this.accessTokenTTL);
    };
    return AuthorizationServer;
}());
exports.default = AuthorizationServer;
