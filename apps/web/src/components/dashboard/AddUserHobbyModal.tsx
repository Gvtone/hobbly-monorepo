// src/components/dashboard/AddUserHobbyModal.tsx
import { useState } from "react";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { useHobby } from "../../hooks/useHobby";
import { showToast } from "../../utils/toast";
import { cn } from "../../utils/utils";
import type { CreateUserHobbyDto } from "@hobbies-dashboard/types";

interface AddUserHobbyModalProps {
  open: boolean;
  onClose: () => void;
  existingHobbyIds: number[];
  onAdd: (data: CreateUserHobbyDto) => Promise<unknown>;
}

function AddUserHobbyModal({
  open,
  onClose,
  existingHobbyIds,
  onAdd,
}: AddUserHobbyModalProps) {
  const { hobbies, isLoading } = useHobby();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableHobbies = hobbies.filter(
    (hobby) => !existingHobbyIds.includes(hobby.id),
  );

  const handleAdd = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);

    try {
      await onAdd({ hobbyId: selectedId });
      showToast.success("Hobby added! ✨");
      setSelectedId(null);
      onClose();
    } catch {
      showToast.error("Failed to add hobby");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a Hobby"
      description="What would you like to track? ✨"
      icon="🌱"
    >
      {isLoading ? (
        <div className="mb-6 flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-muted h-10 w-24 animate-pulse rounded-full"
            />
          ))}
        </div>
      ) : availableHobbies.length === 0 ? (
        <p className="text-muted-foreground py-4 text-center text-sm">
          You've added all available hobbies! 🎉
        </p>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-3">
            {availableHobbies.map((hobby) => (
              <button
                key={hobby.id}
                type="button"
                onClick={() =>
                  setSelectedId(selectedId === hobby.id ? null : hobby.id)
                }
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm transition-all",
                  selectedId === hobby.id
                    ? "scale-105 border-transparent text-white"
                    : "bg-accent text-muted-foreground hover:bg-muted border-transparent",
                )}
                style={
                  selectedId === hobby.id
                    ? { backgroundColor: hobby.color }
                    : undefined
                }
              >
                <span>{hobby.icon}</span>
                <span>{hobby.name}</span>
              </button>
            ))}
          </div>

          <Button
            variant="gradient"
            shape="pill"
            size="lg"
            fullWidth
            disabled={!selectedId || isSubmitting}
            onClick={handleAdd}
          >
            {isSubmitting ? "Adding..." : "Add to my board ✨"}
          </Button>
        </>
      )}
    </Modal>
  );
}

export default AddUserHobbyModal;
