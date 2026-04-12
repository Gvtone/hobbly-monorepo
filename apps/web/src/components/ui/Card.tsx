import { cn } from "../../lib/utils";
import { Ellipsis, Expand } from "lucide-react";

const defaultClasses =
  "flex flex-col bg-card border border-border rounded-3xl p-6";

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
  additional: string;
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
      <div className="flex justify-between z-1">
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
      <div className="flex justify-between items-end z-1">
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

export { Card, InfoCard, WidgetCard };
export type { InfoCardProps, WidgetCardProps };
