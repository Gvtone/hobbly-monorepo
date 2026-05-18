import LinkButton from "../components/ui/LinkButton";

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <span className="mb-4 text-6xl">🌙</span>
      <h1 className="mb-2 text-center">Lost in the stars...</h1>
      <p className="text-muted-foreground mb-4 text-center">
        This page doesn't exist in our cozy little world.
      </p>
      <LinkButton size="lg" to="/dashboard">
        Return home ✨
      </LinkButton>
    </div>
  );
}

export default NotFoundPage;
