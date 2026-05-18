import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utils/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: string;
  children: React.ReactNode;
  variant?: "default" | "large";
  className?: string;
}

function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  variant,
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />

        {/* Modal card */}
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-card z-50 rounded-3xl shadow-2xl",
            "w-full max-w-md",
            variant === "default" && "max-h-[90vh] max-w-md",
            className,
          )}
        >
          {/* Header */}
          <div className="bg-card sticky top-0 z-10 rounded-t-3xl shadow-sm">
            <div className="from-accent/75 flex shrink-0 items-start justify-between rounded-t-3xl bg-linear-to-br to-transparent p-6">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="bg-accent/70 flex size-10 items-center justify-center rounded-2xl text-xl">
                    {icon}
                  </div>
                )}
                <div>
                  <Dialog.Title className="font-serif text-lg">
                    {title}
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className="text-muted-foreground text-sm">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
              </div>

              {/* Close button */}
              <Dialog.Close asChild>
                <button className="bg-accent hover:bg-accent/50 text-muted-foreground flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors">
                  <X size={14} />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Content */}
          <div className="scrollbar-custom max-h-[70vh] overflow-y-auto p-6">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
