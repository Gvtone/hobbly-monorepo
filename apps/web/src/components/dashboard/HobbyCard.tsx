import type { UserHobbyWithHobbyEntity } from "@hobbies-dashboard/types";
import { Card } from "../ui/Card";
import { cn } from "../../utils/utils";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import EditHobbyCardModal from "./EditHobbyCardModal";
import DeleteHobbyCardModal from "./DeleteHobbyCardModal";

interface HobbyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: UserHobbyWithHobbyEntity;
  enableOptions?: boolean;
  onUpdate?: (id: number, backgroundImage: string | null) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

function HobbyCard({
  data,
  enableOptions = false,
  onUpdate,
  onDelete,
  className,
}: HobbyCardProps) {
  const defaultClasses =
    "relative rounded-xl p-3 bg-cover bg-center justify-between group";

  const { hobby, backgroundImage } = data;

  const [optionIsActive, setOptionIsActive] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <Card
      className={cn(defaultClasses, className)}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : { backgroundColor: `${hobby.color}22` }
      }
    >
      {!backgroundImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-25">{hobby.icon}</span>
        </div>
      )}
      <div className="z-10 flex justify-between">
        <div
          className={`h-fit w-fit rounded-full px-2`}
          style={{ backgroundColor: `${hobby.color}` }}
        >
          <span className="text-sm font-semibold text-white">
            {hobby.icon} {hobby.name}
          </span>
        </div>
        {enableOptions && (
          <>
            <Popover.Root onOpenChange={setOptionIsActive}>
              <Popover.Trigger asChild>
                <Button
                  variant="translucent"
                  size="icon"
                  shape="pill"
                  className={cn(
                    "hidden size-6 group-hover:flex hover:cursor-pointer",
                    optionIsActive && "flex",
                  )}
                >
                  <Ellipsis size={12} className="text-white" />
                </Button>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  className="bg-card border-border z-50 flex w-40 flex-col gap-2 rounded-2xl border p-2 shadow-lg"
                  sideOffset={8}
                  align="end"
                >
                  <Button
                    variant="ghost"
                    fullWidth
                    className="justify-start"
                    onClick={() => setEditOpen(true)}
                  >
                    <Edit size={14} />
                    Edit
                  </Button>

                  <Button
                    variant="ghost"
                    fullWidth
                    className="text-destructive justify-start transition-colors"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </>
        )}
      </div>
      {backgroundImage && (
        <div className="absolute right-0 bottom-0 left-0 h-full rounded-xl bg-linear-to-t from-black/50 to-transparent" />
      )}

      {onUpdate && (
        <EditHobbyCardModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          data={data}
          onSave={onUpdate}
        />
      )}
      {onDelete && (
        <DeleteHobbyCardModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          data={data}
          onConfirm={onDelete}
        />
      )}
    </Card>
  );
}

export default HobbyCard;
export type { HobbyCardProps };
