import React, { useState, useEffect, useRef } from "react";
import { motion, MotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ExternalLink, Github, Camera, Users, Database, Truck, Activity,
  FileText, BookOpen, Coins, FileDown,
  Star, TrendingUp, Brain, ChevronLeft, ChevronRight, Zap, CheckCircle2,
  ShieldAlert, Gauge, Cpu, Navigation, Sparkles, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { ProgressiveImage } from "./ProgressiveImage";

interface ProjectScrollyStageProps {
  scrollYProgress: MotionValue<number>;
  saveethaStars: number | null;
}

// Micro-Animation Helper: Pulsing Live Indicator
const PulsingDot: React.FC<{ colorClass?: string }> = ({ colorClass = "bg-emerald-400" }) => (
  <span className="relative flex h-2 w-2 shrink-0">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`} />
    <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClass}`} />
  </span>
);

// Micro-Animation Helper: Interactive Metric Card with Hover Elevation
const AnimatedMetricCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    whileHover={{ y: -3, scale: 1.02 }}
    className={`transition-all duration-300 hover:shadow-lg cursor-default select-none ${className}`}
  >
    {children}
  </motion.div>
);

// Micro-Animation Helper: Interactive Tech Tag with Spring Scale
const TechTag: React.FC<{ tag: string }> = ({ tag }) => (
  <motion.span
    whileHover={{ y: -2, scale: 1.06 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="px-2.5 py-1 rounded-md bg-secondary/60 border border-border/60 text-xs font-mono text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors inline-block cursor-default select-none"
  >
    {tag}
  </motion.span>
);

// Micro-Animation Helper: Animated Accuracy Bar with Smooth Width Expansion
const AnimatedProgressBar: React.FC<{
  widthPercent: number;
  colorClass: string;
  delay?: number;
}> = ({ widthPercent, colorClass, delay = 0.2 }) => (
  <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${widthPercent}%` }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full rounded-full ${colorClass}`}
    />
  </div>
);

// Micro-Animation Helper: Sparkline SVG with Draw-In Motion
const Sparkline = ({ colorClass, path, delay = 0.2 }: { colorClass: string; path: string; delay?: number }) => (
  <svg className={`w-full h-7 mt-1 opacity-70 ${colorClass}`} viewBox="0 0 100 30" fill="none">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.8 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      d={path}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const bgGlowColors = [
  "rgba(249, 115, 22, 0.10)", // Object Detection (Orange)
  "rgba(249, 115, 22, 0.14)", // Saveetha Hub (Orange)
  "rgba(37, 99, 235, 0.14)",  // UniVault (Blue)
  "rgba(99, 102, 241, 0.14)", // Ethereum Fraud (Indigo)
  "rgba(14, 165, 233, 0.14)", // Skylink (Sky)
  "rgba(168, 85, 247, 0.24)", // DevPulse (Purple)
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 36 : -36,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -36 : 36,
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ProjectScrollyStage: React.FC<ProjectScrollyStageProps> = ({
  scrollYProgress,
  saveethaStars,
}) => {
  // Current project index (0 to 5) determined cleanly by scroll threshold
  const activeIndex = useTransform(scrollYProgress, (latest) => {
    if (latest < 0.16) return 0;
    if (latest < 0.33) return 1;
    if (latest < 0.50) return 2;
    if (latest < 0.67) return 3;
    if (latest < 0.84) return 4;
    return 5;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    return activeIndex.on("change", (latest) => {
      if (latest !== prevIndexRef.current) {
        setDirection(latest > prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = latest;
        setCurrentIndex(latest);
      }
    });
  }, [activeIndex]);

  const handleJumpToProject = (idx: number) => {
    const centers = [0.08, 0.25, 0.42, 0.58, 0.75, 0.92];
    const targetProgress = centers[idx];
    const stageEl = document.getElementById("projects-stage-container");
    if (stageEl) {
      const rect = stageEl.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const totalDist = stageEl.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: scrollTop + targetProgress * totalDist,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden z-20 px-4 sm:px-6 lg:px-8">

      {/* Dynamic Background Atmosphere that changes per project */}
      <div
        style={{ backgroundColor: bgGlowColors[currentIndex] }}
        className="absolute w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
      />

      <div className="max-w-6xl xl:max-w-7xl w-full flex flex-col justify-between h-[88vh] max-h-[840px] relative z-10 select-none">

        {/* ========================================================================= */}
        {/* STAGE HEADER: Milestone Tracker & Scrolly Runner (01 / 06)                */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              0{currentIndex + 1} / 06
            </span>
            <span className="text-xs text-muted-foreground uppercase font-mono tracking-widest hidden sm:inline-block">
              Scroll-Driven Project Stage
            </span>
          </div>

          {/* Quick Prev / Next Controls & Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                disabled={currentIndex === 0}
                onClick={() => handleJumpToProject(Math.max(0, currentIndex - 1))}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentIndex === 5}
                onClick={() => handleJumpToProject(Math.min(5, currentIndex + 1))}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolly Progress Runner Bar */}
            <div className="w-40 sm:w-56 h-1.5 bg-secondary/80 rounded-full overflow-hidden relative">
              <motion.div
                style={{ scaleX: scrollYProgress, originX: 0 }}
                className="h-full bg-gradient-to-r from-primary via-orange-500 to-accent rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE MAIN STAGE: Rich High-Impact Content with Micro-Animations            */}
        {/* ========================================================================= */}
        <div className="relative flex-1 w-full my-3 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 01: Object Detection in Python                                */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 0 && (
              <motion.div
                key="project-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-bold"
                  >
                    <Camera className="w-3.5 h-3.5 animate-pulse" />
                    <span>Computer Vision • YOLOv8</span>
                  </motion.div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    Object Detection in Python
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    Real-time object detection and classification system built with Python and OpenCV. Utilizes machine learning models for accurate identification and classification of objects in live video streams with low inference latency.
                  </p>

                  {/* Engineering Highlights row with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/80 border border-border/80 text-center hover:border-primary/40">
                      <span className="text-base font-extrabold text-primary font-outfit block">45+ FPS</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Real-Time Speed</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/80 border border-border/80 text-center hover:border-foreground/30">
                      <span className="text-base font-extrabold text-foreground font-outfit block">80 Classes</span>
                      <span className="text-[10px] text-muted-foreground font-mono">COCO Dataset</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/80 border border-border/80 text-center hover:border-emerald-500/40">
                      <span className="text-base font-extrabold text-emerald-400 font-outfit block">YOLOv8n</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Ultralytics Engine</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution with hover lift */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-primary/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Manual identification is slow and error-prone in video surveillance and real-time sorting.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-primary/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        High-frame-rate YOLOv8 pipeline for simultaneous multi-object recognition and bounding boxes.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Multi-target simultaneous tracking with bounding boxes & confidence scoring</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Dynamic video stream inputs (Webcam, CCTV, and high-res MP4 files)</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Python", "OpenCV", "YOLOv8", "cvzone", "ultralytics", "NumPy"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("click", "github_project", "Object Detection in Python")}>
                        <a href="https://github.com/ComradeMohan/CSA0810PythonProgramming/tree/main/Various%20Object%20Identification" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" /> View GitHub Repository
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild variant="outline" className="border-border hover:bg-secondary/60 hover:text-foreground h-9 px-4 text-xs font-semibold" onClick={() => trackEvent("download", "model", "yolov8n.pt")}>
                        <a href="https://github.com/ComradeMohan/CSA0810PythonProgramming/blob/main/Various%20Object%20Identification/yolov8n.pt" target="_blank" rel="noopener noreferrer">
                          📦 Download Model
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="w-full rounded-2xl overflow-hidden border border-border/80 bg-card/80 shadow-2xl p-2.5 relative group"
                  >
                    <ProgressiveImage
                      src="/object_detection_comparison.webp"
                      alt="Object Detection Comparison"
                      className="w-full h-[240px] xl:h-[270px] rounded-xl object-cover"
                    />

                    {/* Subtle detection scanline micro-effect */}
                    <div className="absolute inset-x-2.5 top-2.5 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-[scanline_3s_ease-in-out_infinite] pointer-events-none" />

                    <div className="flex justify-between items-center px-2 pt-2 text-[10px] font-mono text-muted-foreground">
                      <span className="text-orange-400 font-bold flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-orange-400" /> Input Image
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-emerald-400" /> YOLOv8 Bounding Boxes
                      </span>
                    </div>
                  </motion.div>

                  {/* Live Telemetry Panel with Hover Lift */}
                  <div className="p-3.5 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <AnimatedMetricCard delay={0.1} className="p-2 rounded-lg bg-secondary/50">
                      <span className="text-muted-foreground text-[10px] block">Inference Time</span>
                      <span className="text-primary font-bold">18.4ms</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2 rounded-lg bg-secondary/50">
                      <span className="text-muted-foreground text-[10px] block">Mean Avg Precision</span>
                      <span className="text-emerald-400 font-bold">mAP@0.5: 78.2%</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.2} className="p-2 rounded-lg bg-secondary/50">
                      <span className="text-muted-foreground text-[10px] block">Input Resolution</span>
                      <span className="text-foreground font-bold">1080p @ 60Hz</span>
                    </AnimatedMetricCard>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 02: Saveetha Hub                                              */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 1 && (
              <motion.div
                key="project-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-bold">
                      <Users className="w-3.5 h-3.5" />
                      <span>Campus Web Platform • Live</span>
                    </span>
                    <motion.span whileHover={{ scale: 1.08 }} className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 cursor-default">
                      <Star className="w-3 h-3 fill-current animate-pulse" /> {saveethaStars !== null ? saveethaStars : "22"} Stars
                    </motion.span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    Saveetha Hub
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    A centralized digital ecosystem for Saveetha University engineering students to access semester study materials, collaborate on projects, calculate CGPA with predictive modeling, and stay connected with campus activities.
                  </p>

                  {/* Impact Highlights with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/80 border border-orange-500/20 text-center hover:border-orange-500/40">
                      <span className="text-base font-extrabold text-orange-400 font-outfit block">3,800+</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Active Users</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/80 border border-orange-500/20 text-center hover:border-foreground/30">
                      <span className="text-base font-extrabold text-foreground font-outfit block">24.7K</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Google Clicks</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/80 border border-orange-500/20 text-center hover:border-emerald-500/40">
                      <span className="text-base font-extrabold text-emerald-400 font-outfit block">99.8%</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Production Uptime</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-orange-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Students lacked a unified portal for verified notes, semester syllabus, and attendance tracking.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-orange-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Engineered all-in-one portal with Supabase real-time sync, AI features, and secure auth.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>500+ curated subject syllabus notes, lab codes, and semester question papers</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Automated CGPA calculator with target goal forecasting across 8 semesters</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["React", "Next.js", "Tailwind CSS", "Firebase", "Vite", "Supabase"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("click", "case_study", "Saveetha Hub")}>
                        <Link to="/case-study/saveethahub">
                          <BookOpen className="w-4 h-4 mr-2" /> Open Case Study
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild variant="outline" className="border-border hover:bg-secondary/60 h-9 px-4 text-xs font-semibold" onClick={() => trackEvent("click", "demo", "Saveetha Hub")}>
                        <a href="https://saveetha-hub.netlify.app/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-border hover:border-primary/50" onClick={() => trackEvent("click", "github_project", "Saveetha Hub")}>
                        <a href="https://github.com/ComradeMohan/saveetha-companion" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column: Live Google Analytics Metric Dashboard */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-5 rounded-2xl border border-orange-500/30 bg-card/80 backdrop-blur-md shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="text-xs font-bold font-outfit uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" /> Verified Google Analytics
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-emerald-400" /> Active Production
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <AnimatedMetricCard delay={0.05} className="p-3 rounded-xl bg-secondary/80 border border-border/40 hover:border-red-400/40">
                        <span className="text-lg lg:text-xl font-extrabold text-red-400 font-outfit block">24,706</span>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">Search Clicks</p>
                        <Sparkline delay={0.1} colorClass="text-red-400" path="M0,25 Q15,10 30,20 T60,12 T90,24 T100,8" />
                      </AnimatedMetricCard>
                      <AnimatedMetricCard delay={0.1} className="p-3 rounded-xl bg-secondary/80 border border-border/40 hover:border-emerald-400/40">
                        <span className="text-lg lg:text-xl font-extrabold text-emerald-400 font-outfit block">3.8K+</span>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">Active Users</p>
                        <Sparkline delay={0.15} colorClass="text-emerald-400" path="M0,28 Q20,25 40,15 T70,12 T90,6 T100,2" />
                      </AnimatedMetricCard>
                      <AnimatedMetricCard delay={0.15} className="p-3 rounded-xl bg-secondary/80 border border-border/40 hover:border-purple-400/40">
                        <span className="text-lg lg:text-xl font-extrabold text-purple-400 font-outfit block">1.7K+</span>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">New Users</p>
                        <Sparkline delay={0.2} colorClass="text-purple-400" path="M0,22 Q10,5 25,18 T50,5 T75,25 T100,15" />
                      </AnimatedMetricCard>
                      <AnimatedMetricCard delay={0.2} className="p-3 rounded-xl bg-secondary/80 border border-border/40 hover:border-blue-400/40">
                        <span className="text-lg lg:text-xl font-extrabold text-blue-400 font-outfit block">50s</span>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">Avg Engagement</p>
                        <Sparkline delay={0.25} colorClass="text-blue-400" path="M0,15 Q25,18 50,14 T75,16 T100,15" />
                      </AnimatedMetricCard>
                    </div>
                  </motion.div>

                  {/* Architecture & Reliability Pill */}
                  <div className="p-3 rounded-xl border border-border/60 bg-secondary/40 flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-foreground">⚡ Netlify Global Edge CDN + Supabase BaaS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <PulsingDot colorClass="bg-emerald-400" /> Zero Downtime Deploy
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 03: UniVault                                                  */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 2 && (
              <motion.div
                key="project-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-7 space-y-3.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-bold">
                      <Database className="w-3.5 h-3.5" />
                      <span>Android App • Google Play Store</span>
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    UniVault
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    A smart academic management platform designed for university students to track grades, calculate CGPA, manage courses, monitor attendance thresholds, and access study materials with offline caching.
                  </p>

                  {/* Stats highlights with Micro-Animations */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Students", val: "2.4K+" },
                      { label: "Materials", val: "10K+" },
                      { label: "Tests", val: "5K+" },
                      { label: "Prep Focus", val: "98%" },
                    ].map((s, idx) => (
                      <AnimatedMetricCard key={s.label} delay={idx * 0.05} className="p-2.5 rounded-xl bg-card/70 border border-border/70 text-center hover:border-blue-500/40">
                        <span className="text-sm font-extrabold text-primary font-outfit block">{s.val}</span>
                        <span className="text-[9px] text-muted-foreground font-mono">{s.label}</span>
                      </AnimatedMetricCard>
                    ))}
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-blue-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Students struggled to monitor real-time class attendance thresholds, risking debarment.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-blue-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Engineered automated 75% attendance alerts with predictive absence modeling.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Automated 75% attendance threshold tracker preventing exam debarment</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Encrypted local storage via Room DB + Firebase Cloud Firestore sync</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Next.js", "Firebase", "Kotlin (Android)", "PHP", "SQL", "Material 3"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("click", "case_study", "UniVault")}>
                        <Link to="/case-study/univault">
                          <BookOpen className="w-4 h-4 mr-2" /> Open Case Study
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild variant="outline" className="border-border hover:bg-secondary/60 h-9 px-4 text-xs font-semibold" onClick={() => trackEvent("click", "demo", "UniVault")}>
                        <a href="https://web.univault.live/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Website Demo
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-border hover:border-blue-500/50" onClick={() => trackEvent("click", "play_store", "UniVault")}>
                        <a href="https://play.google.com/store/apps/details?id=com.simats.univault" target="_blank" rel="noopener noreferrer" title="Google Play Store">
                          <img src="/icons/googleplay.svg" alt="Play Store" className="w-4 h-4 object-contain" />
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-border hover:border-blue-500/50" onClick={() => trackEvent("click", "github_project", "UniVault")}>
                        <a href="https://github.com/ComradeMohan/192210400pdd" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column: Floating Smartphone Mockup with Micro-Floating Bob */}
                <div className="col-span-12 lg:col-span-5 flex items-center justify-center gap-4">
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    className="w-[165px] xl:w-[185px] aspect-[474/1024] rounded-[2.2rem] border-[3px] border-slate-800 bg-slate-950 p-1 shadow-2xl relative shrink-0 cursor-pointer"
                  >
                    <ProgressiveImage
                      src="/univault_mobile.webp"
                      alt="UniVault Android App Mockup"
                      className="w-full h-full object-cover rounded-[1.9rem]"
                    />
                  </motion.div>

                  {/* Side Telemetry Cards with Micro-Elevation */}
                  <div className="flex flex-col gap-3">
                    <AnimatedMetricCard delay={0.1} className="p-3.5 rounded-xl border border-blue-500/30 bg-card/80 backdrop-blur-md shadow-lg space-y-1 text-left max-w-[200px] hover:border-blue-500/60">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-blue-400" /> Play Store Build
                      </span>
                      <p className="text-xs font-semibold text-foreground">Verified App Bundle</p>
                      <p className="text-[10px] text-muted-foreground font-mono">100% Crash-Free Rate</p>
                    </AnimatedMetricCard>

                    <AnimatedMetricCard delay={0.2} className="p-3.5 rounded-xl border border-emerald-500/30 bg-card/80 backdrop-blur-md shadow-lg space-y-1 text-left max-w-[200px] hover:border-emerald-500/60">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-emerald-400" /> Smart Engine
                      </span>
                      <p className="text-xs font-semibold text-foreground">Attendance Predictor</p>
                      <p className="text-[10px] text-muted-foreground font-mono">Safe Margin Forecasting</p>
                    </AnimatedMetricCard>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 04: Ethereum Fraud Detection Using XGBoost                    */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 3 && (
              <motion.div
                key="project-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold">
                    <Coins className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>Research Project • Blockchain Security</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    Ethereum Fraud Detection Using XGBoost
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    Machine learning-based Ethereum fraud detection system achieving 94% accuracy using XGBoost, outperforming multiple baseline classification algorithms on heavily imbalanced blockchain transactions.
                  </p>

                  {/* Research Metrics with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/70 border border-indigo-500/30 text-center hover:border-indigo-500/60">
                      <span className="text-base font-extrabold text-indigo-400 font-outfit block">94%</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Best Accuracy</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/70 border border-border/70 text-center hover:border-foreground/30">
                      <span className="text-base font-extrabold text-foreground font-outfit block">9,841 TXs</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Trained Dataset</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/70 border border-border/70 text-center hover:border-emerald-500/40">
                      <span className="text-base font-extrabold text-emerald-400 font-outfit block">p &lt; 0.001</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Statistically Sig.</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-indigo-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Severely imbalanced blockchain datasets hide illicit wallet behaviors.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-indigo-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Engineered 42 statistical transaction features + SMOTE balanced sampling.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Benchmarked against 4 ML models (Decision Tree, KNN, AdaBoost, Random Forest)</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Two-sample t-test verification (t = 5.892, p &lt; 0.001) confirming superiority</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Python", "Pandas", "Scikit-Learn", "XGBoost", "Google Colab", "SMOTE"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("download", "ppt", "Ethereum Fraud Detection")}>
                        <a href="/Ethereum%20Fraud%20Detection%20Using%20XGBoost.pptx" download target="_blank" rel="noopener noreferrer">
                          <FileDown className="w-4 h-4 mr-2" /> PPT Presentation
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild variant="outline" className="border-border hover:bg-secondary/60 hover:text-foreground h-9 px-4 text-xs font-semibold" onClick={() => trackEvent("click", "research_paper", "Ethereum Fraud Detection")}>
                        <a href="https://github.com/ComradeMohan" target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-2" /> Research Paper
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column: Algorithm Comparison Bars with Animated Fill */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-5 rounded-2xl border border-indigo-500/30 bg-card/80 backdrop-blur-md shadow-xl space-y-3.5"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                      <span className="text-xs font-bold font-outfit uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Brain className="w-4 h-4" /> Algorithm Accuracy Benchmark
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">Etherscan Dataset</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { name: "XGBoost (Proposed)", val: 94, color: "bg-indigo-500", highlight: true },
                        { name: "Decision Tree", val: 88.5, color: "bg-green-500" },
                        { name: "K Nearest Neighbor", val: 82, color: "bg-blue-600" },
                        { name: "AdaBoost", val: 77.1, color: "bg-yellow-500" },
                        { name: "Random Forest", val: 72.4, color: "bg-blue-500" },
                      ].map((item, idx) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold font-grotesk text-foreground/90">
                            <span className={item.highlight ? "text-indigo-400 font-bold flex items-center gap-1" : ""}>
                              {item.name} {item.highlight && "⭐"}
                            </span>
                            <span className="font-mono font-bold">{item.val}%</span>
                          </div>
                          <AnimatedProgressBar
                            widthPercent={item.val}
                            colorClass={item.color}
                            delay={0.1 + idx * 0.08}
                          />
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/40 leading-snug">
                      t-test statistical verification: t = 5.892, p &lt; 0.001 (significantly superior).
                    </p>
                  </motion.div>

                  {/* Research Model Evaluation Metrics */}
                  <div className="p-3 rounded-xl border border-indigo-500/20 bg-card/60 backdrop-blur-md grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <AnimatedMetricCard delay={0.1} className="p-1.5 rounded-lg bg-secondary/50 hover:border-indigo-400/40">
                      <span className="text-muted-foreground text-[10px] block">Precision</span>
                      <span className="text-indigo-400 font-bold">93.4%</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-1.5 rounded-lg bg-secondary/50 hover:border-emerald-400/40">
                      <span className="text-muted-foreground text-[10px] block">Recall</span>
                      <span className="text-emerald-400 font-bold">91.8%</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.2} className="p-1.5 rounded-lg bg-secondary/50 hover:border-amber-400/40">
                      <span className="text-muted-foreground text-[10px] block">F1-Score</span>
                      <span className="text-amber-400 font-bold">0.926</span>
                    </AnimatedMetricCard>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 05: Skylink Deliveries                                        */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 4 && (
              <motion.div
                key="project-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-mono font-bold">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Logistics & Route Optimization</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    Skylink Deliveries
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    A full-stack logistics and delivery dispatch system featuring real-time package telemetry, dynamic multi-stop route optimization using Mapbox GL, and automated customer tracking notifications.
                  </p>

                  {/* Operational Metrics with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/80 border border-sky-500/20 text-center hover:border-sky-500/50">
                      <span className="text-base font-extrabold text-sky-400 font-outfit block">-28%</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Route Latency</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/80 border border-sky-500/20 text-center hover:border-emerald-500/40">
                      <span className="text-base font-extrabold text-emerald-400 font-outfit block">+18%</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Fuel Efficiency</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/80 border border-sky-500/20 text-center hover:border-foreground/30">
                      <span className="text-base font-extrabold text-foreground font-outfit block">&lt; 150ms</span>
                      <span className="text-[10px] text-muted-foreground font-mono">GPS Ping Latency</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-sky-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Traditional fleet operations suffer high transit delays, manual dispatch, and opaque tracking.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-sky-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Engineered Mapbox GL engine with dynamic waypoint optimization and live WebSockets.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Dynamic re-routing algorithm mitigating traffic congestion and urban bottlenecks</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Digital proof-of-delivery confirmation with geofence proximity verification</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["React", "Mapbox API", "Node.js", "Express", "MongoDB", "WebSockets"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("click", "demo", "Skylink Deliveries")}>
                        <a href="https://skylinkdeliveries.netlify.app/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-border hover:border-sky-500/50" onClick={() => trackEvent("click", "github_project", "Skylink Deliveries")}>
                        <a href="https://github.com/ComradeMohan" target="_blank" rel="noopener noreferrer" title="GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column: Dispatch Telemetry Visual with Shimmer and Waypoint Indicator */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-5 rounded-2xl border border-sky-500/30 bg-card/80 backdrop-blur-md shadow-xl space-y-3.5"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                      <span className="text-xs font-bold font-outfit uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                        <Navigation className="w-4 h-4" /> Live Fleet Routing Telemetry
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-emerald-400" /> GPS Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <AnimatedMetricCard delay={0.05} className="p-3 rounded-xl bg-secondary/80 border border-border/40 hover:border-sky-400/40">
                        <span className="text-base font-extrabold text-sky-400 font-outfit block">Optimized</span>
                        <span className="text-[10px] text-muted-foreground font-mono">Dijkstra & TSP Routing</span>
                      </AnimatedMetricCard>
                      <AnimatedMetricCard delay={0.1} className="p-3 rounded-xl bg-secondary/80 border border-border/40 hover:border-emerald-400/40">
                        <span className="text-base font-extrabold text-emerald-400 font-outfit block">Real-Time</span>
                        <span className="text-[10px] text-muted-foreground font-mono">Continuous Driver Broadcast</span>
                      </AnimatedMetricCard>
                    </div>

                    {/* Active Route Simulator Visual with Animated Bar */}
                    <div className="p-3 rounded-xl border border-sky-500/20 bg-sky-950/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-sky-300 font-bold flex items-center gap-1.5">
                          <PulsingDot colorClass="bg-sky-400" /> Route Leg: Chennai Hub → Simats
                        </span>
                        <span className="text-emerald-400 font-semibold">Waypoint 4/6</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary/80 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl border border-border/60 bg-secondary/40 flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Transit Delay Mitigation Engine</span>
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Active Telemetry
                      </span>
                    </div>
                  </motion.div>

                  {/* Fleet Dispatch Statistics */}
                  <div className="p-3 rounded-xl border border-sky-500/20 bg-card/60 backdrop-blur-md grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <AnimatedMetricCard delay={0.1} className="p-1.5 rounded-lg bg-secondary/50 hover:border-sky-400/40">
                      <span className="text-muted-foreground text-[10px] block">Active Couriers</span>
                      <span className="text-sky-400 font-bold">24 Fleets</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-1.5 rounded-lg bg-secondary/50 hover:border-emerald-400/40">
                      <span className="text-muted-foreground text-[10px] block">Avg Delivery Time</span>
                      <span className="text-emerald-400 font-bold">22 Mins</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.2} className="p-1.5 rounded-lg bg-secondary/50 hover:border-foreground/30">
                      <span className="text-muted-foreground text-[10px] block">SLA Compliance</span>
                      <span className="text-foreground font-bold">99.4%</span>
                    </AnimatedMetricCard>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 06: DevPulse ⭐ (The Culmination / Featured Highlight)         */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 5 && (
              <motion.div
                key="project-5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 text-xs font-mono font-bold shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                  >
                    <Activity className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
                    <span>⭐ Culmination • GitHub Analytics SaaS</span>
                  </motion.div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    DevPulse <span className="text-amber-400">⭐</span>
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    A full-stack GitHub telemetry platform and dynamic widget generator transforming raw developer contributions into interactive real-time visual insights, commit streaks, PR tracking, and AI-powered tech stack evolution charts.
                  </p>

                  {/* Core Platform Capabilities with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/80 border border-purple-200 dark:border-purple-500/30 text-center hover:border-purple-400/50">
                      <span className="text-base font-extrabold text-purple-600 dark:text-purple-300 font-outfit block">GraphQL v4</span>
                      <span className="text-[10px] text-muted-foreground font-mono">GitHub API Engine</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/80 border border-purple-200 dark:border-purple-500/30 text-center hover:border-emerald-400/50">
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-outfit block">Edge CDN</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Global Cache &lt; 50ms</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/80 border border-purple-200 dark:border-purple-500/30 text-center hover:border-amber-400/50">
                      <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-outfit block">Custom SVG</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Real-Time Badges</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/80 border border-purple-200 dark:border-purple-500/30 backdrop-blur-xs transition-colors hover:border-purple-400/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Developers need an automated, visually striking way to showcase live metrics on portfolios without manual updates.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/80 border border-purple-200 dark:border-purple-500/30 backdrop-blur-xs transition-colors hover:border-purple-400/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Engineered on-the-fly SVG generation engine with GitHub GraphQL API integration and Edge CDN caching.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>Embeddable dynamic SVG telemetry widgets for GitHub READMEs and portfolios</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>Privacy-first zero-storage architecture querying public GitHub endpoints directly</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["React", "GitHub API", "Tailwind CSS", "Framer Motion", "GraphQL", "Edge Functions"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white h-9 px-4 text-xs font-semibold shadow-lg shadow-purple-600/30" onClick={() => trackEvent("click", "demo", "DevPulse")}>
                        <a href="https://devpulseweb.netlify.app/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Launch DevPulse
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-purple-300 dark:border-purple-500/40 text-purple-600 dark:text-purple-400 hover:border-purple-400" onClick={() => trackEvent("click", "github_project", "DevPulse")}>
                        <a href="https://github.com/ComradeMohan" target="_blank" rel="noopener noreferrer" title="GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column: Glowing DevPulse Analytics Terminal + Live Heatmap Matrix */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full rounded-2xl p-[2px] overflow-hidden group shadow-[0_10px_35px_rgba(168,85,247,0.12)] dark:shadow-[0_0_50px_rgba(168,85,247,0.2)]"
                  >
                    {/* Rotating color gradient border on hover */}
                    <div
                      className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_8s_linear_infinite] pointer-events-none"
                      style={{
                        background: "conic-gradient(from 0deg at 50% 50%, #a855f7, #6366f1, #06b6d4, #10b981, #f59e0b, #ec4899, #a855f7)",
                      }}
                    />

                    {/* Rotating glow blur aura behind the border on hover */}
                    <div
                      className="absolute -inset-[150%] opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500 animate-[spin_8s_linear_infinite] pointer-events-none"
                      style={{
                        background: "conic-gradient(from 0deg at 50% 50%, #a855f7, #6366f1, #06b6d4, #10b981, #f59e0b, #ec4899, #a855f7)",
                      }}
                    />

                    {/* Default static border when not hovered */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-300/80 dark:border-purple-500/50 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

                    {/* Inner Terminal Body */}
                    <div className="relative z-10 w-full p-5 rounded-[14px] bg-white/95 dark:bg-[#0d0918]/95 backdrop-blur-md space-y-3.5 transition-colors duration-300">
                      <div className="flex items-center justify-between border-b border-purple-200/70 dark:border-purple-500/30 pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                          <span className="text-xs font-mono text-purple-700 dark:text-purple-300 font-medium ml-2">devpulse-widget.svg</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold flex items-center gap-1.5">
                          <PulsingDot colorClass="bg-emerald-500 dark:bg-emerald-400" /> Live Telemetry
                        </span>
                      </div>

                      {/* Developer Telemetry Highlight Cards */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-500/30 text-center hover:border-purple-400/50 shadow-xs">
                          <span className="text-lg font-extrabold text-purple-700 dark:text-purple-300 font-outfit block">4,500+</span>
                          <span className="text-[9px] text-muted-foreground font-mono">Total Commits</span>
                        </AnimatedMetricCard>
                        <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-500/30 text-center hover:border-emerald-400/50 shadow-xs">
                          <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-outfit block">229 Days</span>
                          <span className="text-[9px] text-muted-foreground font-mono">Active Streak</span>
                        </AnimatedMetricCard>
                        <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-500/30 text-center hover:border-amber-400/50 shadow-xs">
                          <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-outfit block">Top 1%</span>
                          <span className="text-[9px] text-muted-foreground font-mono">Velocity Rank</span>
                        </AnimatedMetricCard>
                      </div>

                      {/* Authentic Miniature GitHub Contribution Heatmap with Micro-Interactivity */}
                      <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-500/20 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-purple-800 dark:text-purple-300 font-bold flex items-center gap-1.5">
                            <PulsingDot colorClass="bg-emerald-500 dark:bg-emerald-400" /> Contribution Activity (12 Weeks)
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1,840 commits</span>
                        </div>
                        <div className="grid grid-flow-col grid-rows-5 gap-1.5 justify-between">
                          {Array.from({ length: 70 }).map((_, i) => {
                            const levels = [
                              "bg-purple-100/90 dark:bg-purple-950/40",
                              "bg-purple-200/80 dark:bg-purple-900/60",
                              "bg-purple-400 dark:bg-purple-600/80",
                              "bg-emerald-500 dark:bg-emerald-500/80",
                              "bg-emerald-600 dark:bg-emerald-400"
                            ];
                            // Realistic distribution pattern
                            const level = i % 7 === 0 ? levels[4] : i % 3 === 0 ? levels[3] : i % 5 === 0 ? levels[2] : levels[1];
                            return (
                              <motion.div
                                key={i}
                                whileHover={{ scale: 1.4, zIndex: 10 }}
                                transition={{ duration: 0.15 }}
                                className={`w-2.5 h-2.5 rounded-xs ${level} cursor-pointer transition-shadow hover:shadow-[0_0_8px_rgba(52,211,153,0.6)]`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Language Breakdown Bar with Stagger Animation */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                          <span>Language Distribution</span>
                          <span className="text-purple-700 dark:text-purple-300 font-semibold">TypeScript 48% • Python 26% • Java 18%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 dark:bg-secondary/80 overflow-hidden flex">
                          <motion.div initial={{ width: 0 }} animate={{ width: "48%" }} transition={{ duration: 0.8, delay: 0.1 }} className="h-full bg-blue-500" title="TypeScript 48%" />
                          <motion.div initial={{ width: 0 }} animate={{ width: "26%" }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full bg-yellow-500" title="Python 26%" />
                          <motion.div initial={{ width: 0 }} animate={{ width: "18%" }} transition={{ duration: 0.8, delay: 0.3 }} className="h-full bg-orange-500" title="Java 18%" />
                          <motion.div initial={{ width: 0 }} animate={{ width: "8%" }} transition={{ duration: 0.8, delay: 0.4 }} className="h-full bg-purple-500" title="Other 8%" />
                        </div>
                      </div>

                      {/* Live API Endpoint & CDN Status */}
                      <div className="p-2 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-500/20 text-xs font-mono text-purple-900 dark:text-purple-200/80 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" /> GET /api/widget?user=ComradeMohan
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                          <PulsingDot colorClass="bg-emerald-500 dark:bg-emerald-400" /> Cached &lt; 42ms • 200 OK
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* STAGE FOOTER: Project Direct Jumper Navigation                            */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50 shrink-0 text-xs text-muted-foreground font-mono">
          <span className="hidden sm:inline">
            Scroll down ↓
          </span>
          <div className="flex items-center gap-1.5 ml-auto">
            {["01", "02", "03", "04", "05", "06"].map((num, idx) => (
              <button
                key={num}
                onClick={() => handleJumpToProject(idx)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-all duration-300 ${currentIndex === idx
                  ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60"
                  }`}
                aria-label={`Jump to Project ${num}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectScrollyStage;
