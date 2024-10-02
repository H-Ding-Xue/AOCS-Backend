import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { OtelMethodCounter, Span } from 'nestjs-otel';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Get()
  @Span()
  @OtelMethodCounter()
  get() {
    this.logger.warn(
      'THIS ENDPOINT EXPOSES ENVIRONMENT VARIABLES REGISTERED IN CONFIG MODULE! REMOVE FOR PRODUCTION!',
    );
    return this.configService;
  }
}
