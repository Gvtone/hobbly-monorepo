import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import EntryCard from "../components/profile/EntryCard";
import Carousel from "../components/ui/Carousel";
import { useAuth } from "../context/auth/useAuth";
import { useUserHobby } from "../hooks/useUserHobby";
import { useEntry } from "../hooks/useEntry";
import { useState } from "react";
import LogEntryModal from "../components/dashboard/LogEntryModal";
import AddUserHobbyModal from "../components/dashboard/AddUserHobbyModal";
import EntryModal from "../components/profile/EntryModal";
import HobbyCard from "../components/dashboard/HobbyCard";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "🌤️" };
  return { text: "Good evening", emoji: "🌙" };
}

function DashboardPage() {
  const greeting = getGreeting();
  const { user } = useAuth();
  const {
    userHobbies,
    isLoading: isUserHobbiesLoading,
    addUserHobby,
    updateUserHobby,
    removeUserHobby,
  } = useUserHobby(user?.id ?? null);
  const {
    userEntries,
    isLoading: isEntriesLoading,
    loadMore,
    hasMore,
    meta,
    refresh: refreshEntries,
  } = useEntry({ userId: user?.id ?? null });
  const [isLogEntryOpen, setIsLogEntryOpen] = useState(false);
  const [isAddHobbyOpen, setIsAddHobbyOpen] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const selectedEntry =
    userEntries.find((e) => e.id === selectedEntryId) ?? null;

  return (
    <div className="mx-auto max-w-7xl px-3 py-10 md:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Right side */}
        <div className="mb-8 flex flex-col gap-2 md:mb-0">
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
          {userHobbies.length !== 0 && (
            <div className="flex gap-4">
              <Button
                variant="gradient"
                shape="pill"
                onClick={() => setIsLogEntryOpen(true)}
                disabled={userHobbies.length === 0}
              >
                <Plus size={16} />
                New entry
              </Button>
            </div>
          )}

          <Button
            variant="gradient"
            shape="pill"
            onClick={() => setIsAddHobbyOpen(true)}
            className="md:hidden"
          >
            <Plus size={16} />
            Add a hobby
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
            <Button
              variant="gradient"
              shape="pill"
              onClick={() => setIsAddHobbyOpen(true)}
            >
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
                enableOptions
                className="size-28 shrink-0 md:size-56"
                onUpdate={(id, backgroundImage) =>
                  updateUserHobby(id, {
                    backgroundImage: backgroundImage ?? undefined,
                  })
                }
                onDelete={async (id) => {
                  await removeUserHobby(id);
                  refreshEntries();
                }}
              />
            ))}
            <button
              onClick={() => setIsAddHobbyOpen(true)}
              className="border-border bg-background text-muted-foreground hover:border-primary flex size-28 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-4 border-dashed md:size-56"
            >
              <div className="bg-muted flex size-12 items-center justify-center rounded-2xl">
                <Plus size={20} />
              </div>
              <span className="text-sm">Add a hobby</span>
            </button>
          </Carousel>
        )}
      </section>

      {userHobbies.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl">My Entries</h3>
            <p className="text-muted-foreground text-sm">
              {meta.totalCount} total
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {userEntries.map((data) => (
              <EntryCard
                key={data.id}
                data={data}
                dashboard
                onClick={() => setSelectedEntryId(data.id)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                shape="pill"
                onClick={loadMore}
                disabled={isEntriesLoading}
              >
                {isEntriesLoading ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Modals */}
      <LogEntryModal
        open={isLogEntryOpen}
        userHobbies={userHobbies}
        onClose={() => setIsLogEntryOpen(false)}
        onRefresh={refreshEntries}
      />

      <AddUserHobbyModal
        open={isAddHobbyOpen}
        onClose={() => setIsAddHobbyOpen(false)}
        userHobbies={userHobbies}
        onAdd={addUserHobby}
      />

      {selectedEntry && (
        <EntryModal
          open={!!selectedEntry}
          onClose={() => setSelectedEntryId(null)}
          data={selectedEntry}
          onRefresh={refreshEntries}
        />
      )}
    </div>
  );
}

export default DashboardPage;
