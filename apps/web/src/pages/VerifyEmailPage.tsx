import { ArrowLeft, RefreshCw } from "lucide-react";
import { coffee } from "../assets";
import AuthLayout from "../components/layout/AuthLayout";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthActions } from "../hooks/useAuthActions";
import { useEffect, useRef, useState } from "react";

function VerifyEmailPage() {
  const { resendVerification, verify } = useAuthActions();
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [cooldown, setCooldown] = useState(() => {
    const expiry = localStorage.getItem("resend_cooldown_expiry");
    if (!expiry) return 0;
    const remaining = Math.ceil((Number(expiry) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const hasVerified = useRef(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const resolvedEmail =
    email ?? (isValidEmail(emailInput.trim()) ? emailInput.trim() : null);

  useEffect(() => {
    if (!token || hasVerified.current) return;
    hasVerified.current = true;
    void verify(token).then((success) => {
      if (success) setIsVerified(true);
    });
  }, [token, verify]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <AuthLayout
      background={coffee}
      subtitle="One small step before your cozy space opens up. We just want to make sure it's really you. 🌸"
    >
      <div className="w-full max-w-md">
        <div className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 self-start">
          <ArrowLeft size={14} />
          <a href="/auth?mode=signup" className="text-sm">
            Back to sign up
          </a>
        </div>

        {/* Main card */}
        <Card className="mb-6 items-center p-10 shadow-xl">
          <div className="flex w-full flex-col items-center">
            <span className="text-5xl">{!isVerified ? "📬" : "🪴"}</span>
            <h2>
              {!isVerified ? "Check your inbox ✨" : "Account verified ✨"}
            </h2>
            <p className="text-muted-foreground text-center text-sm">
              {isVerified
                ? "Your account is now verified! Log in now to enter your cozy space"
                : email
                  ? "We sent a verification link to"
                  : "Enter your email to resend the verification link"}
            </p>
            {!isVerified && (
              <div className="mt-3 w-full">
                {email ? (
                  <div className="border-hobbly-sky-dark bg-hobbly-sky-light text-hobbly-sky-dark mx-auto w-fit rounded-full border px-3 py-1 text-sm">
                    {email}
                  </div>
                ) : (
                  <Input
                    variant="auth"
                    shape="pill"
                    fullWidth
                    type="email"
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                )}
              </div>
            )}
          </div>

          {!isVerified ? (
            <>
              <div className="bg-muted border-border my-8 w-full rounded-2xl border p-4">
                <ul className="text-muted-foreground flex flex-col gap-2 text-xs">
                  <li>
                    ⏳ The link expires in{" "}
                    <span className="text-foreground font-bold">
                      30 minutes
                    </span>
                    .
                  </li>
                  <li>📥 Check your spam or junk folder</li>
                  <li>📧 Make sure the address above is correct</li>
                  <li>⏰ The link works only once</li>
                </ul>
              </div>

              <Button
                variant="primary"
                shape="pill"
                fullWidth
                className="bg-hobbly-sky-light border-hobbly-sky-dark text-hobbly-sky-dark border"
                onClick={() => {
                  if (!resolvedEmail) return;
                  setIsResending(true);
                  void resendVerification(resolvedEmail).finally(() => {
                    setIsResending(false);
                    const expiry = Date.now() + 120 * 1000;
                    localStorage.setItem(
                      "resend_cooldown_expiry",
                      String(expiry),
                    );
                    setCooldown(120);
                  });
                }}
                disabled={isResending || !resolvedEmail || cooldown > 0}
              >
                <RefreshCw size={16} />
                <span>
                  {cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : "Resend Verification Email"}
                </span>
              </Button>

              <div className="my-2 flex w-full items-center justify-center">
                <div className="border-border h-px flex-1 border"></div>
                <span className="text-muted-foreground bg-card rounded-full px-2 text-sm">
                  or
                </span>
                <div className="border-border h-px flex-1 border"></div>
              </div>

              <LinkButton
                to="/auth?mode=login"
                variant="secondary"
                shape="pill"
                fullWidth
                className="text-muted-foreground"
              >
                Already verified? Log in
              </LinkButton>
            </>
          ) : (
            <Button
              variant="gradient"
              shape="pill"
              fullWidth
              onClick={() => void navigate("/auth?mode=login")}
              className="mt-8"
            >
              Log in
            </Button>
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}

export default VerifyEmailPage;
