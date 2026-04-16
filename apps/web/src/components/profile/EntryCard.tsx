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
}

function EntryCard({
  coverImg,
  mood,
  hobby,
  title,
  note,
  reference
}: EntryCardProps) {
  return (
    <div className="break-inside-avoid">
      <Card className="p-0">
        <div className="flex flex-col">
          <div
            className={cn(
              "relative flex  justify-between rounded-t-3xl overflow-hidden p-4",
              `${coverImg && "flex-col aspect-4/3"}`
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
                `bg-[${hobby.color}]`,
                "flex gap-2 px-2 py-1 text-xs z-10 size-fit rounded-full",
                `${!coverImg && "-order-1"}`
              )}
            >
              <span>{hobby.emoji}</span>
              <span className="text-white">{hobby.name}</span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-4">
            <div className="flex flex-col gap-1 mb-4">
              <p className="font-serif text-xm">{title}</p>
              {note && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {note}
                </p>
              )}
              {reference && <p className="text-muted text-xs">{reference}</p>}
            </div>

            <div className="flex text-xs gap-2">
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
      </Card>
    </div>
  );
}

export default EntryCard;
