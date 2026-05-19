import Button from "../components/ui/Button";
import { Card, InfoCard, type InfoCardProps } from "../components/ui/Card";
import { Sparkles, ArrowRight } from "lucide-react";
import { cloudsBg, animeBg, booksBg, journalBg } from "../assets";
import LandingNavbar from "../components/layout/LandingNavbar";
import Footer from "../components/layout/Footer";
import LinkButton from "../components/ui/LinkButton";
import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";
import type { HobbyCardProps } from "../components/dashboard/HobbyCard";
import HobbyCard from "../components/dashboard/HobbyCard";

const infoCardData: InfoCardProps[] = [
  {
    icon: "✨",
    iconBgColor: "bg-primary/40",
    title: "Your Hobby Board",
    description:
      "Drag, resize, and rearrange your hobby widgets into a board that feels uniquely yours.",
  },
  {
    icon: "🌸",
    iconBgColor: "bg-secondary/40",
    title: "Visual Tracking",
    description:
      "See your progress through beautiful cover images, progress bars, and soft stats — not endless spreadsheets.",
  },
  {
    icon: "🔮",
    iconBgColor: "bg-background/40",
    title: "Private by Default",
    description:
      "Your journal is yours. Share only what you want with a simple link — or keep it all cozy and private.",
  },
];

const previewCardData: HobbyCardProps[] = [
  {
    data: {
      hobby: { name: "Anime", icon: "🎌", color: "c8a2e3" },
      backgroundImage: animeBg,
    } as UserHobbyWithHobbyEntity,
    // trackedNumber: "8",
    // trackedLabel: "series tracked",
    // additional: "Celestial Chronicles",
  },
  {
    data: {
      hobby: { name: "Books", icon: "📚", color: "f5c27a" },
      backgroundImage: booksBg,
    } as UserHobbyWithHobbyEntity,
    // trackedNumber: "23",
    // trackedLabel: "books read",
    // additional: "Currently reading 2",
  },
  {
    data: {
      hobby: { name: "Daily Journal", icon: "📖", color: "f5ecd7" },
      backgroundImage: journalBg,
    } as UserHobbyWithHobbyEntity,
    // trackedNumber: "142",
    // trackedLabel: "entries written",
    // additional: "12 day streak 🔥",
  },
];

function LandingPage() {
  return (
    <>
      <LandingNavbar />

      <section>
        <div className="h-screen/80 flex flex-col items-center gap-6 px-6 py-20">
          {/* Jumbotron */}
          <div className="bg-primary/30 text-primary-foreground flex items-center justify-center gap-0.5 rounded-full px-2 py-1">
            <Sparkles size={15} />
            <span className="px-2 py-1 text-sm font-semibold tracking-wide">
              Your cozy hobby journal
            </span>
          </div>
          <h1 className="max-w-2xl text-center text-5xl md:text-6xl">
            A cozy place for{" "}
            <span className="from-hobbly-sky-dark to-hobbly-lavender bg-linear-to-r bg-clip-text text-transparent">
              everything{" "}
            </span>
            you love
          </h1>
          <p className="text-md text-muted-foreground max-w-md text-center md:text-lg">
            Anime, books, gaming, art — collect it all in a dreamy, visual board
            that's completely yours.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <LinkButton to="/auth" variant="gradient" shape="rounded" size="lg">
              Start your journal
              <ArrowRight size={20} />
            </LinkButton>
            <LinkButton to="/#info" variant="default" shape="rounded" size="lg">
              Learn more
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section>
        <div className="m-auto max-w-4xl px-6 pb-20">
          <Card className="relative p-0">
            <div className="border-border flex rounded-t-2xl border-b-2 px-4 py-1">
              <div className="mr-6 flex items-center justify-center gap-2">
                <div className="bg-hobbly-red size-3 rounded-full"></div>
                <div className="bg-hobbly-peach size-3 rounded-full"></div>
                <div className="bg-hobbly-green size-3 rounded-full"></div>
              </div>
              <div className="flex-1 p-2">
                <div className="bg-muted mr-6 flex items-center rounded-full px-4">
                  <span className="text-muted-foreground">hobbly.app/Jade</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              {previewCardData.map((card) => (
                <HobbyCard
                  key={card.data.hobby.name}
                  data={card.data}
                  // trackedNumber={card.trackedNumber}
                  // trackedLabel={card.trackedLabel}
                  // additional={card.additional}
                  className="h-40"
                />
              ))}
            </div>
            <div className="absolute -top-3 -right-3 rotate-15 text-3xl">
              ✨
            </div>
            <div className="absolute -bottom-3 -left-3 -rotate-10 text-3xl">
              🌸
            </div>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section id="info">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-12 flex flex-col items-center gap-2">
            <h2 className="text-center text-3xl font-bold">
              Made for hobby lovers
            </h2>
            <p className="text-muted-foreground text-center">
              Discover and organize your favorite hobbies in one place.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            {infoCardData.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Card
            className="h-80 bg-cover bg-center p-0 shadow-2xl"
            style={{ backgroundImage: `url(${cloudsBg})` }}
          >
            <div className="from-hobbly-navy/70 to-hobbly-sky-dark/40 flex h-full flex-col items-center justify-center gap-6 rounded-3xl bg-linear-135">
              <h2 className="text-center text-3xl text-white md:text-5xl">
                Begin your hobby journey today
              </h2>
              <Button variant="translucent" size="lg">
                Start for free
                <ArrowRight></ArrowRight>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;
