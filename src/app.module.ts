import { Module } from '@nestjs/common';
import BulkEmailJobModule from './modules/bulk-email-job/bulk-email-job.module';


@Module({
  imports: [BulkEmailJobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
