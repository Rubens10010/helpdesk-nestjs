import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AttentionsService } from './attentions.service';
import { CreateAttentionDto } from './dto/create-attention.dto';
import { UpdateAttentionDto } from './dto/update-attention.dto';

@Controller('attentions')
export class AttentionsController {
  constructor(private readonly attentionsService: AttentionsService) {}

  @Post()
  create(@Body() createAttentionDto: CreateAttentionDto) {
    return this.attentionsService.create(createAttentionDto);
  }

  @Get()
  findAll() {
    return this.attentionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attentionsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAttentionDto: UpdateAttentionDto) {
    return this.attentionsService.update(+id, updateAttentionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const resp = await this.attentionsService.remove(+id);

    if(resp.affected === 0) {
      return { error: true, message: "No se elimino, no existe en la base de datos!" }
    }
    return {
      message: "Eliminado exitosamente"
    };
  }
}