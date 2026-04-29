import { useEffect, useState } from "react";
import { userHobbyService } from "../services/user-hobby";
import type {
  CreateUserHobbyDto,
  UserHobbyWithHobbyEntity,
} from "@hobbies-dashboard/types";
import { showToast } from "../utils/toast";

export function useUserHobby() {
  const [userHobbies, setUserHobbies] = useState<UserHobbyWithHobbyEntity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserHobbies = async () => {
    try {
      const data = await userHobbyService.findAll();
      setUserHobbies(data);
    } catch (error) {
      showToast.error("Failed to load hobbies");
      console.log("Error fetching user hobbies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserHobbies();
  }, []);

  const addUserHobby = async (data: CreateUserHobbyDto) => {
    const newHobby = await userHobbyService.create(data);
    await fetchUserHobbies();
    return newHobby;
  };

  const updateUserHobby = async (
    id: number,
    data: Partial<CreateUserHobbyDto>,
  ) => {
    await userHobbyService.update(id, data);
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
