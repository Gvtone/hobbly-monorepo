import { useCallback, useState } from "react";
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

  async function reset(token: string, password: string) {
    setIsLoading(true);
    try {
      const data = await authService.reset(token, password);

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

  const verify = useCallback(async (token: string): Promise<boolean> => {
    try {
      await authService.verify(token);
      return true;
    } catch (error) {
      showToast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      return false;
    }
  }, []);

  return { isLoading, forgot, reset, resendVerification, verify };
}
