import { useEffect, useState } from "react";
import type { EntryMoodEntity, Visibility } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { cn } from "../../utils/utils";

export interface EntryFilterState {
  visibility?: Visibility;
  moodId?: number[];
}

interface EntryFilterModalProps {
  open: boolean;
  onClose: () => void;
  filter: EntryFilterState;
  onApply: (filter: EntryFilterState) => void;
  moods: EntryMoodEntity[];
}

const VISIBILITY_OPTIONS: { label: string; value: Visibility | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Public", value: "PUBLIC" },
  { label: "Private", value: "PRIVATE" },
];

function EntryFilterModal({
  open,
  onClose,
  filter,
  onApply,
  moods,
}: EntryFilterModalProps) {
  const [localVisibility, setLocalVisibility] = useState<Visibility | undefined>(
    filter.visibility,
  );
  const [localMoodIds, setLocalMoodIds] = useState<number[]>(
    filter.moodId ?? [],
  );

  useEffect(() => {
    if (open) {
      setLocalVisibility(filter.visibility);
      setLocalMoodIds(filter.moodId ?? []);
    }
  }, [open]);

  const toggleMood = (id: number) => {
    setLocalMoodIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    onApply({
      visibility: localVisibility,
      moodId: localMoodIds.length > 0 ? localMoodIds : undefined,
    });
    onClose();
  };

  const handleReset = () => {
    setLocalVisibility(undefined);
    setLocalMoodIds([]);
  };

  return (
    <Modal open={open} onClose={onClose} title="Filter Entries">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Visibility</p>
          <div className="flex gap-2">
            {VISIBILITY_OPTIONS.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setLocalVisibility(value)}
                className={cn(
                  "rounded-full border px-4 py-1 text-sm transition-colors cursor-pointer",
                  localVisibility === value
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-accent text-muted-foreground border-border hover:bg-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Mood</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => toggleMood(mood.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer",
                  localMoodIds.includes(mood.id)
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-accent text-muted-foreground border-border hover:bg-muted",
                )}
              >
                {mood.icon} {mood.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            shape="pill"
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="gradient"
            shape="pill"
            className="flex-1"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EntryFilterModal;
