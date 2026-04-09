import Button from "../components/ui/Button";
import { Card, CardInfo, type CardInfoProps } from "../components/ui/Card";
import { Sparkles, Moon, ArrowRight } from "lucide-react";

const cardData: CardInfoProps[] = [
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

function LandingPage() {
  return (
    <>
      <nav
        id="nav-bar"
        className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto"
      >
        <div id="title" className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-linear-to-br from-hobbly-sky to-hobbly-lavender rounded-full w-8 h-8 shadow shadow-hobbly-sky/30">
            <Sparkles className="text-background" size={16}></Sparkles>
          </div>
          <span className="text-xl font-semibold font-hobbly-serif">
            Hobbly
          </span>
        </div>

        <div id="nav-links" className="flex justify-center items-center gap-2">
          <Button variant="ghost" shape="pill" size="icon" className="p-2">
            <Moon className="text-muted-foreground" />
          </Button>
          <Button variant="transparent" shape="pill">
            Log in
          </Button>
          <Button variant="gradient" shape="pill">
            Start for free
          </Button>
        </div>
      </nav>

      <section>
        <div className="flex flex-col items-center gap-6 h-screen/80 py-20 px-6">
          <div className="flex justify-center items-center gap-0.5 rounded-full bg-primary/30 text-primary-foreground py-1 px-2">
            <Sparkles size={15} />
            <span className="text-sm font-semibold tracking-wide py-1 px-2">
              Your cozy hobby journal
            </span>
          </div>
          <h1 className="text-6xl text-center max-w-2xl">
            A cozy place for{" "}
            <span className="bg-linear-to-r from-hobbly-sky-dark to-hobbly-lavender bg-clip-text text-transparent">
              everything{" "}
            </span>
            you love
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-md">
            Anime, books, gaming, art — collect it all in a dreamy, visual board
            that's completely yours.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="gradient" shape="rounded" size="lg">
              Start your journal
              <ArrowRight size={20} />
            </Button>
            <Button variant="default" shape="rounded" size="lg">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="px-6 pb-16 max-w-4xl m-auto">
          <Card></Card>
        </div>
      </section>

      <section>
        <div className="py-20 px-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-12">
            <h2 className="text-3xl font-bold text-center">
              Made for hobby lovers
            </h2>
            <p className="text-muted-foreground text-center">
              Discover and organize your favorite hobbies in one place.
            </p>
          </div>
          <div className="flex justify-between gap-4 ">
            {cardData.map((card, index) => (
              <CardInfo key={index} {...card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
