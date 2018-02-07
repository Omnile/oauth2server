
import AccessTokenI from "../AccessTokenI";
import * as Promise from 'bluebird';

export default interface TokenRepositoryI {

  /**
   * Creates an access token in the repository
   * @param  {AccessTokenI} token
   */
  persistNewToken(
      token: AccessTokenI
  ): Promise<any>

  /**
   * Revokes a refresh token
   * @param {string} refreshTokenId [description]
   */
  revokeRefreshToken(refreshTokenId: string): void

    /**
     * Revokes an access token
     * @param {string} accessTokenId
     */
  revokeAccessToken(accessTokenId: string) : void


  /**
   * Finds a
   * @param  {string} accessTokenId [description]
   * @return {string}             [description]
   */
  validateAccessToken(accessTokenId: string): Promise<any>

  /**
   * Validates a refresh token id
   *
   * This would first check for the validity of a refresh token
   *
   * @param  {string} refreshTokenId [description]
   * @return {string}              [description]
   */
  validateRefreshToken(refreshTokenId: string): Promise<any>
}
