import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from 'src/entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketNumberService } from './ticketNumber.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, TicketNumberService],
  exports: [TicketsService],
  imports: [TypeOrmModule.forFeature([Ticket])]
})
export class TicketsModule {}
