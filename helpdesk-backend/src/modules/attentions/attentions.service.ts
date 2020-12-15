import { Injectable } from '@nestjs/common';
import { CreateAttentionDto } from './dto/create-attention.dto';
import { UpdateAttentionDto } from './dto/update-attention.dto';

@Injectable()
export class AttentionsService {
  create(createAttentionDto: CreateAttentionDto) {
    return 'This action adds a new attention';
  }

  findAll() {
    return `This action returns all attentions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attention`;
  }

  update(id: number, updateAttentionDto: UpdateAttentionDto) {
    return `This action updates a #${id} attention`;
  }

  remove(id: number) {
    return `This action removes a #${id} attention`;
  }
}
