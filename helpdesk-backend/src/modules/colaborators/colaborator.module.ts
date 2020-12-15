import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborator } from 'src/entity/colaborator.entity';
import { ColaboratorController } from './colaborator.controller';
import { ColaboratorService } from './colaborator.service';

@Module({
    controllers: [ColaboratorController],
    providers: [ColaboratorService],
    exports: [ColaboratorService],
    imports: [TypeOrmModule.forFeature([Colaborator])],
  })
export class ColaboratorModule {}
