import { Lock, MoveRight, PenLine, Share2 } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";
import { Card, WidgetCard, type WidgetCardProps } from "../components/ui/Card";

const mockData: WidgetCardProps[] = [
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

function ProfilePage() {
  const tempPinnedTrackers = [
    {
      hobbyEmoji: "🎯",
      trackedAmount: "8",
      trackerTag: "Hobbies"
    },
    {
      hobbyEmoji: "📝",
      trackedAmount: "142",
      trackerTag: "Entries"
    },
    {
      hobbyEmoji: "🔥",
      trackedAmount: "12d",
      trackerTag: "Streak"
    },
    {
      hobbyEmoji: "💖",
      trackedAmount: "23",
      trackerTag: "Favorites"
    }
  ];

  return (
    <AppLayout>
      <div className="py-10 px-6 max-w-5xl mx-auto">
        {/* Main profile card */}
        <Card className="flex flex-col shadow-lg p-0 mb-10">
          {/* Profile Cover */}
          <div className="relative h-28">
            <div className="absolute rounded-t-3xl h-42 top-0 left-0 right-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1623594845764-13991ac51774"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute rounded-t-3xl h-42 top-0 left-0 right-0 overflow-hidden bg-linear-to-t from-card to-transparent z-10"></div>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col px-6 pb-6 z-20">
            <div className="flex flex-col md:flex-row md:justify-between items-center md:items-end gap-6 md:gap-0 mb-8">
              <div className="relative rounded-xl size-36 md:size-24 border-2 border-card drop-shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1621036189456-895776ffe69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                  className="object-cover object-center w-full h-full rounded-xl"
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-hobbly-sky-light p-1 border-2 border-card drop-shadow-xl">
                  🌿
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  shape="pill"
                  className="text-muted-foreground"
                >
                  <Share2 size={12}></Share2>
                  Share
                </Button>
                <Button
                  variant="secondary"
                  shape="pill"
                  className="text-muted-foreground"
                >
                  <Lock size={12}></Lock>
                  Private
                </Button>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <h2 className="text-3xl text-center md:text-start">Jade</h2>
              <span className="text-sm text-muted-foreground text-center md:text-start mb-2">
                @starweaver
              </span>

              <div className="flex items-center group">
                <p className="text-sm text-center md:text-start">
                  Anime lover 🎌 · Watercolor artist 🎨 · Cozy gamer 🎮 · Always
                  reading 📚
                </p>
                <Button
                  variant="transparent"
                  shape="pill"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <PenLine size={14}></PenLine>
                </Button>
              </div>
            </div>

            {/* Pinned Trackers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tempPinnedTrackers.map(tracker => (
                <div className="flex-1" key={tracker.trackerTag}>
                  <div className="flex flex-col items-center bg-accent rounded-xl p-4">
                    <span className="text-2xl">{tracker.hobbyEmoji}</span>
                    <span className="text-lg font-bold font-hobbly-serif">
                      {tracker.trackedAmount}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tracker.trackerTag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="text-xl">My Hobby Board</h3>
            <a
              href=""
              className="flex text-hobbly-sky-dark items-center text-sm gap-2"
            >
              Manage
              <MoveRight size={14}></MoveRight>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mockData.map(data => (
              <WidgetCard
                bgImage={data.bgImage}
                tagColor={data.tagColor}
                hobbyTag={data.hobbyTag}
                trackedNumber={data.trackedNumber}
                trackedLabel={data.trackedLabel}
                additional={data.additional}
                className="min-h-36"
              ></WidgetCard>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
