import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-orange-500 to-accent origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressIndicator;
