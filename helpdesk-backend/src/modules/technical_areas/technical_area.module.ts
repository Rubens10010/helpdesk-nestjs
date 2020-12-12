import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalArea } from 'src/entity/technical_area.entity';
import { TechnicalAreaController } from './technical_area.controller';
import { TechnicalAreaService } from './technical_area.service';

@Module({
    controllers: [TechnicalAreaController],
    providers: [TechnicalAreaService],
    exports: [TechnicalAreaService],
    imports: [TypeOrmModule.forFeature([TechnicalArea])],
  })
export class TechnicalAreaModule {}
