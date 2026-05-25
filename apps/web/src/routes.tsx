/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import AdminPanelPage from "./pages/AdminPanelPage";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ShareProfilePage = lazy(() => import("./pages/ShareProfilePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "auth", Component: AuthPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      { path: "reset-password", Component: ResetPasswordPage },
      { path: "verify-email", Component: VerifyEmailPage },
      {
        path: "admin-panel",
        element: (
          <ProtectedRoute role="ADMIN">
            <AppLayout>
              <AdminPanelPage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "explore",
        element: (
          <ProtectedRoute>
            <AppLayout>
              <ExplorePage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "share/:referenceId",
        element: (
          <AppLayout>
            <ShareProfilePage />
          </AppLayout>
        ),
      },
      {
        path: ":slug",
        element: (
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        ),
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
