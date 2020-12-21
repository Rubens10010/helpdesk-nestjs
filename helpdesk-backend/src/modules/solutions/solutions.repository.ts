import { Repository, EntityRepository } from 'typeorm';
import { Solution } from 'src/entity';

@EntityRepository(Solution)
export class SolutionsRepository extends Repository<Solution> {
}
