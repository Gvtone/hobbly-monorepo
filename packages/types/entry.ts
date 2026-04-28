import type { Visibility } from "./enums";

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
