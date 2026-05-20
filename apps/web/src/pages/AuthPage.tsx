import AuthLayout from "../components/layout/AuthLayout";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { showToast } from "../utils/toast";
import { useController, useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues extends LoginFormValues {
  username: string;
}

function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const handleModeChange = (m: "login" | "signup") => {
    reset();
    navigate(`/auth?mode=${m}`, { replace: true });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SignupFormValues>({ shouldUnregister: true });

  const { field: usernameField } = useController({
    name: "username",
    control,
    rules:
      mode === "signup"
        ? {
            required: "Username is required",
            minLength: { value: 3, message: "At least 3 characters" },
            maxLength: { value: 20, message: "At most 20 characters" },
            pattern: {
              value: /^[a-z0-9_]+$/,
              message: "Only lowercase letters, numbers, and underscores",
            },
          }
        : {},
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(data.email, data.password);
        showToast.success("Welcome back! ✨");
      } else {
        await registerUser(data.username, data.email, data.password);
        showToast.success("Your space is ready 🌸");
      }
      navigate("/dashboard");
    } catch (err) {
      showToast.error(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 self-start">
          <ArrowLeft size={14} />
          <a href="/" className="text-sm">
            Back to Hobbly
          </a>
        </div>

        {/* Main card */}
        <Card className="mb-6 items-center p-10 shadow-xl">
          <div className="mb-8 flex flex-col items-center gap-2">
            <h2 className="xs:text-2xl text-center text-lg">
              {mode === "login" ? "Welcome back ✨" : "Create your space 🌸"}
            </h2>
            <span className="text-muted-foreground text-center text-sm">
              {mode === "login"
                ? "Welcome back to your space"
                : "Start your cozy hobby journey"}
            </span>
          </div>

          {/* Switch */}
          <div className="xs:flex-row bg-accent xs:rounded-full mb-6 flex w-full flex-col rounded-2xl px-2 py-1.5">
            {(["login", "signup"] as const).map((m) => {
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-8 flex w-full flex-col"
          >
            {mode === "signup" && (
              <div className="mb-6 flex flex-col">
                <label htmlFor="username" className="mb-2 ml-2">
                  Username
                </label>
                <Input
                  id="username"
                  variant="auth"
                  shape="pill"
                  fullWidth
                  placeholder="starweaver"
                  {...usernameField}
                  onChange={(e) => {
                    const cleaned = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9_]/g, "");
                    usernameField.onChange(cleaned);
                  }}
                />
                {errors.username && (
                  <p className="text-destructive mt-1 ml-2 text-xs">
                    {errors.username.message}
                  </p>
                )}
              </div>
            )}

            <div className="mb-6 flex flex-col">
              <label htmlFor="email" className="mb-2 ml-2">
                {mode === "login" ? "Email or Username" : "Email"}
              </label>
              <Input
                id="email"
                variant="auth"
                shape="pill"
                type="text"
                fullWidth
                placeholder={
                  mode === "login"
                    ? "you@example.com or username"
                    : "you@example.com"
                }
                {...register("email", {
                  required: "Email or username is required",
                  validate: (value) => {
                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    const isUsername = /^[^\s]{3,}$/.test(value);
                    if (mode === "login")
                      return (
                        isEmail ||
                        isUsername ||
                        "Enter a valid email or username"
                      );
                    return isEmail || "Enter a valid email";
                  },
                })}
              />
              {errors.email && (
                <p className="text-destructive mt-1 ml-2 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-2 flex flex-col">
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
                  {...register(
                    "password",
                    mode === "signup"
                      ? {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "At least 8 characters",
                          },
                          pattern: {
                            value: /(?=.*[A-Z])/,
                            message:
                              "Must contain at least one uppercase letter",
                          },
                        }
                      : {
                          required: "Password is required",
                        },
                  )}
                />
                <Button
                  type="button"
                  variant="transparent"
                  shape="pill"
                  size="icon"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-destructive mt-1 ml-2 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <a href="#" className="text-hobbly-sky-dark mb-6 self-end text-sm">
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
              {isSubmitting
                ? "Please wait..."
                : mode === "login"
                  ? "Log in to Hobbly"
                  : "Create my space"}
            </Button>
          </form>

          {import.meta.env.VITE_NODE_ENV !== "production" && (
            <>
              <div className="mb-8 flex w-full items-center justify-center">
                <div className="border-border h-px flex-1 border"></div>
                <span className="text-muted-foreground bg-card rounded-full px-2 text-sm">
                  or
                </span>
                <div className="border-border h-px flex-1 border"></div>
              </div>

              {/* Sign in with Google */}
              <Button
                variant="secondary"
                shape="pill"
                size="lg"
                fullWidth
                className="max-xs:text-xs"
              >
                <span className="max-xs:hidden size-5">
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
            </>
          )}
        </Card>

        {/* Terms and Policy */}
        <p className="text-muted-foreground text-center text-xs">
          By continuing, you agree to Hobbly's{" "}
          <a href="#" className="text-hobbly-sky-dark cursor-pointer">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-hobbly-sky-dark cursor-pointer">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </AuthLayout>
  );
}

export default AuthPage;
