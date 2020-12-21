import { BadRequestException,  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution, User } from 'src/entity';
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

    if(createSolutionDto.user_id){
      const user = await User.findOne(createSolutionDto.user_id);
      if(!user){
        throw new BadRequestException(`User with id ${createSolutionDto.user_id} does not exists`);
      }
      solution.proposer = user;
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
    if(updateSolutionDto.user_id){
      const user = await User.findOne(updateSolutionDto.user_id);
      if(!user){
        throw new BadRequestException(`User with id ${updateSolutionDto.user_id} does not exists`);
      }
      solution.proposer = user;
    }

    await this.solutionsRepository.save(solution);

    return solution;
  }

  async remove(id: number) {
    return await this.solutionsRepository.delete(id);
  }
}
