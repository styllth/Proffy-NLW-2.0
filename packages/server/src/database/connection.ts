import knex from 'knex';

import configurations from '../config/knex';

class Database {
  config: any;
  connection: knex<any, unknown[]>;

  constructor() {
    this.config =
      process.env.NODE_ENV === 'test'
        ? configurations.test
        : configurations.development;

    this.connection = knex(this.config);
  }
}

export default new Database().connection;
