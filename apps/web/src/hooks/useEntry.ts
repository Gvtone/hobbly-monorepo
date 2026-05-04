import type {
  CreateEntryDto,
  EntryWithUserHobbyEntity,
  PaginatedOutputEntity,
} from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { entryService } from "../services/entry";
import { showToast } from "../utils/toast";

interface UseEntryParams {
  limit?: number;
}

export function useEntry({ limit = 10 }: UseEntryParams = {}) {
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

  const fetchEntries = async (targetPage = page) => {
    setIsLoading(true);
    try {
      const { data, ...pagination } = await entryService.findAll({
        page: targetPage,
        limit,
      });
      setUserEntries(data);
      setMeta(pagination);
    } catch (error) {
      showToast.error("Failed to load entries");
      console.log("Error fetching user entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
  };

  const addEntry = async (data: CreateEntryDto) => {
    await entryService.create(data);
    await fetchEntries(page);
  };

  const updateEntry = async (id: number, data: Partial<CreateEntryDto>) => {
    await entryService.update(id, data);
    await fetchEntries(page);
  };

  const removeEntry = async (id: number) => {
    await entryService.delete(id);
    // If we deleted the last item on a non-first page, go back one page
    const isLastItemOnPage = userEntries.length === 1 && page > 1;
    const targetPage = isLastItemOnPage ? page - 1 : page;
    if (isLastItemOnPage) setPage(targetPage);
    await fetchEntries(targetPage);
  };

  const refresh = async () => {
    await fetchEntries(page);
  };

  return {
    userEntries,
    isLoading,
    page,
    goToPage,
    meta,
    addEntry,
    updateEntry,
    removeEntry,
    refresh,
  };
}
