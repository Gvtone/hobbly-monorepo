import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/utils";

interface EmojiInputProps {
  value?: string;
  onChange: (emoji: string) => void;
  className?: string;
}

function EmojiInput({ value, onChange, className }: EmojiInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "bg-accent hover:bg-muted border-border",
            "flex size-12 items-center justify-center",
            "rounded-2xl border text-2xl",
            "cursor-pointer transition-colors",
            className,
          )}
        >
          {value ?? "😊"}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={8} className="z-100">
          <div
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <EmojiPicker
              onEmojiClick={(data: EmojiClickData) => {
                onChange(data.emoji);
                setOpen(false);
              }}
              searchDisabled={false}
              height={350}
              width={300}
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default EmojiInput;
