import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborator } from 'src/entity/colaborator.entity';
import { TechnicalArea } from 'src/entity/technical_area.entity';
import { User } from 'src/entity/user.entity';
import { TechnicalAreaModule } from '../technical_areas/technical_area.module';
import { TechnicalAreaService } from '../technical_areas/technical_area.service';
import { UsersModule } from '../users/users.module';
import { ColaboratorController } from './colaborator.controller';
import { ColaboratorService } from './colaborator.service';

@Module({
    controllers: [ColaboratorController],
    providers: [ColaboratorService],
    exports: [ColaboratorService],
    imports: [TypeOrmModule.forFeature([Colaborator])],
  })
export class ColaboratorModule {}
