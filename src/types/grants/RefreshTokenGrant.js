"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractGrant_1 = require("./AbstractGrant");
var Promise = require("bluebird");
var RefreshTokenGrant = (function (_super) {
    __extends(RefreshTokenGrant, _super);
    function RefreshTokenGrant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RefreshTokenGrant.prototype.getIdentifier = function () {
        return 'refresh_token';
    };
    /**
     * Responds to a refresh token grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Bluebird<any>}
     */
    RefreshTokenGrant.prototype.respondToAccessTokenRequest = function (request, accessTokenTTL) {
        var _this = this;
        var client = request.payload.client;
        var refreshToken = request.payload.refreshToken;
        return new Promise(function (resolve, reject) {
            _this.validateClient(request.payload.client)
                .then(function () {
                _this.getUserForRefreshToken(refreshToken)
                    .then(function (user) {
                    if (!user)
                        return reject('Invalid refresh token');
                    // Revoke the current token
                    _this.accessTokenRepository
                        .revokeRefreshToken(refreshToken);
                    // Old token has been revoked
                    // We create and persist new access token
                    _this.issueAccessToken(client, user, accessTokenTTL).then(function (accessToken) {
                        resolve(accessToken);
                    }).catch(function (error) { return reject(error); });
                }).catch(function (error) { return reject(error); });
            }).catch(function (error) { return reject(error); });
        });
    };
    /**
     * Checks whether refresh token has expired or is revoked
     *
     * @param {string} refreshToken
     * @returns {Bluebird<any>}
     */
    RefreshTokenGrant.prototype.getUserForRefreshToken = function (refreshToken) {
        return this.accessTokenRepository
            .getUserForRefreshToken(refreshToken);
    };
    return RefreshTokenGrant;
}(AbstractGrant_1.default));
exports.default = RefreshTokenGrant;
