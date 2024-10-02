import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import swaggerConfig from './config/swagger.config';
import otelConfig, { OpenTelemetryModuleConfig } from './config/otel.config';
import { OpenTelemetryModule } from 'nestjs-otel';
import { DatabaseModule } from './database/database.module';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './utils/logger';
import { PilotModule } from './pilot/pilot.module';
import messagingConfig from './config/messaging.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        databaseConfig,
        swaggerConfig,
        otelConfig,
        messagingConfig,
      ],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    WinstonModule.forRoot(loggerConfig),
    OpenTelemetryModule.forRoot(OpenTelemetryModuleConfig),
    DatabaseModule,
    HealthModule,
    PilotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
