import { useRef, MouseEvent, ReactNode, useState } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  spotlightColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SpotlightCard = ({
  children,
  className = "",
  innerClassName = "",
  spotlightColor = "hsl(var(--primary) / 0.18)",
  onClick,
  style = {}
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${className}`}
      style={style}
    >
      {/* Radial background spotlight tracking mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Border spotlight overlay tracking mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 border border-transparent"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.4), transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      <div className={`relative z-10 w-full h-full ${innerClassName}`}>{children}</div>
    </div>
  );
};

export default SpotlightCard;

