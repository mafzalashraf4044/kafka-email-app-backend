import { Controller, Get, Post, Body } from '@nestjs/common';

import BulkEmailJobService from './bulk-email-job.service';
import { SendEmailsDTO } from './dto';

@Controller('bulk-email-job')
export default class BulkEmailJobController {
  constructor(private readonly bulkEmailJobService: BulkEmailJobService) {}

  @Get()
  getHello(): string {
    return this.bulkEmailJobService.getHello();
  }

  @Post()
  postMessage(): Promise<boolean> {
    return this.bulkEmailJobService.postMessage();
  }

  @Post('send-emails')
  sendEmails(@Body() sendEmailsDTO: SendEmailsDTO): Promise<string> {
    return this.bulkEmailJobService.sendEmails(sendEmailsDTO.numberOfEmails);
  }
}
