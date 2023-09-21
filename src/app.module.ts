import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ConfigModule } from '@config/config.module';
import { TypeOrmService } from '@database/database.service';
import BulkEmailJobModule from '@modules/bulk-email-job/bulk-email-job.module';

@Module({
  imports: [
    ConfigModule,
    BulkEmailJobModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
      dataSourceFactory: async options => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
