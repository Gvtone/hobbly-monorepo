import type { UserRole, Visibility } from "./enums";

export interface JwtPayload {
  sub: number;
  displayName?: string | null;
  username: string;
  email: string;
  role: UserRole;
  visibility: Visibility;
  type: "ACCESS" | "REFRESH";
}
