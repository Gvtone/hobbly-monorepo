import ToggleButton from "./ToggleButton";

interface SettingToggleRowProps {
  title: string;
  subtitle?: string;
  isOn?: boolean;
  onClick?: () => void;
}

function SettingToggleRow({
  title,
  subtitle,
  isOn,
  onClick,
}: SettingToggleRowProps) {
  return (
    <div className="border-border bg-accent flex items-center justify-between rounded-xl border p-4">
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
      <ToggleButton isOn={isOn} onClick={onClick} />
    </div>
  );
}

export default SettingToggleRow;
