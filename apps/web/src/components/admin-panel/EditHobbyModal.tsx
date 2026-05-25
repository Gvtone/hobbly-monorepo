import { useEffect, useState } from "react";
import type { HobbyEntity, UpdateHobbyDto } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

interface EditHobbyModalProps {
  hobby: HobbyEntity | null;
  onClose: () => void;
  onUpdate: (id: number, data: UpdateHobbyDto) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

function EditHobbyModal({
  hobby,
  onClose,
  onUpdate,
  onDelete,
}: EditHobbyModalProps) {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [description, setDescription] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (hobby) {
      setIcon(hobby.icon);
      setName(hobby.name);
      setColor(hobby.color);
      setDescription(hobby.description ?? "");
      setConfirmDelete(false);
    }
  }, [hobby]);

  const handleClose = () => {
    setConfirmDelete(false);
    onClose();
  };

  const handleUpdate = async () => {
    if (!hobby || !icon.trim() || !name.trim()) return;
    setIsSubmitting(true);
    try {
      await onUpdate(hobby.id, {
        icon: icon.trim(),
        name: name.trim(),
        color,
        description: description.trim() || null,
      });
      showToast.success("Hobby updated");
      handleClose();
    } catch {
      showToast.error("Failed to update hobby");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!hobby) return;
    setIsSubmitting(true);
    try {
      await onDelete(hobby.id);
      showToast.success("Hobby deleted");
      handleClose();
    } catch {
      showToast.error("Failed to delete hobby");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={hobby !== null} onClose={handleClose} title="Edit Hobby" icon={hobby?.icon}>
      {confirmDelete ? (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete{" "}
            <span className="text-foreground font-medium">{hobby?.name}</span>?
            This cannot be undone.
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              shape="pill"
              className="flex-1"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              shape="pill"
              className="flex-1"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
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
              variant="destructive"
              shape="pill"
              className="bg-destructive/15 text-destructive hover:bg-destructive/25 flex-1 border-0"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
            <Button
              variant="gradient"
              shape="pill"
              className="flex-1"
              onClick={handleUpdate}
              disabled={isSubmitting || !icon.trim() || !name.trim()}
            >
              Save changes
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default EditHobbyModal;
