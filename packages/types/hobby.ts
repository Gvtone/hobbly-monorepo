import { HobbyStatus } from "./enums";

export interface CreateHobbyDto {
  name: string;
  color: string;
  icon: string;
  description?: string | null;
}

export interface HobbyEntity {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  color: string;
  icon: string;
  description: string;
  status: HobbyStatus;
  id: number;
}
