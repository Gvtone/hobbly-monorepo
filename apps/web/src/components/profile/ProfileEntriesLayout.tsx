import Masonry from "react-masonry-css";
import Button from "../ui/Button";

interface ProfileEntriesLayoutProps {
  entryTabs: { emoji: string; hobby: string }[];
  children: React.ReactNode;
}

function ProfileEntriesLayout({
  entryTabs,
  children,
}: ProfileEntriesLayoutProps) {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button
          variant="secondary"
          shape="pill"
          size="sm"
          className="text-muted-foreground border-none text-sm"
          active
        >
          <span>✨</span>
          <span>All</span>
        </Button>

        {entryTabs.map((tab) => (
          <Button
            variant="secondary"
            shape="pill"
            size="sm"
            className="text-muted-foreground border-none text-sm"
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
