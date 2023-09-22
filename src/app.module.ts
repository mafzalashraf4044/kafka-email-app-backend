import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ConfigModule } from '@config/config.module';
import { KafkaModule } from '@kafka/kafka.module';
import { TypeOrmService } from '@database/database.service';
import BulkEmailJobModule from '@modules/bulk-email-job/bulk-email-job.module';

@Module({
  imports: [
    ConfigModule,
    KafkaModule,
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
