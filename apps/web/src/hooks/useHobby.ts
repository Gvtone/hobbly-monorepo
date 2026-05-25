import { useCallback, useEffect, useState } from "react";
import { showToast } from "../utils/toast";
import type {
  CreateHobbyDto,
  HobbyEntity,
  HobbyFilterDto,
  PaginatedOutputEntity,
  UpdateHobbyDto,
} from "@hobbies-dashboard/types";
import { hobbyService } from "../services/hobby";

interface UseHobbyParams {
  limit?: number;
  filter?: Omit<HobbyFilterDto, "page" | "limit">;
}

export function useHobby({ limit = 20, filter }: UseHobbyParams = {}) {
  const [hobbies, setHobbies] = useState<HobbyEntity[]>([]);
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

  const fetchHobbies = useCallback(
    async (targetPage: number, append = false) => {
      setIsLoading(true);
      try {
        const { data, ...pagination } = await hobbyService.findAll({
          page: targetPage,
          limit,
          ...filter,
        });
        setHobbies((prev) => (append ? [...prev, ...data] : data));
        setMeta(pagination);
        setPage(targetPage);
      } catch (error) {
        showToast.error("Failed to load hobbies");
        console.log("Error fetching hobbies:", error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, filter?.search, filter?.category, filter?.status],
  );

  useEffect(() => {
    fetchHobbies(1);
  }, [fetchHobbies]);

  const goToPage = (nextPage: number) => {
    fetchHobbies(nextPage);
  };

  const loadMore = async () => {
    if (meta.isLastPage) return;
    await fetchHobbies(page + 1, true);
  };

  const addHobby = async (data: CreateHobbyDto) => {
    await hobbyService.create(data);
    await fetchHobbies(1);
  };

  const updateHobby = async (id: number, data: UpdateHobbyDto) => {
    await hobbyService.update(id, data);
    await fetchHobbies(page);
  };

  const removeHobby = async (id: number) => {
    await hobbyService.delete(id);
    const isLastItemOnPage = hobbies.length === 1 && page > 1;
    await fetchHobbies(isLastItemOnPage ? page - 1 : page);
  };

  const refresh = async () => {
    await fetchHobbies(1);
  };

  return {
    hobbies,
    isLoading,
    page,
    goToPage,
    loadMore,
    hasMore: !meta.isLastPage,
    meta,
    addHobby,
    updateHobby,
    removeHobby,
    refresh,
  };
}
