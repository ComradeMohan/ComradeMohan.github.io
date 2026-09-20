import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower/upward), 0.15 (downward), etc.
  className?: string;
  offsetY?: [number, number];
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.1,
  className = "",
  offsetY,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const defaultY = useTransform(
    scrollY,
    [0, 1000],
    offsetY || [0, speed * 300]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y: defaultY }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
