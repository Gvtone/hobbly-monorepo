import type {
  EntryWithUserHobbyEntity,
  PaginatedEntity,
  ProfileShareEntity,
  PublicUserEntity,
} from "@hobbies-dashboard/types";
import api from "./api";

const serviceRoute = "/share";

export const profileShareService = {
  async createOrRemake() {
    const res = await api.post<ProfileShareEntity>(`${serviceRoute}`);
    return res.data;
  },

  async findOwnRef() {
    const res = await api.get<ProfileShareEntity>(`${serviceRoute}`);
    return res.data;
  },

  async findByReference(referenceId: string) {
    const res = await api.get<PublicUserEntity>(
      `${serviceRoute}/${referenceId}`,
    );
    return res.data;
  },

  async findEntriesByReference(
    referenceId: string,
    params: { page?: number; limit?: number } = {},
  ) {
    const res = await api.get<PaginatedEntity<EntryWithUserHobbyEntity>>(
      `${serviceRoute}/${referenceId}/entries`,
      { params },
    );
    return res.data;
  },

  async revoke() {
    const res = await api.delete<ProfileShareEntity>(`${serviceRoute}`);
    return res.data;
  },
};
