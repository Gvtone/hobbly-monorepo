import { useEffect, useState } from "react";
import type { HobbyCategory, HobbyStatus } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { cn } from "../../utils/utils";

export interface HobbyFilterState {
  category?: HobbyCategory;
  status?: HobbyStatus;
}

interface HobbyFilterModalProps {
  open: boolean;
  onClose: () => void;
  filter: HobbyFilterState;
  onApply: (filter: HobbyFilterState) => void;
}

const CATEGORY_OPTIONS: { label: string; value: HobbyCategory | undefined }[] =
  [
    { label: "All", value: undefined },
    { label: "General", value: "GENERAL" },
    { label: "Tracked", value: "TRACKED" },
    { label: "Creative", value: "CREATIVE" },
    { label: "Journal", value: "JOURNAL" },
  ];

const STATUS_OPTIONS: { label: string; value: HobbyStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

function HobbyFilterModal({
  open,
  onClose,
  filter,
  onApply,
}: HobbyFilterModalProps) {
  const [localCategory, setLocalCategory] = useState<HobbyCategory | undefined>(
    filter.category,
  );
  const [localStatus, setLocalStatus] = useState<HobbyStatus | undefined>(
    filter.status,
  );

  useEffect(() => {
    if (open) {
      setLocalCategory(filter.category);
      setLocalStatus(filter.status);
    }
  }, [open]);

  const handleApply = () => {
    onApply({ category: localCategory, status: localStatus });
    onClose();
  };

  const handleReset = () => {
    setLocalCategory(undefined);
    setLocalStatus(undefined);
  };

  return (
    <Modal open={open} onClose={onClose} title="Filter Hobbies">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setLocalCategory(value)}
                className={cn(
                  "rounded-full border px-4 py-1 text-sm transition-colors cursor-pointer",
                  localCategory === value
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
          <p className="text-sm font-medium">Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setLocalStatus(value)}
                className={cn(
                  "rounded-full border px-4 py-1 text-sm transition-colors cursor-pointer",
                  localStatus === value
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-accent text-muted-foreground border-border hover:bg-muted",
                )}
              >
                {label}
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

export default HobbyFilterModal;
