import type {
  EntryWithUserHobbyEntity,
  PaginatedOutputEntity,
} from "@hobbies-dashboard/types";
import { useCallback, useEffect, useState } from "react";
import { profileShareService } from "../services/profile-share";

export function useShareEntry(referenceId: string | undefined, limit = 10) {
  const [entries, setEntries] = useState<EntryWithUserHobbyEntity[]>([]);
  const [isLoading, setIsLoading] = useState(referenceId !== undefined);
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
      if (!referenceId) return;
      setIsLoading(true);
      try {
        const { data, ...pagination } =
          await profileShareService.findEntriesByReference(referenceId, {
            page: targetPage,
            limit,
          });
        setEntries((prev) => (append ? [...prev, ...data] : data));
        setMeta(pagination);
        setPage(targetPage);
      } catch {
        // invalid or expired share link — handled at page level
      } finally {
        setIsLoading(false);
      }
    },
    [referenceId, limit],
  );

  useEffect(() => {
    fetchEntries(1);
  }, [fetchEntries]);

  const loadMore = async () => {
    if (meta.isLastPage) return;
    await fetchEntries(page + 1, true);
  };

  return { entries, isLoading, loadMore, hasMore: !meta.isLastPage, meta };
}
