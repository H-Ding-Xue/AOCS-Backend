import { Messenger } from '../messenger.interface';
import {
  Consumer,
  ConsumerConfig,
  Kafka,
  KafkaConfig,
  Message,
  Producer,
  ProducerConfig,
} from 'kafkajs';

export class KafkaMessenger implements Messenger {
  private _client: Kafka;
  private _producer: Producer;
  private _consumer: Consumer;

  constructor(
    private config: {
      client: KafkaConfig;
      producer?: ProducerConfig;
      consumer?: ConsumerConfig;
    },
  ) {}

  async init(): Promise<void> {
    this._client = new Kafka(this.config.client);
    this._producer = this._client.producer({
      allowAutoTopicCreation: true,
      ...this.config.producer,
    });
    this._consumer = this._client.consumer({
      groupId: 'default',
      ...this.config.consumer,
    });
    await this._producer.connect();
    await this._consumer.connect();
  }

  async publish(subject: string, payload: Message[]) {
    await this._producer.send({
      topic: subject,
      messages: payload,
    });
  }

  async subscribe(topic: string, callback: (payload: any) => void) {
    if (this._client == undefined) {
      throw 'Kafka not connected';
    }
    await this._consumer.subscribe({ topic });
    await this._consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback({ topic, partition, message });
      },
    });
  }

  async terminate(): Promise<void> {
    if (this._client) {
      await this._producer.disconnect();
      await this._consumer.disconnect();
    }
  }
}
