import type {
  CreateUserHobbyDto,
  UpdateUserHobbyDto,
  UserHobbyEntity
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/user-hobby";

export const userHobbyService = {
  async create(data: CreateUserHobbyDto) {
    const res = await api.post<UserHobbyEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll() {
    const res = await api.get<UserHobbyEntity[]>(`${serviceRoute}/find-all`);
    return res.data;
  },

  async findById(id: string) {
    const res = await api.get<UserHobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },

  async update(id: string, data: UpdateUserHobbyDto) {
    const res = await api.put<UserHobbyEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: string) {
    const res = await api.delete<UserHobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  }
};
