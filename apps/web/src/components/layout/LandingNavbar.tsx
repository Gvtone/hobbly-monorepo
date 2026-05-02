import { Sparkles, Moon, Sun } from "lucide-react";
import Button from "../ui/Button";
import { useTheme } from "../../context/theme/useTheme";
import LinkButton from "../ui/LinkButton";
import { useAuth } from "../../context/auth/useAuth";

function LandingNavbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <nav
      id="nav-bar"
      className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
    >
      {/* Logo and name */}
      <div id="title" className="flex items-center gap-2">
        <div className="from-hobbly-sky to-hobbly-lavender shadow-hobbly-sky/30 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br shadow">
          <Sparkles className="text-white" size={16}></Sparkles>
        </div>
        <span className="font-hobbly-serif text-xl font-semibold">Hobbly</span>
      </div>

      {/* Navigation links */}
      <div id="nav-links" className="flex items-center justify-center gap-2">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          shape="pill"
          size="icon"
          className="p-2"
        >
          {isDark ? (
            <Sun className="text-muted-foreground" />
          ) : (
            <Moon className="text-muted-foreground" />
          )}
        </Button>
        {user ? (
          <LinkButton to="/dashboard" variant="gradient" shape="pill">
            Go to dashboard
          </LinkButton>
        ) : (
          <>
            <LinkButton
              to="/auth?mode=login"
              variant="transparent"
              shape="pill"
              className="hidden md:inline-flex"
            >
              Log in
            </LinkButton>
            <LinkButton to="/auth?mode=signup" variant="gradient" shape="pill">
              Start for free
            </LinkButton>
          </>
        )}
      </div>
    </nav>
  );
}

export default LandingNavbar;
