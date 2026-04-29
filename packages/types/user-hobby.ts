import type { HobbyEntity } from "./hobby";

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
