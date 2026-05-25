import type {
  CreateHobbyDto,
  HobbyEntity,
  HobbyFilterDto,
  PaginatedEntity,
  UpdateHobbyDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/hobby";

export const hobbyService = {
  async create(data: CreateHobbyDto) {
    const res = await api.post<HobbyEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll({ page = 1, limit = 10, ...filter }: HobbyFilterDto) {
    const res = await api.get<PaginatedEntity<HobbyEntity>>(`${serviceRoute}`, {
      params: { page, limit, ...filter },
    });
    return res.data;
  },

  async update(id: number, data: UpdateHobbyDto) {
    const res = await api.put<HobbyEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete<HobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },
};
