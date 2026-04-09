import Button from "../components/ui/Button";

function LandingPage() {
  return (
    <>
      <nav id="nav-bar" className="flex justify-between items-center px-6 py-4">
        <div id="title" className="flex gap-2">
          <span className="inline-flex items-center justify-center rounded-2xl bg-hobbly-sky-light w-8 h-8">
            ✨
          </span>
          <span className="text-2xl font-medium font-hobbly-serif">Hobbly</span>
        </div>

        <div id="nav-links" className="flex gap-4">
          <Button variant="transparent" shape="pill">
            Log in
          </Button>
          <Button variant="gradient" shape="pill">
            Start for free
          </Button>
        </div>
      </nav>
      <section className="flex flex-col items-center gap-6 h-screen/80 py-20 px-6">
        <div className="flex justify-center items-center gap-2 rounded-full bg-primary/30 text-primary-foreground py-1 px-2">
          {/* <span>🚀</span> */}
          <span className="text-sm font-semibold tracking-wide">
            Your cozy hobby journal
          </span>
        </div>
        <h1 className="text-6xl text-center max-w-2xl">
          A cozy place for{" "}
          <span className="bg-linear-to-r from-hobbly-sky-dark to-hobbly-lavender bg-clip-text text-transparent">
            everything{" "}
          </span>
          you love
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          Anime, books, gaming, art — collect it all in a dreamy, visual board
          that's completely yours.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="gradient" shape="rounded" size="lg">
            Start your journal
          </Button>
          <Button variant="default" shape="rounded" size="lg">
            Learn more
          </Button>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
