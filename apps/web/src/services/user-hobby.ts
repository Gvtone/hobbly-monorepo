import type {
  CreateUserHobbyDto,
  UpdateUserHobbyDto,
  UserHobbyEntity,
  UserHobbyWithHobbyEntity,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/user-hobby";

export const userHobbyService = {
  async create(data: CreateUserHobbyDto) {
    const res = await api.post<UserHobbyEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll() {
    const res = await api.get<UserHobbyWithHobbyEntity[]>(
      `${serviceRoute}/find-all`,
    );
    return res.data;
  },

  async findById(id: number) {
    const res = await api.get<UserHobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },

  async update(id: number, data: UpdateUserHobbyDto) {
    const res = await api.put<UserHobbyEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete<UserHobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },
};
