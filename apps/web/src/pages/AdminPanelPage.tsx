import {
  BarChart2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
  Eye,
  FileText,
  Plus,
  Search,
  Smile,
  SlidersHorizontal,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useEffect, useState } from "react";
import { cn } from "../utils/utils";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { useEntryMood } from "../hooks/useEntryMood";
import { useEntry } from "../hooks/useEntry";
import { format } from "date-fns";
import { useHobby } from "../hooks/useHobby";
import { useUser } from "../hooks/useUser";
import type {
  EntryMoodEntity,
  EntryWithUserHobbyEntity,
  HobbyEntity,
} from "@hobbies-dashboard/types";
import AddMoodModal from "../components/admin-panel/AddMoodModal";
import EditMoodModal from "../components/admin-panel/EditMoodModal";
import AddHobbyModal from "../components/admin-panel/AddHobbyModal";
import EditHobbyModal from "../components/admin-panel/EditHobbyModal";
import DeleteEntryModal from "../components/admin-panel/DeleteEntryModal";
import EntryFilterModal, {
  type EntryFilterState,
} from "../components/admin-panel/EntryFilterModal";
import UserFilterModal, {
  type UserFilterState,
} from "../components/admin-panel/UserFilterModal";
import EntryModal from "../components/profile/EntryModal";

const tabItems = [
  { label: "Overview", icon: BarChart2 },
  { label: "Users", icon: Users },
  { label: "Hobbies", icon: BookOpen },
  { label: "Entries", icon: FileText },
  { label: "Moods", icon: Smile },
];

