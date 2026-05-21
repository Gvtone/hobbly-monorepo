import type { UserRole, UserStatus, Visibility } from "./enums";

export interface AuthPayloadDto {
  identifier: string;
  password: string;
}

export interface JwtPayload {
  sub: number;
  displayName?: string | null;
  username: string;
  email: string;
  role: UserRole;
  visibility: Visibility;
  status: UserStatus;
  type: "ACCESS" | "REFRESH";
}
