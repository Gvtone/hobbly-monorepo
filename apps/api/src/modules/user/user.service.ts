import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../../common/utils/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashService: HashService,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.databaseService.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) return null;
    return new UserEntity(user);
  }

  async createUser({ username, email, password }: CreateUserDto) {
    const existingUsername = await this.databaseService.user.findFirst({
      where: { username },
    });

    if (existingUsername)
      throw new ConflictException(
        'An account with this username already exists.',
      );

    const existingEmail = await this.databaseService.user.findFirst({
      where: { email },
    });

    if (existingEmail)
      throw new ConflictException('An account with this email already exists.');

    const hashedPassword = await this.hashService.hashPassword(password);

    const user = await this.databaseService.user.create({
      data: { password: hashedPassword, username, email },
    });

    return new UserEntity(user);
  }
}
