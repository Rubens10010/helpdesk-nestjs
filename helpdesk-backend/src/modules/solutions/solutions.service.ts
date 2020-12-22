import { BadRequestException,  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborator, Solution } from 'src/entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { SolutionsRepository } from './solutions.repository';

@Injectable()
export class SolutionsService {
  constructor(@InjectRepository(Solution) private solutionsRepository: SolutionsRepository) {}

  async create(createSolutionDto: CreateSolutionDto) {
    const solution = new Solution();
    solution.content = createSolutionDto.content;
    solution.short = createSolutionDto.short;
    solution.help_url = createSolutionDto.help_url;

    if(createSolutionDto.colaborator_id){
      const colaborator = await Colaborator.findOne(createSolutionDto.colaborator_id);
      if(!colaborator){
        throw new BadRequestException(`User with id ${createSolutionDto.colaborator_id} does not exists`);
      }
      solution.colaborator = colaborator;
    }

    await this.solutionsRepository.save(solution);

    return solution;
  }

  async findAll() {
    const solutions: Solution[] = await this.solutionsRepository.find();

    return solutions;
  }

  async findOne(id: number) {
    const solution: Solution = await this.solutionsRepository.findOne(id);

    return solution;
  }

  async update(id: number, updateSolutionDto: UpdateSolutionDto) {
    const solution = await this.findOne(id);

    // check which properties are set in the dto
    solution.content = updateSolutionDto.content || solution.content;
    solution.short = updateSolutionDto.short || solution.short;
    solution.help_url = updateSolutionDto.help_url || solution.help_url;
    if(updateSolutionDto.colaborator_id){
      const colaborator = await Colaborator.findOne(updateSolutionDto.colaborator_id);
      if(!colaborator){
        throw new BadRequestException(`User with id ${updateSolutionDto.colaborator_id} does not exists`);
      }
      solution.colaborator = colaborator;
    }

    await this.solutionsRepository.save(solution);

    return solution;
  }

  async remove(id: number) {
    return await this.solutionsRepository.delete(id);
  }
}
