import { Server } from '../src/types';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

let serverInstance = new Server({});

describe('The Server Constructor method', () => {
  it('should set a valid value to the Server.data attribute' , () => {
    expect(serverInstance.data).equals('Pass Tests');
  });
});
