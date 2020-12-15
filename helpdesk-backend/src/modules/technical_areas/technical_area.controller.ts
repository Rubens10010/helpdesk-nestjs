import { Controller, Get, Param, Body, Put, Post, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CreateTechAreaDTO } from './dtos/create-techarea.dto';
import { UpdateTechAreaDTO } from './dtos/update-techarea.dto';
import { TechnicalAreaService } from './technical_area.service';

@Controller('technical_area')
export class TechnicalAreaController {
  constructor(private readonly technicalAreaService: TechnicalAreaService){}

  @Get()
  getAll() {
    return this.technicalAreaService.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const resp = await this.technicalAreaService.getOne(id);
    return resp;
  }

  @Post()
  public async createOne(@Body() createTaskRequest: CreateTechAreaDTO) {
    const resp = await this.technicalAreaService.createOne(createTaskRequest);

    return resp;
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: number,
    @Body() updateTechAreaDTO: UpdateTechAreaDTO,
  ) {
    const resp = await this.technicalAreaService.updateOne(id, updateTechAreaDTO);
    return resp;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: number) {
    await this.technicalAreaService.deleteOne(id);
  }

  @Get('/:id/colaborators')
  public getBooks( @Param('id', ParseIntPipe) colaboratorID: number ) {
    const resp = this.technicalAreaService.getColaborators(colaboratorID);
    return resp;
  }
}
