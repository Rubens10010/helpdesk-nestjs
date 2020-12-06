import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './googleAuth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    const cookie = await this.authService.login(user);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
    //return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  authenticate(@Req() request) {
    const user = request.user;
    user.google_id = "hidden";
    return user;
  }
}
