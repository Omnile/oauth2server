import { TokenRepositoryI } from './TokenRepositoryI';
import { ClientRepositoryI } from './ClientRepositoryI';

/**
 * This is the server interface
 * @type {ServerI}
 */
export interface ServerI {
  // constructor(option? : any): void;
}

/**
 * This is the Server Constructor interface
 * @type {ServerOptionsI}
 */
export interface ServerOptionsI {
  tokenRepository?: TokenRepositoryI,
  clientRepository?: ClientRepositoryI
}
