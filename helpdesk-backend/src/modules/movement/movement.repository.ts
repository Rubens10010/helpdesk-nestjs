import { Repository, EntityRepository } from 'typeorm';
import { Movement } from 'src/entity/movement.entity';

@EntityRepository(Movement)
export class MovementRepository extends Repository<Movement> {
}
