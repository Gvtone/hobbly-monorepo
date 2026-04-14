import { cn } from "../../utils/utils";
import { Ellipsis, Expand, Sparkles } from "lucide-react";
import Button from "./Button";

const defaultClasses =
  "flex flex-col bg-card text-card-foreground border border-border rounded-3xl p-6";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(defaultClasses, className)} {...props} />;
}

interface InfoCardProps {
  icon: string;
  iconBgColor: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

function InfoCard({
  icon,
  iconBgColor,
  title,
  description,
  children
}: InfoCardProps) {
  return (
    <Card className="flex-1 gap-2">
      <div
        className={`flex justify-center items-center rounded-xl ${iconBgColor} size-12 shadow shadow-primary/30`}
      >
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      {children}
    </Card>
  );
}

interface WidgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hobbyTag: string;
  tagColor: string;
  bgImage?: string;
  trackedNumber: string;
  trackedLabel: string;
  additional?: string;
}

function WidgetCard({
  hobbyTag,
  tagColor,
  bgImage,
  trackedNumber,
  trackedLabel,
  additional,
  className
}: WidgetCardProps) {
  const defaultClasses =
    "relative rounded-xl p-2 bg-cover bg-center justify-between";

  return (
    <Card
      className={cn(defaultClasses, className)}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <div className="flex justify-between z-10">
        <div className={`${tagColor} rounded-full px-2 w-fit h-fit`}>
          <span className="text-white text-sm font-semibold">{hobbyTag}</span>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <div className="flex p-1 size-fit bg-white/30 rounded-full text-sm">
            ✨
          </div>
          <div className="flex p-1 size-fit bg-white/30 rounded-full">
            <Ellipsis size={12} className="text-white"></Ellipsis>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end z-10">
        <div className="flex flex-col">
          <span className="text-white font-hobbly-serif font-bold text-2xl">
            {trackedNumber}
          </span>
          <span className="text-white/70 text-xs">{trackedLabel}</span>
          {additional && (
            <span className="text-white/90 text-xs">{additional}</span>
          )}
        </div>
        <div className="flex justify-center items-center p-2 size-fit rounded-full bg-white/30">
          <Expand size={12} className="text-white"></Expand>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-full bg-linear-to-t from-black/50 to-transparent rounded-xl" />
    </Card>
  );
}

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

export { Card, InfoCard, WidgetCard, ProfileCard };
export type { InfoCardProps, WidgetCardProps };
