import { type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/utils";
import buttonVariants from "./buttonVariants";

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  shape,
  size,
  fullWidth,
  active,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, shape, size, fullWidth, active }),
        className
      )}
      {...props}
    />
  );
}

export default Button;
