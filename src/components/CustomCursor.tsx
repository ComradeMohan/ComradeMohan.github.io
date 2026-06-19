import { useEffect, useRef, useState } from "react";

interface Cursor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<Cursor[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Add trail particle
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - 1,
        opacity: 1,
      });

      // Keep trail under control
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      // Update cursor position
      cursor.style.left = `${mouseRef.current.x}px`;
      cursor.style.top = `${mouseRef.current.y}px`;

      // Animate trail
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        const trail = trailRef.current[i];
        trail.x += trail.vx;
        trail.y += trail.vy;
        trail.opacity -= 0.02;
        trail.vy += 0.1; // gravity

        if (trail.opacity <= 0) {
          trailRef.current.splice(i, 1);
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.body.style.cursor = "none";

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute w-8 h-8 rounded-full border-2 border-blue-400"
          style={{
            left: "-16px",
            top: "-16px",
            boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        {/* Inner cursor */}
        <div
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: "-4px",
            top: "-4px",
            boxShadow: "0 0 10px rgba(96, 165, 250, 0.8)",
          }}
        />
      </div>

      {/* Trail particles */}
      <svg
        className="fixed inset-0 pointer-events-none z-40"
        width={window.innerWidth}
        height={window.innerHeight}
      >
        {trailRef.current.map((trail, i) => (
          <circle
            key={i}
            cx={trail.x}
            cy={trail.y}
            r={2}
            fill={`rgba(96, 165, 250, ${trail.opacity * 0.6})`}
            style={{
              filter: `drop-shadow(0 0 4px rgba(96, 165, 250, ${trail.opacity * 0.4}))`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(96, 165, 250, 0.8);
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
