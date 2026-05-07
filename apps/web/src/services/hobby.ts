import type {
  CreateHobbyDto,
  HobbyEntity,
  UpdateHobbyDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/hobby";

export const hobbyService = {
  async create(data: CreateHobbyDto) {
    const res = await api.post<HobbyEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll() {
    const res = await api.get<HobbyEntity[]>(`${serviceRoute}`);
    return res.data;
  },

  async update(id: number, data: UpdateHobbyDto) {
    const res = await api.put<HobbyEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`${serviceRoute}/${id}`);
    return res.data;
  },
};
