import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../utils/utils";

function Carousel({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useLayoutEffect(() => {
    updateScrollState();
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -456 : 456,
      behavior: "smooth",
    });
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {canScrollLeft && (
        <div>
          <div className="from-background absolute top-0 bottom-0 left-0 z-10 w-24 bg-linear-to-r to-transparent"></div>
          <button
            onClick={() => scroll("left")}
            className="text-foreground bg-background absolute top-1/2 left-4 z-20 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-1"
          >
            <ChevronLeft></ChevronLeft>
          </button>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
      {canScrollRight && (
        <div>
          <div className="from-background absolute top-0 right-0 bottom-0 z-10 w-24 bg-linear-to-l to-transparent"></div>
          <button
            onClick={() => scroll("right")}
            className="text-foreground bg-background absolute top-1/2 right-4 z-20 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-1"
          >
            <ChevronRight></ChevronRight>
          </button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
