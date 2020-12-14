import { Controller, Req, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  public async createOne(@Body() createUserRequest: CreateUserDto) {
    const resp = await this.usersService.createOne(createUserRequest);

    return resp;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
