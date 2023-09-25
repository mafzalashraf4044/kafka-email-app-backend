import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

import {
  UNABLE_TO_GET_BULK_EMAIL_JOBS,
  UNABLE_TO_CREATE_BULK_EMAIL_JOBS,
  UNABLE_TO_UPDATE_BULK_EMAIL_JOBS,
  UNABLE_TO_GET_SENT_EMAILS_COUNT,
} from '@common/errors';
import { JobStatus } from '@common/enums';
import {
  BulkEmailJob,
  GetBulkEmailJobsResponse,
  CreateBulkEmailJobResponse,
  GetSentEmailsCountResponse,
} from '@common/interfaces';
import { ProducerService } from '@kafka/producer.service';
import { TOPICS } from '@common/constants';

import BulkEmailJobEntity from './bulk-email-job.entity';
import BulkEmailJobRepository from './bulk-email-job.repository';

@Injectable()
export default class BulkEmailJobService {
  private readonly logger: Logger;

  constructor(
    private readonly producerService: ProducerService,
    private readonly bulkEmailJobRepository: BulkEmailJobRepository,
  ) {
    this.logger = new Logger('bulk-email-job.service');
  }

  getPlainToBulkEmailJobForCreate(
    bulkEmailJob: BulkEmailJob,
  ): BulkEmailJobEntity {
    return plainToClass(BulkEmailJobEntity, {
      ...bulkEmailJob,
    });
  }

  /**
   * Retrieve a list of bulk email jobs with pagination.
   *
   * @param {number} skip The number of records to skip.
   * @param {number} take The maximum number of records to retrieve.
   * @returns {Promise<GetBulkEmailJobsResponse>} A promise that resolves to an object containing the count of total records and the retrieved bulk email job data.
   * @memberof BulkEmailJobService
   */
  async getAll(skip: number, take: number): Promise<GetBulkEmailJobsResponse> {
    try {
      const options = { query: {}, skip, take };

      const [count, data] = await Promise.all([
        this.bulkEmailJobRepository.count(),
        this.bulkEmailJobRepository.getEntities(options),
      ]);

      return {
        count,
        data,
      };
    } catch (error) {
      this.logger.error('getAll', error);
      throw new InternalServerErrorException(UNABLE_TO_GET_BULK_EMAIL_JOBS);
    }
  }

  /**
   * Create a new bulk email job entity
   *
   * @param {number} numberOfEmails The number of emails to be sent.
   * @returns {Promise<CreateBulkEmailJobResponse>} A promise that resolves to the response of the bulk email job creation.
   * @memberof BulkEmailJobService
   */
  async create(numberOfEmails: number): Promise<CreateBulkEmailJobResponse> {
    try {
      const jobId = uuidv4();

      const bulkEmailJobForCreate = this.getPlainToBulkEmailJobForCreate({
        jobId,
        status: JobStatus.Pending,
        numberOfEmails,
      });

      const bulkEmailJob = await this.bulkEmailJobRepository.createEntity(
        bulkEmailJobForCreate,
      );

      await this.producerService.produce(TOPICS.BULK_EMAIL_JOB, {
        value: bulkEmailJob.id.toString(),
      });

      return {
        jobId: bulkEmailJob.jobId,
      };
    } catch (error) {
      this.logger.error('create', error);
      throw new InternalServerErrorException(UNABLE_TO_CREATE_BULK_EMAIL_JOBS);
    }
  }

  /**
   * Update the status of a bulk email job.
   *
   * @param {number} id The unique identifier of the bulk email job.
   * @param {JobStatus} status The new status to set for the bulk email job.
   * @returns {Promise<BulkEmailJob>} A promise that resolves to the updated bulk email job with the new status.
   * @memberof BulkEmailJobService
   */
  async updateStatus(id: number, status: JobStatus): Promise<BulkEmailJob> {
    try {
      const bulkEmailJob = await this.bulkEmailJobRepository.getEntityById(id);

      if (!bulkEmailJob) {
        // Throw a NotFoundException when the entity is not found.
        throw new NotFoundException(`Bulk email job with ID ${id} not found`);
      }

      await this.bulkEmailJobRepository.updateEntity(bulkEmailJob, {
        status,
      });

      bulkEmailJob.status = status;

      return bulkEmailJob;
    } catch (error) {
      this.logger.error('updateStatus', error);
      throw new InternalServerErrorException(UNABLE_TO_UPDATE_BULK_EMAIL_JOBS);
    }
  }

  /**
   * Retrieve the total count of sent emails.
   *
   * @returns {Promise<number>} A promise that resolves to the total count of sent emails.
   * @memberof BulkEmailJobService
   */
  async getSentEmailsCount(): Promise<GetSentEmailsCountResponse> {
    try {
      const count = await this.bulkEmailJobRepository
        .createQueryBuilder('bulk_email_job')
        .select('SUM(numberOfEmails)', 'total')
        .where('status = :status', { status: JobStatus.Completed })
        .getRawOne();

      return {
        count: count.total || 0,
      };
    } catch (error) {
      this.logger.error('getSentEmailsCount', error);
      throw new InternalServerErrorException(UNABLE_TO_GET_SENT_EMAILS_COUNT);
    }
  }
}
