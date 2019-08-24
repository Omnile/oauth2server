/// <reference types="node" />
export default class CryptKey implements CryptKeyI {
    private key;
    constructor(keyPath: string);
    getKey(): Buffer;
}
export interface CryptKeyI {
    getKey(): Buffer;
}
