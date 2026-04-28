import Button from "../components/ui/Button";
import {
  Card,
  InfoCard,
  HobbyCard,
  type InfoCardProps,
  type HobbyCardProps
} from "../components/ui/Card";
import { Sparkles, ArrowRight } from "lucide-react";
import { cloudsBg, animeBg, booksBg, journalBg } from "../assets";
import LandingNavbar from "../components/layout/LandingNavbar";
import Footer from "../components/layout/Footer";
import LinkButton from "../components/ui/LinkButton";

const infoCardData: InfoCardProps[] = [
  {
    icon: "✨",
    iconBgColor: "bg-primary/40",
    title: "Your Hobby Board",
    description:
      "Drag, resize, and rearrange your hobby widgets into a board that feels uniquely yours."
  },
  {
    icon: "🌸",
    iconBgColor: "bg-secondary/40",
    title: "Visual Tracking",
    description:
      "See your progress through beautiful cover images, progress bars, and soft stats — not endless spreadsheets."
  },
  {
    icon: "🔮",
    iconBgColor: "bg-background/40",
    title: "Private by Default",
    description:
      "Your journal is yours. Share only what you want with a simple link — or keep it all cozy and private."
  }
];

const previewCardData: HobbyCardProps[] = [
  {
    hobby: "Anime",
    hobbyColor: "bg-hobbly-lavender/60",
    bgImage: animeBg,
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    hobby: "Books",
    hobbyColor: "bg-hobbly-peach/60",
    bgImage: booksBg,
    trackedNumber: "23",
    trackedLabel: "books read",
    additional: "Currently reading 2"
  },
  {
    hobby: "Daily Journal",
    hobbyColor: "bg-hobbly-cream/60",
    bgImage: journalBg,
    trackedNumber: "142",
    trackedLabel: "entries written",
    additional: "12 day streak 🔥"
  }
];

function LandingPage() {
  return (
    <>
      <LandingNavbar />

      <section>
        <div className="flex flex-col items-center gap-6 h-screen/80 py-20 px-6">
          {/* Jumbotron */}
          <div className="flex justify-center items-center gap-0.5 rounded-full bg-primary/30 text-primary-foreground py-1 px-2">
            <Sparkles size={15} />
            <span className="text-sm font-semibold tracking-wide py-1 px-2">
              Your cozy hobby journal
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl text-center max-w-2xl">
            A cozy place for{" "}
            <span className="bg-linear-to-r from-hobbly-sky-dark to-hobbly-lavender bg-clip-text text-transparent">
              everything{" "}
            </span>
            you love
          </h1>
          <p className="text-md md:text-lg text-muted-foreground text-center max-w-md">
            Anime, books, gaming, art — collect it all in a dreamy, visual board
            that's completely yours.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
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
        <div className="px-6 pb-20 max-w-4xl m-auto">
          <Card className="relative p-0">
            <div className="flex py-1 px-4 rounded-t-2xl border-b-2 border-border">
              <div className="flex justify-center items-center gap-2 mr-6">
                <div className="rounded-full size-3 bg-hobbly-red"></div>
                <div className="rounded-full size-3 bg-hobbly-peach"></div>
                <div className="rounded-full size-3 bg-hobbly-green"></div>
              </div>
              <div className="flex-1 p-2">
                <div className="flex items-center bg-muted rounded-full px-4 mr-6">
                  <span className="text-muted-foreground">hobbly.app/Jade</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {previewCardData.map(data => (
                <HobbyCard
                  key={data.hobby}
                  hobby={data.hobby}
                  hobbyColor={data.hobbyColor}
                  bgImage={data.bgImage}
                  trackedNumber={data.trackedNumber}
                  trackedLabel={data.trackedLabel}
                  additional={data.additional}
                  className="h-40"
                />
              ))}
            </div>
            <div className="absolute -top-3 -right-3 text-3xl rotate-15">
              ✨
            </div>
            <div className="absolute -bottom-3 -left-3 text-3xl -rotate-10">
              🌸
            </div>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section id="info">
        <div className="py-20 px-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-12">
            <h2 className="text-3xl font-bold text-center">
              Made for hobby lovers
            </h2>
            <p className="text-muted-foreground text-center">
              Discover and organize your favorite hobbies in one place.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 ">
            {infoCardData.map(card => (
              <InfoCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="py-20 px-6 max-w-5xl mx-auto">
          <Card
            className="bg-cover bg-center h-80 p-0 shadow-2xl"
            style={{ backgroundImage: `url(${cloudsBg})` }}
          >
            <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-linear-135 from-hobbly-navy/70 to-hobbly-sky-dark/40 h-full ">
              <h2 className="text-white text-center text-3xl md:text-5xl">
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
