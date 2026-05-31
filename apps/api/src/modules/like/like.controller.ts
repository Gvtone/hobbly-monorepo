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
import { Public } from '../../common/decorators/public.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Like')
@Controller('entry/:id/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('toggle')
  @ApiOperation({ summary: 'Toggle like or unlike' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Toggle successful',
    schema: {
      type: 'object',
      properties: {
        like: { type: 'boolean' },
      },
    },
  })
  async toggle(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    return await this.likeService.toggle(user.sub, id);
  }

  @Get('status')
  @SkipThrottle({ short: true, long: true })
  @ApiOperation({
    summary: 'Get status if current user have liked it or not',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Fetch successful',
    schema: {
      type: 'object',
      properties: {
        like: { type: 'boolean' },
      },
    },
  })
  async status(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
  ) {
    const liked = await this.likeService.isLiked(user.sub, id);
    return { liked };
  }

  @Public()
  @Get('count')
  @SkipThrottle({ short: true, long: true })
  @ApiOperation({ summary: 'Get ammount of like of entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Fetch successful',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number' },
      },
    },
  })
  async count(@Param('id', ParseIntPipe) id: number) {
    const count = await this.likeService.count(id);
    return { count };
  }
}
