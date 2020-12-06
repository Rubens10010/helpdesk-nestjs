import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  // Use Google Strategy within passport
  // Verify function of passport require credentials in this case: an accessToken, refreshToken and google profile. Finally it should call done(err, user)
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const validatedUser = await this.authService.validateUser(
      profile,
      refreshToken,
    );
    if (!validatedUser) {
      throw new UnauthorizedException();
    }

    return done(null, validatedUser);
  }
}