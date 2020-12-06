import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './googleAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  async getUserFromGoogleLogin(@Req() req) {
    return req.user;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  // UseGuards google strategy provides functions to authenticate user if not googleAuthRedirect will not execute
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req) {
    //This will return an acces_token
    return this.authService.login(req.user);
  }
}
