import type {
  CreateEntryDto,
  EntryEntity,
  EntryFilterDto,
  EntryWithUserHobbyEntity,
  PaginatedEntity,
  PublicEntryFilterDto,
  UpdateEntryDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/entry";

export const entryService = {
  async create(data: CreateEntryDto) {
    const res = await api.post<EntryEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll({ page = 1, limit = 10, ...filter }: EntryFilterDto = {}) {
    const res = await api.get<PaginatedEntity<EntryWithUserHobbyEntity>>(
      `${serviceRoute}`,
      { params: { page, limit, ...filter } },
    );
    return res.data;
  },

  async findAllPublic({
    page = 1,
    limit = 10,
    ...filter
  }: PublicEntryFilterDto = {}) {
    const res = await api.get<PaginatedEntity<EntryWithUserHobbyEntity>>(
      `${serviceRoute}/public`,
      { params: { page, limit, ...filter } },
    );
    return res.data;
  },

  async update(id: number, data: UpdateEntryDto) {
    const res = await api.patch<EntryEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`${serviceRoute}/${id}`);
    return res.data;
  },
};
