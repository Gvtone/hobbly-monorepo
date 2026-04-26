import { GenericOutputStatus } from "./enums";

export interface GenericOutputEntity {
  status?: GenericOutputStatus | null;
  message: string;
}
