import { useEffect, useState } from "react";

const GlowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (
        e.clientY <= 0 ||
        e.clientY >= window.innerHeight ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    isVisible && (
      <div
        className="pointer-events-none fixed z-100 hidden lg:flex h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-primary-violet opacity-30 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-violet) 0%, rgba(178, 29, 219, 0) 100%)",
          }}
        />
        <div
          className="h-5 w-5 rounded-full bg-primary-violet"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-violet) 0%, rgba(178, 29, 219, 0) 70%)",
          }}
        />
      </div>
    )
  );
};

export default GlowCursor;
