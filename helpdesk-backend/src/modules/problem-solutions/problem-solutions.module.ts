import { Module } from '@nestjs/common';
import { ProblemSolutionsService } from './problem-solutions.service';
import { ProblemSolutionsController } from './problem-solutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemSolutions } from 'src/entity';

@Module({
  controllers: [ProblemSolutionsController],
  providers: [ProblemSolutionsService],
  exports: [ProblemSolutionsService],
  imports: [TypeOrmModule.forFeature([ProblemSolutions])]
})
export class ProblemSolutionsModule {}
