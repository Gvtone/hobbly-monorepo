import type { ProfileShareEntity } from "@hobbies-dashboard/types";
import { useEffect, useState } from "react";
import { profileShareService } from "../services/profile-share";
import { showToast } from "../utils/toast";

export function useProfileShare() {
  const [sharedProfile, setSharedProfile] = useState<ProfileShareEntity>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchOwnRef = async () => {
    try {
      const data = await profileShareService.findOwnRef();
      setSharedProfile(data);
    } catch (error) {
      showToast.error("Failed to load profile link");
      console.log("Error fetching profile link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnRef();
  }, []);

  const createOrRemake = async () => {
    setIsLoading(true);
    const data = await profileShareService.createOrRemake();
    setSharedProfile(data);
    showToast.success(
      `Successfully ${sharedProfile ? "created new" : "generated"} share link`,
    );
    setIsLoading(false);
  };

  const revoke = async () => {
    setIsLoading(true);
    await profileShareService.revoke();
    setSharedProfile(undefined);
    showToast.success("Successfully revoked share link");
    setIsLoading(false);
  };

  return { sharedProfile, isLoading, createOrRemake, revoke };
}
