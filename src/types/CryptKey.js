"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CryptKey = (function () {
    function CryptKey(keyPath) {
        this.key = fs.readFileSync(keyPath);
    }
    CryptKey.prototype.getKey = function () {
        return this.key;
    };
    return CryptKey;
}());
exports.default = CryptKey;
