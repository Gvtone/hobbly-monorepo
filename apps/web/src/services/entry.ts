import type {
  CreateEntryDto,
  EntryEntity,
  EntryFilterDto,
  EntryWithUserHobbyEntity,
  PaginatedEntity,
  PublicEntryFilterDto,
  UpdateEntryDto,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/entry";

export const entryService = {
  async create(data: CreateEntryDto, file?: File) {
    const form = new FormData();

    // Append every DTO field as a string — FormData only carries strings or files.
    // Dates become ISO strings; objects (metadata) become JSON strings; nulls are skipped.
    (
      Object.entries(data) as [
        keyof CreateEntryDto,
        CreateEntryDto[keyof CreateEntryDto],
      ][]
    ).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (value instanceof Date) {
        form.append(key, value.toISOString());
      } else if (typeof value === "object") {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, String(value));
      }
    });

    if (file) form.append("image", file);

    const res = await api.post<EntryEntity>(`${serviceRoute}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async findAll({ page = 1, limit = 10, ...filter }: EntryFilterDto = {}) {
    const res = await api.get<PaginatedEntity<EntryWithUserHobbyEntity>>(
      `${serviceRoute}`,
      { params: { page, limit, ...filter } },
    );
    return res.data;
  },

  async findAllPublic({
    page = 1,
    limit = 10,
    ...filter
  }: PublicEntryFilterDto = {}) {
    const res = await api.get<PaginatedEntity<EntryWithUserHobbyEntity>>(
      `${serviceRoute}/public`,
      { params: { page, limit, ...filter } },
    );
    return res.data;
  },

  async update(id: number, data: UpdateEntryDto) {
    const res = await api.patch<EntryEntity>(`${serviceRoute}/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete<EntryEntity>(`${serviceRoute}/${id}`);
    return res.data;
  },
};
