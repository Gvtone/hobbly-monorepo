import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";
import { forwardRef } from "react";

const inputVariants = cva(
  "transition focus:outline-none focus:ring-1 focus:ring-ring transform",
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground",
          "border-2 border-border",
          "shadow-lg shadow-card/30",
        ],
        auth: "bg-accent text-accent-foreground border border-border",
      },
      shape: {
        rounded: "rounded-2xl",
        pill: "rounded-full",
      },
      scale: {
        default: "px-4 py-3 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      scale: "default",
    },
  },
);

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  textCase?: "lowercase" | "uppercase" | "normal";
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      shape,
      fullWidth,
      scale,
      type = "text",
      textCase = "normal",
      error,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (textCase !== "normal") {
        const converted =
          textCase === "lowercase"
            ? e.target.value.toLowerCase()
            : e.target.value.toUpperCase();

        Object.defineProperty(e.target, "value", {
          writable: true,
          value: converted,
        });
      }

      onChange?.(e); // call react-hook-form's onChange
    };

    return (
      <input
        {...props}
        ref={ref}
        type={type}
        onChange={handleChange}
        className={cn(
          inputVariants({ variant, shape, scale, fullWidth }),
          error && "ring-2 ring-destructive border-destructive",
          className,
        )}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
