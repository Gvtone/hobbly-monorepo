import { createContext } from "react";
import type { UserEntity } from "@hobbies-dashboard/types";

interface AuthContextType {
  user: UserEntity | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: UserEntity) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUser: () => undefined,
});

export default AuthContext;
