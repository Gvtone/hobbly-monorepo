import { MoveRight } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { WidgetCard, type WidgetCardProps } from "../components/ui/Card";
import MainProfileCard from "../components/profile/MainProfileCard";

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
  return (
    <AppLayout>
      <div className="py-10 px-6 max-w-5xl mx-auto">
        {/* Main profile card */}
        <MainProfileCard
          coverPhoto="https://images.unsplash.com/photo-1623594845764-13991ac51774"
          profilePhoto="https://images.unsplash.com/photo-1621036189456-895776ffe69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
          currentStatus={{ emoji: "🌿", bgColor: "#8baf8b" }}
          displayname="Jade"
          handle="@starweaver"
          bio="Anime lover 🎌 · Watercolor artist 🎨 · Cozy gamer 🎮 · Always reading 📚"
        ></MainProfileCard>

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
            {mockData.map((data, index) => (
              <WidgetCard
                key={index}
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
