import { cn } from "../../lib/utils";

const defaultClasses =
  "flex flex-col bg-card border border-border rounded-3xl p-6";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(defaultClasses, className)} {...props} />;
}

interface CardInfoProps {
  icon: string;
  iconBgColor: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

function CardInfo({
  icon,
  iconBgColor,
  title,
  description,
  children
}: CardInfoProps) {
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

export { Card, CardInfo };
export type { CardInfoProps };
