import { Repository, EntityRepository } from 'typeorm';
import { Problem } from 'src/entity';

@EntityRepository(Problem)
export class ProblemsRepository extends Repository<Problem> {
}
