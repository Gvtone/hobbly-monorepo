import type {
  EntryWithUserHobbyEntity,
  PaginatedOutputEntity,
} from "@hobbies-dashboard/types";
import { useCallback, useEffect, useState } from "react";
import { entryService } from "../services/entry";

interface UsePublicEntryParams {
  userId: number | null;
  limit?: number;
  hobbyId?: number | null;
}

export function usePublicEntry({
  userId,
  limit = 10,
  hobbyId,
}: UsePublicEntryParams) {
  const [entries, setEntries] = useState<EntryWithUserHobbyEntity[]>([]);
  const [isLoading, setIsLoading] = useState(userId !== null);
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
      if (userId === null) return;
      setIsLoading(true);
      try {
        const { data, ...pagination } = await entryService.findAllPublic({
          userId,
          page: targetPage,
          limit,
          hobbyId: hobbyId ? [hobbyId] : undefined,
        });
        setEntries((prev) => (append ? [...prev, ...data] : data));
        setMeta(pagination);
        setPage(targetPage);
      } catch {
        // silently handle — no entries is a valid state
      } finally {
        setIsLoading(false);
      }
    },
    [userId, limit, hobbyId],
  );

  useEffect(() => {
    void fetchEntries(1);
  }, [fetchEntries]);

  const loadMore = async () => {
    if (meta.isLastPage) return;
    await fetchEntries(page + 1, true);
  };

  const refresh = async () => fetchEntries(1);

  return {
    entries,
    isLoading,
    loadMore,
    refresh,
    hasMore: !meta.isLastPage,
    meta,
  };
}
