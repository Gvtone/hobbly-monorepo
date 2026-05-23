import type {
  CreateEntryMoodDto,
  EntryMoodEntity,
} from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { entryMoodService } from "../services/entry-mood";
import { showToast } from "../utils/toast";
import { useAuth } from "../context/auth/useAuth";

export function useEntryMood() {
  const [entryMoods, setEntryMoods] = useState<EntryMoodEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchEntryMoods = async () => {
    try {
      const data = await entryMoodService.findAll();
      setEntryMoods(data);
    } catch (error) {
      showToast.error("Failed to load entry moods");
      console.log("Error fetching entry moods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    void fetchEntryMoods();
  }, [user]);

  const addEntryMood = async (data: CreateEntryMoodDto) => {
    await entryMoodService.create(data);
    await fetchEntryMoods();
  };

  const updateEntryMood = async (
    id: number,
    data: Partial<CreateEntryMoodDto>,
  ) => {
    await entryMoodService.update(id, data);
    await fetchEntryMoods();
  };

  const removeEntryMood = async (id: number) => {
    await entryMoodService.delete(id);
    setEntryMoods((prev) =>
      prev.filter((entryMood) => entryMood.id !== Number(id)),
    );
  };

  return {
    entryMoods,
    isLoading,
    addEntryMood,
    updateEntryMood,
    removeEntryMood,
    refresh: fetchEntryMoods,
  };
}
