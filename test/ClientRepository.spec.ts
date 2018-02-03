import {ClientRepository} from '../src/types';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

let clientRepo = new ClientRepository;

describe('The ClientRepository Create Method', () => {

  it('should return correct string' , () => {
    expect(clientRepo.create('Expect Test Passed')).equals('Pass Tests');
  });

});

describe('The ClientRepository revoke method', () => {
  it('should return correct string' , () => {
    expect(clientRepo.revoke(1)).equals('Pass Tests');
  });
});
