import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground",
          "border-2 border-border",
          "shadow-lg shadow-card/30",
          "hover:bg-card/90"
        ],
        gradient: [
          "bg-linear-to-r from-hobbly-sky-dark to-hobbly-lavender",
          "text-white",
          "shadow-lg shadow-hobbly-sky-dark/30",
          "hover:opacity-90"
        ],
        primary: ["bg-primary text-primary-foreground", "hover:bg-primary/90"],
        secondary: [
          "bg-accent text-accent-foreground",
          "hover:bg-muted/80",
          "border border-border"
        ],
        outline: [
          "bg-transparent",
          "border border-border",
          "text-foreground",
          "hover:bg-muted"
        ],
        ghost: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground"
        ],
        translucent: [
          "bg-white/20",
          "backdrop-blur-md",
          "border border-white/40",
          "text-white",
          "hover:bg-white/30"
        ],
        transparent: [
          "bg-transparent",
          "text-muted-foreground",
          "hover:text-foreground"
        ]
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-2xl"
      },
      size: {
        default: "px-5 py-2.5 text-sm",
        sm: "px-4 py-1 text-sm",
        lg: "px-8 py-3 text-base",
        icon: "size-9"
      },
      fullWidth: {
        true: "w-full"
      },
      active: {
        true: "bg-primary text-primary-foreground border-hobbly-sky hover:bg-primary"
      }
    },
    compoundVariants: [
      {
        variant: "ghost",
        active: true,
        className: "border-none hover:text-primary-foreground"
      }
    ],
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      size: "default"
    }
  }
);

export default buttonVariants;
