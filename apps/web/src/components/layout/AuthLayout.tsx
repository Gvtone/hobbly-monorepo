import { Sparkles } from "lucide-react";
import { moonSky } from "../../assets";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div
        className="sticky top-0 h-screen hidden md:flex items-center justify-center 
        w-1/2 text-white p-12 bg-center bg-cover"
        style={{ backgroundImage: `url(${moonSky})` }}
      >
        <div className="flex flex-col gap-4 justify-center items-center z-1">
          <div className="flex justify-center items-center bg-linear-to-br from from-hobbly-sky to-hobbly-lavender p-4 size-16 rounded-2xl">
            <Sparkles></Sparkles>
          </div>
          <h1 className="text-5xl">Hobbly</h1>
          <span className="text-xl text-center mb-4">
            "A cozy place for everything you love."
          </span>
          <div className="flex flex-wrap justify-center gap-4 text-3xl">
            {["✨", "🎌", "📚", "🎮", "🎨", "🍜", "🎵", "🌿"].map(e => (
              <span
                key={e}
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bg-linear-to-br from-[#0f1b35d9] to-[#5bb3d04d] size-full"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-background p-12">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
