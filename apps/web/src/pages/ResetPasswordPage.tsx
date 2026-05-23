import { ArrowLeft, Eye, EyeClosed, KeyRound } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import { Card } from "../components/ui/Card";
import { journalBg } from "../assets";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthActions } from "../hooks/useAuthActions";
import { showToast } from "../utils/toast";
import LinkButton from "../components/ui/LinkButton";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();
  const { reset } = useAuthActions();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      showToast.error("Invalid or missing reset token.");
      return;
    }
    try {
      await reset(token, data.password);
      setIsPasswordReset(true);
    } catch (error) {
      showToast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      background={journalBg}
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
          <div className="mb-8 flex flex-col items-center gap-2">
            {isPasswordReset ? (
              <div className="text-5xl">🎉</div>
            ) : (
              <div className="from-hobbly-sky-light to-background text-hobbly-sky-dark flex size-20 items-center justify-center rounded-2xl bg-linear-to-br">
                <KeyRound size={36} />
              </div>
            )}
            <h2 className="xs:text-2xl text-center text-lg">
              {isPasswordReset
                ? "Password has been reset"
                : "Set a new password"}
            </h2>
            <span className="text-muted-foreground text-center text-sm">
              {isPasswordReset
                ? "Use your new password to enter your cozy space!"
                : "Choose something cozy but strong — you'll use it every time you come home."}
            </span>
          </div>

          {isPasswordReset ? (
            <LinkButton
              to="/auth?mode=login"
              variant="gradient"
              shape="pill"
              size="lg"
              fullWidth
            >
              Go back to log in
            </LinkButton>
          ) : (
            <form
              onSubmit={() => void handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="">New Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    variant="auth"
                    shape="pill"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    placeholder="••••••••"
                    className="w-full pr-12"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "At least 8 characters",
                      },
                      pattern: {
                        value: /(?=.*[A-Z])/,
                        message: "Must contain at least one uppercase letter",
                      },
                    })}
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

              <div className="flex flex-col gap-2">
                <label htmlFor="">Confirm Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    variant="auth"
                    shape="pill"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    placeholder="••••••••"
                    className="w-full pr-12"
                    {...register("confirmPassword", {
                      required: "Password is required",
                      validate: (value) => {
                        return value !== getValues("password")
                          ? "Password do not match"
                          : true;
                      },
                    })}
                  />
                  <Button
                    type="button"
                    variant="transparent"
                    shape="pill"
                    size="icon"
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive mt-1 ml-2 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                variant="gradient"
                shape="pill"
                size="lg"
                fullWidth
                type="submit"
                disabled={isSubmitting}
                className="mt-8"
              >
                Set New Password
              </Button>
            </form>
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
