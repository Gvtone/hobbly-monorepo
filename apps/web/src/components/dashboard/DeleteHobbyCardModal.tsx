import { useState } from "react";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";
import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";

interface DeleteHobbyCardModalProps {
  open: boolean;
  onClose: () => void;
  data: UserHobbyWithHobbyEntity;
  onConfirm: (id: number) => Promise<void>;
}

function DeleteHobbyCardModal({
  open,
  onClose,
  data,
  onConfirm,
}: DeleteHobbyCardModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(data.id);
      showToast.success(`${data.hobby.name} removed from your board`);
      onClose();
    } catch {
      showToast.error("Failed to remove hobby");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Remove hobby" icon="🗑️">
      <div className="flex flex-col gap-5">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to remove{" "}
          <span className="text-foreground font-medium">
            {data.hobby.icon} {data.hobby.name}
          </span>{" "}
          from your board? Existing entries related to this hobby will also be
          deleted.
        </p>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            shape="pill"
            size="lg"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            shape="pill"
            size="lg"
            fullWidth
            disabled={isDeleting}
            onClick={void handleDelete}
          >
            {isDeleting ? "Removing..." : "Remove"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteHobbyCardModal;
