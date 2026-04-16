// src/components/ui/LinkButton.tsx
import { Link, type LinkProps } from "react-router-dom";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";
import buttonVariants from "./buttonVariants";

interface LinkButtonProps
  extends LinkProps, VariantProps<typeof buttonVariants> {}

function LinkButton({
  to,
  children,
  variant,
  shape,
  size,
  fullWidth,
  active,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({ variant, shape, size, active, fullWidth }),
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
