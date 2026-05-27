import { useController, useForm } from "react-hook-form";
import Modal from "../layout/Modal";
import type {
  CreateEntryDto,
  UserHobbyWithHobbyEntity,
} from "@hobbies-dashboard/types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { useEntryMood } from "../../hooks/useEntryMood";
import TextArea from "../ui/TextArea";
import { Camera, Globe, Lock, X } from "lucide-react";
import { entryService } from "../../services/entry";
import { showToast } from "../../utils/toast";
import { useRef, useState } from "react";

interface LogEntryModalProps {
  open: boolean;
  userHobbies: UserHobbyWithHobbyEntity[];
  onClose: () => void;
  onRefresh: () => Promise<void>;
}

function LogEntryModal({
  open,
  userHobbies,
  onClose,
  onRefresh,
}: LogEntryModalProps) {
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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageInputKey, setImageInputKey] = useState(0);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    setImageInputKey((k) => k + 1);
  };

  const { field: hobbyField } = useController({
    name: "userHobbyId",
    control,
    rules: { required: "Please select a hobby" },
  });

  const { field: moodField } = useController({
    name: "moodId",
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
      metadata: null,
    };

    try {
      await entryService.create(entryData, imageFile ?? undefined);
      showToast.success("Entry created successfully!");
      await onRefresh();
      onClose();
      reset();
      clearImage();
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
        clearImage();
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
            Select the hobby you want to add an entry{" "}
            {errors.userHobbyId && (
              <span className="text-destructive mt-2 text-xs">
                {errors.userHobbyId.message}
              </span>
            )}
          </p>
          <Select
            value={hobbyField.value ? String(hobbyField.value) : ""}
            onChange={(val) =>
              hobbyField.onChange(val ? Number(val) : undefined)
            }
            onBlur={hobbyField.onBlur}
            placeholder="Select a hobby"
            options={userHobbies.map((uh) => ({
              value: String(uh.id),
              label: `${uh.hobby.icon} ${uh.hobby.name}`,
            }))}
          />
        </div>

        {!noHobby && (
          <>
            {/* Title */}
            <div className="flex flex-col">
              <p className="text-muted-foreground pb-2 text-sm">
                Title{" "}
                <span className="text-muted-foreground/50 text-xs">
                  (optional)
                </span>
                {errors.title && (
                  <span className="text-destructive mt-2 text-xs">
                    {" "}
                    {errors.title.message}
                  </span>
                )}
              </p>
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

              {/* Preview */}
              {imagePreview && (
                <div className="bg-accent relative aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={imagePreview}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="translucent"
                    shape="pill"
                    size="icon"
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 flex"
                  >
                    <X size={14} />
                  </Button>
                </div>
              )}

              <input
                key={imageInputKey}
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <Button
                type="button"
                variant="secondary"
                shape="pill"
                disabled={noHobby}
                onClick={() => imageInputRef.current?.click()}
              >
                <Camera size={14} />
                {imageFile ? "Change image" : "Upload image"}
              </Button>
            </div>

            {/* Json */}
            {/* {selectedHobby?.hobby.category === "TRACKED" && ())} */}

            {/* Mood */}
            <div>
              <p className="text-muted-foreground pb-2 text-sm">
                Mood{" "}
                <span className="text-muted-foreground/50 text-xs">
                  (optional)
                </span>
                {errors.moodId && (
                  <span className="text-destructive mt-2 text-xs">
                    {" "}
                    {errors.moodId.message}
                  </span>
                )}
              </p>
              <Select
                value={moodField.value ? String(moodField.value) : "none"}
                onChange={(val) =>
                  moodField.onChange(val !== "none" ? Number(val) : undefined)
                }
                onBlur={moodField.onBlur}
                disabled={noHobby}
                options={[
                  { value: "none", label: "No mood" },
                  ...(entryMoods?.map((m) => ({
                    value: String(m.id),
                    label: `${m.icon} ${m.name}`,
                  })) ?? []),
                ]}
              />
            </div>

            {/* Notes */}
            <div>
              <p className="text-muted-foreground pb-2 text-sm">
                Note{" "}
                <span className="text-muted-foreground/50 text-xs">
                  (optional)
                </span>
                {errors.note && (
                  <span className="text-destructive mt-2 text-xs">
                    {" "}
                    {errors.note.message}
                  </span>
                )}
              </p>
              <TextArea
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
                <span className="text-muted-foreground/50 text-xs">
                  (optional)
                </span>
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
          </>
        )}
      </form>
    </Modal>
  );
}

export default LogEntryModal;
