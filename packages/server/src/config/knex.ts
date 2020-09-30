import path from 'path';

const configurations = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../', 'database', 'database.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, '../', 'database', 'migrations')
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../', 'database', 'test.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, '../', 'database', 'migrations')
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default configurations;
