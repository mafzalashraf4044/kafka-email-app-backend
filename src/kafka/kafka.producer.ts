import { Logger } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

import { wait } from '@common/utils';
import { IProducer } from '@common/interfaces';

export class KafkaProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string, broker: string) {
    this.kafka = new Kafka({
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(`kafka.producer => ${topic}`);
  }

  async produce(message: Message) {
    await this.producer.send({ topic: this.topic, messages: [message] });
    this.logger.debug(
      `Messsage sent to topic ${this.topic}`,
      JSON.stringify(message),
    );
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Connection failed to Kafka.', err);
      await wait(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
