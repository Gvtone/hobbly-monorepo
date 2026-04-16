import { MoveRight } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { HobbyCard, type HobbyCardProps } from "../components/ui/Card";
import MainProfileCard from "../components/profile/MainProfileCard";
import ActivityCalendar from "../components/profile/ActivityCalendar";
import ProfileEntriesLayout from "../components/profile/ProfileEntriesLayout";
import EntryCard from "../components/profile/EntryCard";

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
          className="mb-10"
        ></MainProfileCard>

        {/* Activity calendar */}
        <ActivityCalendar />

        <section>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {mockData.map((data, index) => (
              <HobbyCard
                key={index}
                bgImage={data.bgImage}
                tagColor={data.tagColor}
                hobbyTag={data.hobbyTag}
                trackedNumber={data.trackedNumber}
                trackedLabel={data.trackedLabel}
                additional={data.additional}
                className="min-h-36"
              ></HobbyCard>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="text-xl">My Entries</h3>
            <p className="text-sm text-muted-foreground">8 total</p>
          </div>

          <ProfileEntriesLayout>
            <EntryCard
              coverImg="https://images.unsplash.com/photo-1567790389105-197dbd865922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              mood="😭"
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              title="Celestial Chronicles"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
            ></EntryCard>
            <EntryCard
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              mood="😭"
              title="Test"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
            ></EntryCard>
            <EntryCard
              coverImg="https://images.unsplash.com/photo-1567790389105-197dbd865922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              mood="😭"
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              title="Celestial Chronicles"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
            ></EntryCard>
            <EntryCard
              coverImg="https://images.unsplash.com/photo-1567790389105-197dbd865922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              mood="😭"
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              title="Celestial Chronicles"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
            ></EntryCard>
            <EntryCard
              coverImg="https://images.unsplash.com/photo-1567790389105-197dbd865922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              mood="😭"
              hobby={{ emoji: "🎌", name: "Anime", color: "#c8a2e3" }}
              title="Celestial Chronicles"
              note="The ending hit different tonight. That scene with the lanterns in the rain..."
            ></EntryCard>
          </ProfileEntriesLayout>
        </section>
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
