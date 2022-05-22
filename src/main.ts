import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });

  const port = configService.get<number>('port');
  await app.listen(port);
  console.log(`started listening on port - ${port}`);
}
bootstrap();
