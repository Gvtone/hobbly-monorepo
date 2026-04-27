import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthPayloadDto } from './dto/auth.dto';
import { PayloadEntity } from './entities/payload.entity';
import { UserEntity } from '../user/entities/user.entity';
import { GenericOutputEntity } from '../../common/entities/generic-output.entity';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email or username and password' })
  @ApiBody({ type: AuthPayloadDto })
  @ApiOkResponse({ description: 'Login successful', type: PayloadEntity })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return await this.authService.login(res, req);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: UserEntity,
  })
  @ApiConflictResponse({ description: 'Email or username already in use' })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Public()
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refreshes access token in cookies' })
  @ApiOkResponse({ description: 'Refresh Successful', type: PayloadEntity })
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return await this.authService.refreshToken(res, req);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out the current user' })
  @ApiOkResponse({
    description: 'Logged out successfully',
    type: GenericOutputEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Public()
  @Post('forgot')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request a password reset email' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOkResponse({
    description: 'Password reset email sent',
    type: GenericOutputEntity,
  })
  @ApiNotFoundResponse({ description: 'No account found with that email' })
  async forgot(@Body() { email }: ForgotPasswordDto) {
    return await this.authService.forgot(email);
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend the email verification link' })
  @ApiBody({ type: ResendVerification })
  @ApiOkResponse({
    description: 'Verification email sent',
    type: GenericOutputEntity,
  })
  async resendVerificationEmail(@Body() { email }: ResendVerification) {
    return await this.authService.resendVerificationEmail(email);
  }

  @Public()
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify a user email address with a token' })
  @ApiBody({ type: VerifyEmailDto })
  @ApiOkResponse({
    description: 'Email verified successfully',
    type: UserEntity,
  })
  async verifyEmail(@Body() { token }: VerifyEmailDto) {
    return await this.authService.verifyEmail(token);
  }

  @Public()
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset the account password using a token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({
    description: 'Password reset successfully',
    type: GenericOutputEntity,
  })
  async reset(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.reset(resetPasswordDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get the current authenticated user' })
  @ApiOkResponse({ description: 'Current user payload', type: PayloadEntity })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  me(@Req() req: Request) {
    return req.user;
  }
}
