import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="bg-primary text-primary-foreground fixed right-6 bottom-6 z-50 rounded-full p-2.5 shadow-lg transition-opacity hover:cursor-pointer hover:opacity-90"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default ScrollToTopButton;
