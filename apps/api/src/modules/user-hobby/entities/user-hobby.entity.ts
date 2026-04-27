import { ApiProperty } from '@nestjs/swagger';
import { UserHobbyModel } from '../../../generated/prisma/models';
import { UserHobbyEntity as IUserHobbyEntity } from '@hobbies-dashboard/types';

export class UserHobbyEntity implements UserHobbyModel, IUserHobbyEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  hobbyId: number;

  @ApiProperty({ type: String })
  backgroundImage: string;
}
