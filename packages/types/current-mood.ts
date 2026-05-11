export interface CurrentMoodEntity {
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  icon: string;
  color: string;
  description: string;
}

export interface SetCurrentMoodDto {
  icon?: string;
  color?: string;
  description?: string;
}
