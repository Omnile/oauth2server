import { PasswordGrantorI } from './PasswordGrantorI';
import { AuthPayloadI } from './AuthPayloadI';

export class PasswordGrantor implements PasswordGrantorI {

  /**
   * Authentication Implementation
   * @param  {AuthPayloadI} payload [The payload required for the authentication]
   * @return {Promise}               [Differed promise]
   */
  public authenticate(payload: AuthPayloadI) {

    return new Promise(promiseFunction);

    /**
     * Implimentation of the promise resover
     * @param  {Function} resolve [description]
     * @param  {Function} reject  [description]
     * @return {[type]}           [description]
     */
    function promiseFunction(resolve: Function, reject: Function){
      resolve({
        username: payload.username,
        owner_id: payload.owner_id,
        owner_type: payload.owner_type
      });
    }
  }

  /**
   * Gets the object of the authorized entity
   * @param  {Object} decodedToken [description]
   * @return {[type]}              [description]
   */
  getAuthorizedEntity(decodedToken: Object) {
    return new Object({ data: 'Pass Test' });
  }
}
