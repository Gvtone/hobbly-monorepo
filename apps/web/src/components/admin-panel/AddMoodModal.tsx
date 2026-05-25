import { useState } from "react";
import Modal from "../layout/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

interface AddMoodModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (icon: string, name: string) => Promise<void>;
}

function AddMoodModal({ open, onClose, onAdd }: AddMoodModalProps) {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!icon.trim() || !name.trim()) return;
    setIsSubmitting(true);
    try {
      await onAdd(icon.trim(), name.trim());
      showToast.success("Mood added");
      setIcon("");
      setName("");
      onClose();
    } catch {
      showToast.error("Failed to add mood");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Mood">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Emoji</label>
          <Input
            placeholder="e.g. 🌈"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            fullWidth
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Label</label>
          <Input
            placeholder="e.g. Joyful"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            shape="pill"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            shape="pill"
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSubmitting || !icon.trim() || !name.trim()}
          >
            Add mood
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddMoodModal;
