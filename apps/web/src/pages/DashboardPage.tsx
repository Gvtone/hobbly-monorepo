import { Plus, Settings } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";
import EntryCard from "../components/profile/EntryCard";
import { HobbyCard, type HobbyCardProps } from "../components/ui/Card";
import Carousel from "../components/ui/Carousel";

const mockData: HobbyCardProps[] = [
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d",
    tagColor: "bg-hobbly-sky",
    hobbyTag: "Anime",
    trackedNumber: "8",
    trackedLabel: "series tracked",
    additional: "Celestial Chronicles"
  }
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "🌤️" };
  return { text: "Good evening", emoji: "🌙" };
}

function DashboardPage() {
  const greeting = getGreeting();

  return (
    <AppLayout>
      <div className="py-10 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Right side */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {greeting.emoji} {greeting.text}, Yuki
            </p>
            <h1 className="text-3xl">Your Hobby Board</h1>
            <p className="text-sm text-muted-foreground">
              8 widgets · Drag to rearrange ✨
            </p>
          </div>

          {/* Left side */}
          <div className="flex gap-4">
            <Button shape="pill" className="text-muted-foreground">
              <Settings size={16} /> Customize
            </Button>
            <Button variant="gradient" shape="pill">
              <Plus size={16} />
              New Entry
            </Button>
          </div>
        </div>

        <section>
          <Carousel className="mb-8">
            {mockData.map((data, i) => (
              <HobbyCard
                key={i}
                hobbyTag={data.hobbyTag}
                tagColor={data.tagColor}
                bgImage={data.bgImage}
                trackedNumber={data.trackedNumber}
                trackedLabel={data.trackedLabel}
                additional={data.additional}
                className="size-56 shrink-0"
              ></HobbyCard>
            ))}
          </Carousel>
        </section>

        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="text-xl">My Entries</h3>
            <p className="text-sm text-muted-foreground">8 total</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EntryCard
              coverImg="https://images.unsplash.com/photo-1567790389105-197dbd865922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              mood="😭"
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              title="Celestial Chronicles"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
              dashboard
            ></EntryCard>
            <EntryCard
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              mood="😭"
              title="Test"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
              dashboard
            ></EntryCard>
            <EntryCard
              coverImg="https://images.unsplash.com/photo-1567790389105-197dbd865922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              mood="😭"
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              title="Celestial Chronicles"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
            ></EntryCard>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
