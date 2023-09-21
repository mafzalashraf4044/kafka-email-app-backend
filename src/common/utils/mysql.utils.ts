import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MySQLConnectionConfig } from '@common/interfaces';
import { MISSING_MY_SQL_ENV_VARIABLES } from '@common/errors';

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

export const getTypeOrmOptions = (
  config: MySQLConnectionConfig,
): TypeOrmModuleOptions => {
  const options = {
    ...config,
    type: 'mysql' as any,
    entities: [join(__dirname + '/**/*.entity{.js,.ts}')],
    autoLoadEntities: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepConnectionAlive: true,
    synchronize: true,
    logging: true,
  };

  return options;
};
