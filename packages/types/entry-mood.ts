export interface EntryMoodEntity {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  icon: string;
}

export interface CreateEntryMoodDto {
  name: string;
  icon: string;
}

export interface UpdateEntryMoodDto extends Partial<CreateEntryMoodDto> {}
