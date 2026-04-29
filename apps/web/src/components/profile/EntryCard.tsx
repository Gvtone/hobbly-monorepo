import { Heart, MessageCircleIcon } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";
import { cn } from "../../utils/utils";
import type { EntryWithUserHobbyEntity } from "@hobbies-dashboard/types";

interface EntryCardProps {
  data: EntryWithUserHobbyEntity;
  dashboard?: boolean;
}

function EntryCard({ data, dashboard = false }: EntryCardProps) {
  const {
    title,
    image,
    note,
    metadata,
    userHobby: { hobby },
    mood,
  } = data;

  return (
    <div className={cn("break-inside-avoid", dashboard && "h-full")}>
      <Card className={cn("p-0", dashboard && "h-full")}>
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "relative flex justify-between overflow-hidden rounded-t-3xl p-4",
              image && "aspect-4/3 flex-col",
              image && dashboard ? "aspect-3/1" : "",
            )}
            style={
              !image
                ? { backgroundColor: `#${hobby.color}6f`, alignItems: "center" }
                : undefined
            }
          >
            {image && (
              <img
                src={image}
                alt=""
                className="absolute top-0 left-0 size-full object-cover"
              />
            )}

            {mood && (
              <div className="z-10 self-end">
                <div className="flex size-7 items-center justify-center rounded-full bg-white">
                  {mood.icon}
                </div>
              </div>
            )}

            <div
              className={cn(
                "z-10 flex size-fit gap-2 rounded-full px-2 py-1 text-xs",
                `${!image && "-order-1"}`,
              )}
              style={{ backgroundColor: `#${hobby.color}` }}
            >
              <span>{hobby.icon}</span>
              <span className="text-white">{hobby.name}</span>
            </div>
          </div>

          <div className={"flex flex-1 flex-col justify-between p-4"}>
            <div className="mb-4 flex flex-col gap-1">
              <p className={cn("mb-2 font-serif", dashboard && "text-xl")}>
                {title}
              </p>
              {note && (
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    dashboard ? "text-sm" : "text-xs",
                  )}
                >
                  {note}
                </p>
              )}
              {metadata && <p className="text-muted text-xs">metadata</p>}
            </div>

            <div>
              {dashboard && <div className="border-border my-2 border"></div>}
              <div
                className={cn("flex text-xs", dashboard && "justify-between")}
              >
                {dashboard && (
                  <p className="text-muted-foreground">Yesterday</p>
                )}
                <div className="flex gap-2">
                  <Button variant="transparent" size="sm" className="p-0">
                    <Heart size={12}></Heart>
                    <span>31</span>
                  </Button>
                  <Button variant="transparent" size="sm" className="p-0">
                    <MessageCircleIcon size={12}></MessageCircleIcon>
                    <span>31</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EntryCard;
