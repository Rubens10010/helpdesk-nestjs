import { Controller, Get, Param, Body, Put, Post, Delete, HttpCode, HttpStatus } from '@nestjs/common';
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
    @Param('id') taskId: number,
    @Body() updateTaskRequest: UpdateTechAreaDTO,
  ) {
    const resp = await this.technicalAreaService.updateOne(taskId, updateTaskRequest);
    return resp;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') taskId: number) {
    await this.technicalAreaService.deleteOne(taskId);
  }
}