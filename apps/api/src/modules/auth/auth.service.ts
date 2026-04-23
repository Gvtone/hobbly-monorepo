import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashService } from '../../common/utils/hash.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { PayloadEntity } from './entities/payload.entity';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: AuthPayloadDto): Promise<PayloadEntity> {
    const user = await this.userService.findUserByEmail(email);

    if (
      user &&
      (await this.hashService.comparePassword(password, user.password))
    ) {
      return {
        sub: user.id,
        displayName: user.displayName,
        username: user.username,
        email,
        role: user.role,
        visibility: user.visibility,
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

  async register(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async logout(response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }
}
