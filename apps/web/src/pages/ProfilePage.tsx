import { Lock, MoveRight } from "lucide-react";
import MainProfileCard from "../components/profile/MainProfileCard";
import ActivityCalendar from "../components/profile/ActivityCalendar";
import ProfileEntriesLayout from "../components/profile/ProfileEntriesLayout";
import EntryCard from "../components/profile/EntryCard";
import Button from "../components/ui/Button";
import { useUserHobby } from "../hooks/useUserHobby";
import { usePublicUserHobby } from "../hooks/usePublicUserHobby";
import { useEntry } from "../hooks/useEntry";
import { usePublicEntry } from "../hooks/usePublicEntry";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import type { PublicUserEntity } from "@hobbies-dashboard/types";
import { userService } from "../services/user";
import EntryModal from "../components/profile/EntryModal";
import LinkButton from "../components/ui/LinkButton";
import HobbyCard from "../components/dashboard/HobbyCard";

function ProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [otherUser, setOtherUser] = useState<PublicUserEntity | null>(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [activeHobby, setActiveHobby] = useState<string | null>(null);

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

  const activeHobbyId =
    userHobbies.find((h) => h.hobby.name === activeHobby)?.hobby.id ?? null;

  const {
    userEntries: ownEntries,
    loadMore: ownLoadMore,
    hasMore: ownHasMore,
    refresh: refreshOwn,
  } = useEntry({
    userId: authUser?.id ?? null,
    enabled: isOwnProfile,
    hobbyId: activeHobbyId,
    filter: { visibility: "PUBLIC" },
  });
  const { userEntries: calendarOwnEntries } = useEntry({
    userId: authUser?.id ?? null,
    enabled: isOwnProfile,
    limit: 365,
  });
  const {
    entries: publicEntries,
    loadMore: publicLoadMore,
    hasMore: publicHasMore,
    refresh: refreshPublic,
  } = usePublicEntry({
    userId: !isOwnProfile ? profileUserId : null,
    hobbyId: activeHobbyId,
  });
  const { entries: calendarPublicEntries } = usePublicEntry({
    userId: !isOwnProfile ? profileUserId : null,
    limit: 365,
  });

  const entries = isOwnProfile ? ownEntries : publicEntries;
  const loadMore = isOwnProfile ? ownLoadMore : publicLoadMore;
  const hasMore = isOwnProfile ? ownHasMore : publicHasMore;
  const refreshEntries = isOwnProfile ? refreshOwn : refreshPublic;
  const calendarEntries = isOwnProfile
    ? calendarOwnEntries
    : calendarPublicEntries;

  const selectedEntry = entries.find((e) => e.id === selectedEntryId) ?? null;

  useEffect(() => {
    if (!username || isOwnProfile) return;

    userService
      .findUserByUsernamePublic(username)
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
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Main profile card */}
      <MainProfileCard
        isOwnProfile={isOwnProfile}
        user={profileUser}
        className="mb-10"
      />

      {isOwnProfile || profileUser.visibility === "PUBLIC" ? (
        <>
          {/* Activity calendar */}
          <ActivityCalendar entries={calendarEntries} user={profileUser} />

          {/* Hobbies */}
          <section>
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="text-xl">
                {isOwnProfile ? "My Hobby Board" : "Hobby Board"}
              </h3>
              {isOwnProfile && (
                <LinkButton
                  variant="transparent"
                  to="/dashboard"
                  className="text-hobbly-sky-dark flex items-center gap-2 text-sm"
                >
                  Manage
                  <MoveRight size={14} />
                </LinkButton>
              )}
            </div>

            {userHobbies.length > 0 ? (
              <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {userHobbies.map((data) => (
                  <HobbyCard key={data.id} data={data} className="min-h-36" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="mb-4 text-6xl">🦗</span>
                <h3 className="mb-2 text-2xl">No hobbies yet</h3>
              </div>
            )}
          </section>

          {/* Entries */}
          {(entries.length > 0 || activeHobby !== null) && (
            <section>
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="text-xl">Entries</h3>
                <p className="text-muted-foreground text-sm">
                  {entries.length} total
                </p>
              </div>

              <ProfileEntriesLayout
                entryTabs={entryTabs}
                activeHobby={activeHobby}
                onHobbyChange={setActiveHobby}
              >
                {entries.map((data) => (
                  <EntryCard
                    key={data.id}
                    data={data}
                    dashboard
                    onClick={() => setSelectedEntryId(data.id)}
                  />
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
          )}
        </>
      ) : (
        <section className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="bg-muted flex size-16 items-center justify-center rounded-full">
            <Lock size={28} className="text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">This profile is private</h3>
            <p className="text-muted-foreground text-sm">
              Only the owner can see the content of this profile.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              shape="pill"
              onClick={() => void navigate(-1)}
            >
              Go back
            </Button>
            <Button
              variant="gradient"
              shape="pill"
              onClick={() => void navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </section>
      )}

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

export default ProfilePage;
