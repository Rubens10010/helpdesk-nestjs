import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateTicketFilesDto } from './dto/create-ticket-files.dto';
import { UpdateTicketFilesDto } from './dto/update-ticket-files.dto';
import { TicketFilesService } from './ticket_files.service';

@Controller('ticket_files')
export class TicketFilesController {
  constructor(private readonly ticketFilesService: TicketFilesService) {}

  @Post()
  create(@Body() createTicketFilesDto: CreateTicketFilesDto) {
    return this.ticketFilesService.create(createTicketFilesDto);
  }

  @Get()
  findAll() {
      console.log("find all")
    return this.ticketFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketFilesService.findOne(+id, false);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTicketFilesDto: UpdateTicketFilesDto) {
    return this.ticketFilesService.update(+id, updateTicketFilesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.ticketFilesService.remove(+id);
    if(result.affected === 0) {
      return { error: true, message: "No se elimino, no existe en la base de datos!" }
    }
    return {
      message: "Eliminado exitosamente"
    };
  }
}
