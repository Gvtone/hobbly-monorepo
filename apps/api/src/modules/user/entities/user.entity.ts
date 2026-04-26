import { ApiProperty } from '@nestjs/swagger';
import {
  UserRole,
  UserStatus,
  Visibility,
} from '../../../generated/prisma/enums';
import { UserModel } from '../../../generated/prisma/models';
import { Exclude } from 'class-transformer';
import type { UserEntity as IUserEntity } from '@hobbies-dashboard/types';

export class UserEntity implements UserModel, IUserEntity {
  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }

  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;

  @ApiProperty({ type: String })
  displayName: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @Exclude()
  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  profilePicture: string;

  @ApiProperty({ type: String })
  coverImage: string;

  @ApiProperty({ type: String })
  bio: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: Visibility })
  visibility: Visibility;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;
}
