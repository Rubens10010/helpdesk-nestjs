import { Repository, EntityRepository } from 'typeorm';
import { SoftwareProgram } from 'src/entity';

@EntityRepository(SoftwareProgram)
export class SoftwareProgramsRepository extends Repository<SoftwareProgram> {
}
