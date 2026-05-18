import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export function useRequireAuth() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (fn: () => void) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fn();
  };
}
