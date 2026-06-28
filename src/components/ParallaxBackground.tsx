import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 3 distinct layers moving at different speeds to create deep 3D space
  const y1 = useTransform(scrollY, [0, 2000], [0, -150]); // Slow (Far back)
  const y2 = useTransform(scrollY, [0, 2000], [0, -350]); // Medium
  const y3 = useTransform(scrollY, [0, 2000], [0, -600]); // Fast (Closest)

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      
      {/* LAYER 1: Distant Stars (Slow) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-10 dark:opacity-20"
      >
        <svg width="100%" height="200%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars-1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
              <circle cx="80" cy="50" r="1.5" fill="currentColor" />
              <circle cx="40" cy="80" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars-1)" className="text-primary/30" />
        </svg>
      </motion.div>

      {/* LAYER 2: Cyber Crosses (Medium speed) */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 opacity-10 dark:opacity-20"
      >
        <svg width="100%" height="200%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-cross" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <path d="M70,75 L80,75 M75,70 L75,80" stroke="currentColor" strokeWidth="1" />
              <circle cx="20" cy="120" r="0.5" fill="currentColor" />
              <circle cx="130" cy="30" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-cross)" className="text-accent/30" />
        </svg>
      </motion.div>

      {/* LAYER 3: Floating Geometric Outlines (Fast speed) */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
      >
        <svg width="100%" height="200%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo-shapes" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Hollow Square */}
              <rect x="30" y="40" width="12" height="12" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(45 36 46)" />
              {/* Hollow Triangle */}
              <polygon points="160,150 166,162 154,162" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Hollow Circle */}
              <circle cx="100" cy="180" r="5" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo-shapes)" className="text-primary/40" />
        </svg>
      </motion.div>

      {/* Static deep space vignette glow - Doesn't move, just adds a premium feel */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)"
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
