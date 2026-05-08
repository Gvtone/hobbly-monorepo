import { ApiProperty } from '@nestjs/swagger';
import { ProfileShareModel } from '../../../generated/prisma/models';
import { ProfileShareEntity as IProfileShareEntity } from '@hobbies-dashboard/types';
import { PublicUserEntity } from '../../user/entities/user.entity';

export class ProfileShareEntity
  implements ProfileShareModel, IProfileShareEntity
{
  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  referenceId: string;
}

export class ProfileShareWithUserEntity extends ProfileShareEntity {
  @ApiProperty({ type: PublicUserEntity })
  user: PublicUserEntity;
}
