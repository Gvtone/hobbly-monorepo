// src/components/dashboard/AddUserHobbyModal.tsx
import { useEffect, useState } from "react";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { useHobby } from "../../hooks/useHobby";
import { showToast } from "../../utils/toast";
import { cn } from "../../utils/utils";
import type {
  CreateUserHobbyDto,
  UserHobbyWithHobbyEntity,
} from "@hobbies-dashboard/types";
import Input from "../ui/Input";
import { Search } from "lucide-react";

interface AddUserHobbyModalProps {
  open: boolean;
  onClose: () => void;
  userHobbies: UserHobbyWithHobbyEntity[];
  onAdd: (data: CreateUserHobbyDto) => Promise<unknown>;
}

function AddUserHobbyModal({
  open,
  onClose,
  userHobbies,
  onAdd,
}: AddUserHobbyModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hobbySearch, setHobbySearch] = useState("");
  const [debouncedHobbySearch, setdebouncedHobbySearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setdebouncedHobbySearch(hobbySearch), 400);
    return () => clearTimeout(timer);
  }, [hobbySearch]);

  const { hobbies, loadMore, hasMore, isLoading } = useHobby({
    filter: { status: "PUBLISHED", search: debouncedHobbySearch },
  });

  const userHobbiesId = userHobbies.map((userHobby) => userHobby.hobbyId);

  const availableHobbies = hobbies.filter(
    (hobby) => !userHobbiesId.includes(hobby.id),
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
      <div className="relative mb-8 flex-1">
        <Search
          size={16}
          className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
        />
        <Input
          placeholder="Search hobby..."
          value={hobbySearch}
          onChange={(e) => setHobbySearch(e.target.value)}
          className="pl-10"
          fullWidth
        />
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-3">
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
        {hobbySearch && availableHobbies.length === 0 && (
          <p className="text-muted-foreground py-4 text-center text-sm">
            Not available yet
          </p>
        )}
        {!hobbySearch && availableHobbies.length === 0 && (
          <p className="text-muted-foreground py-4 text-center text-sm">
            You've added all available hobbies! 🎉
          </p>
        )}
        {hasMore && (
          <div className="mt-2 flex w-full justify-center">
            <Button
              variant="ghost"
              size="sm"
              shape="pill"
              disabled={isLoading}
              onClick={loadMore}
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
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
    </Modal>
  );
}

export default AddUserHobbyModal;
