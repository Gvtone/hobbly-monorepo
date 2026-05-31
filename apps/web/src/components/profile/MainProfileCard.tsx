import { Globe, Lock, Share2, SmilePlus } from "lucide-react";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { cn, getContrastColor } from "../../utils/utils";
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
  const { currentMood, setOrUpdateCurrentMood, removeCurrentMood } =
    useCurrentMood(user.id);

  const [isCurrentMoodOpen, setIsCurrentMoodOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [isProfileShareOpen, setIsProfileShareOpen] = useState(false);

  const AVG_CHAR_PX = 7.5;
  // desktop badge: max-w-25 (100px) inner span, minus emoji+gap (~24px) ≈ 76px
  const desktopMarquee =
    !!currentMood?.description &&
    currentMood.description.length * AVG_CHAR_PX > 76;
  // mobile chip: w-44 (176px) - px-3×2 (24px) - emoji+gap (~26px) ≈ 126px
  const mobileMarquee =
    !!currentMood?.description &&
    currentMood.description.length * AVG_CHAR_PX > 126;

  return (
    <>
      <Card
        className={cn(
          className,
          "flex flex-col p-0 shadow-lg max-md:rounded-none",
        )}
      >
        {/* Profile Cover */}
        <div className="relative h-28">
          <div className="absolute top-0 right-0 left-0 h-42 overflow-hidden md:rounded-t-3xl">
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
                    "hidden items-center justify-center gap-1 md:flex",
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
                      <span
                        className={cn(
                          "inline-block text-sm whitespace-nowrap",
                          desktopMarquee && "marquee-text",
                        )}
                        style={
                          {
                            "--marquee-duration": `${Math.max(2, 1.25 + currentMood.description.length * 0.1)}s`,
                            color: currentMood.color
                              ? getContrastColor(currentMood.color)
                              : "#ffffff",
                          } as React.CSSProperties
                        }
                      >
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
                      "hidden items-center justify-center gap-1 md:flex",
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

            {/* Mood — mobile only */}
            {currentMood?.description ? (
              <div
                className={cn(
                  "relative mt-4 flex w-fit max-w-44 items-center gap-1.5 rounded-full px-3 py-1",
                  "mx-auto md:hidden",
                  isOwnProfile && "cursor-pointer",
                )}
                style={{ backgroundColor: currentMood.color ?? undefined }}
                onClick={
                  isOwnProfile ? () => setIsCurrentMoodOpen(true) : undefined
                }
              >
                {currentMood.icon && (
                  <span className="relative z-10 shrink-0 text-sm leading-none">
                    {currentMood.icon}
                  </span>
                )}
                <span className="min-w-0 flex-1 overflow-hidden">
                  <span
                    className={cn(
                      "inline-block text-sm whitespace-nowrap",
                      mobileMarquee && "marquee-text",
                    )}
                    style={
                      {
                        "--marquee-start": "8rem",
                        "--marquee-duration": `${(1.6 + currentMood.description.length * 0.1).toFixed(1)}s`,
                        color: currentMood.color
                          ? getContrastColor(currentMood.color)
                          : "#ffffff",
                      } as React.CSSProperties
                    }
                  >
                    {currentMood.description}
                  </span>
                </span>
              </div>
            ) : currentMood && isOwnProfile ? (
              <div
                className="mx-auto mt-2 w-fit cursor-pointer rounded-full border-2 px-3 py-1 md:hidden"
                style={
                  currentMood.color
                    ? {
                        backgroundColor: currentMood.color,
                        borderColor: currentMood.color,
                      }
                    : undefined
                }
                onClick={() => setIsCurrentMoodOpen(true)}
              >
                {currentMood.icon && (
                  <span className="text-sm leading-none">
                    {currentMood.icon}
                  </span>
                )}
              </div>
            ) : (
              isOwnProfile && (
                <div
                  className={cn(
                    "border-card/50 hover:border-card mx-auto mt-2 w-fit md:hidden",
                    "flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5",
                    "bg-card/50 hover:bg-card text-foreground/50 hover:text-foreground",
                    "border-border cursor-pointer border transition-colors",
                  )}
                  onClick={() => setIsCurrentMoodOpen(true)}
                >
                  <SmilePlus size={14} />
                  <span className="text-sm">Set your mood</span>
                </div>
              )
            )}
          </div>

          {children}
        </div>
      </Card>

      {isOwnProfile && (
        <>
          <MoodModal
            currentMood={currentMood}
            setOrUpdateCurrentMood={setOrUpdateCurrentMood}
            removeCurrentMood={removeCurrentMood}
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
