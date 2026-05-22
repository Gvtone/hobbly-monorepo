import { Sparkles } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";

interface AuthLayoutProps {
  subtitle?: string;
  icons?: boolean;
  background?: string;
  children: React.ReactNode;
}

function AuthLayout({
  background,
  subtitle,
  icons,
  children,
}: AuthLayoutProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-screen">
      <div
        className="sticky top-0 hidden h-screen w-1/2 items-center justify-center bg-cover bg-center p-12 text-white lg:flex"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="z-10 flex flex-col items-center justify-center gap-4">
          <div className="from from-hobbly-sky to-hobbly-lavender flex size-16 items-center justify-center rounded-2xl bg-linear-to-br p-4">
            <Sparkles></Sparkles>
          </div>
          <h1 className="text-5xl">Hobbly</h1>
          <span className="mb-4 max-w-sm text-center text-xl">{subtitle}</span>
          {icons && (
            <div className="flex flex-wrap justify-center gap-4 text-3xl">
              {["✨", "🎌", "📚", "🎮", "🎨", "🍜", "🎵", "🌿"].map((e) => (
                <span key={e} className="drop-shadow-xl drop-shadow-black/30">
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="absolute size-full bg-linear-to-br from-[#0f1b35d9] to-[#5bb3d04d]"></div>
      </div>

      <div className="bg-background flex w-full flex-col items-center justify-center p-12 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
