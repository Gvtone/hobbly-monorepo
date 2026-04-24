// packages/types/enums.ts
export type UserRole = "ADMIN" | "HOBBYIST";

export type Visibility = "PRIVATE" | "PUBLIC";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "VERIFY"
  | "DELETED";

export type GenericOutputStatus = "SUCCESS" | "FAILED";
