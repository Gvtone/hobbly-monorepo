import { cn } from "../../utils/utils";

interface RadioPillProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  activeColor?: string;
  isChecked?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

function RadioPill({
  label,
  icon,
  activeColor,
  isChecked,
  className,
  ref,
  ...props
}: RadioPillProps) {
  return (
    <label
      className={cn(
        "cursor-pointer",
        props.disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <input type="radio" ref={ref} className="peer sr-only" {...props} />
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
          "border-border text-muted-foreground bg-accent hover:bg-muted",
          "peer-checked:border-foreground peer-checked:text-foreground peer-checked:bg-muted",
          className,
        )}
        style={
          isChecked && activeColor
            ? {
                backgroundColor: `${activeColor}40`,
                color: `${activeColor}`,
                borderColor: `${activeColor}`,
                borderWidth: "2px",
              }
            : undefined
        }
      >
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </span>
    </label>
  );
}

RadioPill.displayName = "RadioPill";

export default RadioPill;
