import * as Dialog from "@radix-ui/react-dialog";
import Button from "../ui/Button";
import { Heart, MessageCircleIcon, Send, X } from "lucide-react";
import { cn } from "../../utils/utils";
import { Card } from "../ui/Card";
import type { EntryWithUserHobbyEntity } from "@hobbies-dashboard/types";
import { format } from "date-fns";
import Input from "../ui/Input";

interface LogEntryModalProps {
  open: boolean;
  onClose: () => void;
  data: EntryWithUserHobbyEntity;
}

function EntryModal({ open, onClose, data }: LogEntryModalProps) {
  const hobby = data.userHobby.hobby;
  const hasImage = !!data.image;

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#080c14e6] backdrop-blur-md" />

        {/* Content */}
        <Dialog.Content
          className={cn(
            "fixed inset-0 z-50",
            "overflow-y-auto",
            "border-none bg-transparent shadow-none outline-none",
          )}
        >
          <Dialog.Close asChild>
            <Button
              variant="translucent"
              shape="pill"
              size="icon"
              className="fixed top-4 right-[max(2rem,calc((100vw-90rem)/2-2rem))] z-60 text-white"
            >
              <X size={16} />
            </Button>
          </Dialog.Close>

          <div className="flex min-h-full w-full flex-col items-center px-4 py-16">
            <div
              className={cn(
                "flex w-full flex-col gap-4",
                hasImage ? "max-w-5xl" : "max-w-2xl",
              )}
            >
              {/* Image or Hobby Logo */}
              <div
                className={cn(
                  "flex flex-col gap-4",
                  hasImage && "md:h-130 md:flex-row",
                )}
              >
                {hasImage ? (
                  <Card className="min-h-130 flex-6 overflow-hidden p-0 md:h-full md:min-h-0">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="size-full object-cover"
                    />
                  </Card>
                ) : (
                  <Card
                    className="flex flex-col items-center justify-center gap-3 py-10"
                    style={{
                      background: `${hobby.color}18`,
                      borderColor: `${hobby.color}30`,
                    }}
                  >
                    <span className="text-5xl">{hobby.icon}</span>
                    <div
                      className="rounded-full px-3 py-1 text-sm"
                      style={{
                        background: `${hobby.color}30`,
                        color: hobby.color,
                      }}
                    >
                      {hobby.name}
                    </div>
                  </Card>
                )}

                {/* Entry Content */}
                <Card
                  className={cn(
                    "flex flex-col overflow-hidden",
                    hasImage && "flex-4",
                  )}
                >
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex justify-between">
                      <div
                        className="mb-2 flex size-fit items-center justify-center gap-2 rounded-full px-2 py-1 text-sm"
                        style={{ backgroundColor: `${hobby.color}` }}
                      >
                        <span>{hobby.icon}</span>
                        <span className="text-white">{hobby.name}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center justify-center gap-2">
                        <span className="text-md">{data.mood.icon}</span>
                        <span className="text-xs">{data.mood.name}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Dialog.Title className="text-2xl">
                        {data.title}
                      </Dialog.Title>
                      <p className="text-muted-foreground text-xs">
                        {format(new Date(data.activityDate), "PPPPp")}
                      </p>
                    </div>

                    <Dialog.Description className="scrollbar-custom text-muted-foreground min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed">
                      {data.note}
                    </Dialog.Description>
                  </div>

                  <div
                    className={cn(
                      "border-border mt-12 mb-2 border md:mt-4",
                      !hasImage && "mt-12",
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-col">
                    <div className="mb-2 flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1621036189456-895776ffe69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                        alt=""
                        className="size-8 shrink-0 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">hobbly_user123</p>
                        <p className="text-muted-foreground text-xs">
                          @user123
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="transparent" className="p-2">
                        <Heart size={16} />
                        <span>like</span>
                      </Button>
                      <Button variant="transparent" className="p-2">
                        <MessageCircleIcon size={16} />
                        <span>comment</span>
                      </Button>
                    </div>

                    <div className="border-border mb-4 border" />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button
                          shape="pill"
                          size="sm"
                          className="ring-hobbly-green bg-hobbly-green/10 text-hobbly-green hover:bg-hobbly-green/10"
                        >
                          Public
                        </Button>
                        <Button
                          variant="secondary"
                          shape="pill"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          Edit
                        </Button>
                      </div>
                      <Button
                        shape="pill"
                        size="sm"
                        className="ring-hobbly-green bg-destructive/10 text-destructive hover:bg-destructive/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Comments */}
              <Card>
                <div className="mb-2 flex items-center gap-2">
                  <h3>Comments</h3>
                  <div className="bg-accent rounded-full px-2 py-1 text-xs">
                    3
                  </div>
                </div>

                {/* Comment collection */}
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1621036189456-895776ffe69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                    alt=""
                    className="size-10 shrink-0 self-start rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>Leo M.</span>
                      <span className="text-muted-foreground text-xs">
                        1 hour ago
                      </span>
                    </div>
                    <div className="text-sm">
                      The ending hit different tonight. That scene with the
                      lanterns in the rain... I was not prepared 😭 This show
                      keeps getting better. The animation studio really outdid
                      themselves with the lighting this episode — every frame
                      felt like a painting. I need to rewatch this whole arc
                      again.
                    </div>
                  </div>
                </div>

                <div className="border-border my-4 border" />

                {/* Comment Input */}
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1621036189456-895776ffe69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                    alt=""
                    className="size-10 shrink-0 rounded-full"
                  />
                  <Input
                    variant="auth"
                    shape="pill"
                    fullWidth
                    placeholder="Write a comment..."
                  />
                  <Button
                    variant="secondary"
                    shape="pill"
                    size="icon"
                    className="size-10 shrink-0"
                  >
                    <Send size={20} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EntryModal;
