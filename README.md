
# OAuth2Server
```md
___________           .__      ________                 .__.__          
\__    ___/___   ____ |  |__   \_____  \   _____   ____ |__|  |   ____  
  |    |_/ __ \_/ ___\|  |  \   /   |   \ /     \ /    \|  |  | _/ __ \
  |    |\  ___/\  \___|   Y  \ /    |    \  Y Y  \   |  \  |  |_\  ___/
  |____| \___  >\___  >___|  / \_______  /__|_|  /___|  /__|____/\___  >
             \/     \/     \/          \/      \/     \/             \/  
             Techflow like the Nile River®.
```

## About this package?

OAuth2 Server for NodeJs. 
Only Password and Refresh Token grant types are available now. More grant types will come soon.

## Installing this package

To install  library, simply run
```
$ npm install omnile-oauth2server
```

## Basic Usage

### Generating Access Tokens (TypeScript Example)
Generating an access token using this package is in two simple steps.
First, you create an authorization server and then you provide an auth payload to the
server to get the access token.

#### Server Setup
This package makes no assumption about how your data is stored or what database you use. It achieves this 
by providing a set of interfaces to be implemented using the repository design pattern.
 
##### Repositories
There are 3 repositories to be implemented for the OAuth process. These are:
1. [ClientRepositoryI](https://github.com/Omnile/oauth2server/blob/master/src/types/repositories/ClientRepositoryI.ts)
2. [TokenRepositoryI](https://github.com/Omnile/oauth2server/blob/master/src/types/repositories/TokenRepositoryI.ts) 
3. [UserRepositoryI](https://github.com/Omnile/oauth2server/blob/master/src/types/repositories/UserRepositoryI.ts)
 
```typescript
const clients: ClientRepositoryI = new ClientRepository();
const tokens: TokenRepositoryI = new TokenRepository();
const users: UserRepositoryI = new UserRepository();
```
 
##### Server Options
Once the repositories are setup, the next thing is to make a set of options for the Authorization Server.
This should be an implementation of [ServerOptionsI](https://github.com/Omnile/oauth2server/blob/master/src/types/ServerOptionsI.ts)
  
```typescript
const options: ServerOptionsI = {
    clientRepository: clients,
    userRepository: users,
    tokenRepository: tokens,
    privateKey: 'path/to/private-key.key',
    tokenExpiryMins: 30,
    encryptionKey: 'some-strong-encryption-key'
};
```
  
Now we're ready to create the authorization server. We'll put all the steps together to make it clearer.

```typescript
import AuthorizationServer from 'omnile-oauth2server';

// Server Setup
const clients: ClientRepositoryI = new ClientRepository();
const tokens: TokenRepositoryI = new TokenRepository();
const users: UserRepositoryI = new UserRepository();

// Server options
const options: ServerOptionsI = {
    clientRepository: clients,
    userRepository: users,
    tokenRepository: tokens,
    privateKey: 'path/to/private-key.key',
    tokenExpiryMins: 30,
    encryptionKey: 'some-strong-encryption-key'
};
 
// Create the authorization server
const authServer = new AuthorizationServer(options);
 

```

#### Generating an Access Token
Once we have the auth server, we can now start issuing access tokens.
 
The payload for requesting access tokens from the server should implement the
[AuthPayloadI](https://github.com/Omnile/oauth2server/blob/master/src/types/AuthPayloadI.ts) interface.

This is a json object that specifies the grant type, client ([ClientEntityI](https://github.com/Omnile/oauth2server/blob/master/src/types/entities/ClientEntityI.ts))
and a user ([UserEntityI](https://github.com/Omnile/oauth2server/blob/master/src/types/entities/UserEntityI.ts)).

The payload would most likely be received through the request (req.body) object if you're using a framework
like [express](https://expressjs.com). 

```typescript
// A given request payload
const payload: AuthPayloadI = {
    client: ClientEntityI,
    grant_type: 'password', // For password grant type
    user: UserEntityI
};

 
try{
    const accessToken = await authServer.getAccessToken(payload);
}catch(e){
    console.error(e);
}
```

The access token returned is an instance of [TokenResponseEntityI](https://github.com/Omnile/oauth2server/blob/master/src/types/responses/TokenResponseEntityI.ts).

### Resource Server
Once you have successfully generated access tokens to your application clients, the next phase is
to authenticate requests that present tokens. This is usually requests to protected resources.
 
#### Authenticate access token
A resource server is used to validate access tokens.
The code snippet below illustrates how a request with an access token is validated.
This could be a middleware (if you're using a framework such as express).
```typescript

import { ResourceServer, AuthenticatedRequestI } from 'omnile-oauth2';
 
const resourceServer = new ResourceServer();
resourceServer.setPublicKey('path/to/public-key.key');
 
const request: AuthenticatedRequestI = {
    access_token: 'access-token-generated'   
};
 
try{
    const decoded = await resourceServer.validateAuthenticatedRequest(request);
}catch (e){
    console.error(e);
}
```
The decoded data is an implementation of [JwtTokenI](https://github.com/Omnile/oauth2server/blob/master/src/types/JwtTokenI.ts).
 
## Tests

Simply run the test as follows

```
$ npm test
```

## Contributing
To contribute, please send us an email at technical@omnile.com.
<!--Thank you for considering contributing to oauth2server. The contribution guide can be found in the [Contribution File](https://github.com/omnile/oauth2server/blob/master/CONTRIBUTING.md)
-->
## Security

If you discover any security related issues, please email
instead of using the issue tracker.  
Send emails to <technical@omnile.com>

## Credits
- [Laravel Passport](https://github.com/laravel/passport)
- [All contributors](https://github.com/omnile/oauth2server/graphs/contributors)

## Licence
* [Licence: MIT](https://opensource.org/licenses/MIT)


<!--## Reference
- [Official Page](https://www.omnile.com/oauth2server)
- [Official Repo: Github](https://www.github.com/omnile/oauth2server)
- [LICENCE: MIT](https://github.com/omnile/oauth2server/blob/licence)
- [CHANGELOG](https://github.com/omnile/oauth2servers/blob/master/CHANGELOG.md)
-->

## How can I thank you?

Star the github repo, Share the link for this repository on Twitter or HackerNews and Spread the word!

Thanks!
The Omnile Team
