import ClientEntityI from '../entities/ClientEntityI'
import * as Promise from 'bluebird'

/**
 * ClientRepositoryI
 * @author Bright Antwi Boasiako <bright@omnile.com>
 */
export default interface ClientRepositoryI {
  /**
   * Creates a new client
   * @param  {string}  name       [description]
   * @param  {boolean} isPassword [description]
   * @param  {string}  userId     [description]
   * @return {Promise<any>}                [description]
   */
  create(name: string, isPassword: boolean, userId: string): Promise<any>

  /**
   * [revoke description]
   * @param  {string} id The id of the client
   * @return {Promise<any>}
   */
  revoke(id: string): Promise<any>


  /**
   * Checks if the client is revoked
   * @param  client
   * @return    [description]
   */
  validateClient(client: ClientEntityI) : Promise<any>

}
