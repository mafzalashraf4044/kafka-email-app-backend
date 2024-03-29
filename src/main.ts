import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpExceptionFilter } from '@common/filters';

import { AppModule } from './app.module';

process.env.TZ = 'Etc/UTC';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port', 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // this should be true, but for some
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}
bootstrap();
