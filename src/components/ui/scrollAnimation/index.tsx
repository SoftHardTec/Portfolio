import { useEffect, useRef, useState } from "react";

type SlideFrom = "left" | "right" | "top" | "bottom";

interface ScrollAnimationProps {
  children: React.ReactNode;
  from?: SlideFrom;
  duration?: number; // ms
  delay?: number; // ms
  distance?: number; // px
  threshold?: number; // 0-1, qué porcentaje debe ser visible para activar
  className?: string;
}

const getInitialTransform = (from: SlideFrom, distance: number): string => {
  switch (from) {
    case "left":
      return `translateX(-${distance}px)`;
    case "right":
      return `translateX(${distance}px)`;
    case "top":
      return `translateY(-${distance}px)`;
    case "bottom":
      return `translateY(${distance}px)`;
  }
};

function ScrollAnimation({
  children,
  from = "right",
  duration = 600,
  delay = 0,
  distance = 50,
  threshold = 0.15,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible
          ? "translate(0, 0)"
          : getInitialTransform(from, distance),
        opacity: visible ? 1 : 0,
        transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

export default ScrollAnimation;
