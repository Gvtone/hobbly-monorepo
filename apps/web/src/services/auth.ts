import api from "./api";
import type {
  AuthPayloadDto,
  CreateUserDto,
  GenericOutputEntity,
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

  async forgot(email: string) {
    const res = await api.post<GenericOutputEntity>(`${serviceRoute}/forgot`, {
      email,
    });
    return res.data;
  },

  async reset(token: string, password: string) {
    const res = await api.post<GenericOutputEntity>(`${serviceRoute}/reset`, {
      token,
      password,
    });
    return res.data;
  },

  async resendVerification(email: string) {
    const res = await api.post<GenericOutputEntity>(
      `${serviceRoute}/resend-verification`,
      { email },
    );
    return res.data;
  },

  async verify(token: string) {
    const res = await api.post<UserEntity>(`${serviceRoute}/verify`, { token });
    return res.data;
  },

  async me() {
    const res = await api.get<UserEntity>(`${serviceRoute}/me`);
    return res.data;
  },
};
