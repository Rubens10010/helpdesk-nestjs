import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProblemSolutionsService } from './problem-solutions.service';
import { CreateProblemSolutionDto } from './dto/create-problem-solution.dto';
import { UpdateProblemSolutionDto } from './dto/update-problem-solution.dto';

@Controller('problem-solutions')
export class ProblemSolutionsController {
  constructor(private readonly problemSolutionsService: ProblemSolutionsService) {}

  @Post()
  create(@Body() createProblemSolutionDto: CreateProblemSolutionDto) {
    return this.problemSolutionsService.create(createProblemSolutionDto);
  }

  @Get()
  findAll() {
    return this.problemSolutionsService.findAll();
  }

  @Get('/p/:problem_id/s/:solution_id')
  findOne(@Param('problem_id') problem_id: string, @Param('solution_id') solution_id: string) {
    return this.problemSolutionsService.findOne(+problem_id, +solution_id);
  }

  @Put()
  update(@Body() updateProblemSolutionDto: UpdateProblemSolutionDto) {
    return this.problemSolutionsService.update(updateProblemSolutionDto);
  }

  @Delete('/p/:problem_id/s/:solution_id')
  async remove(@Param('problem_id') problem_id: string, @Param('solution_id') solution_id: string) {
    const result = await this.problemSolutionsService.remove(+problem_id, +solution_id);
    return result.affected ? { message: "Eliminado Exitosamente"} : { error: true, message: "No se elimino!"};
  }
}
