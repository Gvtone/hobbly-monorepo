import {
  BarChart2,
  BookOpen,
  CircleCheck,
  CircleX,
  Eye,
  FileText,
  Plus,
  Smile,
  Star,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useState } from "react";
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

const tabItems = [
  { label: "Overview", icon: BarChart2 },
  { label: "Users", icon: Users },
  { label: "Hobbies", icon: BookOpen },
  { label: "Entries", icon: FileText },
  { label: "Moods", icon: Smile },
];

function AdminPanelPage() {
  const [selectedTab, setSelectedTab] = useState(tabItems[0].label);

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
              Hobby popularity
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
        <div>
          <Table>
            <TableHeader>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Entries</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1777997829706-9a493e3da02e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User Profile"
                    className="size-8 rounded-full"
                  />
                  <div>
                    <p>Hana Leo</p>
                    <p className="text-muted-foreground text-sm">@starweaver</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  hana@example.com
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  <div className="bg-accent text-muted-foreground size-fit rounded-full px-4 py-1 text-sm">
                    user
                  </div>
                </TableCell>
                <TableCell>42</TableCell>
                <TableCell>234</TableCell>
                <TableCell>
                  <div className="bg-secondary/20 text-secondary flex size-fit items-center justify-center gap-2 rounded-full px-4 py-1 text-sm">
                    <CircleCheck size={14} />
                    active
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    shape="pill"
                    size="sm"
                    className="bg-destructive/20 text-destructive border-destructive hover:bg-destructive/10 border"
                  >
                    Suspend
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1777997829706-9a493e3da02e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User Profile"
                    className="size-8 rounded-full"
                  />
                  <div>
                    <p>Mia Ren</p>
                    <p className="text-muted-foreground text-sm">
                      @fernwhisper
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  mia@example.com
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  <div className="bg-accent text-muted-foreground size-fit rounded-full px-4 py-1 text-sm">
                    user
                  </div>
                </TableCell>
                <TableCell>67</TableCell>
                <TableCell>301</TableCell>
                <TableCell>
                  <div className="bg-destructive/20 text-destructive flex size-fit items-center justify-center gap-2 rounded-full px-4 py-1 text-sm">
                    <CircleX size={14} />
                    suspended
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    shape="pill"
                    size="sm"
                    className="bg-secondary/20 text-secondary border-secondary hover:bg-secondary/10 border"
                  >
                    Reinstate
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      {selectedTab === tabItems[2].label && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-muted-foreground">15 mood options</p>
            <Button variant="gradient" shape="pill">
              <Plus />
              Add hobby
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5">
            <Card className="group flex-row items-center justify-between">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-hobbly-lavender/25 flex size-10 items-center justify-center rounded-full text-lg">
                  🎮
                </div>
                <div className="flex flex-col gap-2">
                  <p>Gaming</p>
                  <div className="bg-hobbly-lavender size-4 rounded-full"></div>
                </div>
              </div>
              <Button
                variant="transparent"
                className="text-destructive hidden p-0 group-hover:flex"
              >
                <Trash2 size={18} />
              </Button>
            </Card>
          </div>
        </div>
      )}

      {selectedTab === tabItems[3].label && (
        <div>
          <Table>
            <TableHeader>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Hobby</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  Celestial Chronicles
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  @starweaver
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Anime
                </TableCell>
                <TableCell>😭</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  2026-04-15
                </TableCell>
                <TableCell>14</TableCell>
                <TableCell>
                  <div className="bg-accent text-muted-foreground size-fit rounded-full px-4 py-1 text-sm">
                    Private
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Eye size={20} className="text-muted-foreground" />
                    <Trash2 size={20} className="text-destructive" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  {/* Reported Entry */}
                  <div className="bg-destructive size-2 rounded-full" />
                  Morning Pages
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  @starweaver
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Anime
                </TableCell>
                <TableCell>😭</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  2026-04-15
                </TableCell>
                <TableCell>14</TableCell>
                <TableCell>
                  <div className="bg-secondary/20 text-secondary size-fit rounded-full px-4 py-1 text-sm">
                    Public
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Eye size={20} className="text-muted-foreground" />
                    <Trash2 size={20} className="text-destructive" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      {selectedTab === tabItems[4].label && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-muted-foreground">15 mood options</p>
            <Button variant="gradient" shape="pill">
              <Plus />
              Add mood
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5">
            <Card className="group relative flex flex-col items-center justify-center gap-2">
              <p className="text-4xl">😊</p>
              <p className="text-muted-foreground text-sm">Happy</p>
              <Button
                variant="destructive"
                shape="pill"
                size="icon"
                className="bg-destructive/25 text-destructive hover:bg-destructive/50 absolute top-3 right-3 hidden size-6 group-hover:flex hover:cursor-pointer"
              >
                <X size={12} />
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanelPage;
