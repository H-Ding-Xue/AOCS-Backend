import otelSDK from './utils/telemetry';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  otelSDK.start();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // https://docs.nestjs.com/techniques/performance
    new FastifyAdapter({ logger: true }),
  );

  // https://docs.nestjs.com/security/cors
  app.enableCors({ origin: '*' });
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  setupSwagger(app, configService);

  await app.listen(
    configService.get<number>('port'),
    configService.get<string>('host'),
  );
}
bootstrap();
