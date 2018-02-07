import AccessTokenI from "../AccessTokenI";
import TokenResponseI from "./TokenResponseI";
import {CryptKeyI} from "../CryptKey";
import TokenResponseEntityI from "./TokenResponseEntityI";
import Encryptor from '../Encryptor'

export default abstract class AbstractTokenResponse implements TokenResponseI{

    protected privateKey: CryptKeyI;
    protected accessToken: AccessTokenI;
    protected encryptor: Encryptor;


    constructor(encryptor: Encryptor){
        this.encryptor = encryptor;
    }

    /**
     * Sets access token
     * @param {string} accessToken
     */
    setAccessToken(accessToken: AccessTokenI){
        this.accessToken = accessToken;
    }


    setPrivateKey(key: CryptKeyI){
        this.privateKey = key;
    }



    getTokenResponseEntity(): TokenResponseEntityI {
        throw new Error('Abstract response has no entity.');
    }


}