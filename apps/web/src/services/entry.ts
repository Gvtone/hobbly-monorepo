import type {
  CreateEntryDto,
  EntryEntity,
  EntryWithUserHobbyEntity,
  PaginatedEntity,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/entry";

export const entryService = {
  async create(data: CreateEntryDto) {
    const res = await api.post<EntryEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) {
    const res = await api.get<PaginatedEntity<EntryWithUserHobbyEntity>>(
      `${serviceRoute}`,
      { params: { page, limit } },
    );
    return res.data;
  },

  async update(id: number, data: Partial<CreateEntryDto>) {
    const res = await api.patch<EntryEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`${serviceRoute}/${id}`);
    return res.data;
  },
};
