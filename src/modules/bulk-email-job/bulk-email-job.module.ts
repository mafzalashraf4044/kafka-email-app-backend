import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KafkaModule } from '@kafka/kafka.module';

import BulkEmailJobEntity from './bulk-email-job.entity';
import BulkEmailJobController from './bulk-email-job.controller';
import BulkEmailJobService from './bulk-email-job.service';
import BulkEmailJobRepository from './bulk-email-job.repository';
import BulkEmailJobConsumer from './bulk-email-job.consumer';

@Module({
  controllers: [BulkEmailJobController],
  providers: [
    BulkEmailJobService,
    BulkEmailJobConsumer,
    BulkEmailJobRepository,
    Logger,
  ],
  imports: [TypeOrmModule.forFeature([BulkEmailJobEntity]), KafkaModule],
  exports: [TypeOrmModule],
})
export default class BulkEmailJobModule {}
