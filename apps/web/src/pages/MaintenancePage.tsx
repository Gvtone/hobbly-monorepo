import { Sparkles, Wrench } from "lucide-react";
import { Card } from "../components/ui/Card";
import LinkButton from "../components/ui/LinkButton";

function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md items-center gap-8">
        <LinkButton
          to="/"
          variant="transparent"
          shape="pill"
          className="z-20 flex items-center gap-2 p-0"
        >
          <div className="from-hobbly-sky to-hobbly-lavender shadow-hobbly-sky/30 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br shadow">
            <Sparkles className="text-white" size={16} />
          </div>
          <span className="font-hobbly-serif text-foreground hidden text-xl font-semibold md:block">
            Hobbly
          </span>
        </LinkButton>

        <div className="bg-hobbly-sky-light/50 text-hobbly-sky-dark flex size-20 items-center justify-center rounded-full">
          <Wrench size={32} />
        </div>

        <div className="text-center">
          <h1 className="mb-2">We'll be right back ✨</h1>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Hobbly is getting some cozy upgrades. We're doing scheduled
            maintenance to make things better for you. Thanks for your patience
            — go enjoy a cup of tea 🍵
          </p>
        </div>
      </Card>
    </div>
  );
}

export default MaintenancePage;
