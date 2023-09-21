/** @format */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MySQLConnectionConfig } from '@common/interfaces';
import { getTypeOrmOptions } from '@common/utils';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  private config: MySQLConnectionConfig;

  constructor(private configService: ConfigService) {
    this.config = {
      host: this.configService.get('db.host'),
      port: this.configService.get('db.port'),
      username: this.configService.get('db.username'),
      password: this.configService.get('db.password'),
      database: this.configService.get('db.database'),
    };
  }

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return getTypeOrmOptions(this.config);
  }
}
