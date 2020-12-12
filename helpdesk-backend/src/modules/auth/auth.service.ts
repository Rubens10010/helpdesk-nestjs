import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
//import { ConfigService, Configuration } from 'src/config';
import { User } from 'src/entity/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  /**
   * This function returns only usefull information from google profile to validate user in this application.
   * @param google_profile profile info provided by google oauth2.0 api.
   * @param refresh_token refresh token for user provided by google.
   */
  getUserInfoFromGoogleProfile(google_profile: any, refresh_token: string): UserGoogleInfo
  {
    const { id, name, emails, photos } = google_profile;
    const userGoogleInfo: UserGoogleInfo = { 
      google_id: id, 
      email: emails[0].value, 
      photo_url: photos[0].value, 
      refresh_token 
    };

    return userGoogleInfo;
  }

  /**
   * Validates and updates user info if it exists in database if not it returns null.
   * @param google_profile profile info provided by google oauth2.0 api.
   * @param refresh_token refresh token for user provided by google.
   */
  async validateUser(userGoogleInfo: UserGoogleInfo): Promise<any> {

    //const userGoogleInfo = this.getUserInfoFromGoogleProfile(google_profile, refresh_token);
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

  /**
   * Returns an json web access token inside a cookie.
   * @param user Logged in user.
   */
  async getAccessTokenForLogInUser(user: User) {
    const payload: TokenPayload = { name: user.name, sub: user.id };

    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  /**
   * Returns parameters for erasing cookies in user browser.
   */
  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

  /**
   * Creates a refresh token for loggued user. Sents it back in a cookie.
   * @param user loggued in user
   */
  public getCookieWithJwtRefreshToken(user: User) {
    const payload: TokenPayload = { name: user.name, sub: user.id };
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const refresh_token_cookie = `Refresh=${refresh_token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      refresh_token_cookie,
      refresh_token
    }
  }

  /**
   * Saves current refresh token of user.
   * @param refreshToken used to renew accessToken
   * @param id user id 
   */
  async saveUserRefreshToken(refreshToken: string, id: number)
  {
    await this.usersService.setCurrentRefreshToken(refreshToken, id)
  }

  /**
   * Removes current refresh token of user in database.
   * @param id user id
   */
  async removeUserRefreshToken(id: number){
    await this.usersService.removeRefreshToken(id);
  }
}
