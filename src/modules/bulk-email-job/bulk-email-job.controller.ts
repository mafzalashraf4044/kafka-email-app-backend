import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { BulkEmailJob } from '@common/interfaces';

import BulkEmailJobService from './bulk-email-job.service';
import {
  SendEmailsDTO,
  PaginationRequestDTO,
  PaginationTransformPipe,
} from './dto';

@Controller('bulk-email-job')
export default class BulkEmailJobController {
  constructor(private readonly bulkEmailJobService: BulkEmailJobService) {}

  @Get()
  getAll(
    @Query(new PaginationTransformPipe()) pagination: PaginationRequestDTO,
  ): Promise<BulkEmailJob[]> {
    return this.bulkEmailJobService.getAll(pagination.skip, pagination.take);
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
