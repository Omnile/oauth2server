"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Encryptor {
    /**
     * Encrypts an object
     * @param {Object} payload
     * @returns {string}
     */
    encrypt(payload) {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(payload), this.key)
                .toString();
        }
        catch (TypeError) {
            throw new Error('None or invalid encryption key specified');
        }
    }
    /**
     * Decrypts a hash
     * @param {string} hash
     * @returns {any}
     */
    decrypt(hash) {
        return JSON.parse(CryptoJS.AES.decrypt(hash, this.key)
            .toString(CryptoJS.enc.Utf8));
    }
    setKey(key) {
        this.key = key;
    }
}
exports.default = Encryptor;
//# sourceMappingURL=Encryptor.js.map