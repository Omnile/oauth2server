import EncryptorI from "./EncryptorI";
export default class Encryptor implements EncryptorI {
    private key;
    /**
     * Encrypts an object
     * @param {Object} payload
     * @returns {string}
     */
    encrypt(payload: Object): string;
    /**
     * Decrypts a hash
     * @param {string} hash
     * @returns {any}
     */
    decrypt(hash: string): Object;
    setKey(key: string): void;
}
