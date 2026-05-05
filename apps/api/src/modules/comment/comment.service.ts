import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from '../../common/database/database.service';
import { EntryService } from '../entry/entry.service';
import { UserService } from '../user/user.service';
import { CommentFilterDto } from './dto/comment-filter.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly entryService: EntryService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, entryId: number, { content }: CreateCommentDto) {
    const user = await this.userService.findUserById(userId);

    if (!user) throw new UnauthorizedException('User does not exist');

    const entry = await this.entryService.findById(entryId);

    if (!entry) throw new NotFoundException('Entry does not exist');

    return await this.databaseService.comment.create({
      data: { userId, entryId, content },
    });
  }

  async findAll(entryId: number, { page, limit = 10 }: CommentFilterDto) {
    const paginatedDatabase = await this.databaseService.paginateModel();
    // TODO: Include user
    return await paginatedDatabase.comment
      .paginate({
        where: { entryId },
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              username: true,
              profilePicture: true,
              coverImage: true,
              bio: true,
              visibility: true,
            },
          },
        },
      })
      .withPages({ page, limit });
  }

  async update(
    entryId: number,
    id: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    return await this.databaseService.comment.update({
      where: { id, entryId },
      data: updateCommentDto,
    });
  }

  async delete(entryId: number, id: number) {
    return await this.databaseService.comment.delete({
      where: { id, entryId },
    });
  }
}
