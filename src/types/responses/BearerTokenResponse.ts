import AbstractTokenResponse from "./AbstractTokenResponse";
import TokenResponseI from "./TokenResponseI";
import TokenResponseEntityI from "./TokenResponseEntityI";
import * as Moment from 'moment';

export default class BearerTokenResponse extends AbstractTokenResponse implements TokenResponseI{

    // Get http response
    getTokenResponseEntity(): TokenResponseEntityI {
        return {
            access_token: this.accessToken.convertToJwtToken(this.privateKey),
            expires_at: Moment(this.accessToken.getExpirationDateTime()).format(),
            refresh_token: this.getRefreshToken()
        }
    }


    getRefreshToken(): string {

        if(process && process.env.OAUTH2_ENCRYPTION_KEY){
            // If an ecryption key exists in the node process
            // env, we use that.
            this.encryptor.setKey(process.env.OAUTH2_ENCRYPTION_KEY)
        }

        return this.encryptor.encrypt({
            client_id: this.accessToken.getClient().id,
            refresh_token_id: this.accessToken.getRefreshTokenIdentifier(),
            access_token_id: this.accessToken.getIdentifier(),
            user_id: this.accessToken.getUserIdentifier().id,
            expire_time: this.accessToken.getExpirationDateTime().toDateString()
        })

    }

}
