import { Repository, EntityRepository } from 'typeorm';
import { Reply } from 'src/entity';

@EntityRepository(Reply)
export class RepliesRepository extends Repository<Reply> {
}
