import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem, ProblemSolutions, Solution } from 'src/entity';
//import { FindConditions } from 'typeorm';
import { CreateProblemSolutionDto } from './dto/create-problem-solution.dto';
import { UpdateProblemSolutionDto } from './dto/update-problem-solution.dto';
import { ProblemSolutionsRepository } from './problem-solutions.repository';

@Injectable()
export class ProblemSolutionsService {
  constructor(
    @InjectRepository(ProblemSolutions) 
    private problemSolutionsRepository: ProblemSolutionsRepository,
  ) {}

  async create(createProblemSolutionDto: CreateProblemSolutionDto) {
    const problem_solution = new ProblemSolutions();

    const problem = await Problem.findOne(createProblemSolutionDto.problem_id);
    if(!problem){
      throw new BadRequestException(`Problem with id ${createProblemSolutionDto.problem_id} does not exists`);
    }

    const solution = await Solution.findOne(createProblemSolutionDto.solution_id);

    if(!solution){
      throw new BadRequestException(`Solution with id ${createProblemSolutionDto.solution_id} does not exists`);
    }

    problem_solution.problem = problem;
    problem_solution.solution = solution;
    problem_solution.rank = createProblemSolutionDto.rank;
    problem_solution.prefered = createProblemSolutionDto.prefered;

    await this.problemSolutionsRepository.save(problem_solution);

    return problem_solution;
  }

  async findAll() {
    const problemSolutions: ProblemSolutions[] = await this.problemSolutionsRepository.find({loadRelationIds: true});

    return problemSolutions;
  }

  async findOne(problem_id: number, solution_id: number) {
    const problemSolution: ProblemSolutions = await this.problemSolutionsRepository.findOne({
      where: {
        solution: solution_id, problem: problem_id
      }
    });

    return problemSolution;
  }

  async update( updateProblemSolutionDto: UpdateProblemSolutionDto) {
    const problem_solution = await this.findOne(updateProblemSolutionDto.problem_id, updateProblemSolutionDto.solution_id);
    const problem = await Problem.findOne(updateProblemSolutionDto.problem_id);

    if(!problem){
      throw new BadRequestException(`Problem with id ${updateProblemSolutionDto.problem_id} does not exists`);
    }

    const solution = await Solution.findOne(updateProblemSolutionDto.solution_id);

    if(!solution){
      throw new BadRequestException(`Solution with id ${updateProblemSolutionDto.solution_id} does not exists`);
    }

    problem_solution.problem = problem;
    problem_solution.solution = solution;
    problem_solution.rank = updateProblemSolutionDto.rank;
    problem_solution.prefered = updateProblemSolutionDto.prefered;
    await this.problemSolutionsRepository.save(problem_solution);

    return problem_solution;
  }

  async remove(problem_id: number, solution_id: number) {
    return await this.problemSolutionsRepository.delete({
      problem: {
        id: problem_id
      },
      solution: {
        id: solution_id
      }
    });
  }
}
