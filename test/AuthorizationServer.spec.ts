
import UserEntityI from "../src/types/entities/UserEntityI";

const expect = require('chai').expect;

import AccessTokenI from "../dist/AccessTokenI";
import * as Promise from 'bluebird';
import ClientEntityI from "../src/types/entities/ClientEntityI";

import { AuthorizationServerI, default as OAuthServer } from '../dist';

const tokens = {

    persistNewToken(token: AccessTokenI) : Promise<any>{
        return new Promise((res, rej)=>{
            console.log('saving access token:' + token.getIdentifier());
            console.log('saving refresh token:' + token.getRefreshTokenIdentifier());
            res()
            //rej(new Error('token not saved!'))
        });
    },

    revokeRefreshToken(refreshTokenId: string) : void{
        console.log('revoking refresh token: ' + refreshTokenId);
    },

    revokeAccessToken(accessTokenId: string) : void {
        console.log('revoking access token ' + accessTokenId);
    },

    validateAccessToken(accessTokenId: string): Promise<any>{
        return new Promise((res, rej)=>{
            console.log('access token ' + accessTokenId + ' is valid');
             res(true)
            //rej(new Error('Invalid access token'));
        });
    },

    validateRefreshToken(refreshTokenId: string): Promise<any>{
        return new Promise((res, rej)=>{
            console.log('getting user for refresh token id ' + refreshTokenId);
            res();
            //rej(new Error('Invalid refresh token'));
        });
    }
};
const users = {

    getUserEntityByCredentials(
        username: string,
        password: string,
        grantType?: string,
        client?: ClientEntityI
    ): Promise<UserEntityI> {
        return new Promise((res, rej)=>{
            console.log('validating credentials username:' + username + ' password:' + password);
            res({
                id: 1
            });
            // rej(new Error('Bad user'));
        });
    }

};
const clients = {
    create(name: string, isPassword: boolean, userId: string): Promise<any> {
        return new Promise((res, rej) => {
            console.log('creating client ' + name);
            res(name)
        });
    },
    revoke(id: string): Promise<any>{
        return new Promise((res, rej) => {
            console.log('revoking client ' + id);
            res(id)
        });
    },
    validateClient(client: ClientEntityI) : Promise<any>{
        return new Promise((res, rej) => {
            console.log('validating client ' + client.id);
            res(client)
            // rej(new Error('Invalid client'));
        });
    }
};

let refreshToken: string = null;

describe('Authorization Server Test', () => {

    let server: AuthorizationServerI = null;

    it('should set tokens', () => {
        server = new OAuthServer({});
        expect(server.setTokenExpiry(60)).is.instanceof(OAuthServer);
        expect(server.setTokenRepository(tokens)).is.instanceof(OAuthServer);
        expect(server.setUserRepository(users)).is.instanceof(OAuthServer);
        expect(server.setClientRepository(clients)).is.instanceof(OAuthServer);
    });


    it('should set private keys', () => {

        // Can generate JWT RSA256 keys here:
        // https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9

        expect(server.setPrivateKey('test/keys/private.key')).is.instanceof(OAuthServer)
    });


    it('should set encryption key', () => {

        const key = 'some random key';

        // Alternatively, we could set the OAUTH2_ENCRYPTION_KEY env variable
        // process.env.OAUTH2_ENCRYPTION_KEY = key;

        expect(server.setEncryptionKey(key)).is.instanceof(OAuthServer);

    });


    it('should create password access token', () => {

        const client = {id: 1, secret: 'clientrandomsecret'};
        const grantType = 'password';
        const user = {username: 'test', password: 'testpassword'};

        const accessToken = server.getAccessToken({
            client: client,
            grant_type: grantType,
            user: user
        });

        accessToken
            .then(token => {

                 // console.log(token);

                // We set refresh token for the next text claim
                refreshToken = token.refresh_token;

                expect(token.access_token).to.be.a('string');
                expect(token.refresh_token).to.be.a('string');
                expect(new Date(token.expires_at)).to.be.above(new Date);
            })
            .catch(error => {
                throw error;
            });

    });


    it('should create refresh token access token', () => {

        const client = {id: 1, secret: 'clientrandomsecret'};
        const grantType = 'refresh_token';

        const accessToken = server.getAccessToken({
            client: client,
            grant_type: grantType,
            refresh_token: refreshToken
        });

        accessToken
            .then(token => {

                // console.log(token);

                expect(token.access_token).to.be.a('string');
                expect(token.refresh_token).to.be.a('string');
                expect(new Date(token.expires_at)).to.be.above(new Date);
            })
            .catch(error => {
                throw error;
            });

    });


});
