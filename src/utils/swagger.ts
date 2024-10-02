import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (
  app: INestApplication,
  configService: ConfigService,
) => {
  // https://docs.nestjs.com/openapi/introduction
  const enableSwagger = configService.get<boolean>('swagger.enable');
  if (enableSwagger) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(configService.get<string>('swagger.title'))
      .setDescription(configService.get<string>('swagger.description'))
      .setVersion(configService.get<string>('swagger.version'))
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }
};
