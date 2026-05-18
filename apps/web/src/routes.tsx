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
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "explore",
        element: (
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "share/:referenceId",
        element: <ShareProfilePage />,
      },
      {
        path: ":slug",
        element: <ProfilePage />,
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
