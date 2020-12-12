import { Repository, EntityRepository } from 'typeorm';
import { Colaborator } from 'src/entity/colaborator.entity';

@EntityRepository(Colaborator)
export class ColaboratorRepository extends Repository<Colaborator> {
}
