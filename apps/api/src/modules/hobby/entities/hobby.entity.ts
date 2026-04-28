import { HobbyEntity as IHobby } from '@hobbies-dashboard/types';
import { ApiProperty } from '@nestjs/swagger';
import { HobbyCategory, HobbyStatus } from '../../../generated/prisma/enums';
import { HobbyModel } from '../../../generated/prisma/models';

export class HobbyEntity implements HobbyModel, IHobby {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  color: string;

  @ApiProperty({ type: String })
  icon: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ enum: HobbyCategory })
  category: HobbyCategory;

  @ApiProperty({ enum: HobbyStatus })
  status: HobbyStatus;

  @ApiProperty({ type: Number })
  id: number;
}
