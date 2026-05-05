import { ApiProperty } from '@nestjs/swagger';
import {
  CommentGetPayload,
  CommentModel,
} from '../../../generated/prisma/models';
import { CommentEntity as ICommentEntity } from '@hobbies-dashboard/types';
import { PublicUserEntity } from '../../user/entities/user.entity';

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

export class CommentWithUserEntity
  extends CommentEntity
  implements
    CommentGetPayload<{
      include: {
        user: {
          select: {
            id: true;
            displayName: true;
            username: true;
            profilePicture: true;
            coverImage: true;
            bio: true;
            visibility: true;
          };
        };
      };
    }>
{
  @ApiProperty({ type: PublicUserEntity })
  user: PublicUserEntity;
}
