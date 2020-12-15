import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.softwareProgramsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSoftwareProgramDto: UpdateSoftwareProgramDto) {
    return this.softwareProgramsService.update(+id, updateSoftwareProgramDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.softwareProgramsService.remove(+id);

    if(result.affected === 0) {
      return { error: true, message: "No se elimino, no existe en la base de datos!" }
    }
    return {
      message: "Eliminado exitosamente"
    };
  }
}
