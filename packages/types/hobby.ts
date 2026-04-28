import { HobbyStatus, HobbyCategory } from "./enums";

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
  category: HobbyCategory;
  status: HobbyStatus;
  id: number;
}
