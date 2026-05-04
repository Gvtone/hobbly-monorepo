import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { UserService } from '../user/user.service';
import { EntryService } from '../entry/entry.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly entryService: EntryService,
  ) {}

  async toggle(userId: number, entryId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) throw new UnauthorizedException('User does not exist');

    const entry = await this.entryService.findById(entryId);

    if (!entry) throw new NotFoundException('Entry does not exist');

    const existing = await this.databaseService.like.findFirst({
      where: { userId, entryId },
    });

    if (existing) {
      await this.databaseService.like.delete({ where: { id: existing.id } });
      return { liked: false };
    }

    await this.databaseService.like.create({ data: { userId, entryId } });
    return { liked: true };
  }

  async count(entryId: number) {
    return await this.databaseService.like.count({ where: { entryId } });
  }

  async isLiked(userId: number, entryId: number): Promise<boolean> {
    const like = await this.databaseService.like.findFirst({
      where: { userId, entryId },
    });
    return !!like;
  }
}
