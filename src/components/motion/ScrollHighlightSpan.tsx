import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollHighlightWordProps {
  word: string;
  globalIndex: number;
  prefersReducedMotion: boolean | null;
  baseClassName?: string;
  highlightClassName?: string;
  showGlowBackground?: boolean;
}

const ScrollHighlightWord: React.FC<ScrollHighlightWordProps> = ({
  word,
  globalIndex,
  prefersReducedMotion,
  baseClassName = "text-foreground/50 dark:text-slate-400/60 font-semibold dark:font-medium",
  highlightClassName = "text-[#FF5722] font-semibold dark:font-medium",
  showGlowBackground = true,
}) => {
  // Stagger each word by 85ms so they visibly highlight one-by-one in sequence on scroll
  const delay = prefersReducedMotion ? 0 : 0.12 + globalIndex * 0.085;

  return (
    <span className="relative inline-block align-baseline group/word">
      {/* Base unhighlighted text: matches exact kerning and weight */}
      <span className={`transition-colors duration-200 ${baseClassName}`}>
        {word}
      </span>

      {/* Highlighted text layer on top with sequential stagger */}
      <motion.span
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{
          duration: 0.35,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`absolute inset-0 select-none pointer-events-none drop-shadow-[0_0_8px_rgba(255,87,34,0.45)] ${highlightClassName}`}
        aria-hidden="true"
      >
        {word}
      </motion.span>

      {/* Subtle warm glow ambient highlight background */}
      {showGlowBackground && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            duration: 0.35,
            delay,
            ease: "easeOut",
          }}
          className="absolute -inset-x-0.5 inset-y-0 rounded-xs bg-[#FF5722]/12 dark:bg-[#FF5722]/18 -z-10 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export interface ScrollHighlightSpanProps {
  children: string;
  startIndex: number;
  baseClassName?: string;
  highlightClassName?: string;
  showGlowBackground?: boolean;
}

export const ScrollHighlightSpan: React.FC<ScrollHighlightSpanProps> = ({
  children,
  startIndex,
  baseClassName,
  highlightClassName,
  showGlowBackground = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <span className="inline">
      {words.map((word, idx) => {
        const globalIdx = startIndex + idx;

        return (
          <React.Fragment key={idx}>
            <ScrollHighlightWord
              word={word}
              globalIndex={globalIdx}
              prefersReducedMotion={prefersReducedMotion}
              baseClassName={baseClassName}
              highlightClassName={highlightClassName}
              showGlowBackground={showGlowBackground}
            />
            {idx < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default ScrollHighlightSpan;
