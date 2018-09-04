
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
$ npm install omnile-oauth2
```

## Basic Usage

### Authorization Server
Generating an access token:

The repositories must implement their corresponding interfaces.

```typescript
const AuthorizationServer = require('omnile-oauth2');
import { ServerOptionsI, AuthPayloadI, ClientEntityI, UserEntityI } from 'omnile-oauth2';
 
// Server options
const options: ServerOptionsI = {
    clientRepository: clients,
    userRepository: users,
    tokenRepository: tokens,
    privateKey: pathToPrivateKey,
    tokenExpiryMins: 30,
    encryptionKey: 'some-strong-encryption-key'
};
 
// Create the authorization server
const authServer = new AuthorizationServer(options);
 

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

### Resource Server
#### Authenticate access token
```typescript

import { ResourceServer, AuthenticatedRequestI } from 'omnile-oauth2';
 
const resourceServer = new ResourceServer();
 
const request: AuthenticatedRequestI = {
    access_token: 'access-token-generated'   
};
 
try{
    const decoded = await resourceServer.validateAuthenticatedRequest(request);
}catch (e){
    console.error(e);
}

```
## Tests

Simply run the test as follows

```
$ npm test
```

## Contributing

Thank you for considering contributing to oauth2server. The contribution guide can be found in the [Contribution File](https://github.com/omnile/oauth2server/blob/master/CONTRIBUTING.md)

## Security

If you discover any security related issues, please email
instead of using the issue tracker.

## Credits

- [All contributors](https://github.com/omnile/oauth2server/graphs/contributors)

## Licence
* [Licence: MIT](https://github.com/omnile/oauth2server/licence)


## Reference
- [Official Page](https://www.omnile.com/oauth2server)
- [Official Repo: Github](https://www.github.com/omnile/oauth2server)
- [LICENCE: MIT](https://github.com/omnile/oauth2server/blob/licence)
- [CHANGELOG](https://github.com/omnile/oauth2servers/blob/master/CHANGELOG.md)


## How can I thank you?

Star the github repo, Share the link for this repository on Twitter or HackerNews and Spread the word!

Thanks!
The Omnile Team
