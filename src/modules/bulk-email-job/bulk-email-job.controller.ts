import { Controller, Get } from '@nestjs/common';
import { BulkEmailJobService } from './bulk-email-job.service';

@Controller()
export default class BulkEmailJobController {
  constructor(private readonly bulkEmailJobService: BulkEmailJobService) {}

  @Get()
  getHello(): string {
    return this.bulkEmailJobService.getHello();
  }
}
