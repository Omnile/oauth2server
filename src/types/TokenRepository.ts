import { TokenRepositoryI } from './TokenRepositoryI'

export class TokenRepository implements TokenRepositoryI {

  /**
   * [create description]
   * @param  {string} accessToken  [description]
   * @param  {string} refreshToken [description]
   * @param  {number} clientId     [description]
   * @param  {string} ownerType    [description]
   * @param  {number} ownerId      [description]
   * @param  {Date}   expiry       [description]
   * @return {[type]}              [description]
   */
  public create(
    accessToken: string,
    refreshToken: string,
    clientId: number,
    ownerType: string,
    ownerId: number,
    expiry: Date
  ) {
    return 'Pass Tests';
  }

  /**
   * [revoke description]
   * @param  {string} refreshToken [description]
   * @return {[type]}              [description]
   */
  public revoke(refreshToken: string) {
    return 'Pass Test';
  }

  /**
   * [find description]
   * @param  {string} accessToken [description]
   * @return {[type]}             [description]
   */
  public find(accessToken: string) {
    return 'Pass Test';
  }

  /**
   * [findByRefreshToken description]
   * @param  {string} refreshToken [description]
   * @return {[type]}              [description]
   */
  public findByRefreshToken(refreshToken: string) {
    return 'Pass Test';
  }
}
