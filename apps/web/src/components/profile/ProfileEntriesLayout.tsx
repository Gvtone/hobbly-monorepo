import Masonry from "react-masonry-css";
import Button from "../ui/Button";

const entryTabs = [
  { emoji: "🎌", hobby: "Anime" },
  { emoji: "📚", hobby: "Books" },
  { emoji: "🎮", hobby: "Gaming" },
  { emoji: "🎨", hobby: "Art" },
  { emoji: "🍜", hobby: "Cooking" },
  { emoji: "🎵", hobby: "Music" },
  { emoji: "📖", hobby: "Journal" }
];

interface ProfileEntriesLayoutProps {
  children: React.ReactNode;
}

function ProfileEntriesLayout({ children }: ProfileEntriesLayoutProps) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          variant="secondary"
          shape="pill"
          size="sm"
          className="border-none text-muted-foreground text-sm"
          active
        >
          <span>✨</span>
          <span>All</span>
        </Button>

        {entryTabs.map(tab => (
          <Button
            variant="secondary"
            shape="pill"
            size="sm"
            className="border-none text-muted-foreground text-sm"
          >
            <span>{tab.emoji}</span>
            <span>{tab.hobby}</span>
          </Button>
        ))}
      </div>

      <Masonry
        breakpointCols={{ default: 3, 768: 2, 480: 1 }}
        className="flex gap-3"
        columnClassName="flex flex-col gap-3"
      >
        {children}
      </Masonry>
    </div>
  );
}

export default ProfileEntriesLayout;
