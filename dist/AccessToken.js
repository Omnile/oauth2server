"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
const jwt = require("jsonwebtoken");
class AccessToken {
    setIdentifier(identifier) {
        this.identifier = identifier;
    }
    setUserIdentifier(userIdentifier) {
        this.userIdentifier = userIdentifier;
    }
    setClient(client) {
        this.client = client;
    }
    setExpirationDateTime(accessTokenTTL) {
        this.expirationDateTime = Moment().add(accessTokenTTL, 'm').toDate();
    }
    setRefreshTokenIdentifier(identifier) {
        this.refreshTokenIdentifier = identifier;
    }
    getIdentifier() {
        return this.identifier;
    }
    getRefreshTokenIdentifier() {
        return this.refreshTokenIdentifier;
    }
    getUserIdentifier() {
        return this.userIdentifier;
    }
    getClient() {
        return this.client;
    }
    getExpirationDateTime() {
        return this.expirationDateTime;
    }
    /**
     * Converts the AccessToken to jwt token
     *
     * @param {CryptKeyI} privateKey
     * @returns {string}
     */
    convertToJwtToken(privateKey) {
        const expiresIn = Moment(this.expirationDateTime.toISOString()).diff(Moment(), 'seconds');
        return jwt.sign({
            oauth_access_token_id: this.getIdentifier(),
            oauth_client_id: this.getClient().id,
            oauth_user_id: this.getUserIdentifier().id
        }, privateKey.getKey(), { algorithm: 'RS256', expiresIn: expiresIn });
    }
    toString() {
        return JSON.stringify({
            client_id: this.client.id,
            user_id: this.getUserIdentifier().id,
            id: this.getIdentifier(),
            refresh_token: this.getRefreshTokenIdentifier(),
            expiry: this.getExpirationDateTime().toISOString()
        });
    }
}
exports.default = AccessToken;
//# sourceMappingURL=AccessToken.js.map