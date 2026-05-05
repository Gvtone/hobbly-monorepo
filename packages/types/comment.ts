import type { PublicUserEntity } from "./user";

export interface CommentEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  entryId: number;
  userId: number;
  content: string;
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto extends Partial<CreateCommentDto> {}

export interface CommentWithUserEntity extends CommentEntity {
  user: PublicUserEntity;
}
