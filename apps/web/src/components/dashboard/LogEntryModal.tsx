import { useController, useForm } from "react-hook-form";
import { useUserHobby } from "../../hooks/useUserHobby";
import Modal from "../ui/Modal";
import type { CreateEntryDto } from "@hobbies-dashboard/types";
import RadioPill from "../ui/RadioPill";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEntryMood } from "../../hooks/useEntryMood";
import Textarea from "../ui/TextArea";
import { Globe, Lock } from "lucide-react";
import { entryService } from "../../services/entry";
import { showToast } from "../../utils/toast";

interface LogEntryModalProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
}

function LogEntryModal({ open, onClose, onRefresh }: LogEntryModalProps) {
  const { userHobbies } = useUserHobby();
  const { entryMoods } = useEntryMood();
  const dateToday = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CreateEntryDto>({
    defaultValues: {
      activityDate: new Date().toISOString().split("T")[0] as unknown as Date,
      visibility: "PRIVATE",
    },
  });

  const { field: hobbyField } = useController({
    name: "userHobbyId",
    control,
    rules: { required: "Please select a hobby" },
  });

  const { field: moodField } = useController({
    name: "moodId",
    control,
  });

  const { field: imageField } = useController({
    name: "image",
    control,
  });

  const { field: visibilityField } = useController({
    name: "visibility",
    control,
  });

  const { field: dateField } = useController({
    name: "activityDate",
    control,
  });

  const noHobby = !hobbyField.value;

  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hobbyField.onChange(e);
  };

  const onSubmit = async (data: CreateEntryDto) => {
    const entryData: CreateEntryDto = {
      userHobbyId: data.userHobbyId,
      title: data.title,
      note: data.note,
      moodId: data.moodId,
      activityDate: data.activityDate
        ? new Date(data.activityDate as unknown as string)
        : new Date(),
      visibility: data.visibility,
      image: data.image,
      metadata: null, // for future use with tracked hobbies
    };

    try {
      await entryService.create(entryData);
      showToast.success("Entry created successfully!");
      await onRefresh();
      onClose();
      reset();
    } catch (error) {
      console.log("Failed to create entry:", error);
      showToast.error("Failed to create entry.");
    }
  };

  const selectedHobby = userHobbies.find(
    (hobby) => hobby.id == hobbyField.value,
  );
  const hobbyColor = selectedHobby?.hobby.color;

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Log Entry"
      description="Capture a moment ✨"
      icon="📖"
      className="max-w-xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        style={
          { "--ring": hobbyColor ?? "var(--hobbly-sky)" } as React.CSSProperties
        }
      >
        {/* Hobby selector */}
        <div>
          <p className="text-muted-foreground pb-2 text-sm">
            Hobby{" "}
            {errors.userHobbyId && (
              <span className="text-destructive mt-2 text-xs">
                {errors.userHobbyId.message}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {userHobbies?.map((userHobby) => (
              <RadioPill
                {...hobbyField}
                onChange={handleHobbyChange}
                key={userHobby.id}
                label={userHobby.hobby.name}
                icon={userHobby.hobby.icon}
                value={userHobby.id}
                activeColor={userHobby.hobby.color}
                isChecked={hobbyField.value == userHobby.id}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-muted-foreground pb-2 text-sm">
            Title{" "}
            <span className="text-muted-foreground/50 text-xs">(optional)</span>
            {errors.title && (
              <span className="text-destructive mt-2 text-xs">
                {" "}
                {errors.title.message}
              </span>
            )}
          </label>
          <Input
            type="text"
            variant="auth"
            shape="pill"
            placeholder="What did you do?"
            disabled={noHobby}
            {...register("title", {
              maxLength: {
                value: 255,
                message: "Title cannot exceed 255 characters",
              },
            })}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            Image <span className="text-xs opacity-50">(optional)</span>
          </p>

          {/* Preview if URL is entered */}
          {imageField.value && (
            <div className="bg-accent relative aspect-video overflow-hidden rounded-2xl">
              <img
                src={imageField.value}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  // hide broken image
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <Input
            type="text"
            variant="auth"
            shape="pill"
            placeholder="Paste image URL..."
            disabled={noHobby}
            {...imageField}
          />
        </div>

        {/* Json */}
        {/* {selectedHobby?.hobby.category === "TRACKED" && ())} */}

        {/* Mood */}
        <div>
          <p className="text-muted-foreground pb-2 text-sm">
            Mood{" "}
            <span className="text-muted-foreground/50 text-xs">(optional)</span>
            {errors.moodId && (
              <span className="text-destructive mt-2 text-xs">
                {" "}
                {errors.moodId.message}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {entryMoods?.map((entryMood) => (
              <RadioPill
                {...moodField}
                key={entryMood.id}
                label={entryMood.name}
                icon={entryMood.icon}
                value={entryMood.id}
                activeColor={hobbyColor}
                isChecked={moodField.value == entryMood.id}
                disabled={noHobby}
              />
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <p className="text-muted-foreground pb-2 text-sm">
            Note{" "}
            <span className="text-muted-foreground/50 text-xs">(optional)</span>
            {errors.note && (
              <span className="text-destructive mt-2 text-xs">
                {" "}
                {errors.note.message}
              </span>
            )}
          </p>
          <Textarea
            variant="auth"
            shape="rounded"
            rows={4}
            placeholder="What happened? How did it feel? Any thoughts..."
            disabled={noHobby}
            {...register("note")}
          />
        </div>

        {/* Activity Date */}
        <div>
          <p className="text-muted-foreground pb-2 text-sm">
            Activity Date{" "}
            <span className="text-muted-foreground/50 text-xs">(optional)</span>
            {errors.activityDate && (
              <span className="text-destructive mt-2 text-xs">
                {" "}
                {errors.activityDate.message}
              </span>
            )}
          </p>
          <Input
            type="date"
            variant="auth"
            shape="pill"
            disabled={noHobby}
            {...dateField}
            value={
              dateField.value
                ? new Date(dateField.value).toISOString().split("T")[0]
                : dateToday
            }
            onChange={(e) => dateField.onChange(e.target.value)}
          />
        </div>

        {/* Visibility */}
        <div className="flex flex-col">
          <p className="text-muted-foreground rounded-full pb-2 text-sm">
            Visibility
          </p>
          <div className="bg-accent mb-2 flex rounded-full p-1">
            <Button
              shape="pill"
              variant="transparent"
              onClick={() => visibilityField.onChange("PRIVATE")}
              fullWidth
              disabled={noHobby}
              className={
                visibilityField.value === "PRIVATE"
                  ? "bg-foreground text-background hover:text-background"
                  : ""
              }
            >
              <Lock size={12} />
              Private
            </Button>
            <Button
              shape="pill"
              variant="transparent"
              onClick={() => visibilityField.onChange("PUBLIC")}
              fullWidth
              disabled={noHobby}
              className={
                visibilityField.value === "PUBLIC"
                  ? "bg-hobbly-green text-white hover:text-white"
                  : ""
              }
            >
              <Globe size={12} />
              Public
            </Button>
          </div>
          <p className="text-muted-foreground/50 self-center text-sm">
            {visibilityField.value === "PRIVATE"
              ? "Only you can see this entry 🔒"
              : "Everyone can see this entry 🌍"}
          </p>
        </div>

        <Button
          type="submit"
          variant="gradient"
          shape="rounded"
          size="lg"
          fullWidth
          disabled={noHobby || isSubmitting}
        >
          Save Entry ✨
        </Button>
      </form>
    </Modal>
  );
}

export default LogEntryModal;
