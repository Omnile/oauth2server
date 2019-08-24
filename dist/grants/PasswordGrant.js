"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGrant_1 = require("./AbstractGrant");
class PasswordGrant extends AbstractGrant_1.default {
    getIdentifier() {
        return 'password';
    }
    /**
     * Responds to password grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    respondToAccessTokenRequest(request, accessTokenTTL) {
        let client = request.payload.client;
        let user = request.payload.user;
        return new Promise((resolve, reject) => {
            this.validateClient(request.payload.client)
                .then(() => {
                this.validateUser(user, this.getIdentifier(), client)
                    .then((user) => {
                    // Both user and client are verified
                    // We create and persist tokens
                    this.issueAccessToken(client, user, accessTokenTTL).then((accessToken) => {
                        resolve(accessToken);
                    }).catch((error) => reject(error));
                }).catch((error) => reject(error));
            }).catch((error) => reject(error));
        });
    }
}
exports.default = PasswordGrant;
//# sourceMappingURL=PasswordGrant.js.map