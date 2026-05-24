import { useEffect, useState } from "react";
import type { UserEntity } from "@hobbies-dashboard/types";
import { authService } from "../../services/auth";
import AuthContext from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));

    const handleSessionExpired = () => setUser(null);
    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("auth:session-expired", handleSessionExpired);
  }, []);

  async function login(identifier: string, password: string) {
    await authService.login({ identifier, password });
    const user = await authService.me();
    setUser(user);
  }

  async function register(username: string, email: string, password: string) {
    await authService.register({ username, email, password });
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  function updateUser(updatedUser: UserEntity) {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
