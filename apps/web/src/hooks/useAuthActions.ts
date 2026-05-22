import { useState } from "react";
import { authService } from "../services/auth";
import { showToast } from "../utils/toast";

export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);

  async function forgot(email: string) {
    setIsLoading(true);
    try {
      const data = await authService.forgot(email);

      if (data.status === "SUCCESS") {
        showToast.success(data.message);
      } else {
        showToast.error(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function resendVerification(email: string) {
    setIsLoading(true);
    try {
      const data = await authService.resendVerification(email);

      if (data.status === "SUCCESS") {
        showToast.success(data.message);
      } else {
        showToast.error(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function verify(token: string) {
    try {
      await authService.verify(token);
    } catch (error) {
      showToast.error(error as string);
      console.log("Error verifying token");
    }
  }

  return { isLoading, forgot, resendVerification, verify };
}
