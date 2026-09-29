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
        {/* TOP SECTION HEADER: Editorial Title & Subtitle                            */}
        {/* ========================================================================= */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 dark:border-white/10 bg-secondary/40 dark:bg-white/[0.03] text-[11px] font-mono tracking-wider text-muted-foreground uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
            Background & Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-outfit tracking-tight text-foreground dark:text-white leading-tight">
            Engineering software with <span className="bg-gradient-to-r from-[#FF5722] via-[#FF6B4A] to-[#f43f5e] bg-clip-text text-transparent">purpose & craft</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 font-grotesk mt-1.5 max-w-xl mx-auto">
            From algorithmic foundations to real-world products serving thousands of active users.
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-stretch relative"
        >

          {/* ========================================================================= */}
          {/* LEFT COLUMN: PROFILE NARRATIVE + CORE CAPABILITIES + CTA                  */}
          {/* ========================================================================= */}
          <div className="rounded-2xl bg-card/80 dark:bg-[#0c1017]/90 border border-border/80 dark:border-white/10 hover:border-[#FF5722]/30 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm dark:shadow-xl dark:shadow-black/20 group relative">
            <div className="space-y-4">
              {/* Header Pill */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-foreground dark:text-slate-200 uppercase font-mono">
                    Profile
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground dark:text-slate-400 tracking-wide">
                  Chennai, India • Class of 2026
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-2xl font-bold font-outfit text-foreground dark:text-white tracking-tight leading-snug">
                Turning complex problems into{" "}
                <span className="text-[#FF5722]">resilient, scalable software</span>
              </h3>

              {/* Bio Paragraphs with scroll-driven word-by-word highlight */}
              <div className="space-y-3 text-xs sm:text-[13px] text-foreground/80 dark:text-slate-300 font-grotesk leading-relaxed">
                <p>
                  Final-year Computer Science and Engineering student at{" "}
                  <ScrollHighlightSpan startIndex={0}>
                    Saveetha School of Engineering (SIMATS)
                  </ScrollHighlightSpan>
                  , Chennai, maintaining an academic record of{" "}
                  <ScrollHighlightSpan startIndex={5}>
                    8.646 CGPA
                  </ScrollHighlightSpan>
                  . My approach pairs solid theoretical foundations with pragmatic software craftsmanship.
                </p>
                <p>
                  I architected and launched{" "}
                  <ScrollHighlightSpan startIndex={8}>
                    SaveethaHub
                  </ScrollHighlightSpan>
                  , an academic portal empowering 3,800+ active university users, and{" "}
                  <ScrollHighlightSpan startIndex={9}>
                    UniVault
                  </ScrollHighlightSpan>
                  , an Android preparation platform published on Google Play. As an{" "}
                  <ScrollHighlightSpan startIndex={10}>
                    Oracle Certified Professional: Java SE 17 Developer
                  </ScrollHighlightSpan>
                  , I continuously deepen my focus on system design, distributed backends, and algorithmic performance.
                </p>
              </div>

              {/* Core Focus strip */}
              <div className="rounded-xl bg-secondary/30 dark:bg-white/[0.02] border border-border/60 dark:border-white/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-medium text-muted-foreground dark:text-slate-400 uppercase tracking-wider">
                    Core Focus Areas
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-background/80 dark:bg-[#111622]/80 border border-border/60 dark:border-white/5 text-[11px] font-medium text-foreground/90 dark:text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                    <span className="truncate">Data Structures</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-background/80 dark:bg-[#111622]/80 border border-border/60 dark:border-white/5 text-[11px] font-medium text-foreground/90 dark:text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-[#FF6B4A] shrink-0" />
                    <span className="truncate">Algorithms</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-background/80 dark:bg-[#111622]/80 border border-border/60 dark:border-white/5 text-[11px] font-medium text-foreground/90 dark:text-slate-300">
                    <BarChart3 className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                    <span className="truncate">Full-Stack Systems</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: CTA Button + Quiet Engineering Note */}
            <div className="pt-4 mt-2 sm:pt-5 border-t border-border/60 dark:border-white/5 flex items-center justify-between">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2 rounded-lg border border-border dark:border-white/15 bg-background dark:bg-white/[0.04] text-foreground dark:text-white hover:border-[#FF5722]/50 hover:bg-[#FF5722]/5 transition-all duration-200 text-xs font-medium font-grotesk group"
              >
                <span>Full Biography & Metrics</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF5722] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <div className="text-[11px] text-muted-foreground dark:text-slate-400 font-mono tracking-tight text-right hidden sm:block">
                Driven by curiosity, validated by code.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: EDUCATION JOURNEY                                           */}
          {/* ========================================================================= */}
          <div
            ref={timelineRef}
            className="rounded-2xl bg-card/80 dark:bg-[#0c1017]/90 border border-border/80 dark:border-white/10 hover:border-[#FF5722]/30 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 shadow-sm dark:shadow-xl dark:shadow-black/20 flex flex-col justify-between relative overflow-hidden group min-h-[320px]"
          >
            {/* Ambient Warm Gradient */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#FF5722]" />
                <span className="text-xs font-semibold tracking-wider text-foreground dark:text-slate-200 uppercase font-mono">
                  Academic Timeline
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground dark:text-slate-400 font-medium">
                2020 — 2026
              </span>
            </div>

            {/* Main Area: Left (~55% Timeline) & Right (~45% Ascending Milestone Roadmap) */}
            <div className="grid grid-cols-1 md:grid-cols-[1.12fr_1fr] gap-4 sm:gap-6 py-4 relative z-10 items-center h-full">

              {/* LEFT SIDE: EDUCATION TIMELINE */}
              <div className="relative pl-6 sm:pl-7 space-y-6 min-w-0">
                {/* Continuous Vertical Accent Line */}
                <motion.div
                  style={{ scaleY: timelineLineProgress, originY: 0 }}
                  className="absolute left-[9px] sm:left-[11px] top-2 bottom-3 w-[1.5px] bg-gradient-to-b from-[#FF5722] via-[#FF6B4A] to-border dark:to-white/10"
                />

                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.15 }}
                    className="relative"
                  >
                    {/* Minimal Node Ring */}
                    <div className="absolute -left-6 sm:-left-7 top-1 w-5 h-5 rounded-full border border-border dark:border-white/20 bg-background dark:bg-[#0c1017] flex items-center justify-center z-10">
                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? "bg-[#FF5722]" : "bg-muted-foreground/60"}`} />
                    </div>

                    {/* Timeline Item Content */}
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-border/70 dark:border-white/10 bg-secondary/50 dark:bg-white/[0.03] text-[11px] font-mono text-muted-foreground">
                          <Calendar className="w-3 h-3 text-[#FF5722]" />
                          <span>{edu.duration}</span>
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h4 className="text-sm sm:text-base font-semibold text-foreground dark:text-white font-outfit leading-snug tracking-tight">
                        {edu.degree}
                      </h4>

                      {/* Institution Name */}
                      <p className="text-xs text-muted-foreground dark:text-slate-300 font-grotesk leading-normal">
                        {edu.school}
                      </p>

                      {/* Location & Grade */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-grotesk">
                          <MapPin className="w-3 h-3 text-[#FF5722] shrink-0" />
                          <span>{edu.location}</span>
                        </div>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded border border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722] text-[11px] font-mono font-medium">
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* RIGHT SIDE: ASCENDING EDUCATION PROGRESSION ROADMAP */}
              <div className="hidden md:flex w-full h-full flex-col justify-center">
                <EducationProgressionRoadmap progress={timelineProgress} />
              </div>

            </div>

          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* BOTTOM METRIC TICKER (Clean telemetry footer)                             */}
        {/* ========================================================================= */}
        <div className="mt-4 pt-3 border-t border-border/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Open for Software Engineering Roles & Summer 2026 Opportunities</span>
          </div>

          {/* Stats Cluster */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-5 font-mono">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-foreground dark:text-white">10+</span>
              <span className="text-[11px] text-muted-foreground">Projects</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-foreground dark:text-white">5,000+</span>
              <span className="text-[11px] text-muted-foreground">Commits</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-[#FF5722]">8.646</span>
              <span className="text-[11px] text-muted-foreground">CGPA</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
