import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Messenger } from './messenger.interface';
import { messengerProviders } from './messenger.providers';

@Module({
  imports: [ConfigModule],
  providers: [...messengerProviders],
  exports: [...messengerProviders],
})
export class MessengerModule {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @Inject('Messenger')
    private readonly client: Messenger,
  ) {}

  async onModuleDestroy() {
    this.logger.info('Terminating Messenger...');
    await this.client.terminate();
    this.logger.info('Messenger closed.');
  }
}
