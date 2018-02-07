"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var AccessToken_1 = require("../AccessToken");
var AbstractGrant = (function () {
    function AbstractGrant() {
        this.accessTokenTTL = 60;
        this.clientRepository = null;
        this.userRepository = null;
    }
    AbstractGrant.prototype.setAccessTokenTTL = function (accessTokenTTL) {
        this.accessTokenTTL = accessTokenTTL;
    };
    AbstractGrant.prototype.setClientRepository = function (clients) {
        this.clientRepository = clients;
    };
    AbstractGrant.prototype.setTokenRepository = function (tokens) {
        this.accessTokenRepository = tokens;
    };
    AbstractGrant.prototype.setUserRepository = function (users) {
        this.userRepository = users;
    };
    AbstractGrant.prototype.canRespondToAccessTokenRequest = function (request) {
        return request.grant_type === this.getIdentifier();
    };
    AbstractGrant.prototype.respondToAccessTokenRequest = function (request, accessTokenTTL) {
        return new Promise((function (resolve, reject) { return reject('Abstract grant cannot respond to requests'); }));
    };
    AbstractGrant.prototype.getIdentifier = function () {
        return 'abstract';
    };
    AbstractGrant.prototype.validateClient = function (client) {
        return this.clientRepository.validateClient(client);
    };
    /**
     * Validates a user
     * @param {UserEntityI} user
     * @param {string} grantType
     * @param {ClientEntityI} client
     * @returns {Bluebird<any>}
     */
    AbstractGrant.prototype.validateUser = function (user, grantType, client) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.userRepository.getUserEntityByCredentials(user.username, user.password, grantType, client).then(function (user) {
                if (user)
                    resolve(user);
                else
                    reject(user);
            }).catch(function (error) { return reject(error); });
        });
    };
    /**
     * Issues a new access token
     * @param client
     * @param {UserIdentifierEntityI} userIdentifier
     * @param {number} accessTokenTTL
     * @returns {Bluebird<any>}
     */
    AbstractGrant.prototype.issueAccessToken = function (client, userIdentifier, accessTokenTTL) {
        var _this = this;
        accessTokenTTL = (accessTokenTTL) ? accessTokenTTL : this.accessTokenTTL;
        var accessToken = new AccessToken_1.default();
        accessToken.setClient(client);
        accessToken.setUserIdentifier(userIdentifier);
        accessToken.setExpirationDateTime(accessTokenTTL);
        accessToken.setIdentifier(AbstractGrant.generateUniqueIdentifier());
        accessToken.setRefreshTokenIdentifier(AbstractGrant.generateUniqueIdentifier());
        return new Promise(function (resolve, reject) {
            _this.accessTokenRepository.persistNewToken(accessToken)
                .then(function () {
                resolve(accessToken);
            }).catch(function (error) { return reject(error); });
        });
    };
    /**
     * Generates a unique identifier
     * @param {number} length
     * @returns {string}
     */
    AbstractGrant.generateUniqueIdentifier = function (length) {
        if (length === void 0) { length = 40; }
        var uid = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charsLength = chars.length;
        for (var i = 0; i < length; ++i) {
            uid += chars[AbstractGrant.getRandomInt(0, charsLength - 1)];
        }
        return uid.toLowerCase();
    };
    AbstractGrant.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return AbstractGrant;
}());
exports.default = AbstractGrant;
