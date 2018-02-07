
import ClientEntityI from "../entities/ClientEntityI";
import * as Promise from 'bluebird'
import UserEntityI from "../entities/UserEntityI";

export default interface UserRepositoryI{


    /**
     * Gets a user entity based on the given credentials
     * @param {string} username
     * @param {string} password
     * @param {string} grantType
     * @param {ClientEntityI} client
     * @return {Promise}
     */
    getUserEntityByCredentials(
        username: string,
        password: string,
        grantType?: string,
        client?: ClientEntityI
    ) : Promise<UserEntityI>

}
