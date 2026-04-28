import { ApiProperty } from '@nestjs/swagger';
import { Visibility } from '../../../generated/prisma/enums';
import { EntryModel } from '../../../generated/prisma/models';
import type {
  EntryEntity as IEntryEntity,
  JsonValue,
} from '@hobbies-dashboard/types';

export class EntryEntity implements EntryModel, IEntryEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  userHobbyId: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  image: string;

  @ApiProperty({ type: Number })
  moodId: number;

  @ApiProperty({ type: String })
  note: string;

  @ApiProperty({ type: Date })
  activityDate: Date;

  @ApiProperty({ enum: Visibility })
  visibility: Visibility;

  @ApiProperty({ type: Object })
  metadata: JsonValue;
}
