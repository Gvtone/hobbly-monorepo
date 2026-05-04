import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { PayloadEntity } from '../auth/entities/payload.entity';
import { CommentFilterDto } from './dto/comment-filter.dto';
import { CommentEntity } from './entities/comment.entity';
import { PaginatedEntity } from '../../common/entities/paginated.entity';

@ApiTags('Comment')
@Controller('entry/:id/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new comment in entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateCommentDto })
  @ApiOkResponse({ description: 'Create successful', type: CommentEntity })
  async create(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: PayloadEntity,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.create(user.sub, id, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all comment in the entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateCommentDto })
  @ApiOkResponse({
    description: 'Fetch successful',
    type: PaginatedEntity(CommentEntity),
  })
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() filter: CommentFilterDto,
  ) {
    const [data, meta] = await this.commentService.findAll(id, filter);
    return { data, ...meta };
  }

  @Patch(':commentId')
  @ApiOperation({ summary: 'Updates an entry' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiBody({ type: UpdateCommentDto })
  @ApiOkResponse({ description: 'Update successful', type: CommentEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, commentId, updateCommentDto);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Deletes the comment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiOkResponse({ description: 'Delete successful', type: CommentEntity })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.commentService.delete(id, commentId);
  }
}
