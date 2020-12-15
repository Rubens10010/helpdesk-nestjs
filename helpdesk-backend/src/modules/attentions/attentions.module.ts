import { Module } from '@nestjs/common';
import { AttentionsService } from './attentions.service';
import { AttentionsController } from './attentions.controller';

@Module({
  controllers: [AttentionsController],
  providers: [AttentionsService]
})
export class AttentionsModule {}
