import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem, SoftwareProgram, TechnicalArea } from 'src/entity';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ProblemsRepository } from './problems.repository';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem) 
    private problemsRepository: ProblemsRepository,
  ) {}

  async create(createProblemDto: CreateProblemDto) {
    const problem = new Problem();
    const technical_area = await TechnicalArea.findOne(createProblemDto.technical_area_id);
    problem.technical_area = technical_area;

    if(createProblemDto.software_program_id){
      const software_program = await SoftwareProgram.findOne(createProblemDto.software_program_id);
      problem.software_program = software_program;
    }

    problem.title = createProblemDto.title;
    problem.description = createProblemDto.description;

    await this.problemsRepository.save(problem);

    return problem;
  }

  async findAll() {
    const problems: Problem[] = await this.problemsRepository.find();

    return problems;
  }

  async findOne(id: number) {
    const problem: Problem = await this.problemsRepository.findOne(id);

    return problem;
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    const problem = await this.findOne(id);

    if(updateProblemDto.technical_area_id){
      const technical_area = await TechnicalArea.findOne(updateProblemDto.technical_area_id);

      problem.technical_area = technical_area || problem.technical_area;
    }
    

    if(updateProblemDto.software_program_id){
      const software_program = await SoftwareProgram.findOne(updateProblemDto.software_program_id);
      problem.software_program = software_program || problem.software_program;
    }

    problem.title = updateProblemDto.title;
    problem.description = updateProblemDto.description;

    await this.problemsRepository.save(problem);

    return problem;
  }

  async remove(id: number) {
    return await this.problemsRepository.delete(id);
  }
}
