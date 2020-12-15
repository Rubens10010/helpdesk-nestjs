import { Module } from '@nestjs/common';
import { ProblemSolutionsService } from './problem-solutions.service';
import { ProblemSolutionsController } from './problem-solutions.controller';

@Module({
  controllers: [ProblemSolutionsController],
  providers: [ProblemSolutionsService]
})
export class ProblemSolutionsModule {}
