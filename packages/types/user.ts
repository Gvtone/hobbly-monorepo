import type { UserRole, UserStatus, Visibility } from "./enums";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  status?: UserStatus;
  profilePicture?: string | null;
  coverImage?: string | null;
  displayName?: string;
  bio?: string;
  visibility?: Visibility;
}

export interface PublicUserEntity {
  id: number;
  createdAt: Date;
  displayName: string | null;
  username: string;
  profilePicture: string | null;
  coverImage: string | null;
  bio: string | null;
  visibility: Visibility;
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

export interface UserFilterDto {
  id?: number[];
  search?: string;
  role?: UserRole;
  visibility?: Visibility;
  status?: UserStatus;
  page?: number;
  limit?: number;
}
