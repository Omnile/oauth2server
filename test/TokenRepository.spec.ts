import {TokenRepository} from '../src/types';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

let tokenRepository = new TokenRepository;

let payload = {
  owner_id: 1,
  username: 'ovac4u',
  owner_type: 'user'
};

describe('The TokenRepository create method', () => {
  it('should return a promise' , () => {

      var accessToken,
          refreshToken= 'string',
          clientId,
          ownerType,
          ownerId,
          expiry

      expect(
        tokenRepository.create(
          accessToken = 'string',
          refreshToken = 'string',
          clientId = 1,
          ownerType = 'string',
          ownerId = 1,
          expiry = new Date
        )
      ).contains('Pass Tests');
  });
});

describe('The TokenRepository revoke method', () => {
  it('should return correct and valid string' , () => {

    expect(tokenRepository.revoke('Random String')).equals('Pass Test');

  });
});

describe('The TokenRepository find method', () => {
  it('should return correct and valid string' , () => {

    expect(tokenRepository.find('ExistingPointer')).equals('Pass Test');

  });
});

describe('The TokenRepository findByRefreshToken method', () => {
  it('should return correct and valid string' , () => {

    expect(tokenRepository.findByRefreshToken('RefreshToken')).equals('Pass Test');

  });
});
