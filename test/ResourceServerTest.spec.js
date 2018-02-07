"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
var dist_1 = require("../dist");
// const tokens = {
//
//     persistNewToken(token: AccessTokenI) : Promise<any>{
//         return new Promise((res, rej)=>{
//             console.log('saving access token:' + token.getIdentifier());
//             console.log('saving refresh token:' + token.getRefreshTokenIdentifier());
//             res()
//             //rej(new Error('token not saved!'))
//         });
//     },
//
//     revokeRefreshToken(refreshTokenId: string) : void{
//         console.log('revoking refresh token: ' + refreshTokenId);
//     },
//
//     revokeAccessToken(accessTokenId: string) : void {
//         console.log('revoking access token ' + accessTokenId);
//     },
//
//     validateAccessToken(accessTokenId: string): Promise<any>{
//         return new Promise((res, rej)=>{
//             console.log('access token ' + accessTokenId + ' is valid');
//             res(true)
//             //rej(new Error('Invalid access token'));
//         });
//     },
//
//     validateRefreshToken(refreshTokenId: string): Promise<any>{
//         return new Promise((res, rej)=>{
//             console.log('getting user for refresh token id ' + refreshTokenId);
//             res();
//             //rej(new Error('Invalid refresh token'));
//         });
//     }
// };
// const users = {
//
//     getUserEntityByCredentials(
//         username: string,
//         password: string,
//         grantType?: string,
//         client?: ClientEntityI
//     ): Promise<UserEntityI> {
//         return new Promise((res, rej)=>{
//             console.log('validating credentials username:' + username + ' password:' + password);
//             res({
//                 id: 1
//             });
//             // rej(new Error('Bad user'));
//         });
//     }
//
// };
// const clients = {
//     create(name: string, isPassword: boolean, userId: string): Promise<any> {
//         return new Promise((res, rej) => {
//             console.log('creating client ' + name);
//             res(name)
//         });
//     },
//     revoke(id: string): Promise<any>{
//         return new Promise((res, rej) => {
//             console.log('revoking client ' + id);
//             res(id)
//         });
//     },
//     validateClient(client: ClientEntityI) : Promise<any>{
//         return new Promise((res, rej) => {
//             console.log('validating client ' + client.id);
//             res(client)
//             // rej(new Error('Invalid client'));
//         });
//     }
// };
var refreshToken = null;
describe('Resource Server Test', function () {
    var server = null;
    var fakeAccessToken = 'some fake token';
    var accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYXV0aF9hY2Nlc3NfdG9rZW5faWQiOiJjcDhpbHJvZ2tudmppenI0azZzNnlzN2p2bGkzNHQ0YmJzbTllcmJoIiwib2F1dGhfY2xpZW50X2lkIjoxLCJvYXV0aF91c2VyX2lkIjoxLCJpYXQiOjE1MTgwMjcyMzcsImV4cCI6MTUxODAzMDgzNn0.MeonkzUPfOOpxg9kGp8j6z_BitCJYir_MbobHT_V5BsT1QdlcVbAlW1NyCzyO8xKnidvDW-n8bY-YikUS1NVyEMQq3LeiQ4UJ77Nx038qwkO6LWIuZagFQcjvN7SvWJfE0H5y82o3eEBEm-od6j-UT_htTzeMh129_w3YDuNetyOof6AuUz1WRkMKarrncYyfYfsBIr7ZtmCjUgJ-0mbNNv3_X8f4R_ynHvzHYY-MHPjWFz_n1HQrD5j9iE37ClmjkjmzGk4j4PWD6rqvVS55GYUHSCHOZdSzraKY0FiUBN5tVfdVFuVj0WP5-KkcKDrvL2RKIZD7gQiHO_kZRO6rvkOl14a7RF62qdGnalr65rA6p14Jj_n6klcuenWIr6WJ8BiWL_lhn5eXw8XyF_YO07JHC5g23SJzBc3Nr2VPVIdboqmuwouISD30-VEovtpHGPj6z3tcb1EWaU_oHuXalBMvC2kvrpQeJXy5bd2bTE_DemG4MbEhOOlgyhdtTISbNpzTjwR0fewUKuHtmr2EVfaplN2c6G8NfdjLGLx_c3yYlKhPgX1VOYCeYXnAuKvz4mJpWtaMPcKNNXySXT41J_1Z7jZ9IuphBEvrqq1DoDSyQSawnutqiILXHo82LBod8oQk4nfPJMVYqsMOBNNEi9vQPnPofqNQ1atEonjij8';
    it('should set public key of server', function () {
        server = new dist_1.ResourceServer();
        server.setPublicKey('test/keys/public.key');
        console.log('public key set');
    });
    it('should validate authenticated request', function () {
        server
            .validateAuthenticatedRequest({
            // access_token: fakeAccessToken
            access_token: accessToken
        })
            .then(function (decoded) {
            // console.log(decoded);
        })
            .catch(function (error) { throw error; });
    });
});
