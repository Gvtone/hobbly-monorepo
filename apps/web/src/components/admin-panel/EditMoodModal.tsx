import { useEffect, useState } from "react";
import type { EntryMoodEntity } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

interface EditMoodModalProps {
  mood: EntryMoodEntity | null;
  onClose: () => void;
  onUpdate: (id: number, icon: string, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

function EditMoodModal({
  mood,
  onClose,
  onUpdate,
  onDelete,
}: EditMoodModalProps) {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mood) {
      setIcon(mood.icon);
      setName(mood.name);
      setConfirmDelete(false);
    }
  }, [mood]);

  const handleClose = () => {
    setConfirmDelete(false);
    onClose();
  };

  const handleUpdate = async () => {
    if (!mood || !icon.trim() || !name.trim()) return;
    setIsSubmitting(true);
    try {
      await onUpdate(mood.id, icon.trim(), name.trim());
      handleClose();
    } catch {
      showToast.error("Failed to update mood");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!mood) return;
    setIsSubmitting(true);
    try {
      await onDelete(mood.id);
      handleClose();
    } catch {
      showToast.error("Failed to delete mood");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={mood !== null}
      onClose={handleClose}
      title="Edit Mood"
      icon={mood?.icon}
    >
      {confirmDelete ? (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete{" "}
            <span className="text-foreground font-medium">{mood?.name}</span>?
            All entries relating to this will have their moods set to null. This
            cannot be undone.
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

export default EditMoodModal;
