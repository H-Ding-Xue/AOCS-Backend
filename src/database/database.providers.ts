import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = await new DataSource(
        configService.get('database'),
      ).initialize();
      return dataSource;
    },
  },
];
