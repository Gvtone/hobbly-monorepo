import api from "./api";
import type {
  AuthPayloadDto,
  CreateUserDto,
  UserEntity,
} from "@hobbies-dashboard/types";

const serviceRoute = "/auth";

export const authService = {
  async login(data: AuthPayloadDto) {
    const res = await api.post<UserEntity>(`${serviceRoute}/login`, data);
    return res.data;
  },

  async register(data: CreateUserDto) {
    const res = await api.post<UserEntity>(`${serviceRoute}/register`, data);
    return res.data;
  },

  async logout() {
    await api.post(`${serviceRoute}/logout`);
  },

  async me() {
    const res = await api.get<UserEntity>(`${serviceRoute}/me`);
    return res.data;
  },
};
