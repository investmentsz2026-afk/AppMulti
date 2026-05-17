import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  
  if (process.env.PORT) {
    await app.listen(process.env.PORT);
  } else {
    await app.init();
  }
}
bootstrap();

export default server;
