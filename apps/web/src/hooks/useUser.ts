import type {
  PaginatedOutputEntity,
  UpdateUserDto,
  UserEntity,
  UserFilterDto,
} from "@hobbies-dashboard/types";
import { useCallback, useEffect, useState } from "react";
import { userService } from "../services/user";
import { showToast } from "../utils/toast";

interface UseUserParams {
  limit?: number;
  filter?: Omit<UserFilterDto, "page" | "limit">;
}

export function useUser({ limit = 10, filter }: UseUserParams = {}) {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [currentUser, setCurretUser] = useState<UserEntity>();
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

  const fetchUsers = useCallback(
    async (targetPage: number, append = false) => {
      setIsLoading(true);
      try {
        const { data, ...pagination } = await userService.findAll({
          page: targetPage,
          limit,
          ...filter,
        });
        setUsers((prev) => (append ? [...prev, ...data] : data));
        setMeta(pagination);
        setPage(targetPage);
      } catch (error) {
        showToast.error("Failed to load users");
        console.log("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, filter?.search, filter?.role, filter?.visibility, filter?.status],
  );

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const goToPage = (nextPage: number) => {
    fetchUsers(nextPage);
  };

  const loadMore = async () => {
    if (meta.isLastPage) return;
    await fetchUsers(page + 1, true);
  };

  const updateUser = async (id: number, data: UpdateUserDto) => {
    await userService.update(id, data);
    await fetchUsers(page);
  };

  const updateCurrentUser = async (data: UpdateUserDto) => {
    const updatedUser = await userService.updateCurrentUser(data);
    setCurretUser(updatedUser);
  };

  const deleteCurrentUser = async () => {
    await userService.deleteCurrentUser();
    setCurretUser(undefined);
  };

  const refresh = async () => {
    await fetchUsers(1);
  };

  return {
    users,
    currentUser,
    isLoading,
    page,
    goToPage,
    loadMore,
    hasMore: !meta.isLastPage,
    meta,
    updateUser,
    updateCurrentUser,
    deleteCurrentUser,
    refresh,
  };
}
