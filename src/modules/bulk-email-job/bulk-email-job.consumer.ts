import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import { JobStatus } from '@common/enums';
import { ConsumerService } from '@kafka/consumer.service';
import { CONSUMER_GROUPS, TOPICS } from '@common/constants';
import BulkEmailJobService from './bulk-email-job.service';

@Injectable()
export default class BulkEmailJobConsumer implements OnModuleInit {
  private readonly logger: Logger;

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly bulkEmailJobService: BulkEmailJobService,
  ) {
    this.logger = new Logger('bulk-email-job.consumer');
  }

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: TOPICS.BULK_EMAIL_JOB },
      config: { groupId: CONSUMER_GROUPS.BULK_EMAIL_JOB },
      onMessage: async message => {
        const id = Number(message.value.toString());

        this.logger.debug('Bulk Email Job Message Consumed', id);

        // TODO: Logic for sending the email needs to be implemented

        await this.bulkEmailJobService.updateStatus(id, JobStatus.Completed);
      },
      onError: async message => {
        const id = Number(message.value.toString());

        this.logger.error('Bulk Email Job Message Consume Error', id);

        await this.bulkEmailJobService.updateStatus(id, JobStatus.NotCompleted);
      },
    });
  }
}
