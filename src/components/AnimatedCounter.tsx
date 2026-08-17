import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1600,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Trigger animation on scroll into viewport (both mobile and desktop)
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const rawStr = String(value);

    // Extract numeric part, decimal places, prefix, and suffix
    const match = rawStr.match(/^([^0-9.]*)([0-9,.]+)([^0-9.]*)$/);
    if (!match) {
      setDisplayValue(rawStr);
      return;
    }

    const prefix = match[1] || "";
    const numStr = match[2].replace(/,/g, "");
    const suffix = match[3] || "";
    const targetNumber = parseFloat(numStr);

    if (isNaN(targetNumber)) {
      setDisplayValue(rawStr);
      return;
    }

    const hasDecimals = numStr.includes(".");
    const decimalPlaces = hasDecimals ? (numStr.split(".")[1] || "").length : 0;
    const hasComma = match[2].includes(",");

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = easeProgress * targetNumber;

      let formattedNumber: string;
      if (hasDecimals) {
        formattedNumber = currentNumber.toFixed(decimalPlaces);
      } else {
        formattedNumber = Math.floor(currentNumber).toString();
      }

      if (hasComma) {
        const parts = formattedNumber.split(".");
        parts[0] = parseInt(parts[0], 10).toLocaleString("en-US");
        formattedNumber = parts.join(".");
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(rawStr); // Guarantee exact final target
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, isVisible]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};
