import AccessTokenI from './AccessTokenI'
import ClientEntityI from "./entities/ClientEntityI";
import * as Moment from 'moment'
import UserIdentifierEntityI from "./entities/UserIdentifierEntityI";
import {CryptKeyI} from "./CryptKey";
import * as jwt from 'jsonwebtoken';

export default class AccessToken implements AccessTokenI{

    private identifier: string;
    private userIdentifier: UserIdentifierEntityI;
    private client: ClientEntityI;
    private expirationDateTime: Date;
    private refreshTokenIdentifier: string;

    setIdentifier(identifier: string): void {
        this.identifier = identifier;
    }

    setUserIdentifier(userIdentifier: UserIdentifierEntityI): void {
        this.userIdentifier = userIdentifier;
    }

    setClient(client: ClientEntityI): void {
        this.client = client;
    }

    setExpirationDateTime(accessTokenTTL: number): void {
        this.expirationDateTime = Moment().add(accessTokenTTL, 'm').toDate();
    }

    setRefreshTokenIdentifier(identifier: string) : void {
        this.refreshTokenIdentifier = identifier;
    }


    getIdentifier(): string {
        return this.identifier;
    }


    getRefreshTokenIdentifier(): string {
        return this.refreshTokenIdentifier;
    }


    getUserIdentifier(): UserIdentifierEntityI {
        return this.userIdentifier;
    }


    getClient(): ClientEntityI{
        return this.client;
    }

    getExpirationDateTime(): Date{
        return this.expirationDateTime;
    }

    /**
     * Converts the AccessToken to jwt token
     * 
     * @param {CryptKeyI} privateKey
     * @returns {string}
     */
    convertToJwtToken(privateKey: CryptKeyI): string {

        const expiresIn = Moment(this.expirationDateTime.toISOString()).diff(Moment(), 'seconds');

        return jwt.sign({
            oauth_access_token_id: this.getIdentifier(),
            oauth_client_id: this.getClient().id,
            oauth_user_id: this.getUserIdentifier().id
        }, privateKey.getKey(), { algorithm: 'RS256', expiresIn: expiresIn })
    }


    toString(){
        return JSON.stringify({
            client_id: this.client.id,
            user_id: this.getUserIdentifier().id,
            id: this.getIdentifier(),
            refresh_token: this.getRefreshTokenIdentifier(),
            expiry: this.getExpirationDateTime().toISOString()
        });
    }


}