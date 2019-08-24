import AccessTokenI from './AccessTokenI';
import ClientEntityI from "./entities/ClientEntityI";
import UserIdentifierEntityI from "./entities/UserIdentifierEntityI";
import { CryptKeyI } from "./CryptKey";
export default class AccessToken implements AccessTokenI {
    private identifier;
    private userIdentifier;
    private client;
    private expirationDateTime;
    private refreshTokenIdentifier;
    setIdentifier(identifier: string): void;
    setUserIdentifier(userIdentifier: UserIdentifierEntityI): void;
    setClient(client: ClientEntityI): void;
    setExpirationDateTime(accessTokenTTL: number): void;
    setRefreshTokenIdentifier(identifier: string): void;
    getIdentifier(): string;
    getRefreshTokenIdentifier(): string;
    getUserIdentifier(): UserIdentifierEntityI;
    getClient(): ClientEntityI;
    getExpirationDateTime(): Date;
    /**
     * Converts the AccessToken to jwt token
     *
     * @param {CryptKeyI} privateKey
     * @returns {string}
     */
    convertToJwtToken(privateKey: CryptKeyI): string;
    toString(): string;
}
