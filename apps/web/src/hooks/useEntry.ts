import type {
  CreateEntryDto,
  EntryFilterDto,
  EntryWithUserHobbyEntity,
  PaginatedOutputEntity,
} from "@hobbies-dashboard/types";
import { useCallback, useEffect, useState } from "react";
import { entryService } from "../services/entry";
import { showToast } from "../utils/toast";

interface UseEntryParams {
  limit?: number;
  enabled?: boolean;
  hobbyId?: number | null;
  filter?: Omit<EntryFilterDto, "page" | "limit" | "hobbyId">;
}

export function useEntry({
  limit = 10,
  enabled = true,
  hobbyId,
  filter,
}: UseEntryParams = {}) {
  const [userEntries, setUserEntries] = useState<EntryWithUserHobbyEntity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginatedOutputEntity>({
    currentPage: 1,
    isFirstPage: true,
    isLastPage: true,
    previousPage: null,
    nextPage: null,
    pageCount: 1,
    totalCount: 0,
  });

  const fetchEntries = useCallback(
    async (targetPage: number, append = false) => {
      if (!enabled) return;
      setIsLoading(true);
      try {
        const { data, ...pagination } = await entryService.findAll({
          page: targetPage,
          limit,
          hobbyId: hobbyId ? [hobbyId] : undefined,
          ...filter,
        });
        setUserEntries((prev) => (append ? [...prev, ...data] : data));
        setMeta(pagination);
        setPage(targetPage);
      } catch (error) {
        showToast.error("Failed to load entries");
        console.log("Error fetching user entries:", error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled, limit, hobbyId, filter?.visibility],
  );

  useEffect(() => {
    fetchEntries(1);
  }, [fetchEntries]);

  const goToPage = (nextPage: number) => {
    fetchEntries(nextPage);
  };

  const loadMore = async () => {
    if (meta.isLastPage) return;
    await fetchEntries(page + 1, true);
  };

  const addEntry = async (data: CreateEntryDto) => {
    await entryService.create(data);
    await fetchEntries(1);
  };

  const updateEntry = async (id: number, data: Partial<CreateEntryDto>) => {
    await entryService.update(id, data);
    await fetchEntries(page);
  };

  const removeEntry = async (id: number) => {
    await entryService.delete(id);
    const isLastItemOnPage = userEntries.length === 1 && page > 1;
    await fetchEntries(isLastItemOnPage ? page - 1 : page);
  };

  const refresh = async () => {
    await fetchEntries(1);
  };

  return {
    userEntries,
    isLoading,
    page,
    goToPage,
    loadMore,
    hasMore: !meta.isLastPage,
    meta,
    addEntry,
    updateEntry,
    removeEntry,
    refresh,
  };
}
