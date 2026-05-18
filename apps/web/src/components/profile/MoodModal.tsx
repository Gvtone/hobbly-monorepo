import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { SetCurrentMoodDto } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import EmojiInput from "../ui/EmojiInput";
import { useCurrentMood } from "../../hooks/userCurrentMood";

interface MoodModalProps {
  userId: number;
  open: boolean;
  onClose: () => void;
}

function MoodModal({ userId, open, onClose }: MoodModalProps) {
  const { currentMood, setOrUpdateCurrentMood, removeCurrentMood } =
    useCurrentMood(userId);

  const { register, handleSubmit, setValue, reset, control } =
    useForm<SetCurrentMoodDto>({
      defaultValues: {
        icon: currentMood?.icon ?? "😊",
        color: currentMood?.color ?? "#c8a2e3",
        description: currentMood?.description ?? undefined,
      },
    });

  useEffect(() => {
    reset({
      icon: currentMood?.icon ?? "😊",
      color: currentMood?.color ?? "#c8a2e3",
      description: currentMood?.description ?? "",
    });
  }, [currentMood, reset]);

  const icon = useWatch({ control, name: "icon" });
  const color = useWatch({ control, name: "color" });
  const description = useWatch({ control, name: "description" }) ?? "";

  const onSubmit = async (data: SetCurrentMoodDto) => {
    await setOrUpdateCurrentMood(data);
    reset();
    onClose();
  };

  return (
    <Modal
      title="Show your current mood!"
      description="Set your mood"
      icon="🤍"
      open={open}
      onClose={() => {
        onClose();
        reset({ color: undefined });
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-1">
          <input
            type="color"
            {...register("color")}
            className="size-12 cursor-pointer appearance-none rounded-l-full border-none p-0"
            style={{ backgroundColor: color }}
          />
          <EmojiInput
            value={icon}
            onChange={(emoji) => setValue("icon", emoji)}
            className="rounded-none border-none"
          />
          <div className="flex flex-1 flex-col gap-1">
            <Input
              type="text"
              variant="auth"
              shape="pill"
              placeholder="How are you feeling?"
              maxLength={100}
              autoComplete="off"
              className="rounded-l-none"
              {...register("description", { maxLength: 100 })}
            />
            <span
              className="text-muted-foreground text-right text-xs"
              style={description.length === 100 ? { color: "red" } : undefined}
            >
              {description.length}/100
            </span>
          </div>
        </div>

        <Button type="submit" variant="gradient" shape="pill" fullWidth>
          Save mood ✨
        </Button>
        {currentMood && (
          <Button
            type="button"
            variant="secondary"
            shape="pill"
            fullWidth
            onClick={async () => {
              await removeCurrentMood();
              onClose();
            }}
          >
            Remove mood
          </Button>
        )}
      </form>
    </Modal>
  );
}

export default MoodModal;
