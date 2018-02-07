"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
var Promise = require("bluebird");
var dist_1 = require("../dist");
var tokens = {
    persistNewToken: function (token) {
        return new Promise(function (res, rej) {
            console.log('saving access token:' + token.getIdentifier());
            console.log('saving refresh token:' + token.getRefreshTokenIdentifier());
            res();
            //rej(new Error('token not saved!'))
        });
    },
    revokeRefreshToken: function (refreshTokenId) {
        console.log('revoking refresh token: ' + refreshTokenId);
    },
    revokeAccessToken: function (accessTokenId) {
        console.log('revoking access token ' + accessTokenId);
    },
    validateAccessToken: function (accessTokenId) {
        return new Promise(function (res, rej) {
            console.log('access token ' + accessTokenId + ' is valid');
            res(true);
            //rej(new Error('Invalid access token'));
        });
    },
    validateRefreshToken: function (refreshTokenId) {
        return new Promise(function (res, rej) {
            console.log('getting user for refresh token id ' + refreshTokenId);
            res();
            //rej(new Error('Invalid refresh token'));
        });
    }
};
var users = {
    getUserEntityByCredentials: function (username, password, grantType, client) {
        return new Promise(function (res, rej) {
            console.log('validating credentials username:' + username + ' password:' + password);
            res({
                id: 1
            });
            // rej(new Error('Bad user'));
        });
    }
};
var clients = {
    create: function (name, isPassword, userId) {
        return new Promise(function (res, rej) {
            console.log('creating client ' + name);
            res(name);
        });
    },
    revoke: function (id) {
        return new Promise(function (res, rej) {
            console.log('revoking client ' + id);
            res(id);
        });
    },
    validateClient: function (client) {
        return new Promise(function (res, rej) {
            console.log('validating client ' + client.id);
            res(client);
            // rej(new Error('Invalid client'));
        });
    }
};
var refreshToken = null;
describe('Authorization Server Test', function () {
    var server = null;
    it('should set tokens', function () {
        server = new dist_1.default({});
        expect(server.setTokenExpiry(60)).is.instanceof(dist_1.default);
        expect(server.setTokenRepository(tokens)).is.instanceof(dist_1.default);
        expect(server.setUserRepository(users)).is.instanceof(dist_1.default);
        expect(server.setClientRepository(clients)).is.instanceof(dist_1.default);
    });
    it('should set private keys', function () {
        // Can generate JWT RSA256 keys here:
        // https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
        expect(server.setPrivateKey('test/keys/private.key')).is.instanceof(dist_1.default);
    });
    it('should set encryption key', function () {
        var key = 'some random key';
        // Alternatively, we could set the OAUTH2_ENCRYPTION_KEY env variable
        // process.env.OAUTH2_ENCRYPTION_KEY = key;
        expect(server.setEncryptionKey(key)).is.instanceof(dist_1.default);
    });
    it('should create password access token', function () {
        var client = { id: 1, secret: 'clientrandomsecret' };
        var grantType = 'password';
        var user = { username: 'test', password: 'testpassword' };
        var accessToken = server.getAccessToken({
            client: client,
            grant_type: grantType,
            user: user
        });
        accessToken
            .then(function (token) {
            // console.log(token);
            // We set refresh token for the next text claim
            refreshToken = token.refresh_token;
            expect(token.access_token).to.be.a('string');
            expect(token.refresh_token).to.be.a('string');
            expect(new Date(token.expires_at)).to.be.above(new Date);
        })
            .catch(function (error) {
            throw error;
        });
    });
    it('should create refresh token access token', function () {
        var client = { id: 1, secret: 'clientrandomsecret' };
        var grantType = 'refresh_token';
        var accessToken = server.getAccessToken({
            client: client,
            grant_type: grantType,
            refresh_token: refreshToken
        });
        accessToken
            .then(function (token) {
            // console.log(token);
            expect(token.access_token).to.be.a('string');
            expect(token.refresh_token).to.be.a('string');
            expect(new Date(token.expires_at)).to.be.above(new Date);
        })
            .catch(function (error) {
            throw error;
        });
    });
});
