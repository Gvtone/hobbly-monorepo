import Masonry from "react-masonry-css";
import Button from "../ui/Button";

interface ProfileEntriesLayoutProps {
  entryTabs: { emoji: string; hobby: string }[];
  children: React.ReactNode;
  activeHobby?: string | null;
  onHobbyChange?: (hobby: string | null) => void;
}

function ProfileEntriesLayout({
  entryTabs,
  children,
  activeHobby,
  onHobbyChange,
}: ProfileEntriesLayoutProps) {
  return (
    <>
      <div className="mb-4 flex gap-2">
        <Button
          variant="secondary"
          shape="pill"
          size="sm"
          className="text-muted-foreground border-none text-sm"
          active={activeHobby == null}
          onClick={() => onHobbyChange?.(null)}
        >
          <span>✨</span>
          <span>All</span>
        </Button>

        {entryTabs.map((tab) => (
          <Button
            key={tab.hobby}
            variant="secondary"
            shape="pill"
            size="sm"
            className="text-muted-foreground border-none text-sm"
            active={activeHobby === tab.hobby}
            onClick={() => onHobbyChange?.(tab.hobby)}
          >
            <span>{tab.emoji}</span>
            <span>{tab.hobby}</span>
          </Button>
        ))}
      </div>

      <Masonry
        breakpointCols={{ default: 3, 768: 2, 480: 1 }}
        className="mb-4 flex gap-3"
        columnClassName="flex flex-col gap-3"
      >
        {children}
      </Masonry>
    </>
  );
}

export default ProfileEntriesLayout;
