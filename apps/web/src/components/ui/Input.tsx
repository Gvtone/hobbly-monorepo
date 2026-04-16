import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";

const inputVariants = cva(
  "transition focus:outline-none focus:ring-1 focus:ring-ring",
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground",
          "border-2 border-border",
          "shadow-lg shadow-card/30"
        ],
        auth: "bg-accent text-accent-foreground"
      },
      shape: {
        rounded: "rounded-2xl",
        pill: "rounded-full"
      },
      scale: {
        default: "px-4 py-3 text-base"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      scale: "default"
    }
  }
);

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

function Input({
  className,
  variant,
  shape,
  fullWidth,
  scale,
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      type={type}
      className={cn(
        inputVariants({ variant, shape, scale, fullWidth }),
        className
      )}
    />
  );
}

export default Input;
