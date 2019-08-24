import ClientEntityI from "../entities/ClientEntityI";
import UserEntityI from "../entities/UserEntityI";
export default interface AccessTokenRequestI {
    /**
     * Gets the grant type for the request
     * @returns {string}
     */
    grant_type: string;
    /**
     * Gets the request payload
     * @returns {Object}
     */
    payload: {
        user?: UserEntityI;
        client?: ClientEntityI;
        refreshToken?: string;
    };
}
