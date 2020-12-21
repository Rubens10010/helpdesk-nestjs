import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from 'src/entity';

@Module({
  controllers: [SolutionsController],
  providers: [SolutionsService],
  exports: [SolutionsService],
  imports: [TypeOrmModule.forFeature([Solution])]
})
export class SolutionsModule {}
