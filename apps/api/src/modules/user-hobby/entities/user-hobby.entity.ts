import { ApiProperty } from '@nestjs/swagger';
import { UserHobbyGetPayload } from '../../../generated/prisma/models';
import { UserHobbyEntity as IUserHobbyEntity } from '@hobbies-dashboard/types';
import { HobbyEntity } from '../../hobby/entities/hobby.entity';

export class UserHobbyEntity
  implements
    UserHobbyGetPayload<{
      include: { hobby: true };
    }>,
    IUserHobbyEntity
{
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

  @ApiProperty({ type: () => HobbyEntity })
  hobby: HobbyEntity;
}
