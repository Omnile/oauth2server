"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Moment = require("moment");
var jwt = require("jsonwebtoken");
var AccessToken = (function () {
    function AccessToken() {
    }
    AccessToken.prototype.setIdentifier = function (identifier) {
        this.identifier = identifier;
    };
    AccessToken.prototype.setUserIdentifier = function (userIdentifier) {
        this.userIdentifier = userIdentifier;
    };
    AccessToken.prototype.setClient = function (client) {
        this.client = client;
    };
    AccessToken.prototype.setExpirationDateTime = function (accessTokenTTL) {
        this.expirationDateTime = Moment().add(accessTokenTTL, 'm').toDate();
    };
    AccessToken.prototype.setRefreshTokenIdentifier = function (identifier) {
        this.refreshTokenIdentifier = identifier;
    };
    AccessToken.prototype.getIdentifier = function () {
        return this.identifier;
    };
    AccessToken.prototype.getRefreshTokenIdentifier = function () {
        return this.refreshTokenIdentifier;
    };
    AccessToken.prototype.getUserIdentifier = function () {
        return this.userIdentifier;
    };
    AccessToken.prototype.getClient = function () {
        return this.client;
    };
    AccessToken.prototype.getExpirationDateTime = function () {
        return this.expirationDateTime;
    };
    /**
     * Converts the AccessToken to jwt token
     *
     * @param {CryptKeyI} privateKey
     * @returns {string}
     */
    AccessToken.prototype.convertToJwtToken = function (privateKey) {
        return jwt.sign({
            oauth_access_token_id: this.getIdentifier(),
            oauth_client_id: this.getClient().id,
            oauth_user_id: this.getUserIdentifier().id
        }, privateKey.getKey(), { algorithm: 'RS256' });
    };
    return AccessToken;
}());
exports.default = AccessToken;
