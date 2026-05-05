import api from "./api";

const serviceRoute = "/entry";

export const likeService = {
  async toggle(id: number) {
    const res = await api.post<{ liked: boolean }>(
      `${serviceRoute}/${id}/like/toggle`,
    );
    return res.data;
  },

  async status(id: number) {
    const res = await api.get<{
      liked: boolean;
      count: number;
    }>(`${serviceRoute}/${id}/like/status`);
    return res.data;
  },
};
