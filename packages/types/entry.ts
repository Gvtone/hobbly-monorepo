import type { EntryMoodEntity } from "./entry-mood";
import type { Visibility } from "./enums";
import type { UserHobbyWithHobbyAndUserEntity } from "./user-hobby";

type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface CreateEntryDto {
  userHobbyId: number;
  title?: string;
  image?: string;
  moodId?: number;
  note?: string;
  activityDate?: Date;
  visibility?: Visibility;
  metadata?: JsonValue;
}

export interface UpdateEntryDto extends Partial<CreateEntryDto> {}

export interface EntryFilterDto {
  userId?: number;
  search?: string;
  hobbyId?: number[];
  moodId?: number[];
  visibility?: Visibility;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface PublicEntryFilterDto {
  userId?: number;
  search?: string;
  hobbyId?: number[];
  moodId?: number[];
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface EntryEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userHobbyId: number;
  title: string;
  image: string;
  moodId: number;
  note: string;
  activityDate: Date;
  visibility: Visibility;
  metadata: JsonValue;
}

export interface EntryWithUserHobbyEntity extends EntryEntity {
  userHobby: UserHobbyWithHobbyAndUserEntity;
  mood: EntryMoodEntity;
}
