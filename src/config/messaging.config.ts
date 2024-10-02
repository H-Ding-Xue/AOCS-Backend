import { registerAs } from '@nestjs/config';
import { KafkaConfig, ProducerConfig } from 'kafkajs';
import { ConnectionOptions, ConsumerConfig } from 'nats';

export default registerAs('messaging', () => ({
  vendor: 'kafka', // "kafka"
  configs: {
    nats: <ConnectionOptions>{
      servers: process.env.NATS_SERVER || 'localhost',
    },
    kafka: {
      client: <KafkaConfig>{
        clientId: process.env.HOSTNAME,
        brokers: [process.env.KAFKA_SERVER || 'localhost:29092'],
      },
      producer: <ProducerConfig>{},
    },
  },
}));
