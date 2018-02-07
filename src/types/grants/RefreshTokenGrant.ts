
import GrantI from './GrantI'
import AbstractGrant from './AbstractGrant'
import AccessTokenRequestI from '../requests/AccessTokenRequestI'
import * as Promise from 'bluebird'

export default class RefreshTokenGrant extends AbstractGrant implements GrantI{

    getIdentifier() : string{
        return 'refresh_token'
    }


    /**
     * Responds to a refresh token grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Bluebird<any>}
     */
    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number) : Promise<any>{
        let client = request.payload.client;
        let refreshToken = request.payload.refreshToken;

        return new Promise((resolve, reject) => {
            this.validateClient(request.payload.client)
                .then(() => {
                    this.validateRefreshToken(refreshToken)
                        .then(oldRefreshToken => {

                            if(oldRefreshToken.user_id === undefined) return reject('Invalid refresh token');

                            // Revoke the current token
                            this.accessTokenRepository
                                .revokeRefreshToken(oldRefreshToken.refresh_token_id);

                            // Old token has been revoked
                            // We create and persist new access token
                            this.issueAccessToken(
                                client,
                                { id: oldRefreshToken.user_id},
                                accessTokenTTL
                            ).then(accessToken => {
                                resolve(accessToken);
                            }).catch(error => reject(error));
                        }).catch(error => reject(error))
                }).catch(error => reject(error))
        })
    }


    /**
     * Checks whether refresh token has expired or is revoked
     *
     * @param {string} refreshToken
     * @returns {Bluebird<any>}
     */
    private validateRefreshToken(refreshToken: string) : Promise<any> {

        return new Promise((resolve, reject) => {

            let oldRefreshToken: any = null;

            try{
                oldRefreshToken = this.decodeRefreshToken(refreshToken);
            }catch (Error){
                return reject('Invalid refresh token.');
            }

            this.accessTokenRepository
                .validateRefreshToken(oldRefreshToken.refresh_token_id)
                .then(() => {
                    resolve({
                        client_id: oldRefreshToken.client_id,
                        refresh_token_id: oldRefreshToken.refresh_token_id,
                        access_token_id: oldRefreshToken.access_token_id,
                        user_id: oldRefreshToken.user_id,
                        expire_time: oldRefreshToken.expire_time
                    });
                })
                .catch(error => reject(error))
        })
    }


    private decodeRefreshToken(refreshToken: string) : any{
        return this.encryptor
                    .decrypt(refreshToken)
    }


}
