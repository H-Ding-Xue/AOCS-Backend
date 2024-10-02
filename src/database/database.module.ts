import { Inject, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  async onModuleDestroy() {
    this.logger.info('Destroying DataSource...');
    await this.dataSource.destroy();
    this.logger.info('DataSource destroyed.');
  }
}
