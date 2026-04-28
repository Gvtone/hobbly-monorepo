import type { HobbyEntity } from "./hobby";

export interface CreateUserHobbyDto {
  hobbyId: number;
  backgroundImage?: string;
}

export interface UserHobbyEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  hobbyId: number;
  backgroundImage: string;
  hobby: HobbyEntity;
}
