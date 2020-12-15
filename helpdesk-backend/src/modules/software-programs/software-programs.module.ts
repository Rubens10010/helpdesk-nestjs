import { Module } from '@nestjs/common';
import { SoftwareProgramsService } from './software-programs.service';
import { SoftwareProgramsController } from './software-programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoftwareProgram } from 'src/entity';

@Module({
  controllers: [SoftwareProgramsController],
  providers: [SoftwareProgramsService],
  exports: [SoftwareProgramsService],
  imports: [TypeOrmModule.forFeature([SoftwareProgram])],
})
export class SoftwareProgramsModule {}
