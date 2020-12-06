import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserAccountDTO } from '../users/dtos/UpdateUserAccountDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(google_profile: any, refresh_token: string): Promise<any> {
    const { id, name, emails, photos } = google_profile;

    const userGoogleInfo = new UpdateUserAccountDTO();
    userGoogleInfo.google_id = id;
    userGoogleInfo.email = emails[0].value;
    userGoogleInfo.photo_url = photos[0].value;
    userGoogleInfo.refresh_token = refresh_token;

    const user = await this.usersService.findOneByEmail(userGoogleInfo.email);
    if (!user) {
      return null;
    }

    if (user.google_id && user.google_id === userGoogleInfo.google_id) {
      const { refresh_token, ...result } = user;
      return result;
    } else {
      const updatedUser = await this.usersService.editUserAccount(
        user,
        userGoogleInfo,
      );
      const { refresh_token, ...result } = updatedUser;
      return result;
    }
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.google_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
