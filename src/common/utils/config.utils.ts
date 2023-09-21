import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariablesInterface } from '@common/interfaces';

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
