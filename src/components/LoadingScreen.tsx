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

const TEXT = "COMRADEMOHAN";
const LETTER_STAGGER = 0.05; // seconds between each letter's entry
const LETTER_DURATION = 0.5; // seconds for a single letter to settle
const EXIT_DURATION = 0.6; // seconds of fade-out, shared by the exit transition

// Derive the splash's lifetime from its own animation so the two can never drift
// apart again. This used to be a flat 2800ms, which left ~1.2s of dead air after
// the word had already finished assembling.
const ENTRY_MS = ((TEXT.length - 1) * LETTER_STAGGER + LETTER_DURATION) * 1000;

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, EXIT_DURATION * 1000);
    }, ENTRY_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION }}
        >
          <div className="flex gap-1">
            {TEXT.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-6xl font-extrabold font-outfit tracking-widest"
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * LETTER_STAGGER, duration: LETTER_DURATION, type: "spring", stiffness: 200 }}
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
