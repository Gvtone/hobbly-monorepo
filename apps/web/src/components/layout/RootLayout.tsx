import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../features/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
