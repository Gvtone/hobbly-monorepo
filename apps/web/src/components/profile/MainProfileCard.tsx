import { Lock, PenLine, Share2 } from "lucide-react";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { cn } from "../../utils/utils";
import { useAuth } from "../../context/auth/useAuth";

interface MainProfileCardProps {
  setVisibility: () => void;
  className?: string;
  children?: React.ReactNode;
}

function MainProfileCard({
  setVisibility,
  className,
  children,
}: MainProfileCardProps) {
  const { user } = useAuth();

  return (
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
            {/* {currentStatus && (
              <div
                className={`border-card absolute -right-2 -bottom-2 rounded-full border-2 p-1 drop-shadow-xl`}
                style={
                  currentStatus.bgColor
                    ? { backgroundColor: `${currentStatus.bgColor}` }
                    : undefined
                }
              >
                {currentStatus?.emoji}
              </div>
            )} */}
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
              onClick={() => setVisibility()}
              variant="secondary"
              shape="pill"
              className="text-muted-foreground"
            >
              <Lock size={12}></Lock>
              Private
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
    </Card>
  );
}

export default MainProfileCard;
