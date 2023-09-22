import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MySQLConnectionConfig } from '@common/interfaces';

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
