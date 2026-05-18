import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { format } from "date-fns";
import type {
  EntryWithUserHobbyEntity,
  PublicUserEntity,
  UserEntity,
} from "@hobbies-dashboard/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Hobby = { name: string; color: string };

type CalendarDay = {
  dateStr: string;
  hobbies: Hobby[]; // empty when no entries that day
  inYear: boolean;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Returns the Sunday of the week that contains `d`. */
function getSundayOf(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
}

/**
 * Returns a CSS background value for the dot.
 * - 0 hobbies → muted colour
 * - 1 hobby   → solid colour
 * - 2+ hobbies → smooth diagonal linear-gradient through all hobby colours
 */
function getDotBackground(hobbies: Hobby[]): string {
  if (hobbies.length === 0) return "var(--color-muted)";
  if (hobbies.length === 1) return hobbies[0].color;

  return `linear-gradient(135deg, ${hobbies.map((h) => h.color).join(", ")})`;
}

// ---------------------------------------------------------------------------
// Calendar grid builder
// ---------------------------------------------------------------------------

function buildCalendar(
  year: number,
  entryMap: Map<string, Hobby[]>,
): {
  weeks: CalendarDay[][];
  monthPositions: { month: number; weekIndex: number }[];
  activeDays: number;
} {
  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);
  const cur = getSundayOf(jan1);

  const weeks: CalendarDay[][] = [];
  const monthPositions: { month: number; weekIndex: number }[] = [];
  const seenMonths = new Set<number>();
  let activeDays = 0;

  while (cur <= dec31) {
    const week: CalendarDay[] = [];

    for (let i = 0; i < 7; i++) {
      const inYear = cur.getFullYear() === year;
      const dateStr = toDateStr(cur);
      const month = cur.getMonth();

      if (inYear && !seenMonths.has(month)) {
        seenMonths.add(month);
        monthPositions.push({ month, weekIndex: weeks.length });
      }

      const hobbies = (inYear && entryMap.get(dateStr)) || [];
      if (hobbies.length > 0) activeDays++;

      week.push({ dateStr, hobbies, inYear });
      cur.setDate(cur.getDate() + 1);
    }

    weeks.push(week);
  }

  return { weeks, monthPositions, activeDays };
}

// ---------------------------------------------------------------------------
// Tooltip state
// ---------------------------------------------------------------------------

interface TooltipState {
  x: number;
  y: number;
  dateStr: string;
  hobbies: Hobby[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ActivityCalendarProps {
  entries: EntryWithUserHobbyEntity[];
  user: PublicUserEntity | UserEntity;
}

function ActivityCalendar({ entries, user }: ActivityCalendarProps) {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { weeks, monthPositions, activeDays, usedHobbies } = useMemo(() => {
    const entryMap = new Map<string, Hobby[]>();
    const hobbyMap = new Map<string, Hobby>();

    entries.forEach((entry) => {
      const date = new Date(entry.activityDate);
      if (date.getFullYear() !== selectedYear) return;
      const dateStr = toDateStr(date);
      const hobby = {
        name: entry.userHobby.hobby.name,
        color: entry.userHobby.hobby.color,
      };

      if (!entryMap.has(dateStr)) entryMap.set(dateStr, []);
      const list = entryMap.get(dateStr)!;
      if (!list.find((h) => h.name === hobby.name)) list.push(hobby);

      hobbyMap.set(hobby.name, hobby);
    });

    const calendar = buildCalendar(selectedYear, entryMap);
    const usedHobbies = Array.from(hobbyMap.values());

    return { ...calendar, usedHobbies };
  }, [entries, selectedYear]);

  function showTooltip(e: React.MouseEvent, day: CalendarDay) {
    if (!day.inYear || day.hobbies.length === 0) return;
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      dateStr: day.dateStr,
      hobbies: day.hobbies,
    });
  }

  function hideTooltip() {
    // Small delay so the tooltip doesn't flicker when moving between dots
    hideTimeout.current = setTimeout(() => setTooltip(null), 80);
  }

  return (
    <>
      <Card className="mb-10">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-xl">Activity</h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {activeDays} active {activeDays === 1 ? "day" : "days"} in{" "}
              {selectedYear}
            </p>
          </div>

          {/* Year navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedYear((year) => year - 1)}
              disabled={selectedYear <= new Date(user.createdAt).getFullYear()}
              className="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous year"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="w-10 text-center text-sm font-medium tabular-nums">
              {selectedYear}
            </span>
            <button
              onClick={() => setSelectedYear((year) => year + 1)}
              disabled={selectedYear >= CURRENT_YEAR}
              className="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next year"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="overflow-x-auto">
          <div className="inline-block">
            {/* Month label row */}
            <div className="mb-1 flex">
              <div className="mr-1.5 w-5 shrink-0" />
              <div className="flex gap-0.5">
                {weeks.map((_, wi) => {
                  const mp = monthPositions.find((m) => m.weekIndex === wi);
                  return (
                    <div key={wi} className="relative h-4 w-3">
                      {mp && (
                        <span className="text-muted-foreground absolute bottom-0 text-[10px] leading-none whitespace-nowrap">
                          {MONTH_NAMES[mp.month]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Day labels + dot columns */}
            <div className="flex gap-0.5">
              <div className="mr-1.5 flex shrink-0 flex-col gap-0.5">
                {DAY_LABELS.map((label, i) => (
                  <span
                    key={i}
                    className="text-muted-foreground flex h-3 w-5 items-center justify-end text-[10px] leading-none"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((day, di) => (
                    <span
                      key={di}
                      className="size-3 shrink-0 rounded-full transition-opacity"
                      style={{
                        background: day.inYear
                          ? getDotBackground(day.hobbies)
                          : "transparent",
                        cursor:
                          day.inYear && day.hobbies.length > 0
                            ? "pointer"
                            : "default",
                        opacity:
                          tooltip &&
                          tooltip.dateStr !== day.dateStr &&
                          day.inYear &&
                          day.hobbies.length > 0
                            ? 0.5
                            : 1,
                      }}
                      onMouseEnter={(e) => showTooltip(e, day)}
                      onMouseLeave={hideTooltip}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobby legend */}
        {usedHobbies.length > 0 && (
          <div className="border-border mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-3">
            {usedHobbies.map((h) => (
              <div key={h.name} className="flex items-center gap-1.5">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: h.color }}
                />
                <span className="text-muted-foreground text-xs">{h.name}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Tooltip — rendered outside the Card so overflow-x never clips it */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, calc(-100% - 8px))",
          }}
        >
          <div className="bg-card border-border min-w-30 rounded-2xl border px-3 py-2.5 shadow-lg">
            <p className="text-muted-foreground mb-2 text-[11px] whitespace-nowrap">
              {format(tooltip.dateStr, "eee', 'MMM' 'd")}
            </p>
            <div className="flex flex-col gap-1.5">
              {tooltip.hobbies.map((hobby) => (
                <div key={hobby.name} className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: hobby.color }}
                  />
                  <span className="text-xs font-medium">{hobby.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityCalendar;
