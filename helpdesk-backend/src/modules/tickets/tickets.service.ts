import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem, User } from 'src/entity';
import { FilePath } from 'src/entity/file_paths.entity';
import { Ticket, TicketChannel } from 'src/entity/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsRepository } from './tickets.repository';
import { TicketNumberService } from './ticketNumber.service';

@Injectable()
export class TicketsService {
  constructor(@InjectRepository(Ticket) private ticketsRepository: TicketsRepository, private ticketNumberGenerator: TicketNumberService) {}

  async create(createTicketDto: CreateTicketDto) {
    const ticket = new Ticket();
    ticket.year = createTicketDto.year;
    ticket.problem_description = createTicketDto.problem_description;
    ticket.channel = parseInt(TicketChannel[createTicketDto.channel],10);

    const user = await User.findOne(createTicketDto.user_id);
    if(!user){
      throw new BadRequestException(`User with id ${createTicketDto.user_id} does not exists`);
    }
    ticket.user = user;

    if(createTicketDto.problem_id){
      const problem = await Problem.findOne(createTicketDto.problem_id);
      if(!problem){
        throw new BadRequestException(`Problem with id ${createTicketDto.problem_id} does not exists`);
      }
      console.log(problem);
      ticket.problem = problem;
    }

    if(createTicketDto.photo_1_id){
      const photo_1 = await FilePath.findOne(createTicketDto.photo_1_id);
      if(!photo_1){
        throw new BadRequestException(`Photo #1 with id ${createTicketDto.photo_1_id} does not exists or wasn't uploaded yet.`);
      }
      ticket.photo_1 = photo_1;
    }

    if(createTicketDto.photo_2_id){
      const photo_2 = await FilePath.findOne(createTicketDto.photo_2_id);
      if(!photo_2){
        throw new BadRequestException(`Photo #2 with id ${createTicketDto.photo_2_id} does not exists or wasn't uploaded yet.`);
      }
      ticket.photo_2 = photo_2;
    }

    ticket.code = await this.ticketNumberGenerator.getNextTicketNumber();
    await this.ticketsRepository.save(ticket);
    return ticket;
  }

  async findAll() {
    const tickets: Ticket[] = await this.ticketsRepository.find();
    return tickets;
  }

  async findOne(id: number) {
    const ticket: Ticket = await this.ticketsRepository.findOne(id);
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);
    ticket.year = updateTicketDto.year || ticket.year;
    ticket.problem_description = updateTicketDto.problem_description || ticket.problem_description;

    ticket.channel = parseInt(TicketChannel[updateTicketDto.channel],10) || ticket.channel;
    if(updateTicketDto.user_id){
      const user = await User.findOne(updateTicketDto.user_id);
      if(!user){
        throw new BadRequestException(`User with id ${updateTicketDto.user_id} does not exists`);
      }
      ticket.user = user;
    }

    if(updateTicketDto.problem_id){
      const problem = await Problem.findOne(updateTicketDto.problem_id);
      if(!problem){
        throw new BadRequestException(`Problem with id ${updateTicketDto.user_id} does not exists`);
      }
      ticket.problem = problem;
    }

    await this.ticketsRepository.save(ticket);

    return ticket;
  }

  async remove(id: number) {
    return await this.ticketsRepository.delete(id);
  }
}
