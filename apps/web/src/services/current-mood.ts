import type {
  CurrentMoodEntity,
  SetCurrentMoodDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/current-mood";

export const currentMoodService = {
  async setOrUpdate(data: SetCurrentMoodDto) {
    const res = await api.post<CurrentMoodEntity>(`${serviceRoute}`, data);

    return res.data;
  },

  async findOne(userId: number) {
    const res = await api.get<CurrentMoodEntity>(`${serviceRoute}/${userId}`);

    return res.data;
  },

  async delete() {
    const res = await api.delete<CurrentMoodEntity>(`${serviceRoute}`);

    return res.data;
  },
};
