import Button from "../components/ui/Button";

function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="text-6xl mb-4">🌙</span>
      <h1 className="text-center mb-2">Lost in the stars...</h1>
      <p className="text-center text-muted-foreground mb-4">
        This page doesn't exist in our cozy little world.
      </p>
      <Button size="lg">Return home ✨</Button>
    </div>
  );
}

export default NotFoundPage;
