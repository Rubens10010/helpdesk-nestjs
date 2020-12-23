import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-solution.dto';
import { UpdateReplyDto } from './dto/update-solution.dto';
import { ReplyService } from './reply.service';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  create(@Body() createReplyDto: CreateReplyDto) {
    return this.replyService.create(createReplyDto);
  }

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(+id, updateReplyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.replyService.remove(+id);
    return result.affected ? { message: "Eliminado Exitosamente"} : { error: true, message: "No se elimino!"};
  }
}
