import { Plus, Settings } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const mockRowData = [
  { emoji: "🎯", value: "8", title: "Hobbies Tracked" },
  { emoji: "🔥", value: "12 days", title: "Journal streak" },
  { emoji: "🎌", value: "8 total", title: "Anime series" },
  { emoji: "📚", value: "23 total", title: "Books read" }
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "🌤️" };
  return { text: "Good evening", emoji: "🌙" };
}

function DashboardPage() {
  const greeting = getGreeting();

  return (
    <AppLayout>
      <div className="py-10 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Right side */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {greeting.emoji} {greeting.text}, Yuki
            </p>
            <h1 className="text-3xl">Your Hobby Board</h1>
            <p className="text-sm text-muted-foreground">
              8 widgets · Drag to rearrange ✨
            </p>
          </div>

          {/* Left side */}
          <div className="flex gap-4">
            <Button shape="pill" className="text-muted-foreground">
              <Settings size={16} /> Customize
            </Button>
            <Button variant="gradient" shape="pill">
              <Plus size={16} />
              Add Widget
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {mockRowData.map(data => (
            <Card className="py-4" key={data.title}>
              <div className="flex gap-2 items-center">
                <span className="text-4xl">{data.emoji}</span>
                <div className="flex flex-col">
                  <span className="font-hobbly-serif text-xl font-semibold">
                    {data.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {data.title}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
