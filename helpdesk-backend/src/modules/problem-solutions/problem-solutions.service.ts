import { Injectable } from '@nestjs/common';
import { CreateProblemSolutionDto } from './dto/create-problem-solution.dto';
import { UpdateProblemSolutionDto } from './dto/update-problem-solution.dto';

@Injectable()
export class ProblemSolutionsService {
  create(createProblemSolutionDto: CreateProblemSolutionDto) {
    return 'This action adds a new problemSolution';
  }

  findAll() {
    return `This action returns all problemSolutions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problemSolution`;
  }

  update(id: number, updateProblemSolutionDto: UpdateProblemSolutionDto) {
    return `This action updates a #${id} problemSolution`;
  }

  remove(id: number) {
    return `This action removes a #${id} problemSolution`;
  }
}
