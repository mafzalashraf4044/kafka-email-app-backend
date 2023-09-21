export interface EnvironmentVariablesInterface {
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
}

export interface MySQLConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface KafkaConnectionSASLConfig {
  mechanism: string;
  username: string;
  password: string;
}

export interface KafkaClientConfig {
  broker: string;
  sasl?: KafkaConnectionSASLConfig;
}
