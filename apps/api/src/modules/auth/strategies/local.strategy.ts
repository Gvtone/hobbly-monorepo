import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PayloadEntity } from '../entities/payload.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(identifier: string, password: string): Promise<PayloadEntity> {
    const normalizedIdentifier = identifier.trim().toLowerCase();

    const validatedUser = await this.authService.validateUser({
      identifier: normalizedIdentifier,
      password,
    });

    if (!validatedUser)
      throw new UnauthorizedException('You have entered wrong credentials');

    return validatedUser;
  }
}
