import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attention, Reply, ReplyCondition, ReplySource } from 'src/entity';
import { CreateReplyDto } from './dto/create-solution.dto';
import { UpdateReplyDto } from './dto/update-solution.dto';
import { RepliesRepository } from './reply.repository';

@Injectable()
export class ReplyService {
    constructor(
        @InjectRepository(Reply) 
        private repliesRepository: RepliesRepository,
      ) {}

    async create(createReplyDto: CreateReplyDto) {
        const reply = new Reply();
        const attention = await Attention.findOneOrFail(createReplyDto.attention_id);
        reply.attention = attention;

        reply.message = createReplyDto.message;
        reply.source = parseInt(ReplySource[createReplyDto.source], 10);

        await this.repliesRepository.save(reply);

        return reply;
    }

    async findAll() {
        const replies: Reply[] = await this.repliesRepository.find();
    
        return replies;
    }
    
    async findOne(id: number) {
        const reply: Reply = await this.repliesRepository.findOne(id);

        return reply;
    }

    async update(id: number, updateReplyDto: UpdateReplyDto) {
        const reply = await this.findOne(id);
    
        if(updateReplyDto.attention_id){
          const attention = await Attention.findOne(updateReplyDto.attention_id);
    
          reply.attention = attention || reply.attention;
        }
    
        reply.message = updateReplyDto.message;

        if(updateReplyDto.source){
            reply.source = parseInt(ReplySource[updateReplyDto.source], 10);
        }

        if(updateReplyDto.condition){
            reply.condition = parseInt(ReplyCondition[updateReplyDto.condition], 10);
        }
    
        await this.repliesRepository.save(reply);
    
        return reply;
    }

    async remove(id: number) {
        return await this.repliesRepository.delete(id);
    }
}
