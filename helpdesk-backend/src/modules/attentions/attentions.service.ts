import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attention, Movement, ProblemSolutions } from 'src/entity';
import { AttentionRepository } from './attentions.repository';
import { CreateAttentionDto } from './dto/create-attention.dto';
import { UpdateAttentionDto } from './dto/update-attention.dto';

@Injectable()
export class AttentionsService {
  constructor(
    @InjectRepository(Attention) 
    private attentionRepository: AttentionRepository,
  ) {}
  
  async create(createAttentionDto: CreateAttentionDto) {
    const movement: Movement = await Movement.findOneOrFail(createAttentionDto.movement_id);

    const problem_solution:  ProblemSolutions = await ProblemSolutions.findOneOrFail(createAttentionDto.problem_solution_id);

    const attention: Attention = new Attention();
    attention.subject = createAttentionDto.subject;
    attention.replied = false;
    attention.reopen_attention = createAttentionDto.reopen_attention;
    attention.movement = movement;
    attention.problem_solution = problem_solution;
    attention.code = require('crypto').randomBytes(8).toString('hex');

    await this.attentionRepository.save(attention);

    return attention;
  }

  async findAll() {
    const attentions: Attention[] = await this.attentionRepository.find();
    return attentions;
  }

  async findOne(id: number) {
    const attention: Attention = await this.attentionRepository.findOne(id);

    if (!id)
      throw new NotFoundException(`Task with the id ${id} was not found`);

    return attention;
  }

  async update(id: number, updateAttentionDto: UpdateAttentionDto) {
    const attention: Attention = await this.findOne(id);

    console.log(updateAttentionDto);

    if(updateAttentionDto.movement_id){
      const movement: Movement = await Movement.findOneOrFail(updateAttentionDto.movement_id);
      attention.movement = movement;
    }

    if(updateAttentionDto.problem_solution_id){
      const problem_solution: ProblemSolutions = await ProblemSolutions.findOneOrFail(updateAttentionDto.problem_solution_id);
      attention.problem_solution = problem_solution;
    }

    // check which properties are set in the dto
    attention.subject = updateAttentionDto.subject || attention.subject;
    attention.replied = updateAttentionDto.replied || attention.replied;
    attention.satisfaction = updateAttentionDto.satisfaction || attention.satisfaction;
    attention.reopen_attention = updateAttentionDto.reopen_attention || attention.reopen_attention;

    await this.attentionRepository.save(attention);

    return attention;
  }

  async remove(id: number) {
    return await this.attentionRepository.delete(id);
  }
}
