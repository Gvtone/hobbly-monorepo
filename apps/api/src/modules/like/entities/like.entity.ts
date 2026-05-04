import { ApiProperty } from '@nestjs/swagger';
import { LikeModel } from '../../../generated/prisma/models';
import { LikeEntity as ILikeEntity } from '@hobbies-dashboard/types';

export class LikeEntity implements LikeModel, ILikeEntity {
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
}