function AdminPanelPage() {
  const [selectedTab, setSelectedTab] = useState(tabItems[0].label);
  const [addMoodOpen, setAddMoodOpen] = useState(false);
  const [editMoodTarget, setEditMoodTarget] = useState<EntryMoodEntity | null>(
    null,
  );
  const [addHobbyOpen, setAddHobbyOpen] = useState(false);
  const [editHobbyTarget, setEditHobbyTarget] = useState<HobbyEntity | null>(
    null,
  );
  const [userSearch, setUserSearch] = useState("");
  const [debouncedUserSearch, setDebouncedUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState<UserFilterState>({});
  const [userFilterModalOpen, setUserFilterModalOpen] = useState(false);
  const [entrySearch, setEntrySearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [entryFilter, setEntryFilter] = useState<EntryFilterState>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [viewEntry, setViewEntry] = useState<EntryWithUserHobbyEntity | null>(
    null,
  );
  const [deleteEntry, setDeleteEntry] =
    useState<EntryWithUserHobbyEntity | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedUserSearch(userSearch), 400);
    return () => clearTimeout(timer);
  }, [userSearch]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(entrySearch), 400);
    return () => clearTimeout(timer);
  }, [entrySearch]);

  const {
    users,
    page: userPage,
    meta: userMeta,
    goToPage: goToUserPage,
    updateUser,
  } = useUser({
    filter: { search: debouncedUserSearch, ...userFilter },
  });
  const { hobbies, addHobby, updateHobby, removeHobby } = useHobby();
  const { userEntries, page, meta, goToPage, removeEntry, refresh } = useEntry({
    filter: { search: debouncedSearch, ...entryFilter },
  });
  const { entryMoods, addEntryMood, updateEntryMood, removeEntryMood } =
    useEntryMood();

  const hasActiveUserFilters = !!userFilter.role || !!userFilter.status;
  const hasActiveFilters =
    !!entryFilter.visibility || (entryFilter.moodId?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl">Admin</h1>
        <p className="text-muted-foreground text-sm">Hobbly control panel</p>
      </div>

      <div className="mb-8 flex gap-2">
        {tabItems.map(({ label, icon: Icon }) => (
          <Button
            key={label}
            shape="pill"
            active={label === selectedTab}
            className={cn(label !== selectedTab && "text-muted-foreground")}
            onClick={() => setSelectedTab(label)}
          >
            <Icon size={15} />
            {label}
          </Button>
        ))}
      </div>

      {selectedTab === tabItems[0].label && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="gap-8">
              <Users />
              <div>
                <p className="font-hobbly-serif text-4xl">6</p>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <p className="text-muted-foreground text-xs">5 active</p>
              </div>
            </Card>
            <Card className="gap-8">
              <FileText />
              <div>
                <p className="font-hobbly-serif text-4xl">191</p>
                <p className="text-muted-foreground text-sm">Total Entries</p>
                <p className="text-muted-foreground text-xs">4 public</p>
              </div>
            </Card>
            <Card className="gap-8">
              <BookOpen />
              <div>
                <p className="font-hobbly-serif text-4xl">8</p>
                <p className="text-muted-foreground text-sm">Hobbies</p>
                <p className="text-muted-foreground text-xs">7 published</p>
              </div>
            </Card>
            <Card className="gap-8">
              <Smile />
              <div>
                <p className="font-hobbly-serif text-4xl">15</p>
                <p className="text-muted-foreground text-sm">Mood Options</p>
                <p className="text-muted-foreground text-xs">available moods</p>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-muted-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={16} />
              Hobby popularity
            </h3>
            <div className="flex w-full items-center gap-4">
              🎮
              <div className="flex w-full flex-col">
                <div className="flex justify-between">
                  <p>Anime</p>
                  <p className="text-muted-foreground text-sm">8,420 entries</p>
                </div>
                <div className="bg-accent h-2 rounded-full">
                  <div className="bg-hobbly-lavender h-2 w-3/4 rounded-full" />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-muted-foreground mb-4 flex items-center gap-2">
              <Star size={16} />
              Recent users
            </h3>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1777997829706-9a493e3da02e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User Profile"
                    className="size-8 rounded-full"
                  />
                  <div>
                    <p>Hana Leo</p>
                    <p className="text-muted-foreground text-sm">
                      @starweaver · Joined 2025-11-02
                    </p>
                  </div>
                </div>
                <div className="bg-secondary/20 text-secondary flex size-fit items-center justify-center gap-2 rounded-full px-4 py-1 text-sm">
                  <CircleCheck size={14} />
                  active
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedTab === tabItems[1].label && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
              />
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
            <Button
              variant="secondary"
              shape="rounded"
              onClick={() => setUserFilterModalOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveUserFilters && (
                <span className="bg-primary size-2 rounded-full" />
              )}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="User Profile"
                        className="size-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="from-hobbly-sky to-hobbly-lavender flex size-8 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white">
                        {user.username[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p>{user.displayName ?? user.username}</p>
                      <p className="text-muted-foreground text-sm">
                        @{user.username}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "size-fit rounded-full px-4 py-1 text-sm",
                        user.role === "ADMIN"
                          ? "bg-primary/15 text-primary"
                          : "bg-accent text-muted-foreground",
                      )}
                    >
                      {user.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "flex size-fit items-center gap-2 rounded-full px-4 py-1 text-sm",
                        user.status === "ACTIVE" &&
                          "bg-secondary/20 text-secondary",
                        user.status === "SUSPENDED" &&
                          "bg-destructive/20 text-destructive",
                        user.status === "INACTIVE" &&
                          "bg-accent text-muted-foreground",
                        user.status === "VERIFY" &&
                          "bg-yellow-500/20 text-yellow-600",
                        user.status === "DELETED" &&
                          "bg-destructive/10 text-destructive/60",
                      )}
                    >
                      {user.status === "ACTIVE" && <CircleCheck size={14} />}
                      {user.status === "SUSPENDED" && <CircleX size={14} />}
                      <span
                        className={cn(
                          user.status === "DELETED" && "line-through",
                        )}
                      >
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.status === "ACTIVE" && (
                      <Button
                        variant="destructive"
                        shape="pill"
                        size="sm"
                        className="bg-destructive/15 text-destructive border-destructive hover:bg-destructive/25 border"
                        onClick={() =>
                          updateUser(user.id, { status: "SUSPENDED" })
                        }
                      >
                        Suspend
                      </Button>
                    )}
                    {user.status === "SUSPENDED" && (
                      <Button
                        variant="secondary"
                        shape="pill"
                        size="sm"
                        className="bg-secondary/15 text-secondary border-secondary hover:bg-secondary/25 border"
                        onClick={() =>
                          updateUser(user.id, { status: "ACTIVE" })
                        }
                      >
                        Activate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {userMeta.totalCount} users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                shape="pill"
                size="sm"
                disabled={userMeta.isFirstPage}
                onClick={() => goToUserPage(userPage - 1)}
              >
                <ChevronLeft size={14} />
                Previous
              </Button>
              <span className="text-muted-foreground text-sm">
                {userPage} / {userMeta.pageCount}
              </span>
              <Button
                variant="secondary"
                shape="pill"
                size="sm"
                disabled={userMeta.isLastPage}
                onClick={() => goToUserPage(userPage + 1)}
              >
                Next
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>

          <UserFilterModal
            open={userFilterModalOpen}
            onClose={() => setUserFilterModalOpen(false)}
            filter={userFilter}
            onApply={setUserFilter}
          />
        </div>
      )}

      {selectedTab === tabItems[2].label && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-muted-foreground">{hobbies.length} hobbies</p>
            <Button
              variant="gradient"
              shape="pill"
              onClick={() => setAddHobbyOpen(true)}
            >
              <Plus />
              Add hobby
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
            {hobbies.map((hobby) => (
              <Card
                key={hobby.id}
                className="cursor-pointer flex-row items-center justify-between transition-opacity hover:opacity-75"
                onClick={() => setEditHobbyTarget(hobby)}
              >
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="flex size-10 items-center justify-center rounded-full text-lg"
                    style={{ background: `${hobby.color}7f` }}
                  >
                    {hobby.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{hobby.name}</p>
                    <div
                      className="size-4 rounded-full"
                      style={{ background: hobby.color }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <AddHobbyModal
            open={addHobbyOpen}
            onClose={() => setAddHobbyOpen(false)}
            onAdd={addHobby}
          />
          <EditHobbyModal
            hobby={editHobbyTarget}
            onClose={() => setEditHobbyTarget(null)}
            onUpdate={updateHobby}
            onDelete={removeHobby}
          />
        </div>
      )}

      {selectedTab === tabItems[3].label && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
              />
              <Input
                placeholder="Search entries..."
                value={entrySearch}
                onChange={(e) => setEntrySearch(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
            <Button
              variant="secondary"
              shape="rounded"
              onClick={() => setFilterModalOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="bg-primary size-2 rounded-full" />
              )}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Hobby</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
              {userEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <span className="block max-w-45 truncate">
                      {entry.title ?? "-"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    @{entry.userHobby.user.username}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {entry.userHobby.hobby.name}
                  </TableCell>
                  <TableCell>{entry.mood?.icon ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(entry.createdAt), "y-MM-dd | p")}
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "size-fit rounded-full px-4 py-1 text-sm",
                        entry.visibility === "PRIVATE" &&
                          "bg-accent text-muted-foreground",
                        entry.visibility === "PUBLIC" &&
                          "bg-secondary/20 text-secondary",
                      )}
                    >
                      {entry.visibility}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Eye
                        size={20}
                        className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                        onClick={() => setViewEntry(entry)}
                      />
                      <Trash2
                        size={20}
                        className="text-destructive cursor-pointer opacity-70 transition-opacity hover:opacity-100"
                        onClick={() => setDeleteEntry(entry)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {meta.totalCount} entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                shape="pill"
                size="sm"
                disabled={meta.isFirstPage}
                onClick={() => goToPage(page - 1)}
              >
                <ChevronLeft size={14} />
                Previous
              </Button>
              <span className="text-muted-foreground text-sm">
                {page} / {meta.pageCount}
              </span>
              <Button
                variant="secondary"
                shape="pill"
                size="sm"
                disabled={meta.isLastPage}
                onClick={() => goToPage(page + 1)}
              >
                Next
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>

          {viewEntry && (
            <EntryModal
              open={true}
              onClose={() => setViewEntry(null)}
              data={viewEntry}
              onRefresh={refresh}
            />
          )}
          <DeleteEntryModal
            entry={deleteEntry}
            onClose={() => setDeleteEntry(null)}
            onDelete={removeEntry}
          />
          <EntryFilterModal
            open={filterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            filter={entryFilter}
            onApply={setEntryFilter}
            moods={entryMoods}
          />
        </div>
      )}

      {selectedTab === tabItems[4].label && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-muted-foreground">
              {entryMoods.length} mood options
            </p>
            <Button
              variant="gradient"
              shape="pill"
              onClick={() => setAddMoodOpen(true)}
            >
              <Plus />
              Add mood
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
            {entryMoods.map((mood) => (
              <Card
                key={mood.id}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 transition-opacity hover:opacity-75"
                onClick={() => setEditMoodTarget(mood)}
              >
                <p className="text-4xl">{mood.icon}</p>
                <p className="text-muted-foreground text-sm">{mood.name}</p>
              </Card>
            ))}
          </div>

          <AddMoodModal
            open={addMoodOpen}
            onClose={() => setAddMoodOpen(false)}
            onAdd={(icon, name) => addEntryMood({ icon, name })}
          />
          <EditMoodModal
            mood={editMoodTarget}
            onClose={() => setEditMoodTarget(null)}
            onUpdate={(id, icon, name) => updateEntryMood(id, { icon, name })}
            onDelete={removeEntryMood}
          />
        </div>
      )}
    </div>
  );
}

export default AdminPanelPage;
