import AuthenticatedRequestI from './requests/AuthenticatedRequestI';
/**
 * This is the resource interface
 * @type {ResourceServerI}
 */
export interface ResourceServerI {
    /**
     * Validates an authenticated request which has
     * an access token provided in the header
     *
     * @param  request The server request
     * @return Promise        [description]
     */
    validateAuthenticatedRequest(request: AuthenticatedRequestI): Promise<any>;
    /**
     * Sets the public key
     * @param {string} keyPath
     * @returns {ResourceServerI}
     */
    setPublicKey(keyPath: string): ResourceServerI;
}
