import ClientEntity from './entities/ClientEntityI';
import UserEntityI from "./entities/UserEntityI";
export default interface AuthPayloadI {
    /**
     * This will be the client for the auth request
     * @type {string}
     */
    client: ClientEntity;
    /**
     * The authentication grant type
     */
    grant_type: string;
    /**
     * The user who's making the request
     */
    user?: UserEntityI;
    /**
     * Refresh token
      */
    refresh_token?: string;
}
