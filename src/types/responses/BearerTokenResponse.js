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
var AbstractTokenResponse_1 = require("./AbstractTokenResponse");
var Moment = require("moment");
var BearerTokenResponse = (function (_super) {
    __extends(BearerTokenResponse, _super);
    function BearerTokenResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Get http response
    BearerTokenResponse.prototype.getTokenResponseEntity = function () {
        return {
            access_token: this.accessToken.convertToJwtToken(this.privateKey),
            expires_at: Moment(this.accessToken.getExpirationDateTime()).format(),
            refresh_token: this.getRefreshToken()
        };
    };
    BearerTokenResponse.prototype.getRefreshToken = function () {
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
    };
    return BearerTokenResponse;
}(AbstractTokenResponse_1.default));
exports.default = BearerTokenResponse;
