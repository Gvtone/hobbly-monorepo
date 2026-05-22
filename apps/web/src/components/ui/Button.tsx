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
  contentPosition,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, shape, size, fullWidth, active, contentPosition }),
        className
      )}
      type={type}
      {...props}
    />
  );
}

export default Button;
