import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashService } from '../../common/utils/hash.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { PayloadEntity } from './entities/payload.entity';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { TokenType, UserStatus } from '../../generated/prisma/enums';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GenericOutputEntity } from '../../common/entities/generic-output.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser({
    identifier,
    password,
  }: AuthPayloadDto): Promise<PayloadEntity> {
    const isEmail = identifier.includes('@');
    const user = isEmail
      ? await this.userService.findUserByEmail(identifier)
      : await this.userService.findUserByUsername(identifier);

    if (
      user &&
      (await this.hashService.comparePassword(password, user.password))
    ) {
      return {
        sub: user.id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        role: user.role,
        visibility: user.visibility,
        status: user.status,
        type: 'ACCESS',
      };
    }

    return null;
  }

  async login(response: Response, request: Request) {
    const payload = request.user;

    const jwtAccessTokenExpiration = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION',
      '15m',
    ) as StringValue;

    const jwtRefreshTokenExpiration = this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION',
      '7d',
    ) as StringValue;

    const accessToken = this.jwtService.sign(
      { ...payload, type: 'ACCESS' },
      {
        expiresIn: jwtAccessTokenExpiration,
      },
    );

    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'REFRESH' },
      {
        expiresIn: jwtRefreshTokenExpiration,
      },
    );

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtAccessTokenExpiration),
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtRefreshTokenExpiration),
    });

    return payload;
  }

  async refreshToken(response: Response, request: Request) {
    const refreshToken = request.cookies?.refresh_token as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload: PayloadEntity;
    try {
      payload = this.jwtService.verify<PayloadEntity>(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      response.clearCookie('access_token');
      response.clearCookie('refresh_token');
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (payload.type !== 'REFRESH') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.userService.findUserById(payload.sub);
    if (!user) throw new UnauthorizedException('User not found');

    const jwtAccessTokenExpiration = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION',
      '15m',
    ) as StringValue;

    const jwtRefreshTokenExpiration = this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION',
      '7d',
    ) as StringValue;

    const newPayload: PayloadEntity = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      visibility: user.visibility,
      status: user.status,
      type: 'ACCESS',
    };

    const accessToken = this.jwtService.sign(newPayload, {
      expiresIn: jwtAccessTokenExpiration,
    });

    const newRefreshToken = this.jwtService.sign(
      { ...newPayload, type: 'REFRESH' },
      {
        expiresIn: jwtRefreshTokenExpiration,
      },
    );

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtAccessTokenExpiration),
    });

    response.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtRefreshTokenExpiration),
    });

    return newPayload;
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.userService.create(createUserDto);

    const token = await this.tokenService.generateToken({
      userId: createdUser.id,
      type: 'EMAIL_VERIFICATION',
    });

    await this.mailService.sendVerificationEmail({
      to: createUserDto.email,
      username: createUserDto.username,
      token,
    });

    return createdUser;
  }

  async resendVerificationEmail(email: string): Promise<GenericOutputEntity> {
    const user = await this.userService.findUserByEmail(email);

    if (user.status === UserStatus.ACTIVE) {
      return { message: 'Email is already active. Please log in.' };
    }

    const token = await this.tokenService.findTokenByUserId(
      user.id,
      TokenType.EMAIL_VERIFICATION,
    );

    if (token) await this.tokenService.deleteToken(token.id);

    const verificationToken = await this.tokenService.generateToken({
      userId: user.id,
      type: TokenType.EMAIL_VERIFICATION,
    });

    await this.mailService.sendVerificationEmail({
      to: user.email,
      username: user.username,
      token: verificationToken,
    });

    return { message: 'New verification email has been sent.' };
  }

  async verifyEmail(token: string) {
    const { userId } = await this.tokenService.verifyToken({
      token,
      type: TokenType.EMAIL_VERIFICATION,
    });

    const user = await this.userService.findUserById(userId);

    if (!user) throw new NotFoundException('User not found');

    // TODO: Check if user account was deleted or suspended
    // TODO: and create ways for them to recover their accounts

    return await this.userService.update(userId, { status: 'ACTIVE' });
  }

  async logout(response: Response): Promise<GenericOutputEntity> {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }

  async forgot(email: string): Promise<GenericOutputEntity> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const existingToken = await this.tokenService.findTokenByUserId(
      user.id,
      TokenType.PASSWORD_RESET,
    );

    if (existingToken) {
      await this.tokenService.deleteToken(existingToken.id);
    }

    const token = await this.tokenService.generateToken({
      userId: user.id,
      type: TokenType.PASSWORD_RESET,
    });

    return await this.mailService.sendForgotPasswordEmail({
      to: user.email,
      username: user.username,
      token,
    });
  }

  async reset({
    password,
    token,
  }: ResetPasswordDto): Promise<GenericOutputEntity> {
    const { userId } = await this.tokenService.verifyToken({
      token,
      type: TokenType.PASSWORD_RESET,
    });

    const newPassword = await this.hashService.hashPassword(password);

    await this.userService.update(userId, { password: newPassword });

    return { message: 'Password reset successfully' };
  }

  async me(request: Request) {
    const user = request.user as PayloadEntity;
    return await this.userService.findUserById(user.sub);
  }
}
