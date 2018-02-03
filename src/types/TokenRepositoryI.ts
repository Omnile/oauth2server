export interface TokenRepositoryI {

  /**
   * [create description]
   * @param  {string}        accessToken  [description]
   * @param  {string}        refreshToken [description]
   * @param  {number|string} clientId     [description]
   * @param  {string}        ownerType    [description]
   * @param  {number|string} ownerId      [description]
   * @param  {Date}          expiry       [description]
   * @return {any}                        [description]
   */
  create(
    accessToken: string,
    refreshToken: string,
    clientId: number|string,
    ownerType: string,
    ownerId: number|string,
    expiry: Date
  ): any;

  /**
   * [revoke description]
   * @param {string} refreshToken [description]
   */
  revoke(refreshToken: string): void;

  /**
   * [find description]
   * @param  {string} accessToken [description]
   * @return {string}             [description]
   */
  find(accessToken: string): string;

  /**
   * [findByRefreshToken description]
   * @param  {string} refreshToken [description]
   * @return {string}              [description]
   */
  findByRefreshToken(refreshToken: string): string;
}
