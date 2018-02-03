import { ClientRepositoryI } from './ClientRepositoryI';

export class ClientRepository implements ClientRepositoryI {

  /**
   * [create description]
   * @param  {string}  name       [description]
   * @param  {boolean} isPassword [description]
   * @param  {number}  userId     [description]
   * @return {any}                [description]
   */
  create(name: string, isPassword: boolean = true, userId: number = null) {
    return 'Pass Tests';
  }

  /**
   * [revoke description]
   * @param  {number} id [description]
   * @return {any}       [description]
   */
  revoke(id: number) {
    return 'Pass Tests';
  }

}
