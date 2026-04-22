import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import crypto from 'node:crypto';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }

  generatePasswordToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}
