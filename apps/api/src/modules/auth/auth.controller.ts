import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import type { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.login(res, req);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
