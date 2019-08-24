import AccessTokenI from "../AccessTokenI";
import { CryptKeyI } from "../CryptKey";
import TokenResponseEntityI from "./TokenResponseEntityI";
export default interface TokenResponseI {
    /**
     * Sets access token
     * @param {string} accessToken
     */
    setAccessToken(accessToken: AccessTokenI): void;
    getTokenResponseEntity(): TokenResponseEntityI;
    /**
     * Sets the private key
     * @param {CryptKeyI} key
     */
    setPrivateKey(key: CryptKeyI): void;
}
