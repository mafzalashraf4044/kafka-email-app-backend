import { MySQLConnectionConfig } from '@common/interfaces';

/**
 * Configuration data for the app.
 */
export interface Config {
  port: number;

  /** Database connection details. */
  db: MySQLConnectionConfig;
}
