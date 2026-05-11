import { Globe, Lock, PenLine, Share2, SmilePlus } from "lucide-react";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { cn } from "../../utils/utils";
import { useAuth } from "../../context/auth/useAuth";
import { useCurrentMood } from "../../hooks/userCurrentMood";
import Modal from "../layout/Modal";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import { useForm, useWatch } from "react-hook-form";
import type { SetCurrentMoodDto } from "@hobbies-dashboard/types";
import EmojiInput from "../ui/EmojiInput";
import { userService } from "../../services/user";
import { showToast } from "../../utils/toast";

interface MainProfileCardProps {
  className?: string;
  children?: React.ReactNode;
}

function MainProfileCard({ className, children }: MainProfileCardProps) {
  const { user, updateUser } = useAuth();
  const { currentMood, setOrUpdateCurrentMood, removeCurrentMood } =
    useCurrentMood();

  const [isCurrentMoodOpen, setIsCurrentMoodOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  const toggleVisibility = async () => {
    const newVisibility = user?.visibility === "PRIVATE" ? "PUBLIC" : "PRIVATE";
    const updated = await userService.updateCurrentUser({
      visibility: newVisibility,
    });
    updateUser(updated);
    setIsVisibilityOpen(false);
    showToast.success(
      `Profile visibility changed to ${newVisibility.toLowerCase()}`,
    );
  };

  const { register, handleSubmit, setValue, reset, control } =
    useForm<SetCurrentMoodDto>({
      defaultValues: {
        icon: currentMood?.icon ?? "😊",
        color: currentMood?.color ?? "#c8a2e3",
        description: currentMood?.description ?? undefined,
      },
    });

  useEffect(() => {
    reset({
      icon: currentMood?.icon ?? "😊",
      color: currentMood?.color ?? "#c8a2e3",
      description: currentMood?.description ?? "",
    });
  }, [currentMood, reset]);

  const icon = useWatch({ control, name: "icon" });
  const color = useWatch({ control, name: "color" });
  const description = useWatch({ control, name: "description" }) ?? "";

  const onSubmit = async (data: SetCurrentMoodDto) => {
    await setOrUpdateCurrentMood(data);
    reset();
    setIsCurrentMoodOpen(false);
  };

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
                <div className="from-card absolute top-0 right-0 left-0 z-10 h-42 overflow-hidden rounded-t-3xl bg-linear-to-t to-transparent"></div>
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
                    "drop-shadow-xl hover:cursor-pointer",
                    "transition-all duration-300",
                  )}
                  style={
                    currentMood.color
                      ? { backgroundColor: `${currentMood.color}` }
                      : undefined
                  }
                  onClick={() => setIsCurrentMoodOpen(true)}
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
          </div>

          <div className="mb-4 flex flex-col">
            <h2 className="text-center text-3xl md:text-start">
              {user?.displayName ?? user?.username}
            </h2>
            <span className="text-muted-foreground mb-2 text-center text-sm md:text-start">
              @{user?.username}
            </span>

            {user?.bio && (
              <div className="group flex items-center">
                <p className="text-center text-sm md:text-start">{user?.bio}</p>
                <Button
                  variant="transparent"
                  shape="pill"
                  size="icon"
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <PenLine size={14}></PenLine>
                </Button>
              </div>
            )}
          </div>

          {children}
        </div>

        <Modal
          title="Profile Visibility"
          description="Set who can see your profile"
          icon={user?.visibility === "PUBLIC" ? "🌏" : "🔒"}
          open={isVisibilityOpen}
          onClose={() => setIsVisibilityOpen(false)}
        >
          <div className="mb-4 flex flex-col gap-1">
            <p className="text-center">
              {user?.visibility === "PUBLIC"
                ? "Making your profile private will hide it from search and other users."
                : "People will be able to visit your profile and you'll appear in search."}
            </p>
            <p className="text-muted-foreground text-center text-sm">
              You can change it back any time.
            </p>
          </div>
          <Button
            onClick={toggleVisibility}
            fullWidth
            variant="gradient"
            shape="pill"
          >
            {user?.visibility === "PUBLIC"
              ? "Make profile private"
              : "Set profile to public"}
          </Button>
        </Modal>

        <Modal
          title="Show your current mood!"
          description="Set your mood"
          icon="🤍"
          open={isCurrentMoodOpen}
          onClose={() => {
            setIsCurrentMoodOpen(false);
            reset({ color: undefined });
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Emoji + Color + Description row */}
            <div className="flex gap-1">
              {/* Color picker */}
              <input
                type="color"
                {...register("color")}
                className="size-12 cursor-pointer appearance-none rounded-l-full border-none p-0"
                style={{ backgroundColor: color }}
              />

              {/* Emoji picker */}
              <EmojiInput
                value={icon}
                onChange={(emoji) => setValue("icon", emoji)}
                className="rounded-none border-none"
              />

              {/* Description with character limit */}
              <div className="flex flex-1 flex-col gap-1">
                <Input
                  type="text"
                  variant="auth"
                  shape="pill"
                  placeholder="How are you feeling?"
                  maxLength={100}
                  autoComplete="off"
                  className="rounded-l-none"
                  {...register("description", { maxLength: 100 })}
                />
                <span
                  className="text-muted-foreground text-right text-xs"
                  style={
                    description.length == 100 ? { color: "red" } : undefined
                  }
                >
                  {description.length}/100
                </span>
              </div>
            </div>

            <Button type="submit" variant="gradient" shape="pill" fullWidth>
              Save mood ✨
            </Button>
            {currentMood && (
              <Button
                type="button"
                variant="secondary"
                shape="pill"
                fullWidth
                onClick={async () => {
                  await removeCurrentMood();
                  setIsCurrentMoodOpen(false);
                }}
              >
                Remove mood
              </Button>
            )}
          </form>
        </Modal>
      </Card>
    </>
  );
}

export default MainProfileCard;
