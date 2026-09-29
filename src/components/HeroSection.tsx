import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Download,
  ChevronDown,
  GraduationCap,
  ChartColumn,
  FolderCode,
  CodeXml,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { MagneticButton } from "./MagneticButton";
import { useGithubContributions } from "@/hooks/useDeveloperStats";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Java Developer",
  "Product-Minded Builder",
];

const desktopSocialLinks = [
  {
    icon: Github,
    href: "https://github.com/comrademohan",
    label: "GitHub Profile",
    event: "github_hero",
    hoverClass: "hover:text-[#FF4500] hover:border-[#FF4500]/50 hover:bg-[#FF4500]/10 dark:hover:text-[#FF4500] dark:hover:border-[#FF4500]/50 dark:hover:bg-[#FF4500]/15",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mmohanreddy",
    label: "LinkedIn Profile",
    event: "linkedin_hero",
    hoverClass: "hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 dark:hover:text-[#0077b5] dark:hover:border-[#0077b5]/50 dark:hover:bg-[#0077b5]/15",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/comrade_mohan666/",
    label: "Instagram Profile",
    event: "instagram_hero",
    hoverClass: "hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 dark:hover:text-[#E1306C] dark:hover:border-[#E1306C]/50 dark:hover:bg-[#E1306C]/15",
  },
  {
    isLeetcode: true,
    href: "https://leetcode.com/u/Comrademohan",
    label: "LeetCode Profile",
    event: "leetcode_hero",
    hoverClass: "hover:text-[#FFA116] hover:border-[#FFA116]/50 hover:bg-[#FFA116]/10 dark:hover:text-[#FFA116] dark:hover:border-[#FFA116]/50 dark:hover:bg-[#FFA116]/15",
  },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function useTextMorph(targetText: string, speed = 28) {
  const [displayText, setDisplayText] = useState(targetText);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let iteration = 0;
    const maxIterations = targetText.length * 2.5;

    const interval = setInterval(() => {
      iteration++;

      const nextText = Array.from({ length: targetText.length })
        .map((_, i) => {
          if (i < Math.floor(iteration / 2.5)) {
            return targetText[i];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (iteration >= maxIterations) {
        setDisplayText(targetText);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return displayText;
}

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [nameHovered, setNameHovered] = useState(false);
  const firstName = useTextMorph(nameHovered ? "Comrade" : "Mohan", 28);
  const lastName = useTextMorph(nameHovered ? "Mohan" : "Reddy", 28);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typewriterStarted, setTypewriterStarted] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return true;
    return false;
  });

  const { data: contributionsData } = useGithubContributions("hero");
  const liveCommitsCount = contributionsData?.totalLifetime
    ? `${contributionsData.totalLifetime.toLocaleString()}+`
    : "5,008+";

  // Scroll transforms for hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 0.985, 0.96]
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 0.95, 0.3]
  );

  // Mouse micro-interactions setup for desktop (smooth springs)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax mappings per specification:
  // Portrait: max 3-4px parallax
  const portraitMouseX = useTransform(smoothMouseX, [-1, 1], [-3.5, 3.5]);
  const portraitMouseY = useTransform(smoothMouseY, [-1, 1], [-3.5, 3.5]);

  // Orange circle: max 5-6px movement
  const circleMouseX = useTransform(smoothMouseX, [-1, 1], [-5.5, 5.5]);
  const circleMouseY = useTransform(smoothMouseY, [-1, 1], [-5.5, 5.5]);

  // BUILD / INNOVATE / REPEAT: max 6-8px in opposite direction
  const textMouseX = useTransform(smoothMouseX, [-1, 1], [7, -7]);
  const textMouseY = useTransform(smoothMouseY, [-1, 1], [7, -7]);

  // Left content: max 1-2px movement
  const contentMouseX = useTransform(smoothMouseX, [-1, 1], [-1.5, 1.5]);
  const contentMouseY = useTransform(smoothMouseY, [-1, 1], [-1.5, 1.5]);

  // Dot grid: subtle imperceptible parallax
  const gridMouseX = useTransform(smoothMouseX, [-1, 1], [-2, 2]);
  const gridMouseY = useTransform(smoothMouseY, [-1, 1], [-2, 2]);

  // Scroll transitions per specification:
  const scrollTextY = useTransform(scrollYProgress, [0, 0.45], prefersReducedMotion ? [0, 0] : [0, -10]);
  const scrollCircleY = useTransform(scrollYProgress, [0, 0.45], prefersReducedMotion ? [0, 0] : [0, -6]);
  const scrollPortraitY = useTransform(scrollYProgress, [0, 0.45], prefersReducedMotion ? [0, 0] : [0, -12]);
  const scrollContentY = useTransform(scrollYProgress, [0, 0.45], prefersReducedMotion ? [0, 0] : [0, -5]);
  const scrollIndicatorsY = useTransform(scrollYProgress, [0, 0.25], prefersReducedMotion ? [0, 0] : [0, 8]);
  const scrollIndicatorsOpacity = useTransform(scrollYProgress, [0, 0.2], prefersReducedMotion ? [1, 1] : [1, 0]);

  // Combined mouse parallax + scroll depth
  const portraitTotalY = useTransform([portraitMouseY, scrollPortraitY], ([m, s]) => Number(m) + Number(s));
  const circleTotalY = useTransform([circleMouseY, scrollCircleY], ([m, s]) => Number(m) + Number(s));
  const textTotalY = useTransform([textMouseY, scrollTextY], ([m, s]) => Number(m) + Number(s));
  const contentTotalY = useTransform([contentMouseY, scrollContentY], ([m, s]) => Number(m) + Number(s));

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Phase 08 Typewriter delay trigger on desktop (starts around 3.0s)
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypewriterStarted(true);
      return;
    }
    const timer = setTimeout(() => {
      setTypewriterStarted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Typewriter effect for role
  useEffect(() => {
    if (!typewriterStarted) return;
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? current.slice(0, displayText.length - 1)
              : current.slice(0, displayText.length + 1)
          );
        },
        isDeleting ? 35 : 75
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, typewriterStarted]);

  const stats = [
    { value: "2026", label: "Graduate" },
    { value: "8.646", label: "CGPA" },
    { value: "10+", label: "Projects" },
    { value: liveCommitsCount, label: "Code Commits" },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[100svh] lg:h-[100dvh] lg:min-h-[100dvh] lg:max-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#FAFAFC] dark:bg-background text-slate-900 dark:text-white select-none transition-colors duration-300 pt-[clamp(68px,8svh,82px)] pb-[clamp(14px,2svh,24px)] lg:pt-0 lg:pb-0"
    >
      {/* Mobile Ambient Glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#FF4500]/10 rounded-full blur-3xl pointer-events-none lg:hidden" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none lg:hidden" />

      {/* Desktop Viewport subtle border frame */}
      <div className="hidden lg:block absolute inset-2 sm:inset-3 lg:inset-4 border border-black/[0.06] dark:border-white/[0.04] pointer-events-none z-30 rounded-2xl" />

      {/* Background Subtle Tech Dot Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ x: gridMouseX, y: gridMouseY }}
          className="w-full h-full"
        >
          <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20 text-slate-300 dark:text-[#1E2633]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-dot-grid-ref1" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dot-grid-ref1)" />
          </svg>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HERO VIEW (lg:hidden - dedicated rich card UI)                      */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3.5 sm:gap-4 lg:hidden max-w-md sm:max-w-lg md:max-w-2xl mx-auto w-full px-4 sm:px-6 relative z-10">
        {/* Mobile Profile Card */}
        <div className="bg-card/90 dark:bg-[#070a12]/90 border border-border/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center gap-3.5 sm:gap-5">
            {/* Photo with live status */}
            <div className="w-24 sm:w-28 h-28 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden relative shrink-0 border border-border/80 dark:border-white/10 bg-secondary/40 p-0.5">
              <img
                src="/mohan-reddy-full-stack-developer.webp"
                alt="Mohan Reddy - Full Stack Developer"
                className="w-full h-full object-cover object-top rounded-[10px] sm:rounded-[14px]"
              />
              <span className="absolute bottom-1.5 right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-background" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
              <div className="mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-grotesk whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available for roles &bull; 2026
                </span>
              </div>

              <div className="mb-0.5">
                <h1
                  onMouseEnter={() => setNameHovered(true)}
                  onMouseLeave={() => setNameHovered(false)}
                  onTouchStart={() => setNameHovered((prev) => !prev)}
                  className="text-2xl sm:text-3xl font-black font-outfit tracking-tight leading-tight cursor-pointer select-none"
                >
                  <span className="text-primary inline-block transition-colors">{firstName}</span>{" "}
                  <span className="text-foreground inline-block transition-colors">{lastName}</span>
                </h1>
              </div>

              <div className="h-5 sm:h-6 flex items-center mb-2">
                <span className="text-xs sm:text-sm font-semibold font-mono text-muted-foreground truncate">
                  {displayText}
                  <span className="animate-pulse text-primary ml-0.5">|</span>
                </span>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/comrademohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center justify-center text-sm font-medium border bg-secondary/50 hover:bg-secondary w-8 h-8 rounded-full border-border/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mmohanreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center justify-center text-sm font-medium border bg-secondary/50 hover:bg-secondary w-8 h-8 rounded-full border-border/80 text-muted-foreground hover:text-[#0077b5] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://leetcode.com/u/Comrademohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="inline-flex items-center justify-center text-sm font-medium border bg-secondary/50 hover:bg-secondary w-8 h-8 rounded-full border-border/80 text-muted-foreground hover:text-[#FFA116] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/comrade_mohan666/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="inline-flex items-center justify-center text-sm font-medium border bg-secondary/50 hover:bg-secondary w-8 h-8 rounded-full border-border/80 text-muted-foreground hover:text-[#E1306C] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-grotesk px-0.5">
          Final-year CSE student at Saveetha School of Engineering (SIMATS) building high-scale web platforms, secure Android applications, and machine learning pipelines.
        </p>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href="/mohan_resume_.pdf"
            download="Mohan_Reddy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("download", "resume", "resume_hero_mobile")}
            className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-outfit text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
          <a
            href="#projects"
            className="w-full h-10 rounded-xl border border-border/80 bg-secondary/40 hover:bg-secondary text-foreground font-semibold font-outfit text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <FolderCode className="w-3.5 h-3.5 text-primary" /> View Work
          </a>
        </div>

        {/* Statistics 4-Grid: Clean, Minimalist Engineering Bar */}
        <div className="grid grid-cols-4 gap-2 p-2.5 rounded-xl bg-secondary/30 dark:bg-white/[0.02] border border-border/70 dark:border-white/10 text-center">
          <div>
            <div className="text-sm font-extrabold text-foreground font-outfit leading-tight">
              <AnimatedCounter value="2026" />
            </div>
            <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Graduate</div>
          </div>
          <div className="border-l border-border/60">
            <div className="text-sm font-extrabold text-primary font-outfit leading-tight">
              <AnimatedCounter value="8.646" />
            </div>
            <div className="text-[9px] text-muted-foreground font-mono mt-0.5">CGPA</div>
          </div>
          <div className="border-l border-border/60">
            <div className="text-sm font-extrabold text-foreground font-outfit leading-tight">
              <AnimatedCounter value="10+" />
            </div>
            <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Projects</div>
          </div>
          <div className="border-l border-border/60">
            <div className="text-sm font-extrabold text-primary font-outfit leading-tight">
              <AnimatedCounter value={liveCommitsCount} />
            </div>
            <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Commits</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP / LAPTOP HERO (hidden lg:block - refined editorial composition)   */}
      {/* ========================================================================= */}
      <div
        className="hidden lg:block w-full h-full relative"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
          className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12 w-full h-full relative z-20 flex flex-col justify-center pt-20 pb-12 min-h-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-12 items-center h-full min-h-0">
            {/* ========================================================================= */}
            {/* LEFT COLUMN: Editorial Content Stack                                      */}
            {/* ========================================================================= */}
            <motion.div
              style={{
                x: contentMouseX,
                y: contentTotalY,
              }}
              className="flex flex-col justify-center z-20 max-w-xl xl:max-w-2xl"
            >
              {/* 1. Header prefix pill */}
              <div className="mb-4">
                <motion.div
                  initial={prefersReducedMotion ? false : { y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/40 text-[11px] font-mono tracking-wider uppercase text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Full Stack Developer &bull; Class of 2026</span>
                </motion.div>
              </div>

              {/* 2. Heading: Mohan + Reddy (kinetic typography + hover morph to Comrade Mohan) */}
              <h1
                onMouseEnter={() => setNameHovered(true)}
                onMouseLeave={() => setNameHovered(false)}
                onTouchStart={() => setNameHovered((prev) => !prev)}
                className="text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-black font-outfit tracking-tight leading-[0.98] text-foreground mb-3 cursor-pointer select-none transition-all"
              >
                <span className="inline-block mr-3">
                  <motion.span
                    initial={prefersReducedMotion ? false : { y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-primary transition-colors"
                  >
                    {firstName}
                  </motion.span>
                </span>
                <span className="inline-block">
                  <motion.span
                    initial={prefersReducedMotion ? false : { y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-foreground transition-colors"
                  >
                    {lastName}
                  </motion.span>
                </span>
              </h1>

              {/* 3. Subtitle: Role with typewriter effect */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-8 flex items-center min-w-[20ch] mb-4"
              >
                <span className="text-xl sm:text-2xl font-semibold font-outfit text-foreground/90 tracking-wide">
                  {displayText}
                  <span className="text-primary ml-1 font-light animate-pulse inline-block font-mono">|</span>
                </span>
              </motion.div>

              {/* 4. Short Description */}
              <div className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed font-grotesk max-w-lg mb-6">
                <motion.p
                  initial={prefersReducedMotion ? false : { y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.38, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  Final-year Computer Science &amp; Engineering student at Saveetha School of Engineering (SIMATS). Building production web platforms, secure offline Android apps, and high-performance backend systems.
                </motion.p>
              </div>

              {/* 5. Telemetry Metrics Bar */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-card/80 dark:bg-white/[0.03] border border-border/80 dark:border-white/10 backdrop-blur-sm max-w-xl mb-6 shadow-xs"
              >
                <div className="text-center px-2 py-1">
                  <div className="text-xl xl:text-2xl font-black text-foreground font-outfit leading-tight tracking-tight">
                    <AnimatedCounter value="2026" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-mono mt-0.5">
                    Graduate
                  </div>
                </div>
                <div className="text-center px-2 py-1 border-l border-border/60">
                  <div className="text-xl xl:text-2xl font-black text-primary font-outfit leading-tight tracking-tight">
                    <AnimatedCounter value="8.646" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-mono mt-0.5">
                    CGPA
                  </div>
                </div>
                <div className="text-center px-2 py-1 border-l border-border/60">
                  <div className="text-xl xl:text-2xl font-black text-foreground font-outfit leading-tight tracking-tight">
                    <AnimatedCounter value="10+" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-mono mt-0.5">
                    Projects
                  </div>
                </div>
                <div className="text-center px-2 py-1 border-l border-border/60">
                  <div className="text-xl xl:text-2xl font-black text-primary font-outfit leading-tight tracking-tight">
                    <AnimatedCounter value={liveCommitsCount} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-mono mt-0.5">
                    Commits
                  </div>
                </div>
              </motion.div>

              {/* 6. Action Row: Resume + View Projects + Socials */}
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <Button
                    asChild
                    role="button"
                    className="h-11 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-outfit text-sm flex items-center gap-2 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => trackEvent("download", "resume", "resume_hero")}
                  >
                    <a href="/mohan_resume_.pdf" download="Mohan_Reddy_Resume.pdf" role="button" target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 shrink-0" /> Download Resume
                    </a>
                  </Button>
                </MagneticButton>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-5 rounded-full border-border/80 bg-secondary/40 hover:bg-secondary text-foreground font-semibold font-outfit text-sm transition-colors cursor-pointer"
                >
                  <a href="#projects">
                    <FolderCode className="w-4 h-4 mr-1.5 text-primary" /> View Projects
                  </a>
                </Button>

                {/* Social circular outline buttons */}
                <div className="flex items-center gap-1.5 ml-1">
                  {desktopSocialLinks.map((social) => (
                    <Button
                      key={social.label}
                      asChild
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 rounded-full border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                      onClick={() => trackEvent("click", "social", social.event)}
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        {social.isLeetcode ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                          </svg>
                        ) : (
                          <social.icon className="w-4 h-4" />
                        )}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: Art-Directed Developer Portrait & Verified Credentials      */}
            {/* ========================================================================= */}
            <div className="relative w-full h-full min-h-[460px] lg:min-h-0 z-10 flex items-center justify-center">
              <div className="relative w-[480px] xl:w-[520px] max-w-full h-[clamp(440px,64vh,580px)] select-none">
                
                {/* 1. Subtle, warm ambient radial illumination */}
                <motion.div
                  style={{
                    x: circleMouseX,
                    y: circleTotalY,
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
                  }}
                  className="absolute left-[50%] top-[30%] -translate-x-1/2 -translate-y-1/2 w-[340px] aspect-square rounded-full pointer-events-none opacity-40 dark:opacity-60 blur-3xl -z-10"
                />

                {/* 2. Floating Tactile Credential Badge: Oracle Certified Professional */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-8 right-0 sm:right-2 z-20 px-3.5 py-2 rounded-2xl bg-card/90 dark:bg-[#070a12]/90 border border-border/80 dark:border-white/10 backdrop-blur-md shadow-lg pointer-events-auto flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold font-outfit text-foreground leading-tight">
                      Java SE 17 Developer
                    </div>
                    <div className="text-[9px] font-mono text-muted-foreground leading-none mt-0.5">
                      Oracle Certified Professional
                    </div>
                  </div>
                </motion.div>

                {/* 3. Floating Project Milestone Chip: SaveethaHub & UniVault */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-12 left-0 z-20 px-3.5 py-2 rounded-2xl bg-card/90 dark:bg-[#070a12]/90 border border-border/80 dark:border-white/10 backdrop-blur-md shadow-lg pointer-events-auto flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <ChartColumn className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold font-outfit text-foreground leading-tight">
                      3.8K+ Active Users
                    </div>
                    <div className="text-[9px] font-mono text-muted-foreground leading-none mt-0.5">
                      SaveethaHub &bull; Production
                    </div>
                  </div>
                </motion.div>

                {/* 4. Cutout Portrait with Smooth Micro-Parallax */}
                <motion.div
                  style={{
                    x: portraitMouseX,
                    y: portraitTotalY,
                  }}
                  className="absolute inset-0 w-full h-full pointer-events-none select-none flex items-end justify-center"
                >
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 20,
                            scale: 1.02,
                            filter: "blur(4px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full h-full flex items-end justify-center"
                  >
                    <img
                      src="/comrademohan.webp"
                      alt="Mohan Reddy - Full Stack Developer"
                      width="1254"
                      height="1254"
                      loading="eager"
                      className="hero-portrait w-full h-full object-contain object-bottom contrast-[1.03] brightness-[1.0]"
                      style={{
                        maskImage: "linear-gradient(to bottom, black 0%, black 92%, rgba(0,0,0,0.7) 97%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 92%, rgba(0,0,0,0.7) 97%, transparent 100%)",
                      }}
                    />
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* BOTTOM HERO INDICATORS (Phase 13: 5.0s -> 5.8s entrance + Phase 14 idle)   */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            y: scrollIndicatorsY,
            opacity: scrollIndicatorsOpacity,
          }}
          initial={prefersReducedMotion ? false : { x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 5.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[4%] bottom-[18px] lg:bottom-[22px] z-20 flex items-center gap-2.5 text-slate-500 dark:text-[#8E95A5] text-xs font-mono select-none pointer-events-none"
        >
          <span className="text-[#FF4500] font-bold">01</span>
          <span className="text-slate-300 dark:text-white/20">—</span>
          <span className="tracking-wider uppercase text-[11px] sm:text-xs">
            BUILD INNOVATE REPEAT
          </span>
          <span className="hidden sm:inline-block w-16 md:w-24 h-px bg-slate-200 dark:bg-white/15 ml-1" />
        </motion.div>

        <motion.a
          href="#about"
          style={{
            y: scrollIndicatorsY,
            opacity: scrollIndicatorsOpacity,
          }}
          initial={prefersReducedMotion ? false : { x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 5.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[4%] bottom-[18px] lg:bottom-[22px] z-20 flex items-center gap-2 text-[11px] sm:text-xs tracking-widest text-slate-500 dark:text-[#8E95A5] hover:text-slate-900 dark:hover:text-white transition-colors uppercase cursor-pointer select-none font-mono"
        >
          <span>SCROLL DOWN</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#FF4500]" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
