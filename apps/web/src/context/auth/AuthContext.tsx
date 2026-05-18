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
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: () => {},
});

export default AuthContext;
