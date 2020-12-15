import { Module } from '@nestjs/common';
import { SoftwareProgramsService } from './software-programs.service';
import { SoftwareProgramsController } from './software-programs.controller';

@Module({
  controllers: [SoftwareProgramsController],
  providers: [SoftwareProgramsService]
})
export class SoftwareProgramsModule {}
