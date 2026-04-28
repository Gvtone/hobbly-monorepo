import { useEffect, useState } from "react";
import { userHobbyService } from "../services/user-hobby";
import type { UserHobbyEntity } from "@hobbies-dashboard/types";
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

  const addHobby = async (hobbyId: number) => {
    const newHobby = await userHobbyService.create({ hobbyId });
    setUserHobbies(prev => [...prev, newHobby]);
    return newHobby;
  };

  const removeHobby = async (id: string) => {
    await userHobbyService.delete(id);
    setUserHobbies(prev => prev.filter(h => h.id !== Number(id)));
  };

  return {
    userHobbies,
    isLoading,
    addHobby,
    removeHobby,
    refresh: fetchUserHobbies
  };
}
