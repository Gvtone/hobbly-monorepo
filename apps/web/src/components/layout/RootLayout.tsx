import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../context/theme/ThemeProvider";
import AuthProvider from "../../context/auth/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1">
            <Suspense>
              <Outlet />
            </Suspense>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--card)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "14px"
                },
                success: {
                  iconTheme: {
                    primary: "var(--hobbly-green)",
                    secondary: "white"
                  }
                },
                error: {
                  iconTheme: {
                    primary: "var(--destructive)",
                    secondary: "white"
                  }
                }
              }}
            />
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
