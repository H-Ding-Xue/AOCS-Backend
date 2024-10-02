import { ConfigService } from '@nestjs/config';
import { NatsMessenger } from './vendors/nats';
import { Messenger } from './messenger.interface';
import { KafkaMessenger } from './vendors/kafka';

export const messengerProviders = [
  {
    provide: 'Messenger',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      let messenger: Messenger = undefined;
      switch (configService.get('messaging.vendor')) {
        case 'kafka':
          messenger = new KafkaMessenger(
            configService.get('messaging.configs.kafka'),
          );
          break;
        default: // "nats"
          messenger = new NatsMessenger(
            configService.get('messaging.configs.nats'),
          );
          break;
      }

      if (messenger != undefined) {
        return messenger;
      }
    },
  },
];
