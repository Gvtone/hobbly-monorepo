import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainProfileCard from "../components/profile/MainProfileCard";
import ActivityCalendar from "../components/profile/ActivityCalendar";
import ProfileEntriesLayout from "../components/profile/ProfileEntriesLayout";
import EntryCard from "../components/profile/EntryCard";
import NotFoundPage from "./NotFoundPage";
import { usePublicUserHobby } from "../hooks/usePublicUserHobby";
import { useShareEntry } from "../hooks/useShareEntry";
import { profileShareService } from "../services/profile-share";
import type { PublicUserEntity } from "@hobbies-dashboard/types";
import HobbyCard from "../components/dashboard/HobbyCard";

function ShareProfilePage() {
  const { referenceId } = useParams();
  const [user, setUser] = useState<PublicUserEntity | null>(null);
  const [fetched, setFetched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { userHobbies } = usePublicUserHobby(user?.id ?? null);
  const { entries, loadMore, hasMore } = useShareEntry(referenceId);

  useEffect(() => {
    if (!referenceId) return;
    profileShareService
      .findByReference(referenceId)
      .then(setUser)
      .catch(() => setNotFound(true))
      .finally(() => setFetched(true));
  }, [referenceId]);

  if (notFound) return <NotFoundPage />;
  if (!fetched) return <div>Loading...</div>;
  if (!user) return null;

  const entryTabs = userHobbies.map((userHobby) => ({
    emoji: userHobby.hobby.icon,
    hobby: userHobby.hobby.name,
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <MainProfileCard user={user} className="mb-10" />

      <ActivityCalendar entries={entries} user={user} />

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-xl">Hobby Board</h3>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {userHobbies.map((data) => (
            <HobbyCard
              key={data.id}
              data={data}
              // trackedNumber="8"
              // trackedLabel="series tracked"
              // additional="Celestial Chronicles"
              className="min-h-36"
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-xl">Entries</h3>
          <p className="text-muted-foreground text-sm">
            {entries.length} total
          </p>
        </div>

        <ProfileEntriesLayout entryTabs={entryTabs}>
          {entries.map((data) => (
            <EntryCard key={data.id} data={data} dashboard />
          ))}
          {hasMore && (
            <button
              onClick={void loadMore}
              className="text-muted-foreground col-span-full mt-2 text-sm"
            >
              Load more
            </button>
          )}
        </ProfileEntriesLayout>
      </section>
    </div>
  );
}

export default ShareProfilePage;
