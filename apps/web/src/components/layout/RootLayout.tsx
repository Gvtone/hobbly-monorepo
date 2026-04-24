import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../context/theme/ThemeProvider";
import AuthProvider from "../../context/auth/AuthProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
