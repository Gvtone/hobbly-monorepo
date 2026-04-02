export interface User {
  id: number;
  username: string;
  createdAt: Date;
}

export interface AnimeEntry {
  id: number;
  malId: number;
  title: string;
  imageUrl: string;
  status: "watching" | "completed" | "planned" | "dropped";
}

export interface GameEntry {
  id: number;
  rawgId: number;
  title: string;
  imageUrl: string;
  status: "playing" | "completed" | "backlog" | "dropped";
}
