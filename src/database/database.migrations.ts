/**
 * This file needs to be updated to support async data source.
 * This is needed to load database password and other sensitive information from AWS Secret Manager
 * Ticket => https://swiq.atlassian.net/browse/SD-23
 */

import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import BulkEmailJob from '@modules/bulk-email-job/bulk-email-job.entity';

const getParsedConfig = () => {
  const path = `${process.cwd()}/`;
  const config = dotenv.config({ path: resolve(path, '.development.env') });

  if (config.error) {
    throw config.error;
  }

  return config.parsed;
};

function loadDataSourceConfig(): DataSourceOptions {
  const config = getParsedConfig();

  return {
    type: 'mysql',
    host: config.DATABASE_HOST,
    port: parseInt(config.DATABASE_PORT, 10),
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    entities: [BulkEmailJob],
    migrations: ['./src/migrations/*.ts'],
  };
}

export default new DataSource(loadDataSourceConfig());
