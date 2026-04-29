import { Plus, Settings } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";
import EntryCard from "../components/profile/EntryCard";
import { HobbyCard } from "../components/ui/Card";
import Carousel from "../components/ui/Carousel";
import { useAuth } from "../context/auth/useAuth";
import { useUserHobby } from "../hooks/useUserHobby";
import { useEntry } from "../hooks/useEntry";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "🌤️" };
  return { text: "Good evening", emoji: "🌙" };
}

function DashboardPage() {
  const greeting = getGreeting();
  const { user } = useAuth();
  const { userHobbies, isLoading: isUserHobbiesLoading } = useUserHobby();
  const { userEntries } = useEntry();

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          {/* Right side */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">
              {greeting.emoji} {greeting.text}, {user?.username}
            </p>
            <h1 className="text-3xl">Your Hobby Board</h1>
            <p className="text-muted-foreground text-sm">
              {userHobbies.length}{" "}
              {userHobbies.length === 1 ? "hobby" : "hobbies"} ✨
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
          {!isUserHobbiesLoading && userHobbies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="mb-4 text-6xl">🌱</span>
              <h3 className="mb-2 text-2xl">Start your collection</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Pick your first hobby to begin tracking your journey
              </p>
              <Button variant="gradient" shape="pill">
                <Plus size={16} />
                Add your first hobby
              </Button>
            </div>
          ) : (
            <Carousel className="mb-8">
              {userHobbies.map((data) => (
                <HobbyCard
                  key={data.id}
                  data={data}
                  // TODO: replace with real data
                  trackedNumber="8"
                  trackedLabel="series tracked"
                  additional="Celestial Chronicles"
                  className="size-56 shrink-0"
                ></HobbyCard>
              ))}
              <button className="border-border bg-background text-muted-foreground hover:border-primary flex size-56 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-4 border-dashed">
                <div className="bg-muted flex size-12 items-center justify-center rounded-2xl">
                  <Plus size={20} />
                </div>
                <span className="text-sm">Add a hobby</span>
              </button>
            </Carousel>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl">My Entries</h3>
            <p className="text-muted-foreground text-sm">8 total</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {userEntries.map((data) => (
              <EntryCard key={data.id} data={data} dashboard />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
