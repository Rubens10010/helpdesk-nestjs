import { BadRequestException,  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborator, FileCondition, FilePath, Ticket } from 'src/entity';
import { TicketFiles } from 'src/entity/ticket_files.entity';
import { CreateTicketFilesDto } from './dto/create-ticket-files.dto';
import { UpdateTicketFilesDto } from './dto/update-ticket-files.dto';
import { TicketFilesRepository } from './ticket_files.repository';

@Injectable()
export class TicketFilesService {
  constructor(@InjectRepository(TicketFiles) private ticketFilesRepository: TicketFilesRepository) {}

  async create(createTicketFilesDto: CreateTicketFilesDto) {
    const ticketFile = new TicketFiles();

      const ticket = await Ticket.findOne(createTicketFilesDto.ticket_id);
      if(!ticket){
        throw new BadRequestException(`Ticket with id ${createTicketFilesDto.ticket_id} does not exists`);
      }
      ticketFile.ticket = ticket;
    
      const filePath = await FilePath.findOne(createTicketFilesDto.file_path_id);

      if(!filePath){
        throw new BadRequestException(`File Path with id ${createTicketFilesDto.file_path_id} does not exists`);
      }
      ticketFile.file_path = filePath;

    await this.ticketFilesRepository.save(ticketFile);

    // check if result was ok
    // update file path status
    filePath.condition = FileCondition.LINKED;
    filePath.save();

    return ticketFile;
  }

  async findAll() {
    const ticketFiles: TicketFiles[] = await this.ticketFilesRepository.find();

    return ticketFiles;
  }

  async findOne(id: number, loadRelations: boolean) {
      let ticketFile: TicketFiles = null;
      if(loadRelations){
        ticketFile = await this.ticketFilesRepository.findOne(id, { relations: ['file_path'] });
      } else {
        ticketFile = await this.ticketFilesRepository.findOne(id);
      }

    if (!ticketFile)
        throw new NotFoundException(`Ticket with the id ${id} was not found`);
    return ticketFile;
  }

  async update(id: number, updateTicketFilesDto: UpdateTicketFilesDto) {
    const ticketFile = await this.findOne(id, true);

    if(updateTicketFilesDto.ticket_id){
        const ticket = await Ticket.findOne(updateTicketFilesDto.ticket_id);
        if(!ticket){
          throw new BadRequestException(`Ticket with id ${updateTicketFilesDto.ticket_id} does not exists`);
        }
        ticketFile.ticket = ticket;
    }

    if(updateTicketFilesDto.file_path_id){
        const filePath = await FilePath.findOne(updateTicketFilesDto.file_path_id);

      if(!filePath){
        throw new BadRequestException(`File Path with id ${updateTicketFilesDto.file_path_id} does not exists`);
      }
      ticketFile.file_path.condition = FileCondition.UNLINKED;
      ticketFile.file_path.save();
      ticketFile.file_path = filePath;
      filePath.condition = FileCondition.LINKED;
      filePath.save();
    }

    await this.ticketFilesRepository.save(ticketFile);

    return ticketFile;
  }

  async remove(id: number) {
    const ticketFile = await this.findOne(id, true);

    ticketFile.file_path.condition = FileCondition.DELETED;
    ticketFile.file_path.save();
    
    return this.ticketFilesRepository.delete(id);
  }
}
