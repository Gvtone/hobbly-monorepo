import type { CreateEntryDto, EntryEntity } from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/entry";

export const entryService = {
  async create(data: CreateEntryDto) {
    const res = await api.post<EntryEntity>(`${serviceRoute}`, data);
    return res.data;
  },

  async findAll() {
    const res = await api.get<EntryEntity[]>(`${serviceRoute}`);
    return res.data;
  },

  async update(id: number, data: Partial<CreateEntryDto>) {
    const res = await api.patch<EntryEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`${serviceRoute}/${id}`);
    return res.data;
  },
};
