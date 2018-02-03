import {PasswordGrantor} from '../src/types';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

let passwordGrantor = new PasswordGrantor;

let payload = {
  owner_id: 1,
  username: 'ovac4u',
  owner_type: 'user'
};

describe('The PasswordGrantor getAuthorizedEntity method', () => {
  it('should return correct and valid string' , () => {
    expect(passwordGrantor.getAuthorizedEntity({})).haveOwnProperty('data');
  });
});

describe('The PasswordGrantor Authenticate method', () => {
  it('should return a promise' , () => {

      passwordGrantor.authenticate(payload)

      .then(function(response){
        expect(response).contains(payload);
      })

      .catch(function(e){
        console.log(e)
      });
  });
});
