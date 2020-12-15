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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemSolutionsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProblemSolutionDto: UpdateProblemSolutionDto) {
    return this.problemSolutionsService.update(+id, updateProblemSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemSolutionsService.remove(+id);
  }
}
