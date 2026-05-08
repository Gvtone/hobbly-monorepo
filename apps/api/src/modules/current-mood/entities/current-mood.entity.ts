import { ApiProperty } from '@nestjs/swagger';
import { CurrentMoodModel } from '../../../generated/prisma/models';
import { CurrentMoodEntity as ICurrentMoodEntity } from '@hobbies-dashboard/types';

export class CurrentMoodEntity implements CurrentMoodModel, ICurrentMoodEntity {
  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  icon: string;

  @ApiProperty({ type: String })
  color: string;

  @ApiProperty({ type: String })
  description: string;
}
