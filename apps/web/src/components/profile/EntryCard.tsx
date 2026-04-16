import { Heart, MessageCircleIcon } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";
import { cn } from "../../utils/utils";

interface EntryCardProps {
  coverImg?: string;
  mood?: string;
  hobby: { emoji: string; name: string; color: string };
  title: string;
  note?: string;
  reference?: string;
  dashboard?: boolean;
}

function EntryCard({
  coverImg,
  mood,
  hobby,
  title,
  note,
  reference,
  dashboard = false
}: EntryCardProps) {
  return (
    <div className={cn("break-inside-avoid", dashboard && "h-full")}>
      <Card className={cn("p-0", dashboard && "h-full")}>
        <div className="flex flex-col h-full">
          <div
            className={cn(
              "relative flex justify-between rounded-t-3xl overflow-hidden p-4",
              coverImg && "flex-col aspect-4/3",
              coverImg && dashboard ? "aspect-3/1" : ""
            )}
            style={
              !coverImg
                ? { backgroundColor: `${hobby.color}6f`, alignItems: "center" }
                : undefined
            }
          >
            {coverImg && (
              <img
                src={coverImg}
                alt=""
                className="absolute top-0 left-0 object-cover size-full"
              />
            )}

            {mood && (
              <div className="self-end z-10">
                <div className="flex justify-center items-center bg-white rounded-full size-7">
                  {mood}
                </div>
              </div>
            )}

            <div
              className={cn(
                "flex gap-2 px-2 py-1 text-xs z-10 size-fit rounded-full",
                `${!coverImg && "-order-1"}`
              )}
              style={{ backgroundColor: hobby.color }}
            >
              <span>{hobby.emoji}</span>
              <span className="text-white">{hobby.name}</span>
            </div>
          </div>

          <div className={"flex flex-col justify-between p-4 flex-1"}>
            <div className="flex flex-col gap-1 mb-4">
              <p className={cn("font-serif mb-2", dashboard && "text-xl")}>
                {title}
              </p>
              {note && (
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    dashboard ? "text-sm" : "text-xs "
                  )}
                >
                  {note}
                </p>
              )}
              {reference && <p className="text-muted text-xs">{reference}</p>}
            </div>

            <div>
              {dashboard && <div className="border border-border my-2"></div>}
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
