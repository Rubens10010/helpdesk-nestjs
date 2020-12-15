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
import { ProblemsModule } from './modules/problems/problems.module';
import { FilePathsModule } from './modules/file-paths/file-paths.module';
import { AttentionsModule } from './modules/attentions/attentions.module';
import { MovementModule } from './modules/movement/movement.module';
import { ProblemSolutionsModule } from './modules/problem-solutions/problem-solutions.module';
import { ReplyModule } from './modules/reply/reply.module';
import { SoftwareProgramsModule } from './modules/software-programs/software-programs.module';
import { SolutionsModule } from './modules/solutions/solutions.module';
import { TicketsModule } from './modules/tickets/tickets.module';

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
    ProblemsModule,
    AttentionsModule,
    FilePathsModule,
    AttentionsModule,
    MovementModule,
    ProblemSolutionsModule,
    ReplyModule,
    SoftwareProgramsModule,
    SolutionsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}