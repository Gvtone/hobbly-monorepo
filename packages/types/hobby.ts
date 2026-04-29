import type { HobbyStatus, HobbyCategory } from "./enums";

export interface CreateHobbyDto {
  name: string;
  color: string;
  icon: string;
  description?: string | null;
}

export interface UpdateHobbyDto extends Partial<CreateHobbyDto> {}

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
