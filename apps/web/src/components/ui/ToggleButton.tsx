import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";

const toggleButtonVariants = cva(
  "rounded-full flex items-center hover:cursor-pointer",
  {
    variants: {
      size: {
        sm: "w-12 h-6",
        md: "w-16 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const toggleKnobVariants = cva("rounded-full bg-white transition-all", {
  variants: {
    size: {
      sm: "size-5",
      md: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ToggleButtonProps extends VariantProps<typeof toggleButtonVariants> {
  isOn?: boolean;
  color?: string;
  onClick?: () => void;
  className?: string;
}

function ToggleButton({
  isOn,
  size,
  color = "#b8e4f5",
  onClick,
  className,
}: ToggleButtonProps) {
  return (
    <button
      className={cn(toggleButtonVariants({ size }), className)}
      style={
        isOn && color
          ? { backgroundColor: color }
          : { backgroundColor: "var(--border)" }
      }
      onClick={onClick}
    >
      <div
        className={cn(toggleKnobVariants({ size }), isOn ? "ml-auto" : "ml-0")}
      />
    </button>
  );
}

export default ToggleButton;
