import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  /** Called when the intro finishes loading and starts dissolving into the site */
  onHandoff?: () => void;
  /** Called when the entire intro overlay has completely faded out */
  onComplete: () => void;
}

// ─── Session-storage key ─────────────────────────────────────────────────────
export const INTRO_PLAYED_KEY = "mohan-intro-played";

export const hasIntroPlayed = (): boolean => {
  try {
    return !!sessionStorage.getItem(INTRO_PLAYED_KEY);
  } catch {
    return false;
  }
};

const IntroAnimation = ({ onHandoff, onComplete }: IntroAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Sync with current theme
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Smooth numerical count-up & progress bar fill
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1050; // 1.05 seconds of fluid loading

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Ease-out cubic curve for natural deceleration as it approaches 100%
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const currentVal = Math.floor(easedProgress * 100);

      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Begin graceful handoff & exit
        setTimeout(() => {
          setIsClosing(true);
          onHandoff?.();
        }, 120);

        // Complete transition and unmount
        setTimeout(() => {
          try {
            sessionStorage.setItem(INTRO_PLAYED_KEY, "true");
          } catch (_err) {
            // Ignore session storage errors (e.g. private browsing)
          }
          onComplete();
        }, 460);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onHandoff, onComplete]);

  return (
    <AnimatePresence>
      {!isClosing ? (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center select-none overflow-hidden"
          style={{
            zIndex: 200,
            backgroundColor: isDark ? "#06080F" : "#FAFAFC",
          }}
        >
          {/* Subtle ambient background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-3xl pointer-events-none -z-10 opacity-60"
            style={{
              background: isDark
                ? "radial-gradient(circle at center, rgba(255, 87, 34, 0.12) 0%, transparent 70%)"
                : "radial-gradient(circle at center, rgba(255, 87, 34, 0.06) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col items-center justify-center px-4 max-w-xl text-center z-10">
            {/* Top Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase shadow-xs border-border/80 bg-secondary/50 text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>INITIALIZING PORTFOLIO</span>
            </motion.div>

            {/* Main Centerpiece Typography: MOHAN REDDY */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl font-black font-outfit tracking-tight leading-none flex items-center justify-center gap-3 sm:gap-4.5"
              >
                <span
                  className="text-primary inline-block font-black"
                  style={{ letterSpacing: "0.01em" }}
                >
                  MOHAN
                </span>
                <span
                  className="inline-block text-foreground font-black"
                  style={{
                    letterSpacing: "0.01em",
                  }}
                >
                  REDDY
                </span>
              </motion.h1>
            </div>

            {/* Subtitle / Role */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] sm:text-xs md:text-sm font-grotesk tracking-[0.24em] uppercase mb-8 font-medium"
              style={{ color: isDark ? "#94A3B8" : "#64748B" }}
            >
              Full Stack Developer &bull; Software Engineer
            </motion.p>

            {/* High-Tech Progress Bar */}
            <div className="w-56 sm:w-72 flex flex-col items-center gap-2">
              <div
                className="w-full h-[3px] rounded-full overflow-hidden relative"
                style={{
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.07)",
                }}
              >
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #FF5722 0%, #FF8A65 50%, #FF5722 100%)",
                    boxShadow: "0 0 10px rgba(255, 87, 34, 0.6)",
                  }}
                />
              </div>

              {/* Status and Percentage Indicator */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-wider pt-0.5">
                <span style={{ color: isDark ? "#64748B" : "#94A3B8" }}>
                  {progress < 100 ? "LOADING MODULES" : "READY"}
                </span>
                <span className="font-bold text-[#FF5722]">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;