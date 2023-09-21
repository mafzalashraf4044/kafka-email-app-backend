import { parseMySQLConnectionConfigFromEnv } from '@common/utils';
import { Config } from './config.interface';

export default async (): Promise<Config> => {
  // some async stuff to load secrets from AWS Secret Manager

  return {
    port: parseInt(process.env.PORT, 10),
    db: parseMySQLConnectionConfigFromEnv(),
  };
};
