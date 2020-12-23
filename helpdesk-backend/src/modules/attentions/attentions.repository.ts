import { Repository, EntityRepository } from 'typeorm';
import { Attention } from 'src/entity';

@EntityRepository(Attention)
export class AttentionRepository extends Repository<Attention> {
}
