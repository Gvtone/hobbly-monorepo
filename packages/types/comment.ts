export interface CommentEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  entryId: number;
  userId: number;
  content: string;
}
