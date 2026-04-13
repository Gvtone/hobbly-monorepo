import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva("bg-accent", {
  variants: {
    variant: {
      text: "rounded-full px-4 py-3 focus:outline-hobbly-sky-light",
      password: "rounded-full px-4 py-3 focus:outline-hobbly-sky-light"
    }
  },
  defaultVariants: {
    variant: "text"
  }
});

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

function Input({ className, variant, ...props }: InputProps) {
  return (
    <input
      {...props}
      type={variant || "text"}
      className={cn(inputVariants({ variant }), className)}
    />
  );
}

export default Input;
