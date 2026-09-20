import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { MapPin, Award, GraduationCap, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Saveetha School of Engineering (SIMATS)",
    duration: "2022 – 2026",
    location: "Chennai, Tamil Nadu",
    grade: "CGPA: 8.646 / 10",
    isCurrent: true,
  },
  {
    degree: "Intermediate (MPC + Computer Science)",
    school: "Loyola Public School",
    duration: "2020 – 2022",
    location: "Guntur, Andhra Pradesh",
    grade: "Percentage: 81.6%",
    isCurrent: false,
  }
];

const interests = [
  "💻 Full Stack Development",
  "☕ Java & Software Engineering",
  "🗄️ Database Management",
  "🚀 Web Application Development",
];

const StaggeredHighlight = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.span
    initial={{
      color: "hsl(var(--muted-foreground))",
      textShadow: "0 0 0px transparent"
    }}
    whileInView={{
      color: "hsl(var(--primary))",
      textShadow: "0 0 14px hsl(var(--primary) / 0.45)"
    }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
    className="font-medium inline transition-colors"
  >
    {children}
  </motion.span>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking for section depth
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Layered subtle parallax offsets
  const leftColY = useTransform(sectionProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);
  const rightColY = useTransform(sectionProgress, [0, 1], prefersReducedMotion ? [0, 0] : [50, -20]);

  // Timeline-specific scroll progress for drawing the line
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const timelineScaleY = useSpring(timelineProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pt-2 pb-10 sm:pt-3 sm:pb-14 scroll-mt-20 relative"
    >
      {/* Visual Transition Bridge from Hero into About */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/0 via-background/40 to-background pointer-events-none -z-10" />

      {/* Subtle background ambient glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit tracking-tight mb-2">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* 2-Column Layered Composition */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 cols): Biography & Core Interests */}
          <motion.div
            style={{ y: leftColY }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-xs shadow-md">
              <h3 className="text-2xl sm:text-3xl font-bold font-outfit leading-snug">
                Passionate about{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Software Development
                </span>
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-grotesk">
                Final-year Computer Science and Engineering student at Saveetha School of Engineering (SIMATS), Chennai, with a{" "}
                <StaggeredHighlight delay={0.2}>CGPA of 8.646</StaggeredHighlight>. I enjoy building practical software that solves real problems and can be used beyond the classroom.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-grotesk">
                I have independently built{" "}
                <StaggeredHighlight delay={0.4}>SaveethaHub</StaggeredHighlight>, an academic platform using React, Supabase, Firebase, and AI features, and{" "}
                <StaggeredHighlight delay={0.6}>UniVault</StaggeredHighlight>, an Android exam-preparation app published on the Google Play Store. I also hold the{" "}
                <StaggeredHighlight delay={0.8}>Oracle Certified Professional: Java SE 17 Developer</StaggeredHighlight>{" "}
                certification and am strengthening my skills in data structures, algorithms, and full-stack development.
              </p>
            </div>

            {/* Core Interests: Layered Badges */}
            <div className="p-6 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-xs">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-4 font-outfit flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Core Interests
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="px-3.5 py-2 rounded-xl bg-secondary/50 border border-border/80 text-xs sm:text-sm text-foreground/90 font-grotesk flex items-center transition-all duration-300 hover:border-primary/40 hover:bg-card/80 cursor-default shadow-xs"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Link to Standalone Biography */}
            <div className="pt-1">
              <Button asChild className="rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-grotesk font-semibold group shadow-xs">
                <a href="/about">
                  Read Full Biography & Stats
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 ml-1.5">→</span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column (6 cols): Scroll-Progressive Education Timeline */}
          <motion.div
            ref={timelineRef}
            style={{ y: rightColY }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold font-outfit">Education Timeline</h3>
              </div>
              <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-secondary/60 border border-border/60">
                2020 — 2026
              </span>
            </div>

            {/* Timeline Track Container */}
            <div className="relative pl-8 sm:pl-10 space-y-8 sm:space-y-10">

              {/* Dynamic Scroll-Linked Track Line */}
              <div className="absolute left-3.5 sm:left-4 top-4 bottom-4 w-4 -translate-x-1/2 flex justify-center pointer-events-none z-0">
                {/* Background static line */}
                <div className="w-[2px] h-full bg-border/60 rounded-full" />

                {/* Animated glowing progress line that draws as the user scrolls */}
                <motion.div
                  className="absolute top-0 w-[2px] h-full bg-gradient-to-b from-primary via-orange-500 to-accent rounded-full shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
                  style={{ originY: 0, scaleY: prefersReducedMotion ? 1 : timelineScaleY }}
                />
              </div>

              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, x: 15 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: idx * 0.18, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Timeline Milestone Node */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.18, type: "spring", stiffness: 350, damping: 15 }}
                    className="absolute -left-8 sm:-left-10 top-5 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-background border-2 border-primary shadow-[0_0_14px_hsl(var(--primary)/0.7)] z-10"
                  >
                    <span className={`h-2 w-2 rounded-full ${edu.isCurrent ? "bg-primary animate-pulse" : "bg-muted-foreground/60"}`} />
                  </motion.span>

                  {/* Milestone Card */}
                  <div className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-md relative group overflow-hidden hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary font-mono border border-primary/20">
                        <Calendar className="w-3 h-3" />
                        {edu.duration}
                      </span>
                      {edu.isCurrent && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          Final Year
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-foreground font-outfit mb-1 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-foreground/80 font-grotesk mb-3">
                      {edu.school}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground pt-3 border-t border-border/70">
                      <span className="flex items-center gap-1.5 font-grotesk">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {edu.location}
                      </span>

                      {/* Highlighted Metric Badge for CGPA / Grade */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold font-mono border border-primary/25 shadow-xs">
                        <Award className="w-3.5 h-3.5 text-primary" /> {edu.grade}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
