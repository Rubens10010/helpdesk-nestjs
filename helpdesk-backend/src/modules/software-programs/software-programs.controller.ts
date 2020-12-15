import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SoftwareProgramsService } from './software-programs.service';
import { CreateSoftwareProgramDto } from './dto/create-software-program.dto';
import { UpdateSoftwareProgramDto } from './dto/update-software-program.dto';

@Controller('software-programs')
export class SoftwareProgramsController {
  constructor(private readonly softwareProgramsService: SoftwareProgramsService) {}

  @Post()
  create(@Body() createSoftwareProgramDto: CreateSoftwareProgramDto) {
    return this.softwareProgramsService.create(createSoftwareProgramDto);
  }

  @Get()
  findAll() {
    return this.softwareProgramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softwareProgramsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSoftwareProgramDto: UpdateSoftwareProgramDto) {
    return this.softwareProgramsService.update(+id, updateSoftwareProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softwareProgramsService.remove(+id);
  }
}
