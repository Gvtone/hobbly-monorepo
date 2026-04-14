import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import ExplorePage from "./pages/ExplorePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "auth", Component: AuthPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "profile", Component: ProfilePage },
      { path: "explore", Component: ExplorePage },
      { path: "*", Component: NotFoundPage }
    ]
  }
]);
