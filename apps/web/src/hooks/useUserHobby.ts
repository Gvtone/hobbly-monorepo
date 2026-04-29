import { useEffect, useState } from "react";
import { userHobbyService } from "../services/user-hobby";
import type {
  CreateUserHobbyDto,
  UserHobbyEntity,
} from "@hobbies-dashboard/types";
import { showToast } from "../utils/toast";

export function useUserHobby() {
  const [userHobbies, setUserHobbies] = useState<UserHobbyEntity[]>([]);
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
    setUserHobbies((prev) => [...prev, newHobby]);
    return newHobby;
  };

  const updateUserHobby = async (
    id: number,
    data: Partial<CreateUserHobbyDto>,
  ) => {
    const updatedHobby = await userHobbyService.update(id, data);
    setUserHobbies((prev) =>
      prev.map((userHobby) => (userHobby.id === id ? updatedHobby : userHobby)),
    );
  };

  const removeUserHobby = async (id: number) => {
    await userHobbyService.delete(id);
    setUserHobbies((prev) => prev.filter((userHobby) => userHobby.id !== id));
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
