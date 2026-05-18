import type {
  PublicUserEntity,
  UpdateUserDto,
  UserEntity,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/user";

export const userService = {
  async findAll() {
    const res = await api.get<UserEntity[]>(`${serviceRoute}`);
    return res.data;
  },

  async findCurrentUser() {
    const res = await api.get<UserEntity>(`${serviceRoute}/current-user`);
    return res.data;
  },

  async findUserByUsername(username: string) {
    const res = await api.get<PublicUserEntity>(`${serviceRoute}/${username}`);
    return res.data;
  },

  async updateCurrentUser(data: UpdateUserDto) {
    const res = await api.patch<UserEntity>(
      `${serviceRoute}/current-user`,
      data,
    );
    return res.data;
  },

  async update(id: number, data: UpdateUserDto) {
    const res = await api.patch<UserEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async deleteCurrentUser() {
    const res = await api.delete<UserEntity>(`${serviceRoute}/current-user`);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete<UserEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },
};
