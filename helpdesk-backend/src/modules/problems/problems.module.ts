import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from 'src/entity';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
  imports: [TypeOrmModule.forFeature([Problem])]
})
export class ProblemsModule {}
