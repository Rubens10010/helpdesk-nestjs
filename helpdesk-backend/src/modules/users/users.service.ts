import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from './dtos';
import { UserRepository } from './users.repository';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  /**
   * Encuentra el usuario que tenga el email dado si no existe retorna undefined
   * @param email valid user email.
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user: User = await this.userRepository.findOne({
      email: email,
    });

    return user;
  }

  /**
   * Update google_id and photo_url information of user
   * @param user current loggued in user
   * @param userGoogleInfo payload to update user info
   */
  async editUserAccount(user: User, userGoogleInfo: UserGoogleInfo) {
    if (!user) throw new NotFoundException("User doesn't exists");
    const editedUser = Object.assign(user, userGoogleInfo);
    return await this.userRepository.save(editedUser);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  /**
   * Returns a user entity from its id
   * @param id user id
   */
  async getById(id: number): Promise<User | undefined>{
    const user: User = await this.userRepository.findOne({id});

    if (!user)
      throw new NotFoundException(
        `User with the id ${id} was not found`,
      );

    return user;
  }

  /**
   * Stores current refresh token hashed in database.
   * @param refreshToken current refresh token sent to user.
   * @param userId user id
   */
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const refresh_token = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      refresh_token
    });
  }

  /**
   * Returns current loggued in user entity if his token matches with database.
   * @param refreshToken current refresh token stored in user browser.
   * @param id user id
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.getById(id);
 
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refresh_token
    );
 
    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }

  /**
   * remove current refresh token from loggued user in database.
   * @param id user id
   */
  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, {
      refresh_token: null
    });
  }

  async createOne(createUserRequest: CreateUserDto){
    const user: User = new User();
    user.name = createUserRequest.name;
    user.email = createUserRequest.email;

    await this.userRepository.save(user);

    return user;
  }
}
