import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection:
      'postgres://wewjjftg:NizeMusdrD7fZqlRXR2sPp0VTA6s3aFh@isabelle.db.elephantsql.com/wewjjftg',
    searchPath: ['knex', 'public'],
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

module.exports = config;
