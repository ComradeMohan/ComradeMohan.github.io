import { motion } from "framer-motion";
import React from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Hand-drawn pencil sketch overlay screen */}
      <motion.div
        className="fixed inset-0 z-[200] bg-[#FAF9F5] dark:bg-slate-950 border-t-8 border-slate-900 dark:border-white pointer-events-none origin-bottom flex flex-col items-center justify-center"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1, 0] }}
        exit={{ scaleY: [0, 1, 1, 0] }}
        transition={{
          duration: 1.0,
          ease: [0.76, 0, 0.24, 1],
          times: [0, 0.4, 0.65, 1]
        }}
      >
        <div className="flex flex-col items-center gap-4 text-slate-900 dark:text-white">
          <svg 
            className="w-20 h-20" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          >
            {/* Scribbled signature-like stroke representing sketching */}
            <motion.path 
              d="M15,50 Q30,15 45,50 T75,50 T90,30 M25,75 C45,70 55,80 80,70" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ 
                duration: 1.0, 
                ease: "easeInOut",
                times: [0, 0.5, 0.7, 1]
              }}
            />
          </svg>
          <span className="font-handwritten text-2xl select-none tracking-wider animate-pulse">
            sketching new canvas...
          </span>
        </div>
      </motion.div>
    </>
  );
}
