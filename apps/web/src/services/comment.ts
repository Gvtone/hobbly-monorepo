import type {
  CommentEntity,
  CommentWithUserEntity,
  CreateCommentDto,
  PaginatedEntity,
  UpdateCommentDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/entry";

export const commentService = {
  async create(id: number, data: CreateCommentDto) {
    const res = await api.post<CommentWithUserEntity>(
      `${serviceRoute}/${id}/comment`,
      data,
    );

    return res.data;
  },

  async findAll(
    id: number,
    { page = 1, limit = 10 }: { page?: number; limit?: number } = {},
  ) {
    const res = await api.get<PaginatedEntity<CommentWithUserEntity>>(
      `${serviceRoute}/${id}/comment`,
      { params: { page, limit } },
    );

    return res.data;
  },

  async update(id: number, commentId: number, data: UpdateCommentDto) {
    const res = await api.patch<CommentWithUserEntity>(
      `${serviceRoute}/${id}/comment/${commentId}`,
      data,
    );

    return res.data;
  },

  async delete(id: number, commentId: number) {
    const res = await api.delete<CommentEntity>(
      `${serviceRoute}/${id}/comment/${commentId}`,
    );

    return res;
  },
};
