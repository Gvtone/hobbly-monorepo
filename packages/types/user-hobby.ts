import type { HobbyEntity } from "./hobby";
import type { UserEntity } from "./user";

export interface CreateUserHobbyDto {
  hobbyId: number;
  backgroundImage?: string;
}

export interface UpdateUserHobbyDto extends Partial<CreateUserHobbyDto> {}

export interface UserHobbyEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  hobbyId: number;
  backgroundImage: string;
}

export interface UserHobbyWithHobbyEntity extends UserHobbyEntity {
  hobby: HobbyEntity;
}

export interface UserHobbyWithHobbyAndUserEntity extends UserHobbyWithHobbyEntity {
  user: UserEntity;
}
