import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConsumer, KafkaConsumerOptions } from '@common/interfaces';
import { KafkaConsumer } from './kafka.consumer';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(private readonly configService: ConfigService) {}

  async consume({ topic, config, onMessage, onError }: KafkaConsumerOptions) {
    const consumer = new KafkaConsumer(
      topic,
      config,
      this.configService.get('kafka'),
    );
    await consumer.connect();
    await consumer.consume(onMessage, onError);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
