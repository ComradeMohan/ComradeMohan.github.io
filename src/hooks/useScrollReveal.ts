import { useEffect, useRef } from "react";

interface RevealOptions {
  threshold?: number;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const useScrollReveal = (options: RevealOptions = {}) => {
  const {
    threshold = 0.2,
    duration = 0.8,
    delay = 0,
    direction = "up",
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const getInitialTransform = () => {
      const distance = 50;
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`;
        case "down":
          return `translateY(-${distance}px)`;
        case "left":
          return `translateX(${distance}px)`;
        case "right":
          return `translateX(-${distance}px)`;
        default:
          return "translateY(50px)";
      }
    };

    element.style.opacity = "0";
    element.style.transform = getInitialTransform();
    element.style.transition = `all ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = "1";
          element.style.transform = "translate(0, 0)";
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, duration, delay, direction]);

  return ref;
};

export { useScrollReveal };
