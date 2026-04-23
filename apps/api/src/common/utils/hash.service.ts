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

  generateToken(size: number = 32) {
    return crypto.randomBytes(size).toString('hex');
  }
}
