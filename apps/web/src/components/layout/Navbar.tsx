import {
  Sparkles,
  LayoutDashboard,
  Compass,
  User,
  Sun,
  Moon
} from "lucide-react";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../features/theme/useTheme";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/explore", label: "Explore", icon: Compass }
  ];

  return (
    <nav className="bg-card sticky top-0 w-full border-b border-border z-50">
      <div className="relative flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo and name */}
        <div id="title" className="flex gap-2 items-center z-20">
          <div className="flex justify-center items-center bg-linear-to-br from-hobbly-sky to-hobbly-lavender rounded-full w-8 h-8 shadow shadow-hobbly-sky/30">
            <Sparkles className="text-white" size={16}></Sparkles>
          </div>
          <span className="text-xl font-semibold font-hobbly-serif">
            Hobbly
          </span>
        </div>

        {/* Navigation links/buttons */}
        <div className="md:absolute left-0 right-0 flex justify-center items-center gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Button
              variant="ghost"
              shape="pill"
              className="hidden xs:flex xs:p-2 md:px-5"
              key={to}
              active={isActive(to)}
            >
              <Icon size={18} />
              <span className="hidden sm:block text-sm">{label}</span>
            </Button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex gap-2  z-20">
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
          <div className="rounded-full border-2 border-hobbly-sky-light size-8 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1621036189456-895776ffe69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
