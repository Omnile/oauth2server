import ClientEntityI from "./entities/ClientEntityI";
import UserIdentifierEntityI from "./entities/UserIdentifierEntityI";
import { CryptKeyI } from "./CryptKey";
export default interface AccessTokenI {
    setIdentifier(identifier: string): void;
    setUserIdentifier(userIdentifier: UserIdentifierEntityI): void;
    setClient(client: ClientEntityI): void;
    setExpirationDateTime(accessTokenTTL: number): void;
    setRefreshTokenIdentifier(identifier: string): void;
    convertToJwtToken(privateKey: CryptKeyI): string;
    getExpirationDateTime(): Date;
    getClient(): ClientEntityI;
    getIdentifier(): string;
    getRefreshTokenIdentifier(): string;
    getUserIdentifier(): UserIdentifierEntityI;
}
