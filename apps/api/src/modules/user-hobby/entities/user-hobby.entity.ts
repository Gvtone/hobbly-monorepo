import { ApiProperty } from '@nestjs/swagger';
import {
  UserHobbyGetPayload,
  UserHobbyModel,
} from '../../../generated/prisma/models';
import {
  UserHobbyEntity as IUserHobbyEntity,
  UserHobbyWithHobbyEntity as IUserHobbyWithHobbyEntity,
} from '@hobbies-dashboard/types';
import { HobbyEntity } from '../../hobby/entities/hobby.entity';

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

export class UserHobbyEntityWithHobby
  extends UserHobbyEntity
  implements
    UserHobbyGetPayload<{
      include: { hobby: true };
    }>,
    IUserHobbyWithHobbyEntity
{
  @ApiProperty({ type: () => HobbyEntity })
  hobby: HobbyEntity;
}
