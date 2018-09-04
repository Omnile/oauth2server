
import GrantI from './GrantI'
import AbstractGrant from './AbstractGrant'
import AccessTokenRequestI from '../requests/AccessTokenRequestI'
import UserEntityI from "../entities/UserEntityI";
import AccessTokenI from "../AccessTokenI";

export default class PasswordGrant extends AbstractGrant implements GrantI{

    getIdentifier() : string{
        return 'password'
    }


    /**
     * Responds to password grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number) : Promise<any>{
        let client = request.payload.client;
        let user = request.payload.user;

        return new Promise((resolve, reject) => {
            this.validateClient(request.payload.client)
                .then(() => {
                      this.validateUser(user, this.getIdentifier(), client)
                          .then((user: UserEntityI) => {
                              // Both user and client are verified
                              // We create and persist tokens
                              this.issueAccessToken(
                                  client,
                                  user,
                                  accessTokenTTL
                              ).then((accessToken: AccessTokenI) => {
                                  resolve(accessToken);
                              }).catch((error: Error) => reject(error));
                          }).catch((error: Error) => reject(error))
                }).catch((error: Error) => reject(error))
        });
    }

}
