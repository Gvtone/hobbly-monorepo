import type { UserRole, UserStatus, Visibility } from "./enums";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface UserEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  displayName: string | null;
  username: string;
  email: string;
  profilePicture: string | null;
  coverImage: string | null;
  bio: string | null;
  role: UserRole;
  visibility: Visibility;
  status: UserStatus;
}
