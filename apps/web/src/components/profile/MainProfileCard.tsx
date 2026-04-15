import { Lock, PenLine, Share2 } from "lucide-react";
import Button from "../ui/Button";
import { Card } from "../ui/Card";

interface MainProfileCardProps {
  coverPhoto?: string;
  profilePhoto?: string;
  currentStatus?: { emoji: string; bgColor: string };
  displayname: string;
  handle: string;
  bio?: string;
  children?: string;
}

function MainProfileCard({
  coverPhoto,
  profilePhoto,
  currentStatus,
  displayname,
  handle,
  bio,
  children
}: MainProfileCardProps) {
  return (
    <Card className="flex flex-col shadow-lg p-0 mb-10">
      {/* Profile Cover */}
      <div className="relative h-28">
        <div className="absolute rounded-t-3xl h-42 top-0 left-0 right-0 overflow-hidden">
          <img
            src={coverPhoto}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute rounded-t-3xl h-42 top-0 left-0 right-0 overflow-hidden bg-linear-to-t from-card to-transparent z-10"></div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col px-6 pb-6 z-20">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-end gap-6 md:gap-0 mb-8">
          <div className="relative rounded-xl size-36 md:size-24 border-2 border-card drop-shadow-xl">
            <img
              src={profilePhoto}
              className="object-cover object-center w-full h-full rounded-xl"
            />
            {currentStatus && (
              <div
                className={`absolute -bottom-2 -right-2 rounded-full p-1 border-2 border-card drop-shadow-xl`}
                style={
                  currentStatus.bgColor
                    ? { backgroundColor: `${currentStatus.bgColor}` }
                    : undefined
                }
              >
                {currentStatus?.emoji}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="secondary"
              shape="pill"
              className="text-muted-foreground"
            >
              <Share2 size={12}></Share2>
              Share
            </Button>
            <Button
              variant="secondary"
              shape="pill"
              className="text-muted-foreground"
            >
              <Lock size={12}></Lock>
              Private
            </Button>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <h2 className="text-3xl text-center md:text-start">{displayname}</h2>
          <span className="text-sm text-muted-foreground text-center md:text-start mb-2">
            {handle}
          </span>

          {bio && (
            <div className="flex items-center group">
              <p className="text-sm text-center md:text-start">{bio}</p>
              <Button
                variant="transparent"
                shape="pill"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              >
                <PenLine size={14}></PenLine>
              </Button>
            </div>
          )}
        </div>

        {children}
      </div>
    </Card>
  );
}

export default MainProfileCard;
