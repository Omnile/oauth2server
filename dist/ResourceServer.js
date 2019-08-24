"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptKey_1 = require("./CryptKey");
const jwt = require("jsonwebtoken");
class ResourceServer {
    /**
     * Validates an authenticated request.
     * This is a request with an access token
     *
     * @param {AuthenticatedRequestI} request
     * @returns {Promise<any>}
     */
    validateAuthenticatedRequest(request) {
        return new Promise((resolve, reject) => {
            jwt.verify(request.access_token, this.publicKey.getKey(), { algorithms: ['RS256'] }, (err, decoded) => {
                if (err)
                    return reject('Invalid access token.');
                // Access token is valid
                resolve(decoded);
            });
        });
    }
    /**
     * Sets the public key path
     *
     * @param {string} keyPath
     * @returns {ResourceServerI}
     */
    setPublicKey(keyPath) {
        this.publicKey = new CryptKey_1.default(keyPath);
        return this;
    }
}
exports.ResourceServer = ResourceServer;
//# sourceMappingURL=ResourceServer.js.map