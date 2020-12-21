import { Repository, EntityRepository } from 'typeorm';
import { Ticket } from 'src/entity/ticket.entity';

@EntityRepository(Ticket)
export class TicketsRepository extends Repository<Ticket> {
}
