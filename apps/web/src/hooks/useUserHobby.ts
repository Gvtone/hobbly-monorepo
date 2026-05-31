import { useCallback, useEffect, useState } from "react";
import { userHobbyService } from "../services/user-hobby";
import type {
  CreateUserHobbyDto,
  UserHobbyWithHobbyEntity,
} from "@hobbies-dashboard/types";
import { showToast } from "../utils/toast";

export function useUserHobby(userId: number | null) {
  const [userHobbies, setUserHobbies] = useState<UserHobbyWithHobbyEntity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(userId !== null);

  const fetchUserHobbies = useCallback(async () => {
    if (userId === null) return;
    try {
      const data = await userHobbyService.findAll(userId);
      setUserHobbies(data);
    } catch (error) {
      showToast.error("Failed to load hobbies");
      console.log("Error fetching user hobbies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserHobbies();
  }, [fetchUserHobbies]);

  const addUserHobby = async (data: CreateUserHobbyDto) => {
    const newHobby = await userHobbyService.create(data);
    await fetchUserHobbies();
    return newHobby;
  };

  const updateUserHobby = async (
    id: number,
    data: Partial<CreateUserHobbyDto>,
    file?: File,
  ) => {
    await userHobbyService.update(id, data, file);
    await fetchUserHobbies();
  };

  const removeUserHobby = async (id: number) => {
    await userHobbyService.delete(id);
    await fetchUserHobbies();
  };

  return {
    userHobbies,
    isLoading,
    addUserHobby,
    updateUserHobby,
    removeUserHobby,
    refresh: fetchUserHobbies,
  };
}
