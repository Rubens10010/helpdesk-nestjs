import { Repository, EntityRepository } from 'typeorm';
import { TechnicalArea } from 'src/entity/technical_area.entity';

@EntityRepository(TechnicalArea)
export class TechnicalAreaRepository extends Repository<TechnicalArea> {
}
