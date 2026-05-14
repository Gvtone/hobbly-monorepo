import type {
  EntryWithUserHobbyEntity,
  PaginatedOutputEntity,
} from "@hobbies-dashboard/types";
import { useCallback, useEffect, useState } from "react";
import { entryService } from "../services/entry";

interface UsePublicEntryParams {
  userId: number | null;
  limit?: number;
}

export function usePublicEntry({ userId, limit = 10 }: UsePublicEntryParams) {
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
    [userId, limit],
  );

  useEffect(() => {
    fetchEntries(1);
  }, [fetchEntries]);

  const loadMore = async () => {
    if (meta.isLastPage) return;
    await fetchEntries(page + 1, true);
  };

  return {
    entries,
    isLoading,
    loadMore,
    hasMore: !meta.isLastPage,
    meta,
  };
}
