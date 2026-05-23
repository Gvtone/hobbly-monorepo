import {
  Sparkles,
  LayoutDashboard,
  Compass,
  User,
  Sun,
  Moon,
  Settings,
  LogOut,
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

  const isProd = import.meta.env.VITE_NODE_ENV === "production";

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: `/@${user?.username}`, label: "Profile", icon: User },
    { to: "/explore", label: "Explore", icon: Compass, devOnly: true },
  ].filter((nav) => !isProd || !nav.devOnly);

  const handleLogout = async () => {
    await logout();
    await navigate("/");
  };

  return (
    <nav className="bg-card border-border sticky top-0 z-50 w-full border-b">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo and name */}
        <LinkButton
          to="/"
          variant="transparent"
          shape="pill"
          className="z-20 flex items-center gap-2 p-0"
        >
          <div className="from-hobbly-sky to-hobbly-lavender shadow-hobbly-sky/30 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br shadow">
            <Sparkles className="text-white" size={16} />
          </div>
          <span className="font-hobbly-serif text-foreground text-xl font-semibold">
            Hobbly
          </span>
        </LinkButton>

        {/* Navigation links/buttons */}
        {user && (
          <>
            <div className="right-0 left-0 flex items-center justify-center gap-2 md:absolute">
              {navItems.map(({ to, label, icon: Icon }) => (
                <LinkButton
                  to={to}
                  variant="ghost"
                  shape="pill"
                  className="xs:flex xs:p-2 hidden md:px-5"
                  key={to}
                  active={isActive(to)}
                >
                  <Icon size={18} />
                  <span className="hidden text-sm sm:block">{label}</span>
                </LinkButton>
              ))}
            </div>
          </>
        )}

        {/* Right Side */}
        <div className="z-20 flex gap-2">
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

          {user && (
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="border-hobbly-sky-light hover:border-hobbly-sky size-9 cursor-pointer overflow-hidden rounded-full border-2 transition-colors">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      className="h-full w-full object-cover"
                      alt={user.username}
                    />
                  ) : (
                    <div className="from-hobbly-sky to-hobbly-lavender flex h-full w-full items-center justify-center bg-linear-to-br text-sm font-bold text-white">
                      {user?.username?.[0].toUpperCase()}
                    </div>
                  )}
                </button>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  className="bg-card border-border z-50 w-52 rounded-2xl border p-2 shadow-lg"
                  sideOffset={8}
                  align="end"
                >
                  {/* User info */}
                  <div className="border-border mb-1 border-b px-3 py-2">
                    <p className="truncate text-sm font-semibold">
                      {user?.displayName ?? user?.username}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      @{user?.username}
                    </p>
                  </div>

                  {/* Menu items */}
                  <button
                    onClick={() => void navigate("/profile")}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors"
                  >
                    <User size={14} />
                    Profile
                  </button>

                  <button
                    onClick={() => void navigate("/settings")}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors"
                  >
                    <Settings size={14} />
                    Settings
                  </button>

                  <div className="border-border mt-1 border-t pt-1">
                    <button
                      onClick={void handleLogout}
                      className="hover:bg-muted text-destructive flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors"
                    >
                      <LogOut size={14} />
                      Log out
                    </button>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
