import type {
  CreateEntryMoodDto,
  EntryMoodEntity,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/entry-mood";

export const entryMoodService = {
  async create(data: CreateEntryMoodDto) {
    const res = await api.post<EntryMoodEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll() {
    const res = await api.get<EntryMoodEntity[]>(`${serviceRoute}`);
    return res.data;
  },

  async update(id: number, data: Partial<CreateEntryMoodDto>) {
    const res = await api.patch<EntryMoodEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete<EntryMoodEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },
};
