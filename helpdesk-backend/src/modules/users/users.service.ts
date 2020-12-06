import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRepository } from './users.repository';
import { UpdateUserAccountDTO } from './dtos/UpdateUserAccountDTO';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async findOne(
    field: string,
    search_value: string,
  ): Promise<User | undefined> {
    const user: User = await this.userRepository.findOne({
      email: search_value,
    });
    if (!user)
      throw new NotFoundException(
        `Task with the id ${search_value} was not found`,
      );
    return user;
  }

  // Encuentra el usuario que tenga el email dado si no existe retorna undefined
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user: User = await this.userRepository.findOne({
      email: email,
    });

    return user;
  }

  public async getOne(userId: number) {
    const task: User = await this.userRepository.findOne(userId);

    if (!task)
      throw new NotFoundException(`Task with the id ${userId} was not found`);

    /*const taskDTO: TaskDTO = this.entityToDTO(task);

    return taskDTO;*/
    return task;
  }

  async editUserAccount(user: User, dto: UpdateUserAccountDTO) {
    if (!user) throw new NotFoundException("User doesn't exists");
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  async getByGoogleId(google_id: string){
    const user = await this.userRepository.findOne({google_id});

    if(!user) {
      throw new HttpException("User with this id doesn't exists ", HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
