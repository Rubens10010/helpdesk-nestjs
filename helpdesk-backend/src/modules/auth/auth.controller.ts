import { Controller, Get, UseGuards, Req, Res, Post, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwtRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  // UseGuards google strategy provides functions to authenticate user if not googleAuthRedirect will not execute
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() response: Response) {
    const {user} = req;
    //This will return an acces_token only if is validated
    const accessTokenCookie = await this.authService.login(user);
    // refresh token-cookie
    const {cookie, token} = this.authService.getCookieWithJwtRefreshToken(user);

    await this.authService.saveUserRefreshToken(token, user.id);

    response.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request) {
    await this.authService.removeUserRefreshToken(request.user.id);

    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  authenticate(@Req() request) {
    const user = request.user;
    user.google_id = "hidden";
    user.refresh_token = null;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request) {
    const accessTokenCookie = await this.authService.login(request.user);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
