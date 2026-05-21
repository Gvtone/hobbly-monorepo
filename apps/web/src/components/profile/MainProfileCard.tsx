import { Globe, Lock, Share2, SmilePlus } from "lucide-react";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { cn } from "../../utils/utils";
import { useCurrentMood } from "../../hooks/userCurrentMood";
import { useState } from "react";
import MoodModal from "./MoodModal";
import VisibilityModal from "./VisibilityModal";
import ProfileShareModal from "./ProfileShareModal";
import type { PublicUserEntity, UserEntity } from "@hobbies-dashboard/types";

interface MainProfileCardProps {
  isOwnProfile?: boolean;
  user: PublicUserEntity | UserEntity;
  className?: string;
  children?: React.ReactNode;
}

function MainProfileCard({
  isOwnProfile,
  user,
  className,
  children,
}: MainProfileCardProps) {
  const { currentMood } = useCurrentMood(user.id);

  const [isCurrentMoodOpen, setIsCurrentMoodOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [isProfileShareOpen, setIsProfileShareOpen] = useState(false);

  return (
    <>
      <Card className={cn(className, "flex flex-col p-0 shadow-lg")}>
        {/* Profile Cover */}
        <div className="relative h-28">
          <div className="absolute top-0 right-0 left-0 h-42 overflow-hidden rounded-t-3xl">
            {user?.coverImage && (
              <>
                <img
                  src={user.coverImage}
                  className="h-full w-full object-cover object-center"
                />
                <div className="from-card absolute top-0 right-0 left-0 z-10 h-42 overflow-hidden rounded-t-3xl bg-linear-to-t to-transparent" />
              </>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="z-20 flex flex-col px-6 pb-6">
          <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between md:gap-0">
            <div className="border-card relative size-36 rounded-xl border-2 drop-shadow-xl md:size-24">
              {/* Profile Picture */}
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  className="h-full w-full rounded-xl object-cover object-center"
                />
              ) : (
                <div className="from-hobbly-sky to-hobbly-lavender flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br text-5xl font-bold text-white">
                  {user?.username?.[0].toUpperCase()}
                </div>
              )}

              {/* Current Mood */}
              {currentMood ? (
                <div
                  className={cn(
                    "border-card group absolute -bottom-2 left-[calc(100%-1.5rem)]",
                    "flex items-center justify-center gap-1",
                    "max-w-36 rounded-full border-2 px-1.5 py-1",
                    currentMood.description && "hover:pr-2.5",
                    isOwnProfile && "hover:cursor-pointer",
                    "drop-shadow-xl transition-all duration-300",
                  )}
                  style={
                    currentMood.color
                      ? { backgroundColor: `${currentMood.color}` }
                      : undefined
                  }
                  onClick={
                    isOwnProfile ? () => setIsCurrentMoodOpen(true) : undefined
                  }
                >
                  {currentMood.icon && <span>{currentMood.icon}</span>}
                  {currentMood.description && (
                    <span className="hidden max-w-25 overflow-hidden group-hover:inline">
                      <span className="marquee-text inline-block text-sm whitespace-nowrap text-white">
                        {currentMood.description}
                      </span>
                    </span>
                  )}
                </div>
              ) : (
                isOwnProfile && (
                  <div
                    className={cn(
                      "border-card/50 hover:border-card group absolute -bottom-2 left-[calc(100%-1.5rem)]",
                      "flex items-center justify-center gap-1",
                      "max-w-36 rounded-full border-2 p-1 hover:pr-2",
                      "bg-card/50 hover:bg-card hover:text-foreground text-foreground/50 drop-shadow-xl hover:cursor-pointer",
                      "transition-all duration-300",
                    )}
                    onClick={() => setIsCurrentMoodOpen(true)}
                  >
                    <span>
                      <SmilePlus />
                    </span>
                    <span className="hidden max-w-25 overflow-hidden group-hover:inline">
                      <span className="marquee-text text-foreground inline-block text-sm whitespace-nowrap">
                        Set your mood
                      </span>
                    </span>
                  </div>
                )
              )}
            </div>

            {isOwnProfile && (
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  shape="pill"
                  className="text-muted-foreground"
                  onClick={() => setIsProfileShareOpen(true)}
                >
                  <Share2 size={12} />
                  Share
                </Button>
                <Button
                  onClick={() => setIsVisibilityOpen(true)}
                  variant="secondary"
                  shape="pill"
                  className="text-muted-foreground"
                  style={
                    user?.visibility === "PUBLIC"
                      ? { background: "var(--hobbly-green)", color: "white" }
                      : undefined
                  }
                >
                  {user?.visibility === "PUBLIC" ? (
                    <Globe size={12} />
                  ) : (
                    <Lock size={12} />
                  )}
                  {user?.visibility === "PUBLIC" ? "Public" : "Private"}
                </Button>
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mb-4 flex flex-col">
            <h2 className="text-center text-3xl md:text-start">
              {user?.displayName ?? user?.username}
            </h2>
            <span className="text-muted-foreground mb-2 text-center text-sm md:text-start">
              @{user?.username}
            </span>

            {/* Bio */}
            {user?.bio && (
              <p className="text-center text-sm md:text-start">{user?.bio}</p>
            )}
          </div>

          {children}
        </div>
      </Card>

      {isOwnProfile && (
        <>
          <MoodModal
            userId={user.id}
            open={isCurrentMoodOpen}
            onClose={() => setIsCurrentMoodOpen(false)}
          />
          <VisibilityModal
            open={isVisibilityOpen}
            onClose={() => setIsVisibilityOpen(false)}
          />
          <ProfileShareModal
            open={isProfileShareOpen}
            onClose={() => setIsProfileShareOpen(false)}
          />
        </>
      )}
    </>
  );
}

export default MainProfileCard;
