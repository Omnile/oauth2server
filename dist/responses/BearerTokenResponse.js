"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTokenResponse_1 = require("./AbstractTokenResponse");
const Moment = require("moment");
class BearerTokenResponse extends AbstractTokenResponse_1.default {
    // Get http response
    getTokenResponseEntity() {
        return {
            access_token: this.accessToken.convertToJwtToken(this.privateKey),
            expires_at: Moment(this.accessToken.getExpirationDateTime()).format(),
            refresh_token: this.getRefreshToken(),
            token_type: 'Bearer'
        };
    }
    getRefreshToken() {
        if (process && process.env.OAUTH2_ENCRYPTION_KEY) {
            // If an ecryption key exists in the node process
            // env, we use that.
            this.encryptor.setKey(process.env.OAUTH2_ENCRYPTION_KEY);
        }
        return this.encryptor.encrypt({
            client_id: this.accessToken.getClient().id,
            refresh_token_id: this.accessToken.getRefreshTokenIdentifier(),
            access_token_id: this.accessToken.getIdentifier(),
            user_id: this.accessToken.getUserIdentifier().id,
            expire_time: this.accessToken.getExpirationDateTime().toDateString()
        });
    }
}
exports.default = BearerTokenResponse;
//# sourceMappingURL=BearerTokenResponse.js.map