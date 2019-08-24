import { ResourceServerI } from "./ResourceServerI";
import AuthenticatedRequestI from "./requests/AuthenticatedRequestI";
export declare class ResourceServer implements ResourceServerI {
    private publicKey;
    /**
     * Validates an authenticated request.
     * This is a request with an access token
     *
     * @param {AuthenticatedRequestI} request
     * @returns {Promise<any>}
     */
    validateAuthenticatedRequest(request: AuthenticatedRequestI): Promise<any>;
    /**
     * Sets the public key path
     *
     * @param {string} keyPath
     * @returns {ResourceServerI}
     */
    setPublicKey(keyPath: string): ResourceServerI;
}
