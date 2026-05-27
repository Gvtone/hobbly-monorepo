import { ArrowLeft, Shield, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <Button
          variant="transparent"
          shape="pill"
          size="sm"
          className="self-start"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={14} />
          Back
        </Button>

        {/* Header */}
        <Card className="gap-4">
          <div className="flex items-center gap-4">
            <div className="from-hobbly-sky to-hobbly-lavender flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br">
              <Shield className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground text-sm">
                Last updated: May 27, 2026
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            At Hobbly, your privacy matters to us deeply. This policy explains
            what personal information we collect, how we use it, and the choices
            you have. We've written it in plain language so it's actually
            readable. 🌸
          </p>
        </Card>

        {/* 1. Introduction */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">1. Introduction</h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>
              Welcome to Hobbly. This Privacy Policy explains how Hobbly ("we",
              "us", or "our") collects, uses, and protects the personal
              information of users ("you") when you use our application and
              services.
            </p>
            <p>
              By creating an account and using Hobbly, you agree to the
              collection and use of information as described in this Privacy
              Policy. If you do not agree, please do not use our services.
            </p>
            <p>
              Hobbly is operated by an individual developer based in the
              Philippines and is hosted on servers located in Singapore.
            </p>
          </div>
        </Card>

        {/* 2. Who Can Use Hobbly */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">2. Who Can Use Hobbly</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hobbly is intended for users who are{" "}
            <strong className="text-foreground">
              13 years of age or older
            </strong>
            . By creating an account, you confirm that you meet this age
            requirement. We do not knowingly collect personal information from
            children under the age of 13. If we become aware that a user is
            under 13, we will promptly delete their account and associated data.
          </p>
        </Card>

        {/* 3. Information We Collect */}
        <Card className="gap-4">
          <h2 className="text-lg font-bold">3. Information We Collect</h2>
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.1 Information You Provide Directly
              </h3>
              <p>
                When you register and use Hobbly, we may collect the following
                information:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong className="text-foreground">Email address</strong> —
                  used for account creation, verification, and communication
                </li>
                <li>
                  <strong className="text-foreground">Username</strong> — a
                  unique identifier for your account
                </li>
                <li>
                  <strong className="text-foreground">Display name</strong>{" "}
                  (optional) — a name shown on your profile; does not need to be
                  your real name
                </li>
                <li>
                  <strong className="text-foreground">Profile picture</strong> —
                  an image you choose to represent your account
                </li>
                <li>
                  <strong className="text-foreground">Cover image</strong> — a
                  banner image for your profile
                </li>
                <li>
                  <strong className="text-foreground">
                    Hobby widget pictures
                  </strong>{" "}
                  — images associated with your hobby trackers
                </li>
                <li>
                  <strong className="text-foreground">
                    Journal entry content
                  </strong>{" "}
                  — text, notes, and images you add to your journal entries
                </li>
                <li>
                  <strong className="text-foreground">Entry images</strong> —
                  photos you attach to your journal entries
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.2 Information Collected Through Google OAuth
              </h3>
              <p>
                If you choose to sign in using Google, we receive limited
                information from your Google account, which may include your
                email address, Google profile name or username, and Google
                profile picture. We only use this information to create and
                manage your Hobbly account. We do not access any other data from
                your Google account.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.3 Google Photos Integration (Planned Feature)
              </h3>
              <p>
                In the future, Hobbly may offer an optional integration with
                Google Photos, allowing you to select photos from your Google
                Drive or Google Photos library to use in your journal entries.
                This integration will only be activated with your explicit
                permission. We will only access the specific photos you select
                and will not browse, store, or use any other content from your
                Google account.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.4 Information Generated Through Your Use of Hobbly
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong className="text-foreground">
                    Hobby tracking data
                  </strong>{" "}
                  — the hobbies you log, dates, and notes you record
                </li>
                <li>
                  <strong className="text-foreground">Journal entries</strong> —
                  content you write and choose to keep private or share publicly
                </li>
                <li>
                  <strong className="text-foreground">
                    Social interactions
                  </strong>{" "}
                  — likes and comments you make on public entries
                </li>
                <li>
                  <strong className="text-foreground">
                    Profile visibility settings
                  </strong>{" "}
                  — whether your profile and entries are public or private
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 4. How We Use Your Information */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">4. How We Use Your Information</h2>
          <div className="text-muted-foreground text-sm leading-relaxed">
            <p className="mb-2">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>To create and manage your account</li>
              <li>
                To provide and operate the Hobbly journaling and hobby tracking
                features
              </li>
              <li>
                To send transactional emails including account verification,
                welcome emails, password reset links, change notifications, and
                verification codes
              </li>
              <li>
                To enable social features such as public profiles, public
                journal entries, likes, and comments
              </li>
              <li>
                To display your content to other users when you choose to make
                it public
              </li>
              <li>To improve and maintain the Hobbly application</li>
              <li>To respond to your inquiries or support requests</li>
            </ul>
          </div>
        </Card>

        {/* 5. Public and Private Content */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">5. Public and Private Content</h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>Hobbly is designed with privacy as the default:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-foreground">
                  Your profile is private by default.
                </strong>{" "}
                You may choose to make it public, which allows other users to
                visit your profile and find you through the Explore page.
              </li>
              <li>
                <strong className="text-foreground">
                  Your journal entries are private by default.
                </strong>{" "}
                You may choose to make individual entries public, which allows
                other users to view, like, and comment on them.
              </li>
            </ul>
            <p>
              You have full control over what you share. You may change your
              privacy settings at any time.
            </p>
          </div>
        </Card>

        {/* 6. How We Share Your Information */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">
            6. How We Share Your Information
          </h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              limited circumstances:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-foreground">
                  With service providers
                </strong>{" "}
                — We use third-party services to host and operate Hobbly. These
                providers only process your data as necessary to provide their
                services and are obligated to protect it.
              </li>
              <li>
                <strong className="text-foreground">With other users</strong> —
                Only information you have chosen to make public (such as your
                profile, display name, profile picture, and public journal
                entries) is visible to other users.
              </li>
              <li>
                <strong className="text-foreground">As required by law</strong>{" "}
                — We may disclose your information if required to do so by
                applicable law, court order, or governmental authority.
              </li>
            </ul>
          </div>
        </Card>

        {/* 7. Data Storage and Security */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">7. Data Storage and Security</h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>
              Your data is stored on the following infrastructure, all located
              in Singapore:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-foreground">Neon</strong> — stores your
                account information, journal entries, hobby data, and all other
                application data in a managed PostgreSQL database.
              </li>
              <li>
                <strong className="text-foreground">Cloudinary</strong> — stores
                your uploaded media files including profile pictures, cover
                images, hobby widget pictures, and journal entry images.
              </li>
              <li>
                <strong className="text-foreground">Render</strong> — hosts and
                runs the Hobbly application.
              </li>
            </ul>
            <p>
              We take reasonable technical and organizational measures to
              protect your personal information from unauthorized access, loss,
              or misuse. However, no method of transmission over the internet or
              electronic storage is 100% secure. While we strive to protect your
              data, we cannot guarantee absolute security.
            </p>
          </div>
        </Card>

        {/* 8. Data Retention */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">8. Data Retention</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We retain your personal information for as long as your account is
            active. If you delete your account, we will delete your personal
            data, including your journal entries, profile information, and
            uploaded images, within a reasonable timeframe.
          </p>
        </Card>

        {/* 9. Your Rights and Choices */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">9. Your Rights and Choices</h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-foreground">Access</strong> — You may
                request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong className="text-foreground">Correction</strong> — You
                may update or correct your account information at any time
                through the app settings.
              </li>
              <li>
                <strong className="text-foreground">Deletion</strong> — You may
                delete your account and associated data at any time.
              </li>
              <li>
                <strong className="text-foreground">Privacy controls</strong> —
                You may change your profile and entry visibility settings at any
                time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details in Section 11.
            </p>
          </div>
        </Card>

        {/* 10. Third-Party Services */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">10. Third-Party Services</h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>Hobbly uses the following third-party services:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-foreground">Google OAuth</strong> — for
                optional sign-in. Governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  Google's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Google Photos</strong>{" "}
                (planned) — for optionally importing photos into journal
                entries, only with your explicit permission. Governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  Google's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Render</strong> — for
                application hosting. Governed by{" "}
                <a
                  href="https://render.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  Render's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Neon</strong> — for database
                storage. Governed by{" "}
                <a
                  href="https://neon.tech/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  Neon's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Resend</strong> — for
                sending transactional emails. Your email address is shared with
                Resend solely for this purpose. Governed by{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  Resend's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Cloudinary</strong> — for
                storing and serving media files. Governed by{" "}
                <a
                  href="https://cloudinary.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  Cloudinary's Privacy Policy
                </a>
                .
              </li>
            </ul>
            <p>
              We are not responsible for the privacy practices of these
              third-party services.
            </p>
          </div>
        </Card>

        {/* 11. Contact Us */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">11. Contact Us</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy, you may contact us by:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong className="text-foreground">Email:</strong>{" "}
                <a
                  href="mailto:geraldtolentino015@gmail.com"
                  className="text-hobbly-sky-dark hover:underline"
                >
                  geraldtolentino015@gmail.com
                </a>
              </li>
              <li>
                <strong className="text-foreground">
                  Through the Hobbly app:
                </strong>{" "}
                via the contact or support page
              </li>
            </ul>
          </div>
        </Card>

        {/* 12. Changes to This Privacy Policy */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">
            12. Changes to This Privacy Policy
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we
            will update the "Last updated" date at the top of this page. For any
            material changes, we will notify you by sending an email to the
            address associated with your account. We encourage you to review
            this policy periodically. Continued use of Hobbly after any changes
            constitutes your acceptance of the updated policy.
          </p>
        </Card>

        {/* Page footer */}
        <Card className="bg-muted border-muted items-center gap-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="from-hobbly-sky to-hobbly-lavender flex size-8 items-center justify-center rounded-full bg-linear-to-br text-white">
              <Sparkles size={14} />
            </span>
            <span className="font-hobbly-serif font-semibold">Hobbly</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Questions? Email us at{" "}
            <a
              href="mailto:geraldtolentino015@gmail.com"
              className="text-hobbly-sky-dark hover:underline"
            >
              geraldtolentino015@gmail.com
            </a>
          </p>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <Link to="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
            <span>·</span>
            <Link to="/" className="hover:text-foreground">
              Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
