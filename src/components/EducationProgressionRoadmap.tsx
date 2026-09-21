import React, { useState } from "react";
import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { BookOpen, GraduationCap, Flag, ArrowRight } from "lucide-react";

interface EducationProgressionRoadmapProps {
  progress: MotionValue<number>;
}

export const EducationProgressionRoadmap: React.FC<EducationProgressionRoadmapProps> = ({ progress }) => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  // =========================================================================
  // SCROLL-DRIVEN STORY SEQUENCE (0% to 100%)
  // 0–25%: 2020 node activates with subtle orange pulse.
  // 25–55%: trajectory draws toward 2022, arrowhead appears.
  // 55–80%: 2022 milestone activates with subtle glow.
  // 80–100%: trajectory completes toward 2026, final arrowhead reaches 2026,
  //          flag activates with stronger glow pulse, line-by-line reveal of "CREATE IMPACT".
  // =========================================================================

  // Stage 1: 2020 Milestone Activation (0% - 25%)
  const node2020Opacity = useTransform(progress, [0, 0.22], prefersReducedMotion ? [1, 1] : [0.4, 1]);
  const node2020Scale = useTransform(progress, [0, 0.22], prefersReducedMotion ? [1, 1] : [0.92, 1]);

  // Stage 2: Trajectory from 2020 -> 2022 (25% - 55%)
  const path1Length = useTransform(progress, [0.22, 0.55], prefersReducedMotion ? [1, 1] : [0, 1]);
  const arrow1Opacity = useTransform(progress, [0.42, 0.55], prefersReducedMotion ? [1, 1] : [0, 1]);

  // Stage 3: 2022 Milestone Activation (55% - 78%)
  const node2022Opacity = useTransform(progress, [0.52, 0.72], prefersReducedMotion ? [1, 1] : [0.4, 1]);
  const node2022Scale = useTransform(progress, [0.52, 0.72], prefersReducedMotion ? [1, 1] : [0.92, 1]);

  // Stage 4: Trajectory from 2022 -> 2026 (70% - 95%)
  const path2Length = useTransform(progress, [0.70, 0.94], prefersReducedMotion ? [1, 1] : [0, 1]);
  const arrow2Opacity = useTransform(progress, [0.82, 0.94], prefersReducedMotion ? [1, 1] : [0, 1]);

  // Stage 5: 2026 Destination Activation & Glow (88% - 100%)
  const node2026Opacity = useTransform(progress, [0.86, 0.98], prefersReducedMotion ? [1, 1] : [0.4, 1]);
  const node2026Scale = useTransform(progress, [0.86, 0.98], prefersReducedMotion ? [1, 1] : [0.92, 1]);
  const node2026Pulse = useTransform(progress, [0.90, 0.98], prefersReducedMotion ? [0.4, 1] : [0.4, 1]);

  // Character/Line-by-line reveal of "CREATE IMPACT" and supporting text
  const impactLine1Opacity = useTransform(progress, [0.88, 0.94], prefersReducedMotion ? [1, 1] : [0.3, 1]);
  const impactLine2Opacity = useTransform(progress, [0.92, 0.98], prefersReducedMotion ? [1, 1] : [0.3, 1]);
  const impactSubOpacity = useTransform(progress, [0.95, 1.0], prefersReducedMotion ? [1, 1] : [0.3, 1]);

  // Blueprint background grid settled opacity
  const gridOpacity = useTransform(progress, [0, 0.3], prefersReducedMotion ? [1, 1] : [0.6, 1]);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET: ASCENDING PROGRESSION ROADMAP CANVAS                    */}
      {/* ========================================================================= */}
      <div className="flex flex-col justify-between h-full relative w-full min-h-[310px] lg:min-h-[330px] pl-1 lg:pl-3">
        {/* Top Editorial Typography */}
        <div className="flex items-start justify-between w-full pt-0.5 pb-1">
          <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#FF5722]/80 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            <span>TRAJECTORY // 2020-2026</span>
          </div>
          <div className="text-right font-mono text-[10px] lg:text-[11px] tracking-widest text-muted-foreground/80 dark:text-slate-400 font-bold uppercase leading-tight">
            <div>EDUCATION</div>
            <div>BUILDS</div>
            <div>FOUNDATIONS</div>
          </div>
        </div>

        {/* Central Trajectory Blueprint Area */}
        <div className="relative w-full h-[220px] lg:h-[235px] my-auto">
          {/* Background Blueprint Grid & Orange Trajectory SVG */}
          <motion.svg
            style={{ opacity: gridOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 360 215"
            preserveAspectRatio="none"
          >
            {/* Subtle Horizontal & Vertical Guide Grid Lines */}
            <line x1="20" y1="125" x2="340" y2="125" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" className="text-border/30 dark:text-white/5" />
            <line x1="20" y1="80" x2="340" y2="80" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" className="text-border/30 dark:text-white/5" />
            <line x1="20" y1="35" x2="340" y2="35" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" className="text-border/30 dark:text-white/5" />

            <line x1="55" y1="15" x2="55" y2="195" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" className="text-border/30 dark:text-white/5" />
            <line x1="175" y1="15" x2="175" y2="195" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" className="text-border/30 dark:text-white/5" />
            <line x1="295" y1="15" x2="295" y2="195" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 4" className="text-border/30 dark:text-white/5" />

            {/* Stepped Blueprint Construction Lines (rising staircase guide) */}
            <path
              d="M 55 195 L 55 125 L 175 125 L 175 80 L 295 80 L 295 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              className="text-border/50 dark:text-white/10"
            />

            {/* Technical Blueprint Crosshairs (+) at key coordinate intersections */}
            <path d="M 52 125 L 58 125 M 55 122 L 55 128" stroke="currentColor" strokeWidth="0.9" className="text-border/60 dark:text-white/20" />
            <path d="M 172 125 L 178 125 M 175 122 L 175 128" stroke="currentColor" strokeWidth="0.8" className="text-border/40 dark:text-white/10" />
            <path d="M 172 80 L 178 80 M 175 77 L 175 83" stroke="currentColor" strokeWidth="0.9" className="text-border/60 dark:text-white/20" />
            <path d="M 292 80 L 298 80 M 295 77 L 295 83" stroke="currentColor" strokeWidth="0.8" className="text-border/40 dark:text-white/10" />
            <path d="M 292 35 L 298 35 M 295 32 L 295 38" stroke="currentColor" strokeWidth="0.9" className="text-border/60 dark:text-white/20" />
            <path d="M 292 15 L 298 15 M 295 12 L 295 18" stroke="currentColor" strokeWidth="0.8" className="text-border/40 dark:text-white/10" />

            {/* Dotted Secondary Trajectory (subtle parallel depth) */}
            <line
              x1="55"
              y1="131"
              x2="295"
              y2="41"
              stroke="#FF5722"
              strokeWidth="1"
              strokeDasharray="2 5"
              opacity="0.22"
            />

            {/* =================================================================== */}
            {/* CONTINUOUS ASCENDING ORANGE PATH                                    */}
            {/* Segment 1: 2020 (55, 125) -> 2022 (175, 80)                         */}
            {/* =================================================================== */}
            <motion.line
              x1="55"
              y1="125"
              x2="175"
              y2="80"
              stroke="#FF5722"
              strokeWidth="2.2"
              strokeDasharray="4 3"
              style={{ pathLength: path1Length }}
              className="filter drop-shadow-[0_0_6px_#FF5722]"
            />

            {/* =================================================================== */}
            {/* Segment 2: 2022 (175, 80) -> 2026 (295, 35)                         */}
            {/* =================================================================== */}
            <motion.line
              x1="175"
              y1="80"
              x2="295"
              y2="35"
              stroke="#FF5722"
              strokeWidth="2.2"
              strokeDasharray="4 3"
              style={{ pathLength: path2Length }}
              className="filter drop-shadow-[0_0_8px_#FF5722]"
            />

            {/* =================================================================== */}
            {/* DIRECTIONAL ARROWHEADS (pointing 2020 -> 2022 -> 2026 at -20.55deg)  */}
            {/* =================================================================== */}
            {/* Arrowhead 1: mid-trajectory between 2020 and 2022 (x=115, y=102.5)   */}
            <motion.g
              style={{ opacity: arrow1Opacity }}
              transform="translate(115, 102.5) rotate(-20.55)"
            >
              <path
                d="M -5 -3.5 L 2 0 L -5 3.5"
                fill="none"
                stroke="#FF5722"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_0_4px_#FF5722]"
              />
            </motion.g>

            {/* Arrowhead 2: mid-trajectory between 2022 and 2026 (x=235, y=57.5)    */}
            <motion.g
              style={{ opacity: arrow2Opacity }}
              transform="translate(235, 57.5) rotate(-20.55)"
            >
              <path
                d="M -5 -3.5 L 2 0 L -5 3.5"
                fill="none"
                stroke="#FF5722"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_0_4px_#FF5722]"
              />
            </motion.g>

            {/* Final Technical Arrowhead: directly approaching 2026 destination (x=272, y=43.6) */}
            <motion.g
              style={{ opacity: arrow2Opacity }}
              transform="translate(272, 43.6) rotate(-20.55)"
            >
              <path
                d="M -6 -4 L 2.5 0 L -6 4"
                fill="none"
                stroke="#FF5722"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_0_6px_#FF5722]"
              />
            </motion.g>

            {/* Trajectory Base Nodes */}
            <circle cx="55" cy="125" r="3.5" fill="#FF5722" className="filter drop-shadow-[0_0_6px_#FF5722]" />
            <circle cx="175" cy="80" r="4" fill="#FF5722" className="filter drop-shadow-[0_0_6px_#FF5722]" />
            <circle cx="295" cy="35" r="4.5" fill="#FF5722" className="filter drop-shadow-[0_0_8px_#FF5722]" />
          </motion.svg>

          {/* ===================================================================== */}
          {/* MILESTONE 1: 2020 EXPLORE (Lower-Left: x=55, y=125 => 15.3%, 58.1%)   */}
          {/* ===================================================================== */}
          <div
            className="absolute left-[15.3%] top-[58.1%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            onMouseEnter={() => setHoveredStage(2020)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <motion.div
              style={{ opacity: node2020Opacity, scale: node2020Scale }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative flex flex-col items-center"
            >
              {/* Node Icon Box - Centered at anchor */}
              <div
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl border border-[#FF5722]/60 bg-background/95 dark:bg-[#0c1017] flex items-center justify-center transition-all duration-300 shadow-md ${
                  hoveredStage === 2020
                    ? "border-[#FF5722] shadow-[0_0_16px_rgba(255,87,34,0.65)] bg-[#FF5722]/15"
                    : "shadow-[0_0_10px_rgba(255,87,34,0.3)] hover:border-[#FF5722]"
                }`}
              >
                <BookOpen className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-[#FF5722]" />
              </div>

              {/* Milestone Details Below */}
              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-center font-mono whitespace-nowrap pointer-events-none">
                <div className="text-xs font-bold text-foreground dark:text-white tracking-tight">2020</div>
                <div
                  className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                    hoveredStage === 2020 ? "text-[#FF5722] drop-shadow-[0_0_6px_rgba(255,87,34,0.7)]" : "text-[#FF5722]"
                  }`}
                >
                  EXPLORE
                </div>
                <div className="text-[8.5px] font-grotesk text-muted-foreground/75 dark:text-slate-400 mt-0.5">
                  Discover Interests
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===================================================================== */}
          {/* MILESTONE 2: 2022 LEARN (Center: x=175, y=80 => 48.6%, 37.2%)         */}
          {/* ===================================================================== */}
          <div
            className="absolute left-[48.6%] top-[37.2%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            onMouseEnter={() => setHoveredStage(2022)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <motion.div
              style={{ opacity: node2022Opacity, scale: node2022Scale }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative flex flex-col items-center"
            >
              {/* Node Icon Box - Centered at anchor */}
              <div
                className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl border border-[#FF5722]/70 bg-background/95 dark:bg-[#0c1017] flex items-center justify-center transition-all duration-300 shadow-md ${
                  hoveredStage === 2022
                    ? "border-[#FF5722] shadow-[0_0_18px_rgba(255,87,34,0.7)] bg-[#FF5722]/15"
                    : "shadow-[0_0_12px_rgba(255,87,34,0.35)] hover:border-[#FF5722]"
                }`}
              >
                <GraduationCap className="w-5 h-5 text-[#FF5722]" />
              </div>

              {/* Milestone Details Below */}
              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-center font-mono whitespace-nowrap pointer-events-none">
                <div className="text-xs font-bold text-foreground dark:text-white tracking-tight">2022</div>
                <div
                  className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                    hoveredStage === 2022 ? "text-[#FF5722] drop-shadow-[0_0_6px_rgba(255,87,34,0.7)]" : "text-[#FF5722]"
                  }`}
                >
                  LEARN
                </div>
                <div className="text-[8.5px] font-grotesk text-muted-foreground/75 dark:text-slate-400 mt-0.5">
                  Build Knowledge
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===================================================================== */}
          {/* MILESTONE 3: 2026 CREATE IMPACT (Upper-Right: x=295, y=35 => 81.9%, 16.3%) */}
          {/* Highest glow, destination indicator, flag upward micro-interaction     */}
          {/* ===================================================================== */}
          <div
            className="absolute left-[81.9%] top-[16.3%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            onMouseEnter={() => setHoveredStage(2026)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <motion.div
              style={{ opacity: node2026Opacity, scale: node2026Scale }}
              whileHover={{ scale: 1.08, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative flex flex-col items-center"
            >
              {/* Flag Destination Node - Centered at anchor */}
              <motion.div
                style={{
                  boxShadow: hoveredStage === 2026
                    ? "0 0 25px rgba(255, 87, 34, 0.85), inset 0 0 12px rgba(255, 87, 34, 0.35)"
                    : "0 0 16px rgba(255, 87, 34, 0.5)",
                }}
                className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl border-2 border-[#FF5722] bg-background/95 dark:bg-[#0c1017] flex items-center justify-center relative overflow-hidden transition-all duration-300"
              >
                {/* Ambient Internal Glow */}
                <motion.div
                  style={{ opacity: node2026Pulse }}
                  className="absolute inset-0 bg-[#FF5722]/20 pointer-events-none"
                />
                <Flag className="w-5 h-5 lg:w-5.5 lg:h-5.5 text-[#FF5722] filter drop-shadow-[0_0_6px_#FF5722]" />
              </motion.div>

              {/* Milestone Details Below Flag: Line-by-line reveal */}
              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-center font-mono whitespace-nowrap pointer-events-none">
                <div className="text-xs lg:text-[13px] font-extrabold text-foreground dark:text-white tracking-tight">2026</div>
                <div
                  className={`text-[10px] lg:text-[11px] font-extrabold tracking-wider uppercase transition-colors duration-200 ${
                    hoveredStage === 2026
                      ? "text-[#FF5722] drop-shadow-[0_0_8px_rgba(255,87,34,0.85)]"
                      : "text-[#FF5722]"
                  }`}
                >
                  <motion.span style={{ opacity: impactLine1Opacity }} className="inline-block">CREATE</motion.span>{" "}
                  <motion.span style={{ opacity: impactLine2Opacity }} className="inline-block">IMPACT</motion.span>
                </div>
                <motion.div
                  style={{ opacity: impactSubOpacity }}
                  className="text-[8.5px] font-grotesk text-muted-foreground/75 dark:text-slate-400 mt-0.5"
                >
                  Build Real Solutions
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom-Right Editorial Typography */}
        <div className="text-right font-mono text-[9px] lg:text-[10px] tracking-widest text-muted-foreground/70 dark:text-slate-400 font-bold uppercase leading-tight pt-1">
          <div className="text-muted-foreground/40 dark:text-slate-500">SAME LEARNING</div>
          <div className="text-[#FF5722] font-extrabold">BOUNDLESS</div>
          <div>POSSIBILITIES</div>
        </div>
      </div>
    </div>
  );
};

export default EducationProgressionRoadmap;
