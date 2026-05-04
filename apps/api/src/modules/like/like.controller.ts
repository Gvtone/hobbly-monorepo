import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Like')
@Controller('entry/:id/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('toggle')
  @ApiOperation({ summary: 'Toggle like or unlike' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Toggle successful',
    type: Promise<{ like: boolean }>,
  })
  async toggle(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    return await this.likeService.toggle(user.sub, id);
  }

  @Get('status')
  @ApiOperation({
    summary:
      'Get ammount of like of entry and status if current user have liked it or not',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: Promise<{
      liked: boolean;
      count: number;
    }>,
  })
  async status(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    const liked = await this.likeService.isLiked(user.sub, id);
    const count = await this.likeService.count(id);
    return { liked, count };
  }
}
