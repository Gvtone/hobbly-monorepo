import { Sparkles, Moon } from "lucide-react";
import Button from "../ui/Button";

function LandingNavbar() {
  return (
    <nav
      id="nav-bar"
      className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto"
    >
      <div id="title" className="flex gap-2 items-center">
        <div className="flex justify-center items-center bg-linear-to-br from-hobbly-sky to-hobbly-lavender rounded-full w-8 h-8 shadow shadow-hobbly-sky/30">
          <Sparkles className="text-background" size={16}></Sparkles>
        </div>
        <span className="text-xl font-semibold font-hobbly-serif">Hobbly</span>
      </div>

      <div id="nav-links" className="flex justify-center items-center gap-2">
        <Button variant="ghost" shape="pill" size="icon" className="p-2">
          <Moon className="text-muted-foreground" />
        </Button>
        <Button
          variant="transparent"
          shape="pill"
          className="hidden md:inline-flex"
        >
          Log in
        </Button>
        <Button variant="gradient" shape="pill">
          Start for free
        </Button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
