import { ApiProperty } from '@nestjs/swagger';
import { Visibility } from '../../../generated/prisma/enums';
import { EntryGetPayload, EntryModel } from '../../../generated/prisma/models';
import type {
  EntryWithUserHobbyEntity as IEntryWithUserHobbyEntity,
  EntryEntity as IEntryEntity,
  JsonValue,
} from '@hobbies-dashboard/types';
import { UserHobbyEntityWithHobbyAndUser } from '../../user-hobby/entities/user-hobby.entity';
import { EntryMoodEntity } from '../../entry-mood/entities/entry-mood.entity';

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

export class EntryEntityWithUserHobby
  extends EntryEntity
  implements
    EntryGetPayload<{
      include: {
        userHobby: {
          include: {
            hobby: true;
            user: {
              select: {
                displayName: true;
                username: true;
                profilePicture: true;
                coverImage: true;
                bio: true;
                visibility: true;
              };
            };
          };
        };
        mood: true;
      };
    }>,
    IEntryWithUserHobbyEntity
{
  @ApiProperty({ type: () => UserHobbyEntityWithHobbyAndUser })
  userHobby: UserHobbyEntityWithHobbyAndUser;

  @ApiProperty({ type: () => EntryMoodEntity })
  mood: EntryMoodEntity;
}
