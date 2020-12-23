import { Module } from '@nestjs/common';
import { AttentionsService } from './attentions.service';
import { AttentionsController } from './attentions.controller';
import { Attention } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AttentionsController],
  providers: [AttentionsService],
  exports: [AttentionsService],
  imports: [TypeOrmModule.forFeature([Attention])],
})
export class AttentionsModule {}
