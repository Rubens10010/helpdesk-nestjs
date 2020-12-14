import { Controller, Get, Param, Body, Put, Post, Delete, HttpCode, HttpStatus, HttpException, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColaboratorService } from './colaborator.service';
import { CreateColaboratorDTO } from './dtos/create-colaborator.dto';
import { UpdateColaboratorDTO } from './dtos/update-colaborator.dto';

@ApiTags('Colaborator')
@Controller('colaborator')
export class ColaboratorController {
  constructor(private readonly colaboratorService: ColaboratorService){}

  @Get()
  getAll() {
    return this.colaboratorService.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    const resp = await this.colaboratorService.getOne(id);
    return resp;
  }

  @Post()
  public async createOne(@Body() createColaboratorRequest: CreateColaboratorDTO) {
    const resp = await this.colaboratorService
    .createOne(createColaboratorRequest)
    .catch(err => {
      throw new HttpException({
        message: "Something went wrong",
        error: err
      }, HttpStatus.BAD_REQUEST)
    })
    ;

    return resp;
  }

  @Put('/:id')
  public async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColaboratorRequest: UpdateColaboratorDTO,
  ) {
    const resp = await this.colaboratorService.updateOne(id, updateColaboratorRequest);
    return resp;
  }

  @Delete('/:id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const resp = await this.colaboratorService.deleteOne(id);
    if(resp.affected === 0) {
      return { error: true, message: "No se elimino, no existe en la base de datos!" }
    }
    return {
      message: "Eliminado exitosamente"
    };
  }
}