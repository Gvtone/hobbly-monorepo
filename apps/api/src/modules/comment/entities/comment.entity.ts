import { ApiProperty } from '@nestjs/swagger';
import { CommentModel } from '../../../generated/prisma/models';
import { CommentEntity as ICommentEntity } from '@hobbies-dashboard/types';

export class CommentEntity implements CommentModel, ICommentEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  entryId: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: String })
  content: string;
}
