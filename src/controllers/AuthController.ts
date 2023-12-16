import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthService } from '../services/AuthService';
import { LocalGuard } from '../guards/LocalGuard';
import { Access } from '../Decorators/Access';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: CreateUserDTO) {
    return this.authService.createUser(body);
  }
  @UseGuards(LocalGuard)
  @Post('/signin')
  signin(@Req() req) {
    return this.authService.getAccessToken(req.user.id);
  }
  @Access('user.get')
  @Get('/whoami')
  whoami(@Req() req) {
    return req.user;
  }
}
