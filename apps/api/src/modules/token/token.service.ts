import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { HashService } from '../../common/utils/hash.service';
import { DatabaseService } from '../../common/database/database.service';
import ms from 'ms';
import { UserService } from '../user/user.service';
import { TokenType } from '../../generated/prisma/enums';

@Injectable()
export class TokenService {
  constructor(
    private readonly hashService: HashService,
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async generateToken({
    type,
    userId,
    expiresAt = new Date(Date.now() + ms('5m')),
  }: GenerateTokenDto) {
    const token = this.hashService.generateToken();

    const user = await this.userService.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.databaseService.token.create({
      data: { type, userId, token, expiresAt },
    });

    return token;
  }

  async verifyToken(verifyTokenDto: VerifyTokenDto) {
    const token = await this.databaseService.token.findFirst({
      where: { ...verifyTokenDto },
    });

    if (!token) throw new UnauthorizedException('Token Invalid');

    if (token.expiresAt <= new Date())
      throw new UnauthorizedException('Token Expired');

    return await this.databaseService.token.delete({ where: { id: token.id } });
  }

  async findToken(token: string) {
    return await this.databaseService.token.findUnique({
      where: { token },
    });
  }

  async findTokenByUserId(userId: number, type: TokenType) {
    return await this.databaseService.token.findFirst({
      where: { userId, type },
    });
  }

  async deleteToken(id: number) {
    return await this.databaseService.token.delete({ where: { id } });
  }
}
