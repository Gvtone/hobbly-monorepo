import { useState } from "react";
import type { EntryWithUserHobbyEntity } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

interface DeleteEntryModalProps {
  entry: EntryWithUserHobbyEntity | null;
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
}

function DeleteEntryModal({ entry, onClose, onDelete }: DeleteEntryModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!entry) return;
    setIsDeleting(true);
    try {
      await onDelete(entry.id);
      showToast.success("Entry deleted");
      onClose();
    } catch {
      showToast.error("Failed to delete entry");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal open={entry !== null} onClose={onClose} title="Delete Entry">
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete{" "}
          <span className="text-foreground font-medium">
            {entry?.title ?? "this entry"}
          </span>
          ? This cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            shape="pill"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            shape="pill"
            className="flex-1"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteEntryModal;
