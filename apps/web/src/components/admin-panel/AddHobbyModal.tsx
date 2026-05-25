import { useState } from "react";
import type { CreateHobbyDto } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

interface AddHobbyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: CreateHobbyDto) => Promise<void>;
}

function AddHobbyModal({ open, onClose, onAdd }: AddHobbyModalProps) {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setIcon("");
    setName("");
    setColor("#8b5cf6");
    setDescription("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!icon.trim() || !name.trim()) return;
    setIsSubmitting(true);
    try {
      await onAdd({
        icon: icon.trim(),
        name: name.trim(),
        color,
        description: description.trim() || null,
      });
      showToast.success("Hobby added");
      handleClose();
    } catch {
      showToast.error("Failed to add hobby");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add New Hobby">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-sm font-medium">Emoji</label>
            <Input
              placeholder="e.g. 🎨"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Color</label>
            <div className="border-border bg-card relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3">
              <div
                className="size-5 rounded-full"
                style={{ background: color }}
              />
              <span className="text-sm">{color}</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Name</label>
          <Input
            placeholder="e.g. Watercolor Painting"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Description{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <TextArea
            placeholder="Brief description of this hobby..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            shape="pill"
            className="flex-1"
            onClick={handleClose}
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
            Add hobby
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddHobbyModal;
