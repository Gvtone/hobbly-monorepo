import type {
  CurrentMoodEntity,
  SetCurrentMoodDto,
} from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { currentMoodService } from "../services/current-mood";
import { showToast } from "../utils/toast";

export function useCurrentMood() {
  const [currentMood, setCurrentMood] = useState<CurrentMoodEntity | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentMood = async () => {
      try {
        const data = await currentMoodService.findOne();
        setCurrentMood(data);
      } catch (error) {
        showToast.error("Failed to load current mood");
        console.error("Error fetching current mood:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentMood();
  }, []);

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
