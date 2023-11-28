import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

module.exports = config;
