import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import BulkEmailJobEntity from './bulk-email-job.entity';
import BulkEmailJobController from './bulk-email-job.controller';
import BulkEmailJobService from './bulk-email-job.service';

@Module({
  controllers: [BulkEmailJobController],
  providers: [BulkEmailJobService, Logger],
  imports: [TypeOrmModule.forFeature([BulkEmailJobEntity])],
  exports: [TypeOrmModule],
})
export default class BulkEmailJobModule {}
