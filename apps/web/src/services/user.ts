import type {
  PaginatedEntity,
  PublicUserEntity,
  UpdateUserDto,
  UserEntity,
  UserFilterDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/user";

export const userService = {
  async findAll(filter: UserFilterDto) {
    const res = await api.get<PaginatedEntity<UserEntity>>(`${serviceRoute}`, {
      params: { ...filter },
    });
    return res.data;
  },

  async findCurrentUser() {
    const res = await api.get<UserEntity>(`${serviceRoute}/current-user`);
    return res.data;
  },

  async findUserByUsernamePublic(username: string) {
    const res = await api.get<PublicUserEntity>(
      `${serviceRoute}/public/${username}`,
    );
    return res.data;
  },

  async uploadProfilePicture(file: File) {
    const form = new FormData();
    form.append("image", file);
    const res = await api.post<UserEntity>(
      `${serviceRoute}/upload/profile-picture`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },

  async removeProfilePicture() {
    const res = await api.post<UserEntity>(
      `${serviceRoute}/remove/profile-picture`,
    );
    return res.data;
  },

  async uploadCoverImage(file: File) {
    const form = new FormData();
    form.append("image", file);
    const res = await api.post<UserEntity>(
      `${serviceRoute}/upload/cover-image`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },

  async removeCoverImage() {
    const res = await api.post<UserEntity>(
      `${serviceRoute}/remove/cover-image`,
    );
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
