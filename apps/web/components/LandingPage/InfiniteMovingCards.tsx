import React, { useEffect, useRef, useState } from "react";
import TestimonialsCard from "./Cards/TestimonialsCard";

const InfiniteMovingCards = ({
   direction = "up",
  speed = "normal",
  pauseOnHover = true,
}: {
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    addAnimation();
  }, []);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "down") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "normal"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div ref={containerRef} className="overflow-hidden">
      <div
        ref={scrollerRef}
        className={`flex flex-col shrink-0 flex-nowrap gap-6 ${
          start && "animate-scrollY"
        } ${pauseOnHover && "hover:[animation-play-state:paused]"}`}
      >
        {new Array(1, 2, 3).map((item) => (
          <TestimonialsCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default InfiniteMovingCards;
