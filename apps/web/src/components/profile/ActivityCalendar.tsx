import { Card } from "../ui/Card";

function ActivityCalendar() {
  return (
    <Card className="mb-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">Activity</h3>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted-foreground">Less</span>
          <span className="rounded-full size-2.5 bg-muted"></span>
          <span className="rounded-full size-2.5 bg-hobbly-sky/50"></span>
          <span className="rounded-full size-2.5 bg-hobbly-sky/75"></span>
          <span className="rounded-full size-2.5 bg-hobbly-sky"></span>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>

      <p className="text-muted-foreground text-xs mb-4">
        3 active days this month · 40 active days in total
      </p>

      <div></div>
    </Card>
  );
}

export default ActivityCalendar;
