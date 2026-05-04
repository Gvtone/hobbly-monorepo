import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Like')
@Controller('entry/:id/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('toggle')
  async toggle(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    return await this.likeService.toggle(user.sub, id);
  }

  @Get('status')
  async status(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    const liked = await this.likeService.isLiked(user.sub, id);
    const count = await this.likeService.count(id);
    return { liked, count };
  }
}
