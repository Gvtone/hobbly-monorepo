import { ApiProperty } from '@nestjs/swagger';
import { EntryMoodModel } from '../../../generated/prisma/models';
import { EntryMoodEntity as IEntryMoodEntity } from '@hobbies-dashboard/types';

export class EntryMoodEntity implements EntryMoodModel, IEntryMoodEntity {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;

  @ApiProperty({ type: String })
  icon: string;
}
