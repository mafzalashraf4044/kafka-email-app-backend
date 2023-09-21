import {
  MySQLConnectionConfig,
  KafkaClientConfig,
} from '@common/interfaces';

/**
 * Configuration data for the app.
 */
export interface Config {
  env: string;

  port: number;

  /** Database connection details. */
  db: MySQLConnectionConfig;

  kafka: KafkaClientConfig;
}
