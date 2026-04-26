import AuthLayout from "../components/layout/AuthLayout";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { showToast } from "../utils/toast";

function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const handleModeChange = (m: "login" | "signup") => {
    navigate(`/auth?mode=${m}`, { replace: true });
  };
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      if (mode === "login") {
        await login(email, password);
        showToast.success("Welcome back! ✨");
      } else {
        const username = (
          form.elements.namedItem("username") as HTMLInputElement
        ).value;
        await register(username, email, password);
        showToast.success("Your space is ready 🌸");
      }
      navigate("/dashboard");
    } catch (err) {
      showToast.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="self-start flex gap-2 items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={14} />
          <a href="/" className="text-sm">
            Back to Hobbly
          </a>
        </div>

        {/* Main card */}
        <Card className="items-center p-10 shadow-xl mb-6">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="text-center text-lg xs:text-2xl">
              {mode === "login" ? "Welcome back ✨" : "Create your space 🌸"}
            </h2>
            <span className="text-center text-sm text-muted-foreground">
              {mode === "login"
                ? "Welcome back to your space"
                : "Start your cozy hobby journey"}
            </span>
          </div>

          {/* Switch */}
          <div className="flex flex-col xs:flex-row bg-accent rounded-2xl xs:rounded-full w-full py-1.5 px-2 mb-6">
            {(["login", "signup"] as const).map(m => {
              return (
                <Button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  variant={mode === m ? "default" : "transparent"}
                  shape="pill"
                  className="border-none"
                  fullWidth
                >
                  {m === "login" ? "Log in" : "Sign up"}
                </Button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col w-full mb-8">
            {mode === "signup" && (
              <div className="flex flex-col mb-6">
                <label htmlFor="username" className="mb-2 ml-2">
                  Username
                </label>
                <Input
                  id="username"
                  variant="auth"
                  shape="pill"
                  fullWidth
                  placeholder="starweaver"
                  textCase="lowercase"
                />
              </div>
            )}

            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-2 ml-2">
                {mode === "login" ? "Email or Username" : "Email"}
              </label>
              <Input
                id="email"
                variant="auth"
                shape="pill"
                type="text"
                fullWidth
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 ml-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  variant="auth"
                  shape="pill"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  placeholder="••••••••"
                  className="w-full pr-12"
                />
                <Button
                  variant="transparent"
                  shape="pill"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
            </div>

            <a href="#" className="self-end text-hobbly-sky-dark mb-6">
              Forgot password?
            </a>

            <Button
              type="submit"
              variant="gradient"
              shape="pill"
              size="lg"
              fullWidth
              className="max-xs:text-xs"
              disabled={isSubmitting}
            >
              {mode === "login" ? "Log in to Hobbly" : "Create my space"}
            </Button>
          </form>

          <div className="w-full flex justify-center items-center mb-8">
            <div className="flex-1 h-px border border-border"></div>
            <span className="text-muted-foreground text-sm rounded-full bg-card px-2">
              or
            </span>
            <div className="flex-1 h-px border border-border"></div>
          </div>

          {/* Sign in with Google */}
          <Button
            variant="secondary"
            shape="pill"
            size="lg"
            fullWidth
            className="max-xs:text-xs"
          >
            <span className="size-5 max-xs:hidden">
              <svg viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            <span>Continue with Google</span>
          </Button>
        </Card>

        {/* Terms and Policy */}
        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to Hobbly's{" "}
          <a href="#" className="cursor-pointer text-hobbly-sky-dark">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="cursor-pointer text-hobbly-sky-dark">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </AuthLayout>
  );
}

export default AuthPage;
