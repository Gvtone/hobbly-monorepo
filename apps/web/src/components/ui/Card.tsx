import { cn } from "../../utils/utils";

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

export { Card, InfoCard };
export type { InfoCardProps };
