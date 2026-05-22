import { ArrowLeft, Mail, Send } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import { sky } from "../assets";
import { useState } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import { showToast } from "../utils/toast";
import LinkButton from "../components/ui/LinkButton";

interface ForgotPasswordFormValues {
  email: string;
}

function ForgotPasswordPage() {
  const { isLoading, forgot } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormValues>({ shouldUnregister: true });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsSubmitting(true);
    try {
      await forgot(data.email);
      setIsEmailSent(true);
    } catch (error) {
      showToast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      background={sky}
      subtitle="Don't worry — it happens to the coziest of us. We'll have you back in your space in no time. ✨"
    >
      <div className="w-full max-w-md">
        <div className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 self-start">
          <ArrowLeft size={14} />
          <a href="/auth?mode=login" className="text-sm">
            Back to log in
          </a>
        </div>

        {/* Main card */}
        <Card className="mb-6 items-center p-10 shadow-xl">
          {!isEmailSent ? (
            <>
              <div className="mb-8 flex flex-col items-center gap-2">
                <div className="bg-hobbly-sky-light text-hobbly-sky-dark rounded-2xl p-4">
                  <Mail />
                </div>
                <h2 className="xs:text-2xl text-center text-lg">
                  Forgot your password?
                </h2>
                <span className="text-muted-foreground text-center text-sm">
                  Enter your email or username and we'll send a reset link to
                  your inbox.
                </span>
              </div>

              {/* Form */}
              {/* TODO: Add support for username */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-8 flex w-full flex-col"
              >
                <div className="mb-6 flex flex-col">
                  <label htmlFor="email" className="mb-2 ml-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    variant="auth"
                    shape="pill"
                    fullWidth
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) => {
                        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          value,
                        );
                        // const isUsername = /^[^\s]{3,}$/.test(value);
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

                <Button
                  type="submit"
                  variant="gradient"
                  shape="pill"
                  size="lg"
                  fullWidth
                  className="max-xs:text-xs"
                  disabled={isSubmitting || isLoading || !watch("email")}
                >
                  <Send size={16} />
                  <span>Send reset link</span>
                </Button>
              </form>

              <p className="text-muted-foreground text-center text-xs">
                Remembered it?{" "}
                <a
                  href="/auth?mode=login"
                  className="text-hobbly-sky-dark cursor-pointer"
                >
                  Log in instead
                </a>{" "}
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <span className="text-5xl">📬</span>
                <h2>Check your inbox ✨</h2>
                <p className="text-muted-foreground text-sm">
                  We sent a password reset link to{" "}
                  <span className="text-foreground font-bold">
                    {watch("email")}
                  </span>
                  .
                </p>
              </div>

              <div className="bg-muted border-border my-8 w-full rounded-2xl border p-4">
                <ul className="text-muted-foreground flex flex-col gap-2 text-xs">
                  <li>
                    💡 The link expires in{" "}
                    <span className="text-foreground font-bold">
                      15 minutes
                    </span>
                    .
                  </li>
                  <li>💡 Check your spam or junk folder</li>
                  <li>💡 Make sure the address above is correct</li>
                  <li>💡 The link works only once</li>
                </ul>
              </div>

              <Button
                variant="secondary"
                shape="pill"
                fullWidth
                className="text-muted-foreground mb-2"
                onClick={() => setIsEmailSent(false)}
              >
                Try a different address
              </Button>

              <LinkButton
                to="/auth?mode=login"
                variant="gradient"
                shape="pill"
                fullWidth
              >
                Back to log in
              </LinkButton>
            </>
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
