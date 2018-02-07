import * as fs from 'fs'

export default class CryptKey implements CryptKeyI{

    private key: Buffer;

    constructor(keyPath: string){
        this.key = fs.readFileSync(keyPath);
    }

    getKey(): Buffer {
        return this.key;
    }
}



export interface CryptKeyI{
    getKey() : Buffer
}