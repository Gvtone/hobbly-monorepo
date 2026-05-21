import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";
import { forwardRef } from "react";

const textAreaVariants = cva(
  "transition focus:outline-none focus:ring-1 focus:ring-ring resize-none w-full",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-2 border-border",
        auth: "bg-accent text-accent-foreground border border-border",
      },
      shape: {
        rounded: "rounded-2xl",
        pill: "rounded-3xl",
      },
      scale: {
        default: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      scale: "default",
    },
  },
);

interface TextAreaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, shape, scale, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textAreaVariants({ variant, shape, scale }), className)}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
