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
var PasswordGrant = (function (_super) {
    __extends(PasswordGrant, _super);
    function PasswordGrant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordGrant.prototype.getIdentifier = function () {
        return 'password';
    };
    /**
     * Responds to password grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Bluebird<any>}
     */
    PasswordGrant.prototype.respondToAccessTokenRequest = function (request, accessTokenTTL) {
        var _this = this;
        var client = request.payload.client;
        var user = request.payload.user;
        return new Promise(function (resolve, reject) {
            _this.validateClient(request.payload.client)
                .then(function () {
                _this.validateUser(user, _this.getIdentifier(), client)
                    .then(function () {
                    // Both user and client are verified
                    // We create and persist tokens
                    _this.issueAccessToken(client, user, accessTokenTTL).then(function (accessToken) {
                        resolve(accessToken);
                    }).catch(function (error) { return reject(error); });
                }).catch(function (error) { return reject(error); });
            }).catch(function (error) { return reject(error); });
        });
    };
    return PasswordGrant;
}(AbstractGrant_1.default));
exports.default = PasswordGrant;
