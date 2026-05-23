import { useCallback, useEffect, useState } from "react";
import { userHobbyService } from "../services/user-hobby";
import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";

export function usePublicUserHobby(userId: number | null) {
  const [userHobbies, setUserHobbies] = useState<UserHobbyWithHobbyEntity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(userId !== null);

  const fetchUserHobbies = useCallback(async () => {
    if (userId === null) return;
    try {
      const data = await userHobbyService.findAll(userId);
      setUserHobbies(data);
    } catch {
      // no hobbies is a valid state
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void fetchUserHobbies();
  }, [fetchUserHobbies]);

  return { userHobbies, isLoading };
}
