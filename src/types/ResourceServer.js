"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptKey_1 = require("./CryptKey");
var jwt = require("jsonwebtoken");
var Promise = require("bluebird");
var ResourceServer = (function () {
    function ResourceServer() {
    }
    /**
     * Validates an authenticated request.
     * This is a request with an access token
     *
     * @param {AuthenticatedRequestI} request
     * @returns {Bluebird<any>}
     */
    ResourceServer.prototype.validateAuthenticatedRequest = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            jwt.verify(request.access_token, _this.publicKey.getKey(), { algorithms: ['RS256'] }, function (err, decoded) {
                if (err)
                    return reject('Invalid access token.');
                // Access token is valid
                resolve(decoded);
            });
        });
    };
    /**
     * Sets the public key path
     *
     * @param {string} keyPath
     * @returns {ResourceServerI}
     */
    ResourceServer.prototype.setPublicKey = function (keyPath) {
        this.publicKey = new CryptKey_1.default(keyPath);
        return this;
    };
    return ResourceServer;
}());
exports.default = ResourceServer;
