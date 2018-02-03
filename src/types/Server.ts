import { TokenRepositoryI } from './TokenRepositoryI';
import { ClientRepositoryI } from './ClientRepositoryI';
import { ServerI, ServerOptionsI } from './ServerI';

export class Server implements ServerI {

  data: string;

  /**
   * Default Constructor for the server class
   * @param  {ServerOptionsI} option [description]
   * @return {void}                [description]
   */
  constructor(option: ServerOptionsI){
    this.data = 'Pass Tests';
  }

}
