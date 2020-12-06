import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Api is running in port ' + AppModule.port);
  app.enableCors();
  await app.listen(AppModule.port);
}
bootstrap();
