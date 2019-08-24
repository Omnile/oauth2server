"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class CryptKey {
    constructor(keyPath) {
        this.key = fs.readFileSync(keyPath);
    }
    getKey() {
        return this.key;
    }
}
exports.default = CryptKey;
//# sourceMappingURL=CryptKey.js.map