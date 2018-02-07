"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var Encryptor = (function () {
    function Encryptor() {
    }
    /**
     * Encrypts an object
     * @param {Object} payload
     * @returns {string}
     */
    Encryptor.prototype.encrypt = function (payload) {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(payload), this.key)
                .toString();
        }
        catch (TypeError) {
            throw new Error('None or invalid encryption key specified');
        }
    };
    /**
     * Decrypts a hash
     * @param {string} hash
     * @returns {any}
     */
    Encryptor.prototype.decrypt = function (hash) {
        return JSON.parse(CryptoJS.AES.decrypt(hash, this.key)
            .toString(CryptoJS.enc.Utf8));
    };
    Encryptor.prototype.setKey = function (key) {
        this.key = key;
    };
    return Encryptor;
}());
exports.default = Encryptor;
