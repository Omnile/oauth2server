import { ResourceServerI } from "./ResourceServerI";
import AuthenticatedRequestI from "./requests/AuthenticatedRequestI";
import CryptKey, {CryptKeyI} from "./CryptKey";
import * as jwt from 'jsonwebtoken';

export class ResourceServer implements ResourceServerI{

    private publicKey: CryptKeyI;

    /**
     * Validates an authenticated request.
     * This is a request with an access token
     *
     * @param {AuthenticatedRequestI} request
     * @returns {Promise<any>}
     */
    validateAuthenticatedRequest(request: AuthenticatedRequestI): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                request.access_token,
                this.publicKey.getKey(),
                { algorithms: ['RS256'] },
                (err, decoded) => {
                    if(err) return reject('Invalid access token.');
                    // Access token is valid
                    resolve(decoded)
                }
            );
        });
    }


    /**
     * Sets the public key path
     *
     * @param {string} keyPath
     * @returns {ResourceServerI}
     */
    setPublicKey(keyPath: string): ResourceServerI {
        this.publicKey = new CryptKey(keyPath);
        return this;
    }
}