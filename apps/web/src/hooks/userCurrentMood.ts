import type {
  CurrentMoodEntity,
  SetCurrentMoodDto,
} from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { currentMoodService } from "../services/current-mood";
import { showToast } from "../utils/toast";

export function useCurrentMood(userId: number) {
  const [currentMood, setCurrentMood] = useState<CurrentMoodEntity | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentMood = async () => {
      try {
        const data = await currentMoodService.findOne(userId);
        setCurrentMood(data);
      } catch {
        // 404 means no mood set — valid state, nothing to show
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCurrentMood();
  }, [userId]);

  const setOrUpdateCurrentMood = async (data: SetCurrentMoodDto) => {
    setIsLoading(true);
    try {
      const newData = await currentMoodService.setOrUpdate(data);
      setCurrentMood(newData);
    } catch (error) {
      showToast.error("Failed to create or update current mood");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCurrentMood = async () => {
    try {
      await currentMoodService.delete();
      setCurrentMood(undefined);
    } catch (error) {
      showToast.error("Failed to create or update current mood");
      console.error(error);
    }
  };

  return { currentMood, isLoading, setOrUpdateCurrentMood, removeCurrentMood };
}
