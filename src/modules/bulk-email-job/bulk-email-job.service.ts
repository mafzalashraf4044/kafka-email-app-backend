import { Injectable } from '@nestjs/common';

import { ProducerService } from '@kafka/producer.service';

@Injectable()
export default class BulkEmailJobService {
  constructor(private readonly producerService: ProducerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async postMessage(): Promise<boolean> {
    await this.producerService.produce('test', {
      value: 'Hello World',
    });
    return true;
  }
}
