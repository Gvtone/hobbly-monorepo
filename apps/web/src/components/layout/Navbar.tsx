import {
  Sparkles,
  LayoutDashboard,
  Compass,
  User,
  Sun,
  Moon,
  Settings,
  LogOut
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme/useTheme";
import LinkButton from "../ui/LinkButton";
import { useAuth } from "../../context/auth/useAuth";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/explore", label: "Explore", icon: Compass }
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-card sticky top-0 w-full border-b border-border z-50">
      <div className="relative flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo and name */}
        <LinkButton
          to="/"
          variant="transparent"
          shape="pill"
          className="flex gap-2 items-center z-20 p-0"
        >
          <div className="flex justify-center items-center bg-linear-to-br from-hobbly-sky to-hobbly-lavender rounded-full w-8 h-8 shadow shadow-hobbly-sky/30">
            <Sparkles className="text-white" size={16} />
          </div>
          <span className="text-xl font-semibold font-hobbly-serif text-foreground">
            Hobbly
          </span>
        </LinkButton>

        {/* Navigation links/buttons */}
        <div className="md:absolute left-0 right-0 flex justify-center items-center gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <LinkButton
              to={to}
              variant="ghost"
              shape="pill"
              className="hidden xs:flex xs:p-2 md:px-5"
              key={to}
              active={isActive(to)}
            >
              <Icon size={18} />
              <span className="hidden sm:block text-sm">{label}</span>
            </LinkButton>
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

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="rounded-full border-2 border-hobbly-sky-light size-9 overflow-hidden hover:border-hobbly-sky transition-colors cursor-pointer">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    className="w-full h-full object-cover"
                    alt={user.username}
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-hobbly-sky to-hobbly-lavender flex items-center justify-center text-white text-sm font-bold">
                    {user?.username?.[0].toUpperCase()}
                  </div>
                )}
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                className="bg-card border border-border rounded-2xl p-2 shadow-lg w-52 z-50"
                sideOffset={8}
                align="end"
              >
                {/* User info */}
                <div className="px-3 py-2 mb-1 border-b border-border">
                  <p className="font-semibold text-sm truncate">
                    {user?.displayName ?? user?.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{user?.username}
                  </p>
                </div>

                {/* Menu items */}
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-muted transition-colors"
                >
                  <User size={14} />
                  Profile
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-muted transition-colors"
                >
                  <Settings size={14} />
                  Settings
                </button>

                <div className="border-t border-border mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-muted transition-colors text-destructive"
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
