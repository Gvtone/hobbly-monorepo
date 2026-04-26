import { Sparkles, Moon, Sun } from "lucide-react";
import Button from "../ui/Button";
import { useTheme } from "../../context/theme/useTheme";
import LinkButton from "../ui/LinkButton";

function LandingNavbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      id="nav-bar"
      className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto"
    >
      {/* Logo and name */}
      <div id="title" className="flex gap-2 items-center">
        <div className="flex justify-center items-center bg-linear-to-br from-hobbly-sky to-hobbly-lavender rounded-full w-8 h-8 shadow shadow-hobbly-sky/30">
          <Sparkles className="text-white" size={16}></Sparkles>
        </div>
        <span className="text-xl font-semibold font-hobbly-serif">Hobbly</span>
      </div>

      {/* Navigation links */}
      <div id="nav-links" className="flex justify-center items-center gap-2">
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
      </div>
    </nav>
  );
}

export default LandingNavbar;
