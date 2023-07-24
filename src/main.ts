import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin,strict-origin-when-cross-origin',
  });

  // somewhere in your initialization file
  app.use(cookieParser());

  await app.listen(4200);
}
bootstrap();
