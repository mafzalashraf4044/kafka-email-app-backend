import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

import { JobStatus } from '@common/enums';
import { BulkEmailJob } from '@common/interfaces';
import { ProducerService } from '@kafka/producer.service';
import BulkEmailJobEntity from './bulk-email-job.entity';
import BulkEmailJobRepository from './bulk-email-job.repository';
import { TOPICS } from '@common/constants';

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

  getHello(): string {
    return 'Hello World!';
  }

  async postMessage(): Promise<boolean> {
    await this.producerService.produce('test', {
      value: 'Hello World',
    });
    return true;
  }

  /**
   * Create a new user in user table
   *
   * @param {SignupRequest} signupRequest payload for creating a new user
   * @returns {Promise<UserEntity>} The created user record.
   * @memberof UsersService
   */
  async sendEmails(numberOfEmails: number): Promise<string> {
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

      return bulkEmailJob.jobId;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Create a new user in user table
   *
   * @param {SignupRequest} signupRequest payload for creating a new user
   * @returns {Promise<UserEntity>} The created user record.
   * @memberof UsersService
   */
  async updateStatus(id: number, status: JobStatus): Promise<BulkEmailJob> {
    try {
      const bulkEmailJob = await this.bulkEmailJobRepository.getEntityById(id);

      const bulkEmailJobAfterUpdate =
        await this.bulkEmailJobRepository.updateEntity(bulkEmailJob, {
          status,
        });

      return bulkEmailJobAfterUpdate;
    } catch (err) {
      throw err;
    }
  }
}
