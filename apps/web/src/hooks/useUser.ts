import type { UpdateUserDto, UserEntity } from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { userService } from "../services/user";
import { showToast } from "../utils/toast";

export function useUser() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [currentUser, setCurretUser] = useState<UserEntity>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await userService.findAll();
      setUsers(data);
    } catch (error) {
      showToast.error("Failed to load users");
      console.log("Error fetching user hobbies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const data = await userService.findCurrentUser();
      setCurretUser(data);
    } catch (error) {
      showToast.error("Failed to load users");
      console.log("Error fetching user hobbies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const updateCurrentUser = async (data: UpdateUserDto) => {
    const updatedUser = await userService.updateCurrentUser(data);
    setCurretUser(updatedUser);
  };

  const deleteCurrentUser = async () => {
    await userService.deleteCurrentUser();
    setCurretUser(undefined);
  };

  return {
    users,
    currentUser,
    isLoading,
    fetchUsers,
    updateCurrentUser,
    deleteCurrentUser,
  };
}
