import { Controller, Get, UseGuards, Req, Res, Post, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwtRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Calling this route fires google authentication.
   * @param req request is never reached because google redirects user to google/callback.
   */
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  /**
   * UseGuards google strategy provides functions to authenticate user if not loginCallback will not execute
   * @param req request after google authentication contains user info.
   * @param response the response object, which will contain the access and refresh cookies.
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async loginCallback(@Req() req, @Res() response: Response) {
    const {user} = req;
    
    // access token cookie
    const accessTokenCookie = await this.authService.getAccessTokenForLogInUser(user);
    // refresh token-cookie
    const {refresh_token_cookie, refresh_token} = this.authService.getCookieWithJwtRefreshToken(user);

    await this.authService.saveUserRefreshToken(refresh_token, user.id);

    response.setHeader('Set-Cookie', [accessTokenCookie, refresh_token_cookie]);
    return response.send(user);
  }

  /**
   * This functions logs user out of system.
   * @param request post request with access cookie and refresh cookie.
   */
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request) {
    await this.authService.removeUserRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  /**
   * returns info about current logged in user
   * @param request get request.
   */
  @UseGuards(JwtAuthGuard)
  @Get('user')
  authenticate(@Req() request) {
    const user = request.user;
    user.google_id = "hidden";
    user.refresh_token = null;
    return user;
  }

  /**
   * Refreshes current access token for JWT_EXPIRATION_TIME more seconds.
   * @param request request with a valid refresh token cookie
   */
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request) {
    const accessTokenCookie = await this.authService.getAccessTokenForLogInUser(request.user);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
