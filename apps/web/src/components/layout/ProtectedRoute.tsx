import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import LoadingPage from "../../pages/LoadingPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) return <Navigate to="/auth?mode=login" replace />;

  return <>{children}</>;
}
