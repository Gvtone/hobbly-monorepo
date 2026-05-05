import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";
import { cn } from "../../utils/utils";
import { Ellipsis, Expand } from "lucide-react";

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
  children,
}: InfoCardProps) {
  return (
    <Card className="flex-1 gap-2">
      <div
        className={`flex items-center justify-center rounded-xl ${iconBgColor} shadow-primary/30 size-12 shadow`}
      >
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      {children}
    </Card>
  );
}

interface HobbyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: UserHobbyWithHobbyEntity;
  trackedNumber: string;
  trackedLabel: string;
  additional?: string;
}

function HobbyCard({
  data,
  trackedNumber,
  trackedLabel,
  additional,
  className,
}: HobbyCardProps) {
  const defaultClasses =
    "relative rounded-xl p-3 bg-cover bg-center justify-between";

  const { hobby, backgroundImage } = data;

  return (
    <Card
      className={cn(defaultClasses, className)}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : { backgroundColor: `${hobby.color}22` }
      }
    >
      {!backgroundImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-25">{hobby.icon}</span>
        </div>
      )}
      <div className="z-10 flex justify-between">
        <div
          className={`h-fit w-fit rounded-full px-2`}
          style={{ backgroundColor: `${hobby.color}` }}
        >
          <span className="text-sm font-semibold text-white">
            {hobby.icon} {hobby.name}
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex size-fit rounded-full bg-white/30 p-1">
            <Ellipsis size={12} className="text-white"></Ellipsis>
          </div>
        </div>
      </div>
      <div className="z-10 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-hobbly-serif text-2xl font-bold text-white">
            {trackedNumber}
          </span>
          <span className="text-xs text-white/70">{trackedLabel}</span>
          {additional && (
            <span className="text-xs text-white/90">{additional}</span>
          )}
        </div>
        <div className="flex size-fit items-center justify-center rounded-full bg-white/30 p-2">
          <Expand size={12} className="text-white"></Expand>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 h-full rounded-xl bg-linear-to-t from-black/50 to-transparent" />
    </Card>
  );
}

export { Card, InfoCard, HobbyCard };
export type { InfoCardProps, HobbyCardProps };
