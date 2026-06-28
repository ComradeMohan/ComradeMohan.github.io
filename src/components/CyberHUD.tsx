import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberHUDProps {
  isVisible: boolean;
}

const hudData = [
  {
    id: "repos",
    iconSrc: "/icons/github-light.svg",
    darkIconSrc: "/icons/github-dark.svg",
    value: "98",
    label: "Repositories",
    path: "M 50 50 L 30 50 L 30 15 L 5 15",
    node: { cx: 5, cy: 15 },
    css: { right: "95%", bottom: "85%", marginTop: "-24px" }
  },
  {
    id: "followers",
    iconSrc: "/icons/github-light.svg",
    darkIconSrc: "/icons/github-dark.svg",
    value: "13",
    label: "Followers",
    path: "M 50 50 L 20 50 L 20 40 L -5 40",
    node: { cx: -5, cy: 40 },
    css: { right: "105%", top: "40%", marginTop: "-24px" }
  },
  {
    id: "solved",
    iconSrc: "/icons/leetcode-orange.svg",
    value: "308",
    label: "Solved",
    path: "M 50 50 L 35 50 L 35 80 L 10 80",
    node: { cx: 10, cy: 80 },
    css: { right: "90%", top: "80%", marginTop: "-24px" }
  },
  {
    id: "rating",
    iconSrc: "/icons/leetcode-orange.svg",
    value: "1724",
    label: "Rating",
    path: "M 50 50 L 70 50 L 70 15 L 95 15",
    node: { cx: 95, cy: 15 },
    css: { left: "95%", bottom: "85%", marginTop: "-24px" }
  },
  {
    id: "rank",
    iconSrc: "/icons/leetcode-orange.svg",
    value: "Top 11.98%",
    label: "Contest Rank",
    path: "M 50 50 L 80 50 L 80 75 L 105 75",
    node: { cx: 105, cy: 75 },
    css: { left: "105%", top: "75%", marginTop: "-24px" }
  }
];

export const CyberHUD: React.FC<CyberHUDProps> = ({ isVisible }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      
      {/* Preload images so they instantly appear on first hover without network delay */}
      <div className="hidden">
        {hudData.map(item => (
          <React.Fragment key={`preload-${item.id}`}>
            <img src={item.iconSrc} alt="preload" />
            {item.darkIconSrc && <img src={item.darkIconSrc} alt="preload-dark" />}
          </React.Fragment>
        ))}
      </div>

      {/* SVG Canvas for Lines */}
      <svg 
        className="absolute inset-0 w-full h-full overflow-visible z-10"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <AnimatePresence>
          {isVisible && hudData.map((item, i) => (
            <g key={`lines-${item.id}`}>
              <motion.path
                d={item.path}
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeOpacity={0.4}
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15, ease: "easeInOut" }}
                className="drop-shadow-sm"
              />
              <motion.circle
                cx={item.node.cx}
                cy={item.node.cy}
                r="1.5"
                fill="hsl(var(--foreground))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: (i * 0.15) + 0.3 }}
                className="drop-shadow-md"
              />
            </g>
          ))}
        </AnimatePresence>
      </svg>

      {/* HTML Overlay for Labels */}
      <AnimatePresence>
        {isVisible && hudData.map((item, i) => (
          <motion.div
            key={`label-${item.id}`}
            style={item.css as any}
            initial={{ opacity: 0, scale: 0.8, x: item.css.left ? -10 : 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              y: [0, -3, 0] // Subtle float idle animation
            }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ 
              opacity: { duration: 0.3, delay: (i * 0.15) + 0.2 },
              scale: { type: "spring", stiffness: 300, damping: 20, delay: (i * 0.15) + 0.2 },
              x: { type: "spring", stiffness: 300, damping: 20, delay: (i * 0.15) + 0.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: (i * 0.15) + 0.5 }
            }}
            className="absolute flex items-center gap-3 w-[160px] h-[48px] bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-2 shadow-xl z-20 group"
          >
            {/* Glowing dot left accent */}
            <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-[20px] bg-primary rounded-r-full shadow-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/40">
              <motion.div
                initial={{ rotate: -15 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.4, delay: (i * 0.15) + 0.2 }}
              >
                {item.darkIconSrc ? (
                  <>
                    <img src={item.iconSrc} alt={item.id} className="w-4 h-4 object-contain show-in-light" loading="eager" />
                    <img src={item.darkIconSrc} alt={item.id} className="w-4 h-4 object-contain hide-in-light" loading="eager" />
                  </>
                ) : (
                  <img src={item.iconSrc} alt={item.id} className="w-4 h-4 object-contain" loading="eager" />
                )}
              </motion.div>
            </div>
            
            <div className="flex flex-col justify-center h-full">
              <span className="text-[13px] font-bold text-foreground font-mono leading-tight">{item.value}</span>
              <span className="text-[9px] font-medium text-muted-foreground tracking-wider uppercase font-outfit">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
};

export default CyberHUD;
