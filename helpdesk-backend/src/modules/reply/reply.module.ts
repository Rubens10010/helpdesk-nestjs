import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'src/entity';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService],
  exports: [ReplyService],
  imports: [TypeOrmModule.forFeature([Reply])]
})
export class ReplyModule {}
