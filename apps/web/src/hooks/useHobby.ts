import { useEffect, useState } from "react";
import { showToast } from "../utils/toast";
import type {
  CreateHobbyDto,
  HobbyEntity,
  UpdateHobbyDto,
} from "@hobbies-dashboard/types";
import { hobbyService } from "../services/hobby";

export function useHobby() {
  const [hobbies, setHobbies] = useState<HobbyEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHobbies = async () => {
    try {
      const data = await hobbyService.findAll();
      setHobbies(data);
    } catch (error) {
      showToast.error("Failed to load hobbies");
      console.log("Error fetching hobbies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  const addHobby = async (data: CreateHobbyDto) => {
    const newHobby = await hobbyService.create(data);
    setHobbies((prev) => [...prev, newHobby]);
  };

  const updateHobby = async (id: number, data: UpdateHobbyDto) => {
    const updatedHobby = await hobbyService.update(id, data);
    setHobbies((prev) =>
      prev.map((hobby) => (hobby.id === id ? updatedHobby : hobby)),
    );
  };

  const removeHobby = async (id: number) => {
    await hobbyService.delete(id);
    setHobbies((prev) => prev.filter((hobby) => hobby.id !== Number(id)));
  };

  return {
    hobbies,
    isLoading,
    addHobby,
    updateHobby,
    removeHobby,
    refresh: fetchHobbies,
  };
}
