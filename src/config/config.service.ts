import {
  parseMySQLConnectionConfigFromEnv,
  parseKafkaConnectionConfigFromEnv,
} from '@common/utils';
import { Config } from '@common/interfaces';

export default async (): Promise<Config> => {
  return {
    port: parseInt(process.env.PORT, 10),
    db: parseMySQLConnectionConfigFromEnv(),
    kafka: parseKafkaConnectionConfigFromEnv(),
  };
};
