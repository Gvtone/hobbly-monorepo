import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  UserRole,
  UserStatus,
  Visibility,
} from '../../../generated/prisma/enums';
import { UserModel } from '../../../generated/prisma/models';
import { Exclude } from 'class-transformer';
import type {
  UserEntity as IUserEntity,
  PublicUserEntity as IPublicUserEntity,
} from '@hobbies-dashboard/types';

export class PublicUserEntity implements IPublicUserEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  displayName: string | null;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  profilePicture: string | null;

  @ApiProperty({ type: String })
  coverImage: string;

  @ApiProperty({ type: String })
  bio: string;

  @ApiProperty({ enum: Visibility })
  visibility: Visibility;
}

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

  @ApiProperty({ type: String })
  googleId: string;

  @Exclude()
  @ApiHideProperty()
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
