"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Encryptor_1 = require("../Encryptor");
var AbstractTokenResponse = (function () {
    function AbstractTokenResponse() {
        this.encryptor = new Encryptor_1.default();
    }
    /**
     * Sets access token
     * @param {string} accessToken
     */
    AbstractTokenResponse.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    AbstractTokenResponse.prototype.setPrivateKey = function (key) {
        this.privateKey = key;
    };
    AbstractTokenResponse.prototype.getTokenResponseEntity = function () {
        throw new Error('Abstract response has no entity.');
    };
    return AbstractTokenResponse;
}());
exports.default = AbstractTokenResponse;
