import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/utils";

function Carousel({
  children,
  className
}: {
  children: React.ReactNode;
  className: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -456 : 456,
      behavior: "smooth"
    });
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {canScrollLeft && (
        <div>
          <div className="absolute z-10 top-0 bottom-0 left-0 w-24 bg-linear-to-r from-background to-transparent"></div>
          <button
            onClick={() => scroll("left")}
            className="absolute flex justify-center items-center z-20 text-foreground bg-background rounded-full p-1 left-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <ChevronLeft></ChevronLeft>
          </button>
        </div>
      )}
      <div ref={scrollRef} className="flex gap-2 overflow-hidden">
        {children}
      </div>
      {canScrollRight && (
        <div>
          <div className="absolute z-10 top-0 bottom-0 right-0 w-24 bg-linear-to-l from-background to-transparent"></div>
          <button
            onClick={() => scroll("right")}
            className="absolute flex justify-center items-center z-20 text-foreground bg-background rounded-full p-1 right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <ChevronRight></ChevronRight>
          </button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
