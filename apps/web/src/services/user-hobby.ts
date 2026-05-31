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

  async findAll(userId: number) {
    const res = await api.get<UserHobbyWithHobbyEntity[]>(
      `${serviceRoute}/user/${userId}`,
    );
    return res.data;
  },

  async findById(id: number) {
    const res = await api.get<UserHobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },

  async update(id: number, data: UpdateUserHobbyDto, file?: File) {
    const form = new FormData();

    (
      Object.entries(data) as [
        keyof UpdateUserHobbyDto,
        UpdateUserHobbyDto[keyof UpdateUserHobbyDto],
      ][]
    ).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      form.append(key, String(value));
    });

    if (file) form.append("image", file);

    const res = await api.patch<UserHobbyEntity>(
      `${serviceRoute}/${id}`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete<UserHobbyEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },
};
