import { ArrowLeft, ScrollText, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

function TermsPage() {
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
            <div className="from-hobbly-lavender to-hobbly-sky flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br">
              <ScrollText className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Terms and Conditions</h1>
              <p className="text-muted-foreground text-sm">
                Last updated: May 27, 2026
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            These Terms govern your access to and use of Hobbly. By creating an
            account or using our app, you agree to be bound by these Terms.
            Please read them carefully. ✨
          </p>
        </Card>

        {/* 1. Introduction */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">1. Introduction</h2>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
            <p>
              Welcome to Hobbly. These Terms and Conditions ("Terms") govern
              your access to and use of the Hobbly application and services
              ("Service"). By creating an account or using Hobbly, you agree to
              be bound by these Terms. If you do not agree, please do not use
              our Service.
            </p>
            <p>
              Hobbly is operated by an individual developer based in the
              Philippines.
            </p>
          </div>
        </Card>

        {/* 2. Eligibility */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">2. Eligibility</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You must be at least{" "}
            <strong className="text-foreground">13 years of age</strong> to use
            Hobbly. By creating an account, you confirm that you meet this
            requirement. We reserve the right to terminate accounts found to
            belong to users under the age of 13.
          </p>
        </Card>

        {/* 3. Your Account */}
        <Card className="gap-4">
          <h2 className="text-lg font-bold">3. Your Account</h2>
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.1 Account Creation
              </h3>
              <p>
                To use Hobbly, you must register for an account using a valid
                email address and a username. You may optionally provide a
                display name, which does not need to be your real name. You may
                also register using Google OAuth, in which case your Google
                account information will be used to create your Hobbly account.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.2 Account Responsibility
              </h3>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activity that occurs under your
                account. You agree to notify us immediately if you suspect
                unauthorized access to your account.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                3.3 Account Accuracy
              </h3>
              <p>
                You agree to provide accurate and up-to-date information when
                registering. You may update your account information at any time
                through the app settings.
              </p>
            </div>
          </div>
        </Card>

        {/* 4. Use of the Service */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">4. Use of the Service</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Hobbly is a personal hobby journaling and tracking application. It
              allows you to:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Log and track hobbies and activities</li>
              <li>Write journal entries with notes and media</li>
              <li>
                Optionally share entries and your profile publicly with other
                users
              </li>
              <li>
                Interact with other users' public content through likes and
                comments
              </li>
              <li>Keep all content private if you choose</li>
            </ul>
          </div>
        </Card>

        {/* 5. User Content */}
        <Card className="gap-4">
          <h2 className="text-lg font-bold">5. User Content</h2>
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">5.1 Ownership</h3>
              <p>
                You retain full ownership of all content you create on Hobbly,
                including journal entries, notes, images, and any other media
                you upload ("User Content"). Hobbly does not claim ownership
                over your content.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                5.2 License to Hobbly
              </h3>
              <p>
                By posting or uploading content to Hobbly, you grant us a
                limited, non-exclusive, royalty-free license to store, display,
                and distribute your content solely for the purpose of operating
                and providing the Service. This license ends when you delete
                your content or your account.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                5.3 Private Content
              </h3>
              <p>
                Content you choose to keep private is only accessible to you. We
                do not monitor, review, or access your private journal entries
                unless required by law or to investigate a specific credible
                report of illegal activity.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                5.4 Public Content
              </h3>
              <p>
                When you choose to make your profile or journal entries public,
                other users may view, like, and comment on your content. You are
                solely responsible for any content you choose to share publicly.
              </p>
            </div>
          </div>
        </Card>

        {/* 6. Prohibited Conduct */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">6. Prohibited Conduct</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm leading-relaxed">
            <p>You agree not to use Hobbly to:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Post, share, or upload content that is offensive, abusive,
                hateful, discriminatory, or harassing toward any individual or
                group
              </li>
              <li>Harass, threaten, intimidate, or bully other users</li>
              <li>
                Post content that is obscene, sexually explicit, or otherwise
                inappropriate
              </li>
              <li>
                Spam other users through comments, likes, or any other means
              </li>
              <li>Impersonate another person or misrepresent your identity</li>
              <li>
                Use the Service for any commercial purpose, including
                advertising, solicitation, or promotion, without our prior
                written consent
              </li>
              <li>
                Upload or share content that infringes on the intellectual
                property rights of others
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Service
                or another user's account
              </li>
              <li>
                Engage in any activity that disrupts, damages, or interferes
                with the Service
              </li>
              <li>
                Use automated tools, bots, or scripts to access or interact with
                the Service
              </li>
            </ul>
            <p className="mt-1">
              Violation of these rules may result in content removal, account
              suspension, or permanent termination of your account.
            </p>
          </div>
        </Card>

        {/* 7. Content Moderation and Enforcement */}
        <Card className="gap-4">
          <h2 className="text-lg font-bold">
            7. Content Moderation and Enforcement
          </h2>
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">7.1 Reporting</h3>
              <p>
                Users may report public content that they believe violates these
                Terms. We will review reported content and take appropriate
                action, which may include removing the content, issuing a
                warning, suspending the account, or permanently banning the
                user.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                7.2 Private Content
              </h3>
              <p>
                We respect the privacy of your personal journal entries. We do
                not proactively monitor or review private content. Enforcement
                actions are only taken based on reported public content or
                credible reports of illegal activity.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                7.3 Suspension and Termination
              </h3>
              <p>
                We reserve the right to suspend or terminate any account that is
                found to be in violation of these Terms, at our sole discretion.
                We will make reasonable efforts to notify affected users when an
                action is taken against their account.
              </p>
            </div>
          </div>
        </Card>

        {/* 8. Intellectual Property */}
        <Card className="gap-4">
          <h2 className="text-lg font-bold">8. Intellectual Property</h2>
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                8.1 Hobbly's Property
              </h3>
              <p>
                The Hobbly name, logo, visual design, application code, and all
                related trademarks and content created by us are the exclusive
                intellectual property of Hobbly. You may not copy, reproduce,
                distribute, or create derivative works from any part of the
                Service without our prior written permission.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                8.2 Feedback and Suggestions
              </h3>
              <p>
                If you submit feedback, ideas, or suggestions about the Service,
                you agree that we may use this feedback freely to improve or
                develop Hobbly without any obligation to compensate or credit
                you.
              </p>
            </div>
          </div>
        </Card>

        {/* 9. Third-Party Services */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">9. Third-Party Services</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hobbly integrates with third-party services including Google OAuth,
            Google Photos (planned), Render, Neon, Resend, and Cloudinary. Your
            use of these services is subject to their respective terms and
            privacy policies. We are not responsible for the practices of these
            third-party providers.
          </p>
        </Card>

        {/* 10. Advertisements */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">10. Advertisements</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hobbly may display advertisements to support the continued operation
            of the Service. By using Hobbly, you acknowledge and agree that
            advertisements may appear within the app. We do not endorse any
            advertised products or services.
          </p>
        </Card>

        {/* 11. Disclaimers */}
        <Card className="gap-4">
          <h2 className="text-lg font-bold">11. Disclaimers</h2>
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                11.1 Service Availability
              </h3>
              <p>
                Hobbly is maintained by a single developer. While we make every
                effort to keep the Service running, we do not guarantee
                uninterrupted, error-free, or 24/7 availability. The Service may
                be temporarily unavailable due to maintenance, updates,
                technical issues, or circumstances beyond our control.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                11.2 User-Generated Content
              </h3>
              <p>
                Hobbly is a platform for user-generated content. We do not
                control, verify, or endorse the content that users choose to
                share publicly. We are not responsible for any content posted by
                users, including any inaccuracies, offensive material, or
                intellectual property violations.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground font-semibold">
                11.3 No Warranty
              </h3>
              <p>
                The Service is provided on an "as is" and "as available" basis
                without warranties of any kind, either express or implied. We
                disclaim all warranties including but not limited to fitness for
                a particular purpose and non-infringement.
              </p>
            </div>
          </div>
        </Card>

        {/* 12. Limitation of Liability */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">12. Limitation of Liability</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            To the fullest extent permitted by applicable law, Hobbly and its
            developer shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of or
            inability to use the Service, including but not limited to loss of
            data, loss of content, or damages resulting from user-generated
            content.
          </p>
        </Card>

        {/* 13. Changes to the Service */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">13. Changes to the Service</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We reserve the right to modify, update, add, or remove features of
            the Service at any time. Planned features include but are not
            limited to support for multiple images per entry, video uploads,
            comment likes, content reporting tools, and Google Photos
            integration. We will make reasonable efforts to communicate
            significant changes to users.
          </p>
        </Card>

        {/* 14. Changes to These Terms */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">14. Changes to These Terms</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We may update these Terms from time to time. When we do, we will
            update the "Last updated" date at the top of this page. For any
            material changes, we will notify you by sending an email to the
            address associated with your account. Continued use of Hobbly after
            changes take effect constitutes your acceptance of the updated
            Terms.
          </p>
        </Card>

        {/* 15. Governing Law */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">15. Governing Law</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            the laws of the{" "}
            <strong className="text-foreground">
              Republic of the Philippines
            </strong>
            , without regard to its conflict of law provisions. Any disputes
            arising from these Terms or your use of the Service shall be subject
            to the jurisdiction of the courts of the Philippines.
          </p>
        </Card>

        {/* 16. Contact Us */}
        <Card className="gap-3">
          <h2 className="text-lg font-bold">16. Contact Us</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              If you have any questions or concerns about these Terms, you may
              contact us by:
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
            <Link to="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
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

export default TermsPage;
