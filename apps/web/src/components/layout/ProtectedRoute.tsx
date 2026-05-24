import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import LoadingPage from "../../pages/LoadingPage";
import type { UserRole } from "@hobbies-dashboard/types";
import { showToast } from "../../utils/toast";

interface ProtectedRouteProps {
  role?: UserRole;
  children: React.ReactNode;
}

export default function ProtectedRoute({
  role,
  children,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  const isUnauthorized = !isLoading && !!user && !!role && role !== user.role;

  useEffect(() => {
    if (isUnauthorized) {
      showToast.error("Action not allowed");
    }
  }, [isUnauthorized]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) return <Navigate to="/auth?mode=login" replace />;

  if (role && role !== user.role) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
