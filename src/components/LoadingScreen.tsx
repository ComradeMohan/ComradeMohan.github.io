import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  "hsl(12, 95%, 58%)",   // orange (primary)
  "hsl(289, 65%, 60%)",  // purple (accent)
  "hsl(195, 90%, 50%)",  // cyan
  "hsl(145, 60%, 45%)",  // green
  "hsl(35, 90%, 55%)",   // amber
  "hsl(12, 95%, 58%)",   // orange
  "hsl(210, 80%, 55%)",  // blue
  "hsl(330, 70%, 55%)",  // pink
  "hsl(60, 80%, 50%)",   // yellow
  "hsl(289, 65%, 60%)",  // purple
  "hsl(195, 90%, 50%)",  // cyan
  "hsl(145, 60%, 45%)",  // green
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);
  const text = "COMRADEMOHAN";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-1">
            {text.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-6xl font-extrabold font-outfit tracking-widest"
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                style={{ color: colors[i] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
