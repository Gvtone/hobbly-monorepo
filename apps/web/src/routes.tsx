import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ShareProfilePage from "./pages/ShareProfilePage";
import DashboardPage from "./pages/DashboardPage";
import ExplorePage from "./pages/ExplorePage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage";
import AppLayout from "./components/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "auth", Component: AuthPage },
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
