import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import {
  GetBulkEmailJobsResponse,
  CreateBulkEmailJobResponse,
  GetSentEmailsCountResponse,
} from '@common/interfaces';

import BulkEmailJobService from './bulk-email-job.service';
import {
  CreateBulkEmailJobDTO,
  PaginationRequestDTO,
  PaginationTransformPipe,
} from './dto';

@Controller('bulk-email-job')
export default class BulkEmailJobController {
  constructor(private readonly bulkEmailJobService: BulkEmailJobService) {}

  @Get()
  getAll(
    @Query(new PaginationTransformPipe()) pagination: PaginationRequestDTO,
  ): Promise<GetBulkEmailJobsResponse> {
    return this.bulkEmailJobService.getAll(pagination.skip, pagination.take);
  }

  @Post()
  create(
    @Body() createBulkEmailJob: CreateBulkEmailJobDTO,
  ): Promise<CreateBulkEmailJobResponse> {
    return this.bulkEmailJobService.create(createBulkEmailJob.numberOfEmails);
  }

  @Get('sent-emails-count')
  getSentEmailsCount(): Promise<GetSentEmailsCountResponse> {
    return this.bulkEmailJobService.getSentEmailsCount();
  }
}
