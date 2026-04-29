import type {
  CreateEntryDto,
  EntryWithUserHobbyEntity,
} from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { entryService } from "../services/entry";
import { showToast } from "../utils/toast";

export function useEntry() {
  const [userEntries, setUserEntries] = useState<EntryWithUserHobbyEntity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const data = await entryService.findAll();
      setUserEntries(data);
    } catch (error) {
      showToast.error("Failed to load entries");
      console.log("Error fetching user entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async (data: CreateEntryDto) => {
    await entryService.create(data);
    await fetchEntries();
  };

  const updateEntry = async (id: number, data: Partial<CreateEntryDto>) => {
    await entryService.update(id, data);
    await fetchEntries();
  };

  const removeEntry = async (id: number) => {
    await entryService.delete(id);
    setUserEntries((prev) => prev.filter((entry) => entry.id !== Number(id)));
  };

  return {
    userEntries,
    isLoading,
    addEntry,
    updateEntry,
    removeEntry,
    refresh: fetchEntries,
  };
}
