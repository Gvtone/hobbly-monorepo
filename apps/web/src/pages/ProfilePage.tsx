import { MoveRight } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { HobbyCard } from "../components/ui/Card";
import MainProfileCard from "../components/profile/MainProfileCard";
import ActivityCalendar from "../components/profile/ActivityCalendar";
import ProfileEntriesLayout from "../components/profile/ProfileEntriesLayout";
import EntryCard from "../components/profile/EntryCard";
import { useUserHobby } from "../hooks/useUserHobby";
import { usePublicUserHobby } from "../hooks/usePublicUserHobby";
import { usePublicEntry } from "../hooks/usePublicEntry";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import type { PublicUserEntity } from "@hobbies-dashboard/types";
import { userService } from "../services/user";

function ProfilePage() {
  const { slug } = useParams();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [otherUser, setOtherUser] = useState<PublicUserEntity | null>(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const username = slug?.startsWith("@") ? slug.slice(1) : null;
  const isOwnProfile =
    !authLoading && !!authUser && authUser.username === username;

  const { userHobbies: ownHobbies } = useUserHobby(
    isOwnProfile ? (authUser?.id ?? null) : null,
  );
  const { userHobbies: publicHobbies } = usePublicUserHobby(
    !isOwnProfile ? (otherUser?.id ?? null) : null,
  );

  const userHobbies = isOwnProfile ? ownHobbies : publicHobbies;
  const isLoading = !isOwnProfile && !profileFetched;

  const profileUserId = isOwnProfile
    ? (authUser?.id ?? null)
    : (otherUser?.id ?? null);
  const { entries, loadMore, hasMore } = usePublicEntry({ userId: profileUserId });

  useEffect(() => {
    if (!username || isOwnProfile) return;

    userService
      .findUserByUsername(username)
      .then(setOtherUser)
      .catch(() => setNotFound(true))
      .finally(() => setProfileFetched(true));
  }, [username, isOwnProfile]);

  if (notFound) return <NotFoundPage />;
  // TODO: Add loading screen
  if (authLoading || isLoading) return <div>Loading...</div>;

  const profileUser = isOwnProfile ? authUser : otherUser;
  if (!profileUser) return null;

  const entryTabs = userHobbies.map((userHobby) => ({
    emoji: userHobby.hobby.icon,
    hobby: userHobby.hobby.name,
  }));

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Main profile card */}
        <MainProfileCard
          isOwnProfile={isOwnProfile}
          user={profileUser}
          className="mb-10"
        />

        {/* Activity calendar */}
        <ActivityCalendar />

        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl">My Hobby Board</h3>
            <a
              href=""
              className="text-hobbly-sky-dark flex items-center gap-2 text-sm"
            >
              Manage
              <MoveRight size={14}></MoveRight>
            </a>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {userHobbies.map((data) => (
              <HobbyCard
                key={data.id}
                data={data}
                trackedNumber="8"
                trackedLabel="series tracked"
                additional="Celestial Chronicles"
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
                onClick={loadMore}
                className="text-muted-foreground col-span-full mt-2 text-sm"
              >
                Load more
              </button>
            )}
          </ProfileEntriesLayout>
        </section>
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
