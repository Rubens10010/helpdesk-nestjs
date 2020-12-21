import { Repository, EntityRepository } from 'typeorm';
import { ProblemSolutions } from 'src/entity';

@EntityRepository(ProblemSolutions)
export class ProblemSolutionsRepository extends Repository<ProblemSolutions> {
}
