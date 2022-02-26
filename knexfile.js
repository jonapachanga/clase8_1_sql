require('dotenv').config();
const env = process.env;

module.exports = {

  development: {
    client: env.DB_CONNECTION,
    connection: {
      host : env.DB_HOST,
      port : env.DB_PORT,
      user : env.DB_USERNAME,
      password : env.DB_PASSWORD,
      database : env.DB_DATABASE
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
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
      user:     'username',
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
