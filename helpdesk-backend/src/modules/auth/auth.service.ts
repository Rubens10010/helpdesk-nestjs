import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserAccountDTO } from '../users/dtos/UpdateUserAccountDTO';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, Configuration } from 'src/config';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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

  // Get Access Token Cookie
  async login(user: User) {
    const payload: TokenPayload = { name: user.name, sub: user.id };

    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(Configuration.JWT_EXPIRATION_TIME)}`;
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

  public getCookieWithJwtRefreshToken(user: User) {
    const payload: TokenPayload = { name: user.name, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token
    }
  }

  async saveUserRefreshToken(refreshToken: string, id: number)
  {
    await this.usersService.setCurrentRefreshToken(refreshToken, id)
  }

  async removeUserRefreshToken(id: number){
    await this.usersService.removeRefreshToken(id);
  }
}
