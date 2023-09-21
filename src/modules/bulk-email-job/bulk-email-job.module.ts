import { Module } from '@nestjs/common';

import BulkEmailJobController from './bulk-email-job.controller';
import BulkEmailJobService from './bulk-email-job.service';

@Module({
  imports: [],
  controllers: [BulkEmailJobController],
  providers: [BulkEmailJobService],
})
export default class BulkEmailJobModule {}
