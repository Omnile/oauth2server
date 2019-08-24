export default interface EncryptorI {
    /**
     * Encrypts a given payload
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
    /**
     * Sets the encryption key
     * @param {string} key
     */
    setKey(key: string): void;
}
