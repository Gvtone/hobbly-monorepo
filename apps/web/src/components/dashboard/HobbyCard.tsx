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
      <div
        className="flex size-6 items-center justify-center rounded-full md:hidden"
        style={{ backgroundColor: `${hobby.color}` }}
      >
        <span className="text-xs">{hobby.icon}</span>
      </div>

      <div className="z-10">
        <div
          className="flex h-fit w-fit items-center justify-center gap-2 rounded-md px-2 text-xs md:rounded-full md:text-sm"
          style={{ backgroundColor: `${hobby.color}` }}
        >
          <span className="max-md:hidden">{hobby.icon}</span>
          <span className="font-semibold text-white">{hobby.name}</span>
        </div>
      </div>

      {backgroundImage && (
        <div className="absolute right-0 bottom-0 left-0 h-full rounded-xl bg-linear-to-t from-black/50 to-transparent" />
      )}

      {!backgroundImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-25">{hobby.icon}</span>
        </div>
      )}

      {enableOptions && (
        <>
          <Popover.Root onOpenChange={setOptionIsActive}>
            <Popover.Trigger asChild>
              <Button
                variant="translucent"
                size="icon"
                shape="pill"
                className={cn(
                  "absolute top-3 right-3 z-10 flex size-6 hover:cursor-pointer",
                  "lg:pointer-events-none lg:opacity-0",
                  "md:group-hover:pointer-events-auto lg:group-hover:opacity-100",
                  optionIsActive && "lg:pointer-events-auto lg:opacity-100",
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
