import { MoveRight } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { HobbyCard } from "../components/ui/Card";
import MainProfileCard from "../components/profile/MainProfileCard";
import ActivityCalendar from "../components/profile/ActivityCalendar";
import ProfileEntriesLayout from "../components/profile/ProfileEntriesLayout";
import EntryCard from "../components/profile/EntryCard";
import { useUserHobby } from "../hooks/useUserHobby";
import { useEntry } from "../hooks/useEntry";
import Modal from "../components/layout/Modal";
import { useState } from "react";
import Button from "../components/ui/Button";

function ProfilePage() {
  const { userHobbies } = useUserHobby();
  const { userEntries } = useEntry();

  const [isOpen, setIsOpen] = useState(false);

  const entryTabs = userHobbies.map((userHobby) => ({
    emoji: userHobby.hobby.icon,
    hobby: userHobby.hobby.name,
  }));

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Main profile card */}
        <MainProfileCard
          className="mb-10"
          setVisibility={() => setIsOpen(true)}
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
            <h3 className="text-xl">My Entries</h3>
            <p className="text-muted-foreground text-sm">
              {userEntries.length} total
            </p>
          </div>

          <ProfileEntriesLayout entryTabs={entryTabs}>
            {/* TODO: Implement pagination and only show public entries */}
            {userEntries.map((data) => (
              <EntryCard key={data.id} data={data} dashboard />
            ))}
          </ProfileEntriesLayout>
        </section>
      </div>

      <Modal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        title="Make your account public? "
        icon="🌏"
      >
        <div className="mb-4">
          <p className="text-center">
            People can visit your profile and will appear on search.
          </p>
          <p className="text-muted-foreground text-center text-sm">
            You can change it back if you change your mind.
          </p>
        </div>
        <Button fullWidth variant="gradient" shape="pill" size="lg">
          Set profile to public
        </Button>
      </Modal>
    </AppLayout>
  );
}

export default ProfilePage;
