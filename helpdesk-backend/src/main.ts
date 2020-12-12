import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('Api is running in port ' + configService.get('port'));
  app.enableCors();
  app.use(cookieParser());
  await app.listen(configService.get<number>('port'));
}
bootstrap();
