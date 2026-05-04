import type { GenericOutputStatus } from "./enums";

export interface GenericOutputEntity {
  status?: GenericOutputStatus | null;
  message: string;
}

export interface PaginatedOutputEntity {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}
