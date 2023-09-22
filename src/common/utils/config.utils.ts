import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

import {
  EnvironmentVariablesInterface,
  MySQLConnectionConfig,
} from '@common/interfaces';
import {
  MISSING_MY_SQL_ENV_VARIABLES,
  MISSING_KAFKA_ENV_VARIABLES,
} from '@common/errors';

export const validateEnvVariables = <T extends EnvironmentVariablesInterface>(
  EnvironmentVariables: ClassConstructor<T>,
  config: Record<string, unknown>,
) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export const parseMySQLConnectionConfigFromEnv = (): MySQLConnectionConfig => {
  if (
    !process.env['DATABASE_HOST'] ||
    !process.env['DATABASE_PORT'] ||
    !process.env['DATABASE_USERNAME'] ||
    !process.env['DATABASE_PASSWORD'] ||
    !process.env['DATABASE_NAME']
  ) {
    throw new Error(MISSING_MY_SQL_ENV_VARIABLES);
  }

  return {
    host: process.env['DATABASE_HOST'],
    port: parseInt(process.env['DATABASE_PORT'], 10),
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
    database: process.env['DATABASE_NAME'],
  };
};

export const parseKafkaConnectionConfigFromEnv = (): string => {
  if (!process.env['KAFKA_BROKER']) {
    throw new Error(MISSING_KAFKA_ENV_VARIABLES);
  }

  return process.env['KAFKA_BROKER'];
};
