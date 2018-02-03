import { AuthPayloadI } from './AuthPayloadI';

export interface PasswordGrantorI {

  /**
   * The authentication interface
   * @param  {Object}       payload [Payload for the authentiation]
   * @return {Promise<any>}         [Differed promise for the authentication response]
   */
  authenticate(payload: AuthPayloadI) : Promise<any>;

  /**
   * Gets the authorized entity
   * @param  {Object} decodedToken [Decoded token for the entity]
   * @return {Object}              [The authorized entity]
   */
  getAuthorizedEntity(decodedToken: Object): Object;
}
