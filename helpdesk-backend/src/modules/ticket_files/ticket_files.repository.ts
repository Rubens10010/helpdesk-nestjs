import { Repository, EntityRepository } from 'typeorm';
import { TicketFiles } from 'src/entity/ticket_files.entity';

@EntityRepository(TicketFiles)
export class TicketFilesRepository extends Repository<TicketFiles> {
}
