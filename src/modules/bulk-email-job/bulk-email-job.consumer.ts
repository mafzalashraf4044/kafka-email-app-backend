import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConsumerService } from '@kafka/consumer.service';
import { CONSUMER_GROUPS, TOPICS } from '@common/constants';

@Injectable()
export default class BulkEmailJobConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: TOPICS.BULK_EMAIL_JOB },
      config: { groupId: CONSUMER_GROUPS.BULK_EMAIL_JOB },
      onMessage: async message => {
        console.log({
          value: message.value.toString(),
        });
        // throw new Error('Bulk Email Job Error!');
      },
    });
  }
}
