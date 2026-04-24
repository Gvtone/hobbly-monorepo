import api from "./api";
import type {
  AuthPayloadDto,
  CreateUserDto,
  UserEntity
} from "@hobbies-dashboard/types";

export const authService = {
  async login(data: AuthPayloadDto) {
    const res = await api.post<UserEntity>("/auth/login", data);
    return res.data;
  },

  async register(data: CreateUserDto) {
    const res = await api.post<UserEntity>("/auth/register", data);
    return res.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },

  async me() {
    const res = await api.get<UserEntity>("/auth/me");
    return res.data;
  }
};
