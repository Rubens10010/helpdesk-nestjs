import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
