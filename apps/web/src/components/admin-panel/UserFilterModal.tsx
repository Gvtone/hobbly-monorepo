import { useEffect, useState } from "react";
import type { UserRole, UserStatus } from "@hobbies-dashboard/types";
import Modal from "../layout/Modal";
import Button from "../ui/Button";
import { cn } from "../../utils/utils";

export interface UserFilterState {
  role?: UserRole;
  status?: UserStatus;
}

interface UserFilterModalProps {
  open: boolean;
  onClose: () => void;
  filter: UserFilterState;
  onApply: (filter: UserFilterState) => void;
}

const ROLE_OPTIONS: { label: string; value: UserRole | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Admin", value: "ADMIN" },
  { label: "Hobbyist", value: "HOBBYIST" },
];

const STATUS_OPTIONS: { label: string; value: UserStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
  { label: "Verify", value: "VERIFY" },
];

function UserFilterModal({ open, onClose, filter, onApply }: UserFilterModalProps) {
  const [localRole, setLocalRole] = useState<UserRole | undefined>(filter.role);
  const [localStatus, setLocalStatus] = useState<UserStatus | undefined>(filter.status);

  useEffect(() => {
    if (open) {
      setLocalRole(filter.role);
      setLocalStatus(filter.status);
    }
  }, [open]);

  const handleApply = () => {
    onApply({ role: localRole, status: localStatus });
    onClose();
  };

  const handleReset = () => {
    setLocalRole(undefined);
    setLocalStatus(undefined);
  };

  return (
    <Modal open={open} onClose={onClose} title="Filter Users">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Role</p>
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setLocalRole(value)}
                className={cn(
                  "rounded-full border px-4 py-1 text-sm transition-colors cursor-pointer",
                  localRole === value
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

export default UserFilterModal;
