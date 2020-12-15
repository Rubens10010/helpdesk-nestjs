import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from 'src/entity/movement.entity';

@Module({
  controllers: [MovementController],
  providers: [MovementService],
  exports: [MovementService],
  imports: [TypeOrmModule.forFeature([Movement])],
})
export class MovementModule {}
