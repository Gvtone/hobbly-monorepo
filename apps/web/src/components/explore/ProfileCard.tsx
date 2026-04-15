import { Sparkles } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";
import { cn } from "../../utils/utils";

interface ProfileCardProps {
  isFeatured?: boolean;
  profileImage?: string;
  displayName: string;
  handle: string;
  followerAmount: number;
  bio?: string;
  hobbies?: { emoji: string; name: string }[];
  className?: string;
  children?: React.ReactNode;
}

function ProfileCard({
  isFeatured,
  profileImage,
  displayName,
  handle,
  followerAmount,
  bio,
  hobbies,
  className,
  children
}: ProfileCardProps) {
  return (
    <Card className={cn("gap-2", className)}>
      {isFeatured && (
        <p className="flex gap-2 items-center text-hobbly-sky-dark text-sm">
          <Sparkles size={16} />
          Featured Board of the Week
        </p>
      )}

      {/* Main profile info */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <img
            src={profileImage}
            className="object-cover object-center size-14 rounded-xl"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{displayName}</span>
            <span className="text-xs text-muted-foreground">
              @{handle} · {followerAmount} followers
            </span>
          </div>
        </div>
        <div>
          <Button variant="gradient" shape="pill" size="sm">
            Follow
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground">{bio}</p>

      {/* Hobby tags */}
      {hobbies && (
        <div className="flex gap-2 mb-2">
          {hobbies.map(hobby => (
            <div
              key={hobby.name}
              className="flex gap-1 bg-accent text-muted-foreground rounded-full px-2 py-1 text-xs"
            >
              <div>{hobby.emoji}</div>
              <span>{hobby.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Featured entries */}
      <div className="relative rounded-xl size-14 overflow-hidden group cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1762219214303-7e198a76d18e"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-0 left-0 size-full group-hover:bg-black/20 z-10"></div>
      </div>

      {children}
    </Card>
  );
}

export default ProfileCard;
export type { ProfileCardProps };
