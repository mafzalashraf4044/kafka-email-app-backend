import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import {
  GetBulkEmailJobsResponse,
  CreateBulkEmailJobResponse,
} from '@common/interfaces';

import BulkEmailJobService from './bulk-email-job.service';
import {
  CreateBulkEmailJob,
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
    @Body() createBulkEmailJob: CreateBulkEmailJob,
  ): Promise<CreateBulkEmailJobResponse> {
    return this.bulkEmailJobService.create(createBulkEmailJob.numberOfEmails);
  }
}
