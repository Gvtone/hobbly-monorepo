import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../utils/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function Select({
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select...",
  disabled,
  className,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        onBlur={onBlur}
        className={cn(
          "bg-accent text-accent-foreground border-border focus:ring-ring hover:cursor-pointer",
          "flex w-full items-center justify-between rounded-full border px-4 py-3 text-base transition",
          "focus:ring-1 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-placeholder:text-muted-foreground",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown size={16} className="text-muted-foreground shrink-0" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "bg-card border-border scrollbar-custom",
            "z-9999 rounded-2xl border shadow-lg",
            "max-h-60 overflow-y-auto",
            "w-(--radix-select-trigger-width)",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "relative flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm outline-none select-none",
                  "focus:bg-accent focus:text-accent-foreground",
                  "data-disabled:pointer-events-none data-disabled:opacity-50",
                )}
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <span className="absolute right-3 flex items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check size={14} />
                  </SelectPrimitive.ItemIndicator>
                </span>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export default Select;
