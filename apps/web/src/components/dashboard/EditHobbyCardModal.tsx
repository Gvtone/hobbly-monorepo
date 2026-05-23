import { useState } from "react";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";
import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";

interface EditHobbyCardModalProps {
  open: boolean;
  onClose: () => void;
  data: UserHobbyWithHobbyEntity;
  onSave: (id: number, backgroundImage: string | null) => Promise<void>;
}

function EditHobbyCardModal({
  open,
  onClose,
  data,
  onSave,
}: EditHobbyCardModalProps) {
  const [url, setUrl] = useState<string | null>(data.backgroundImage ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave(data.id, url ?? null);
      showToast.success("Card updated!");
      onClose();
    } catch {
      showToast.error("Failed to update card");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit ${data.hobby.name}`}
      description="Customize how your hobby card looks"
      icon={data.hobby.icon}
    >
      <div className="flex flex-col gap-5">
        {/* Preview */}
        <div
          className="relative flex h-32 w-full items-start justify-between rounded-xl bg-cover bg-center p-3"
          style={
            url
              ? { backgroundImage: `url(${url})` }
              : { backgroundColor: `${data.hobby.color}22` }
          }
        >
          {!url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-25">{data.hobby.icon}</span>
            </div>
          )}
          <div
            className="z-10 h-fit w-fit rounded-full px-2"
            style={{ backgroundColor: data.hobby.color }}
          >
            <span className="text-sm font-semibold text-white">
              {data.hobby.icon} {data.hobby.name}
            </span>
          </div>
          {url && (
            <div className="absolute right-0 bottom-0 left-0 h-full rounded-xl bg-linear-to-t from-black/50 to-transparent" />
          )}
        </div>

        {/* URL input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Background image URL</label>
          <input
            type="url"
            value={url ?? undefined}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="border-border bg-background focus:ring-primary/30 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
          />
          {url && (
            <Button
              variant="transparent"
              type="button"
              onClick={() => setUrl(null)}
              className="text-muted-foreground justify-start self-start p-0 text-xs underline"
            >
              Remove background image
            </Button>
          )}
        </div>

        <Button
          variant="gradient"
          shape="pill"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          onClick={void handleSave}
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </Modal>
  );
}

export default EditHobbyCardModal;
