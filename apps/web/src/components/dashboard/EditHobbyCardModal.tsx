import { useRef, useState } from "react";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";
import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";
import { Camera } from "lucide-react";

interface EditHobbyCardModalProps {
  open: boolean;
  onClose: () => void;
  data: UserHobbyWithHobbyEntity;
  onSave: (id: number, file: File | null, clearImage: boolean) => Promise<void>;
}

function EditHobbyCardModal({
  open,
  onClose,
  data,
  onSave,
}: EditHobbyCardModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    data.backgroundImage ?? null,
  );
  const [removed, setRemoved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageInputKey, setImageInputKey] = useState(0);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoved(false);
  };

  const handleRemove = () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
    setRemoved(true);
    setImageInputKey((k) => k + 1);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave(data.id, imageFile, removed);
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
            previewUrl
              ? { backgroundImage: `url(${previewUrl})` }
              : { backgroundColor: `${data.hobby.color}22` }
          }
        >
          {!previewUrl && (
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
          {previewUrl && (
            <div className="absolute right-0 bottom-0 left-0 h-full rounded-xl bg-linear-to-t from-black/50 to-transparent" />
          )}
        </div>

        {/* File upload */}
        <div className="flex flex-col gap-1.5">
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
            onClick={() => imageInputRef.current?.click()}
          >
            <Camera size={14} />
            {imageFile ? "Change image" : "Upload image"}
          </Button>
          {previewUrl && (
            <Button
              variant="transparent"
              type="button"
              onClick={handleRemove}
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
          onClick={handleSave}
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </Modal>
  );
}

export default EditHobbyCardModal;
