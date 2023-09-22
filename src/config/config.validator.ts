import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

import { EnvironmentVariablesInterface } from '@common/interfaces';

export default class EnvironmentVariables implements EnvironmentVariablesInterface {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  KAFKA_BROKER: string;
}
