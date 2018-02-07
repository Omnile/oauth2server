
import * as CryptoJS from 'crypto-js';
import EncryptorI from "./EncryptorI";

export default class Encryptor implements EncryptorI{

    private key: string;

    /**
     * Encrypts an object
     * @param {Object} payload
     * @returns {string}
     */
    encrypt(payload: Object): string{
        try{
            return CryptoJS.AES.encrypt(JSON.stringify(payload), this.key)
                .toString()
        }catch (TypeError){
            throw new Error('None or invalid encryption key specified');
        }
    }


    /**
     * Decrypts a hash
     * @param {string} hash
     * @returns {any}
     */
    decrypt(hash: string): Object{
        return JSON.parse(
            CryptoJS.AES.decrypt(hash, this.key)
                .toString(CryptoJS.enc.Utf8)
        );
    }


    setKey(key: string){
        this.key = key;
    }

}