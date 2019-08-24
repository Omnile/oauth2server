import AccessTokenI from "../AccessTokenI";
import TokenResponseI from "./TokenResponseI";
import { CryptKeyI } from "../CryptKey";
import TokenResponseEntityI from "./TokenResponseEntityI";
import Encryptor from '../Encryptor';
export default abstract class AbstractTokenResponse implements TokenResponseI {
    protected privateKey: CryptKeyI;
    protected accessToken: AccessTokenI;
    protected encryptor: Encryptor;
    constructor(encryptor: Encryptor);
    /**
     * Sets access token
     * @param {string} accessToken
     */
    setAccessToken(accessToken: AccessTokenI): void;
    setPrivateKey(key: CryptKeyI): void;
    getTokenResponseEntity(): TokenResponseEntityI;
}
