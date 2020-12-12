import { Controller, Get, Param, Body, Put, Post, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TechnicalAreaService } from '../technical_areas/technical_area.service';
import { UsersService } from '../users/users.service';
import { ColaboratorService } from './colaborator.service';
import { CreateColaboratorDTO } from './dtos/create-colaborator.dto';
import { UpdateColaboratorDTO } from './dtos/update-colaborator.dto';

@Controller('colaborator')
export class ColaboratorController {
  constructor(private readonly colaboratorService: ColaboratorService, private readonly userService: UsersService, private readonly technicalAreaService: TechnicalAreaService){}

  @Get()
  getAll() {
    return this.colaboratorService.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const resp = await this.colaboratorService.getOne(id);
    return resp;
  }

  @Post()
  public async createOne(@Body() createColaboratorRequest: CreateColaboratorDTO) {
    const user = await this.userService.getById(createColaboratorRequest.user_id);
    const tech_area = await this.technicalAreaService.getOne(createColaboratorRequest.technical_area_id);

    const resp = await this.colaboratorService.createOne(createColaboratorRequest, user, tech_area);

    return resp;
  }

/*
  @Put('/:id')
  public async updateOne(
    @Param('id') id: number,
    @Body() updateColaboratorRequest: UpdateColaboratorDTO,
  ) {
    const resp = await this.colaboratorService.updateOne(id, updateColaboratorRequest);
    return resp;
  }*/

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: number) {
    await this.colaboratorService.deleteOne(id);
  }
}