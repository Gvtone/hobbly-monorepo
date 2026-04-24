import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guard/local.guard';
import type { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResendVerification } from './dto/resend-verification.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return await this.authService.login(res, req);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Post('forgot')
  async forgot(@Body() { email }: ForgotPasswordDto) {
    return await this.authService.forgot(email);
  }

  @Post('resend-verification')
  async resendVerificationEmail(@Body() { email }: ResendVerification) {
    return await this.authService.resendVerificationEmail(email);
  }

  @Post('verify')
  async verifyEmail(@Body() { token }: VerifyEmailDto) {
    return await this.authService.verifyEmail(token);
  }

  @Post('reset')
  async reset(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.reset(resetPasswordDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }
}
