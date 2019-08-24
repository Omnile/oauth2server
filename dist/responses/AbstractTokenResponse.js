"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractTokenResponse {
    constructor(encryptor) {
        this.encryptor = encryptor;
    }
    /**
     * Sets access token
     * @param {string} accessToken
     */
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
    setPrivateKey(key) {
        this.privateKey = key;
    }
    getTokenResponseEntity() {
        throw new Error('Abstract response has no entity.');
    }
}
exports.default = AbstractTokenResponse;
//# sourceMappingURL=AbstractTokenResponse.js.map