import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Calendar,
  ArrowRight,
  Zap,
  Layers,
  Code2,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollHighlightSpan from "./motion/ScrollHighlightSpan";
import EducationProgressionRoadmap from "./EducationProgressionRoadmap";

const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Saveetha School of Engineering (SIMATS)",
    duration: "2022 — 2026",
    location: "Chennai, Tamil Nadu",
    grade: "CGPA: 8.646 / 10",
  },
  {
    degree: "Intermediate (MPC + Computer Science)",
    school: "Loyola Public School",
    duration: "2020 — 2022",
    location: "Guntur, Andhra Pradesh",
    grade: "Percentage: 81.6%",
  }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "center 50%"],
  });

  const timelineLineProgress = useTransform(
    timelineProgress,
    [0, 0.45],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  const subtleY = useTransform(sectionProgress, [0, 1], prefersReducedMotion ? [0, 0] : [10, -10]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-14 lg:scroll-mt-16 pt-0 pb-3 sm:pb-5 lg:pb-6 flex flex-col justify-center min-h-[calc(100vh-76px)] overflow-hidden"
    >
      {/* Visual Transition Glow from Hero into About */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/0 via-background/40 to-background pointer-events-none -z-10" />

      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-[-100px] w-80 h-80 bg-[#FF4500]/5 dark:bg-[#FF4500]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[-100px] w-80 h-80 bg-orange-600/5 dark:bg-orange-600/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col justify-between h-full">

        {/* ========================================================================= */}
        {/* TOP SECTION HEADER: Centered Title & Subtitle                             */}
        {/* ========================================================================= */}
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-outfit tracking-tight text-foreground dark:text-white leading-none">
            About <span className="text-[#FF5722]">Me</span>
          </h2>
          <p className="text-xs sm:text-[13px] text-muted-foreground dark:text-slate-400 font-grotesk mt-1">
            From curiosity to real-world software.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN BALANCED DASHBOARD: WHO I AM (Left) & EDUCATION JOURNEY (Right)   */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: subtleY }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-4 items-stretch relative"
        >

          {/* ========================================================================= */}
          {/* LEFT COLUMN: WHO I AM + CURRENT FOCUS + CTA                               */}
          {/* ========================================================================= */}
          <div className="rounded-2xl bg-card/90 dark:bg-[#0c1017]/95 border border-border/80 dark:border-[#22283a]/80 hover:border-[#FF5722]/40 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-md dark:shadow-xl dark:shadow-black/30 group relative">
            <div className="space-y-3 sm:space-y-3.5">
              {/* Header Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4500] shadow-[0_0_8px_#FF4500] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest text-foreground/90 dark:text-slate-200 uppercase font-mono">
                    WHO I AM
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground dark:text-slate-400 tracking-wider">
                  // DEVELOPER AT HEART
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-2xl lg:text-[25px] font-bold font-outfit text-foreground dark:text-white tracking-tight leading-snug">
                Passionate about{" "}
                <span className="bg-gradient-to-r from-[#FF5722] via-[#FF6B4A] to-[#f43f5e] bg-clip-text text-transparent">
                  Software Development
                </span>
              </h3>

              {/* Bio Paragraphs with scroll-driven word-by-word highlight */}
              <div className="space-y-2.5 text-xs sm:text-[13px] text-foreground/80 dark:text-slate-300 font-grotesk leading-relaxed">
                <p>
                  Final-year Computer Science and Engineering student at{" "}
                  <ScrollHighlightSpan startIndex={0}>
                    Saveetha School of Engineering (SIMATS)
                  </ScrollHighlightSpan>
                  , Chennai, with a{" "}
                  <ScrollHighlightSpan startIndex={5}>
                    CGPA of 8.646
                  </ScrollHighlightSpan>
                  . I enjoy building practical software that solves real problems and can be used beyond the classroom.
                </p>
                <p>
                  I have independently built{" "}
                  <ScrollHighlightSpan startIndex={8}>
                    SaveethaHub
                  </ScrollHighlightSpan>
                  , an academic platform using React, Supabase, Firebase, and AI features, and{" "}
                  <ScrollHighlightSpan startIndex={9}>
                    UniVault
                  </ScrollHighlightSpan>
                  , an Android exam-preparation app published on the Google Play Store. I also hold the{" "}
                  <ScrollHighlightSpan startIndex={10}>
                    Oracle Certified Professional: Java SE 17 Developer
                  </ScrollHighlightSpan>{" "}
                  certification and am strengthening my skills in data structures, algorithms, and full-stack development.
                </p>
              </div>

              {/* Sub-card: CURRENT FOCUS */}
              <div className="rounded-xl bg-secondary/50 dark:bg-[#080c13]/90 border border-border/70 dark:border-white/5 p-2.5 sm:p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-foreground/90 dark:text-slate-200 uppercase font-mono">
                      CURRENT FOCUS
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground dark:text-slate-400">
                    // ALWAYS LEARNING
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-background dark:bg-[#111622] border border-border/70 dark:border-white/5 text-[10px] sm:text-[11px] font-medium text-foreground/90 dark:text-slate-300 shadow-2xs">
                    <Layers className="w-3 h-3 text-orange-500 shrink-0" />
                    <span className="truncate">Data Structures</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-background dark:bg-[#111622] border border-border/70 dark:border-white/5 text-[10px] sm:text-[11px] font-medium text-foreground/90 dark:text-slate-300 shadow-2xs">
                    <Code2 className="w-3 h-3 text-pink-500 shrink-0" />
                    <span className="truncate">Algorithms</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-background dark:bg-[#111622] border border-border/70 dark:border-white/5 text-[10px] sm:text-[11px] font-medium text-foreground/90 dark:text-slate-300 shadow-2xs">
                    <BarChart3 className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="truncate">Full-Stack Dev</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: CTA Button + Handwritten Quote */}
            <div className="pt-4 sm:pt-5 flex items-center justify-between">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#FF5722] bg-background dark:bg-[#0c1017] text-[#FF5722] hover:bg-[#FF5722]/10 hover:shadow-[0_0_15px_rgba(255,87,34,0.25)] transition-all duration-300 text-xs font-semibold font-grotesk group"
              >
                <span>Read Full Biography & Stats</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Handwritten note */}
              <div className="text-[11px] sm:text-xs text-muted-foreground/80 dark:text-slate-400/80 italic font-serif -rotate-3 text-right hidden sm:block leading-tight select-none">
                Good Software<br />Creates Opportunities.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: EDUCATION JOURNEY (CONTENT FIRST ~65%, DECORATIVE VISUAL ~35%) */}
          {/* ========================================================================= */}
          <div
            ref={timelineRef}
            className="rounded-2xl bg-card/90 dark:bg-[#0c1017]/95 border border-border/80 dark:border-[#22283a]/80 hover:border-[#FF5722]/40 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 shadow-md dark:shadow-xl dark:shadow-black/30 flex flex-col justify-between relative overflow-hidden group min-h-[320px]"
          >
            {/* Ambient Background Radial Glow behind Decorative Visual */}
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF4500]/8 dark:bg-[#FF4500]/12 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-white/5 relative z-10">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-[#FF5722]" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-foreground/90 dark:text-slate-200 uppercase font-mono">
                  EDUCATION JOURNEY
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#FF5722] font-semibold">
                2020 — 2026
              </span>
            </div>

            {/* Main Area: Left (~55% Timeline) & Right (~45% Ascending Milestone Roadmap) */}
            <div className="grid grid-cols-1 md:grid-cols-[1.12fr_1fr] gap-4 sm:gap-6 py-3.5 relative z-10 items-center h-full">

              {/* ===================================================================== */}
              {/* LEFT SIDE: SPACIOUS EDUCATION TIMELINE                                 */}
              {/* ===================================================================== */}
              <div className="relative pl-7 sm:pl-8 space-y-6 sm:space-y-7 min-w-0">
                {/* Continuous Vertical Glowing Line (Draws from top to bottom on scroll) */}
                <motion.div
                  style={{ scaleY: timelineLineProgress, originY: 0 }}
                  className="absolute left-[11px] sm:left-[13px] top-3 bottom-4 w-[2px] bg-gradient-to-b from-[#FF5722] via-[#FF6B4A] to-[#FF5722]/30"
                />

                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.15 }}
                    className="relative"
                  >
                    {/* Glowing Double Concentric Node Ring */}
                    <div className="absolute -left-7 sm:-left-8 top-1.5 w-6 h-6 rounded-full border-2 border-[#FF5722] bg-card dark:bg-[#0c1017] flex items-center justify-center shadow-[0_0_10px_rgba(255,87,34,0.45)] z-10">
                      <div className={`w-2 h-2 rounded-full bg-[#FF5722] ${idx === 0 ? "animate-pulse" : ""}`} />
                    </div>

                    {/* Timeline Item Content: Clean, Full Titles */}
                    <div className="space-y-1.5 min-w-0">
                      {/* Duration Pill Tag */}
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#FF5722]/40 bg-[#FF5722]/10 text-[11px] font-mono text-[#FF5722] font-semibold">
                          <Calendar className="w-3 h-3" />
                          <span>{edu.duration}</span>
                        </span>
                      </div>

                      {/* Full Degree Title */}
                      <h4 className="text-sm sm:text-base font-bold text-foreground dark:text-white font-outfit leading-snug tracking-tight">
                        {edu.degree}
                      </h4>

                      {/* Institution Name */}
                      <p className="text-xs sm:text-[13px] text-foreground/80 dark:text-slate-300 font-grotesk leading-normal">
                        {edu.school}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground dark:text-slate-400 font-grotesk pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                        <span>{edu.location}</span>
                      </div>

                      {/* Grade Pill Badge */}
                      <div className="pt-1">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#FF5722]/60 bg-[#FF5722]/10 text-[#FF5722] dark:text-[#FF7849] text-xs font-mono font-bold">
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ===================================================================== */}
              {/* RIGHT SIDE: ASCENDING EDUCATION PROGRESSION ROADMAP (~45% WIDTH)      */}
              {/* ===================================================================== */}
              <div className="hidden md:flex w-full h-full flex-col justify-center">
                <EducationProgressionRoadmap progress={timelineProgress} />
              </div>

            </div>

          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* BOTTOM METRIC TICKER (Full width across columns)                          */}
        {/* ========================================================================= */}
        <div className="mt-3 sm:mt-4 pt-2.5 border-t border-border/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Currently Exploring Tags (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground dark:text-slate-400 tracking-wider">
              // CURRENTLY EXPLORING
            </span>
            <div className="flex items-center gap-2.5 text-[11px] text-foreground/80 dark:text-slate-300 font-grotesk">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                Better Solutions
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Real-World Impact
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Lifelong Learning
              </span>
            </div>
          </div>

          {/* Stats Cluster */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-5 font-mono">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-[#FF5722]">10+</span>
              <span className="text-[10px] text-muted-foreground dark:text-slate-400">Projects</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-foreground dark:text-white">5,009+</span>
              <span className="text-[10px] text-muted-foreground dark:text-slate-400">Code Commits</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-[#FF5722]">8.646</span>
              <span className="text-[10px] text-muted-foreground dark:text-slate-400">CGPA</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-[9px] text-muted-foreground dark:text-slate-400 tracking-widest uppercase">
              <span className="text-[#FF5722]/60 font-bold">//</span>
              <span>MAKING IDEAS REAL</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
