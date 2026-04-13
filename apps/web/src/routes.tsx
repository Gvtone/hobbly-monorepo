import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "auth", Component: AuthPage },
      { path: "*", Component: NotFoundPage }
    ]
  }
]);
