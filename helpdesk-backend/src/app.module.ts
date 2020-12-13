import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import {ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { TechnicalAreaModule } from './modules/technical_areas/technical_area.module';
import configuration from './config/configuration';
import * as Joi from '@hapi/joi';
import { ColaboratorModule } from './modules/colaborators/colaborator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        API_PORT: Joi.number().default(3000),
      }),
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    TechnicalAreaModule,
    ColaboratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}