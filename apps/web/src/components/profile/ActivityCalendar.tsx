import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HobbyEntry {
  date: string; // "YYYY-MM-DD"
  hobby: { name: string; color: string };
}

type Hobby = { name: string; color: string };

type CalendarDay = {
  dateStr: string;
  hobbies: Hobby[]; // empty when no entries that day
  inYear: boolean;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HOBBY_LIST: Hobby[] = [
  { name: "Anime", color: "#c8a2e3" },
  { name: "Books", color: "#f5c27a" },
  { name: "Gaming", color: "#8baf8b" },
  { name: "Art", color: "#e8857a" },
  { name: "Cooking", color: "#f5a040" },
  { name: "Music", color: "#7ec8e3" },
  { name: "Journal", color: "#d4c5a0" },
  { name: "Plants", color: "#5a8a5a" },
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

/** Formats "YYYY-MM-DD" → "Mon, Jan 1" */
function formatDisplayDate(dateStr: string): string {
  const [y, m, day] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
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
// Mock data
// ---------------------------------------------------------------------------

function generateMockEntries(): HobbyEntry[] {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };

  const entries: HobbyEntry[] = [];

  const addYear = (year: number, primaryCount: number) => {
    const start = new Date(year, 0, 1);
    const end =
      year === CURRENT_YEAR ? new Date(2026, 3, 16) : new Date(year, 11, 31);
    const totalDays = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;

    // Build a pool of active dates (unique)
    const activeDates: string[] = [];
    const seen = new Set<string>();
    let tries = 0;
    while (activeDates.length < Math.min(primaryCount, totalDays) && tries < primaryCount * 4) {
      tries++;
      const d = new Date(start);
      d.setDate(d.getDate() + Math.floor(rand() * totalDays));
      const s = toDateStr(d);
      if (!seen.has(s)) {
        seen.add(s);
        activeDates.push(s);
        entries.push({ date: s, hobby: HOBBY_LIST[Math.floor(rand() * HOBBY_LIST.length)] });
      }
    }

    // ~25 % of active days get a second different hobby
    for (const dateStr of activeDates) {
      if (rand() < 0.25) {
        const existing = entries.filter((e) => e.date === dateStr).map((e) => e.hobby.name);
        const others = HOBBY_LIST.filter((h) => !existing.includes(h.name));
        if (others.length > 0) {
          entries.push({ date: dateStr, hobby: others[Math.floor(rand() * others.length)] });
        }
      }
    }

    // ~8 % of active days get a third different hobby
    for (const dateStr of activeDates) {
      if (rand() < 0.08) {
        const existing = entries.filter((e) => e.date === dateStr).map((e) => e.hobby.name);
        const others = HOBBY_LIST.filter((h) => !existing.includes(h.name));
        if (others.length > 0) {
          entries.push({ date: dateStr, hobby: others[Math.floor(rand() * others.length)] });
        }
      }
    }
  };

  addYear(2024, 145);
  addYear(2025, 155);
  addYear(2026, 58);
  return entries;
}

const MOCK_ENTRIES = generateMockEntries();

// ---------------------------------------------------------------------------
// Calendar grid builder
// ---------------------------------------------------------------------------

function buildCalendar(
  year: number,
  entryMap: Map<string, Hobby[]>
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

function ActivityCalendar() {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { weeks, monthPositions, activeDays, usedHobbies } = useMemo(() => {
    // Build date → hobbies[] map (deduplicated by hobby name)
    const entryMap = new Map<string, Hobby[]>();
    MOCK_ENTRIES.forEach((e) => {
      if (parseInt(e.date) !== selectedYear) return;
      if (!entryMap.has(e.date)) entryMap.set(e.date, []);
      const list = entryMap.get(e.date)!;
      if (!list.find((h) => h.name === e.hobby.name)) list.push(e.hobby);
    });

    const calendar = buildCalendar(selectedYear, entryMap);

    // Collect hobbies used this year in HOBBY_LIST order
    const hobbySet = new Set<string>();
    MOCK_ENTRIES.forEach((e) => {
      if (parseInt(e.date) === selectedYear) hobbySet.add(e.hobby.name);
    });
    const usedHobbies = HOBBY_LIST.filter((h) => hobbySet.has(h.name));

    return { ...calendar, usedHobbies };
  }, [selectedYear]);

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
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl">Activity</h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              {activeDays} active {activeDays === 1 ? "day" : "days"} in{" "}
              {selectedYear}
            </p>
          </div>

          {/* Year navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedYear((y) => y - 1)}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Previous year"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-medium w-10 text-center tabular-nums">
              {selectedYear}
            </span>
            <button
              onClick={() => setSelectedYear((y) => y + 1)}
              disabled={selectedYear >= CURRENT_YEAR}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
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
            <div className="flex mb-1">
              <div className="w-5 mr-1.5 shrink-0" />
              <div className="flex gap-0.5">
                {weeks.map((_, wi) => {
                  const mp = monthPositions.find((m) => m.weekIndex === wi);
                  return (
                    <div key={wi} className="relative w-3 h-4">
                      {mp && (
                        <span className="absolute bottom-0 text-[10px] text-muted-foreground whitespace-nowrap leading-none">
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
              <div className="flex flex-col gap-0.5 mr-1.5 shrink-0">
                {DAY_LABELS.map((label, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-muted-foreground h-3 w-5 flex items-center justify-end leading-none"
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
                      className="rounded-full size-3 shrink-0 transition-opacity"
                      style={{
                        background: day.inYear
                          ? getDotBackground(day.hobbies)
                          : "transparent",
                        cursor:
                          day.inYear && day.hobbies.length > 0
                            ? "pointer"
                            : "default",
                        opacity:
                          tooltip && tooltip.dateStr !== day.dateStr && day.inYear && day.hobbies.length > 0
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
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-3 border-t border-border">
            {usedHobbies.map((h) => (
              <div key={h.name} className="flex items-center gap-1.5">
                <span
                  className="rounded-full size-2.5 shrink-0"
                  style={{ backgroundColor: h.color }}
                />
                <span className="text-xs text-muted-foreground">{h.name}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Tooltip — rendered outside the Card so overflow-x never clips it */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, calc(-100% - 8px))",
          }}
        >
          <div className="bg-card border border-border rounded-2xl shadow-lg px-3 py-2.5 min-w-30">
            <p className="text-[11px] text-muted-foreground mb-2 whitespace-nowrap">
              {formatDisplayDate(tooltip.dateStr)}
            </p>
            <div className="flex flex-col gap-1.5">
              {tooltip.hobbies.map((h) => (
                <div key={h.name} className="flex items-center gap-2">
                  <span
                    className="rounded-full size-2.5 shrink-0"
                    style={{ backgroundColor: h.color }}
                  />
                  <span className="text-xs font-medium">{h.name}</span>
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
