export interface ClientRepositoryI {

  /**
   * [create description]
   * @param  {string}  name       [description]
   * @param  {boolean} isPassword [description]
   * @param  {number}  userId     [description]
   * @return {any}                [description]
   */
  create(
    name: string,
    isPassword: boolean,
    userId?: number
  ): any;

  /**
   * [revoke description]
   * @param  {number} id [description]
   * @return {any}       [description]
   */
  revoke(id: number): any;

}
