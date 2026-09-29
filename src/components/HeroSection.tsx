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
  const portraitTotalY = useTransform([portraitMouseY, scrollPortraitY], ([m, s]: any[]) => m + s);
  const circleTotalY = useTransform([circleMouseY, scrollCircleY], ([m, s]: any[]) => m + s);
  const textTotalY = useTransform([textMouseY, scrollTextY], ([m, s]: any[]) => m + s);
  const contentTotalY = useTransform([contentMouseY, scrollContentY], ([m, s]: any[]) => m + s);

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
      <div className="flex flex-col gap-[clamp(10px,2svh,22px)] md:gap-5 lg:hidden max-w-md sm:max-w-lg md:max-w-2xl mx-auto w-full px-4 sm:px-6 relative z-10">
        {/* Mobile Profile Card */}
        <div className="bg-white/80 dark:bg-[#0C1015]/85 border border-slate-200/80 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-[clamp(11px,2svh,22px)] md:p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center gap-[clamp(10px,2.2svh,22px)] md:gap-6">
            {/* Photo with live status */}
            <div className="w-[clamp(110px,17svh,165px)] md:w-[170px] h-[clamp(135px,21svh,205px)] md:h-[205px] rounded-2xl md:rounded-3xl overflow-hidden relative shrink-0 border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-card to-card p-[1px]">
              <img
                src="/mohan-reddy-full-stack-developer.webp"
                alt="Mohan Reddy - Full Stack Developer"
                className="w-full h-full object-cover object-top rounded-[15px] md:rounded-[23px]"
              />
              <span className="absolute bottom-2 right-2 md:bottom-2.5 md:right-2.5 flex h-3.5 w-3.5 md:h-4 md:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 md:h-4 md:w-4 bg-emerald-500 border-2 border-background" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col justify-between py-0.5 md:py-1 flex-1 min-w-0">
              <div className="mb-1.5 md:mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-grotesk whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  Available for opportunities
                </span>
              </div>

              <div className="mb-0.5 md:mb-1">
                <h1
                  onMouseEnter={() => setNameHovered(true)}
                  onMouseLeave={() => setNameHovered(false)}
                  onTouchStart={() => setNameHovered((prev) => !prev)}
                  className="text-[clamp(1.45rem,4svh,2.2rem)] md:text-3xl lg:text-4xl font-extrabold font-outfit tracking-tight leading-tight cursor-pointer select-none"
                >
                  <span className="text-[#FF4500] inline-block transition-colors">{firstName}</span>{" "}
                  <span className="text-slate-900 dark:text-white inline-block transition-colors">{lastName}</span>
                </h1>
              </div>

              <div className="h-5 sm:h-6 md:h-7 flex items-center mb-1.5 md:mb-3">
                <span className="text-[clamp(0.8rem,1.8svh,1.05rem)] md:text-base font-semibold font-mono text-purple-600 dark:text-purple-400 truncate">
                  {displayText}
                  <span className="animate-pulse text-[#FF4500]">|</span>
                </span>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2 md:gap-3">
                <a
                  href="https://github.com/comrademohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-white dark:bg-[#0C1017] w-8 h-8 md:w-9 md:h-9 rounded-full border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:border-[#FF4500] hover:text-[#FF4500] hover:bg-[#FF4500]/10 dark:hover:border-[#FF4500] dark:hover:text-[#FF4500] dark:hover:bg-[#FF4500]/15 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mmohanreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-white dark:bg-[#0C1017] w-8 h-8 md:w-9 md:h-9 rounded-full border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 dark:hover:border-[#0077b5] dark:hover:text-[#0077b5] dark:hover:bg-[#0077b5]/15 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
                <a
                  href="https://www.instagram.com/comrade_mohan666/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-white dark:bg-[#0C1017] w-8 h-8 md:w-9 md:h-9 rounded-full border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10 dark:hover:border-[#E1306C] dark:hover:text-[#E1306C] dark:hover:bg-[#E1306C]/15 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
                <a
                  href="https://leetcode.com/u/Comrademohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-white dark:bg-[#0C1017] w-8 h-8 md:w-9 md:h-9 rounded-full border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:border-[#FFA116] hover:text-[#FFA116] hover:bg-[#FFA116]/10 dark:hover:border-[#FFA116] dark:hover:text-[#FFA116] dark:hover:bg-[#FFA116]/15 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-muted-foreground text-[clamp(11.5px,1.6svh,15px)] md:text-sm lg:text-base leading-relaxed font-grotesk px-1">
          Product-Minded Developer crafting digital experiences with modern technologies. Turning ideas into elegant, functional solutions.
        </p>

        {/* Download Resume Button */}
        <div>
          <a
            href="/mohan_resume_.pdf"
            download="Mohan_Reddy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2 w-full h-[clamp(40px,5.2svh,50px)] md:h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold font-outfit text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" /> Resume
          </a>
        </div>

        {/* Statistics 4-grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(8px,1.5svh,16px)] md:gap-3.5 pt-0.5">
          {/* 2026 Graduate */}
          <div className="p-[clamp(9px,1.6svh,16px)] md:p-3.5 rounded-2xl bg-white/80 dark:bg-card/75 border border-slate-200/80 dark:border-border/70 backdrop-blur-xs flex items-center gap-2.5 md:gap-3 shadow-2xs">
            <div className="w-[clamp(34px,4.5svh,44px)] h-[clamp(34px,4.5svh,44px)] rounded-full bg-purple-500/15 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/25">
              <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[clamp(1.05rem,2.5svh,1.45rem)] md:text-xl font-extrabold text-[#FF4500] font-outfit leading-tight truncate">
                <AnimatedCounter value="2026" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-muted-foreground font-grotesk truncate">Graduate</div>
            </div>
          </div>

          {/* 8.646 CGPA */}
          <div className="p-[clamp(9px,1.6svh,16px)] md:p-3.5 rounded-2xl bg-white/80 dark:bg-card/75 border border-slate-200/80 dark:border-border/70 backdrop-blur-xs flex items-center gap-2.5 md:gap-3 shadow-2xs">
            <div className="w-[clamp(34px,4.5svh,44px)] h-[clamp(34px,4.5svh,44px)] rounded-full bg-purple-500/15 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/25">
              <ChartColumn className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[clamp(1.05rem,2.5svh,1.45rem)] md:text-xl font-extrabold text-[#FF4500] font-outfit leading-tight truncate">
                <AnimatedCounter value="8.646" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-muted-foreground font-grotesk truncate">CGPA</div>
            </div>
          </div>

          {/* 10+ Projects */}
          <div className="p-[clamp(9px,1.6svh,16px)] md:p-3.5 rounded-2xl bg-white/80 dark:bg-card/75 border border-slate-200/80 dark:border-border/70 backdrop-blur-xs flex items-center gap-2.5 md:gap-3 shadow-2xs">
            <div className="w-[clamp(34px,4.5svh,44px)] h-[clamp(34px,4.5svh,44px)] rounded-full bg-purple-500/15 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/25">
              <FolderCode className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[clamp(1.05rem,2.5svh,1.45rem)] md:text-xl font-extrabold text-[#FF4500] font-outfit leading-tight truncate">
                <AnimatedCounter value="10+" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-muted-foreground font-grotesk truncate">Projects</div>
            </div>
          </div>

          {/* Live Commits */}
          <div className="p-[clamp(9px,1.6svh,16px)] md:p-3.5 rounded-2xl bg-white/80 dark:bg-card/75 border border-slate-200/80 dark:border-border/70 backdrop-blur-xs flex items-center gap-2.5 md:gap-3 shadow-2xs">
            <div className="w-[clamp(34px,4.5svh,44px)] h-[clamp(34px,4.5svh,44px)] rounded-full bg-purple-500/15 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/25">
              <CodeXml className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[clamp(1.05rem,2.5svh,1.45rem)] md:text-xl font-extrabold text-[#FF4500] font-outfit leading-tight truncate">
                <AnimatedCounter value={liveCommitsCount} />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-muted-foreground font-grotesk truncate">Code Commits</div>
            </div>
          </div>
        </div>

        {/* Looking For Card */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-card/75 border border-slate-200/80 dark:border-border/70 backdrop-blur-xs shadow-2xs text-left">
          <p className="text-[11px] font-bold font-grotesk tracking-wider uppercase text-emerald-500 dark:text-emerald-400 mb-1">LOOKING FOR</p>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-foreground leading-snug mb-3">Full Stack Developer &amp; Software Engineer roles.</p>
          <div className="grid grid-cols-2 gap-2">
            <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium text-center font-grotesk">Full Time</span>
            <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium text-center font-grotesk">Remote</span>
            <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium text-center font-grotesk">Internships</span>
            <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium text-center font-grotesk">On-site</span>
          </div>
        </div>

        {/* Bouncing Chevron Down */}
        <div className="flex justify-center pt-0.5 animate-bounce opacity-70">
          <ChevronDown className="w-5 h-5 text-[#FF4500]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP / LAPTOP HERO (hidden lg:block - strictly preserved laptop UI)     */}
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full h-full relative z-20 flex flex-col justify-center pt-16 sm:pt-20 lg:pt-[72px] pb-12 sm:pb-14 min-h-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-6 lg:gap-8 items-center lg:items-center h-full min-h-0">
            {/* ========================================================================= */}
            {/* LEFT COLUMN: Compact Content Stack with mouse micro-parallax and scroll   */}
            {/* ========================================================================= */}
            <motion.div
              style={{
                x: contentMouseX,
                y: contentTotalY,
              }}
              className="flex flex-col justify-center z-20 max-w-xl xl:max-w-2xl py-1"
            >
              {/* 1. Header prefix tag */}
              <div className="overflow-hidden mb-3">
                <motion.p
                  initial={prefersReducedMotion ? false : { y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="font-grotesk tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase text-slate-500 dark:text-[#8E95A5] leading-none"
                >
                  HI THERE, I'M
                </motion.p>
              </div>

              {/* 2. Oversized Heading: Mohan + Reddy (kinetic typography + hover morph to Comrade Mohan) */}
              <h1
                onMouseEnter={() => setNameHovered(true)}
                onMouseLeave={() => setNameHovered(false)}
                onTouchStart={() => setNameHovered((prev) => !prev)}
                className="text-[clamp(2.7rem,4.2vw,4.5rem)] font-black font-outfit tracking-tight leading-[0.92] text-slate-900 dark:text-white whitespace-nowrap mb-2.5 cursor-pointer select-none transition-all"
              >
                <span className="inline-block mr-3">
                  <motion.span
                    initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-[#FF4500] transition-colors"
                  >
                    {firstName}
                  </motion.span>
                </span>
                <span className="inline-block">
                  <motion.span
                    initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-slate-900 dark:text-white transition-colors"
                  >
                    {lastName}
                  </motion.span>
                </span>
              </h1>

              {/* 3. Subtitle: Role with typewriter effect and blinking orange cursor */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="h-8 sm:h-9 flex items-center min-w-[20ch] mb-5 sm:mb-6"
              >
                <span className="text-xl sm:text-2xl font-semibold font-outfit text-slate-800 dark:text-white tracking-wide">
                  {displayText}
                  <span className="text-[#FF4500] ml-1 font-light animate-pulse inline-block">|</span>
                </span>
              </motion.div>

              {/* 4. Short 2-line Description revealed line-by-line */}
              <div className="text-slate-600 dark:text-[#8E95A5] text-sm sm:text-[15px] leading-relaxed font-grotesk max-w-[490px] mb-6 sm:mb-7">
                <div className="overflow-hidden">
                  <motion.p
                    initial={prefersReducedMotion ? false : { y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Product-Minded Developer crafting digital experiences
                  </motion.p>
                </div>
                <div className="overflow-hidden">
                  <motion.p
                    initial={prefersReducedMotion ? false : { y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    with modern technologies. Turning ideas into elegant, functional solutions.
                  </motion.p>
                </div>
              </div>

              {/* 5. Action Row: Socials + Download Resume */}
              <div className="flex flex-wrap items-center gap-3 mb-7 sm:mb-8">
                {/* Social circular outline buttons */}
                <div className="flex items-center gap-2">
                  {desktopSocialLinks.map((social, i) => (
                    <motion.div
                      key={social.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88, y: 8, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.34 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="inline-block"
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className={`w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0C1017]/80 text-slate-600 dark:text-[#8E95A5] transition-colors shadow-xs ${social.hoverClass}`}
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
                    </motion.div>
                  ))}
                </div>

                {/* Orange-red Download Resume Button */}
                <motion.div
                  initial={prefersReducedMotion ? false : { scale: 0.96, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className="inline-block"
                >
                  <MagneticButton>
                    <Button
                      asChild
                      role="button"
                      className="h-11 px-6 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FF3300] hover:from-[#FF5A1A] hover:to-[#FF4010] text-white font-bold font-outfit text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-[#FF4500]/30 hover:shadow-xl hover:shadow-[#FF4500]/45 transition-all cursor-pointer"
                      onClick={() => trackEvent("download", "resume", "resume_hero")}
                    >
                      <a href="/mohan_resume_.pdf" download="Mohan_Reddy_Resume.pdf" role="button" target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-1.5 shrink-0" /> Download Resume
                      </a>
                    </Button>
                  </MagneticButton>
                </motion.div>
              </div>

              {/* 6. Statistics row: Staggered entrance and count-up */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.46 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="p-3 sm:px-3.5 sm:py-3 rounded-2xl bg-white/90 dark:bg-[#0C1015]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-sm text-center shadow-xs dark:shadow-lg transition-all duration-300 hover:border-[#FF4500]/40 hover:-translate-y-0.5"
                  >
                    <div className="text-2xl sm:text-[1.65rem] font-extrabold text-[#FF4500] font-outfit leading-tight">
                      <AnimatedCounter value={stat.value} delay={prefersReducedMotion ? 0 : 500 + i * 60} />
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-[#8E95A5] mt-1 font-grotesk tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: Dedicated Unified Art-Directed Composition (.hero-visual)   */}
            {/* Outlined Typography + Orange Circle + Grounded Cutout Portrait Locked Here */}
            {/* ========================================================================= */}
            <div className="hero-visual relative w-full h-full min-h-[460px] lg:min-h-0 z-10 overflow-visible flex items-center justify-center lg:justify-start">
              {/* Anchored Stage: Pegged to portrait height so text, circle, and portrait NEVER separate on larger screens, tall viewports, or zoom */}
              <div className="hero-stage relative w-[540px] xl:w-[580px] max-w-full h-[clamp(460px,68vh,620px)] pointer-events-none select-none">
                {/* 1. Outlined Typography BUILD / INNOVATE / REPEAT (z-index: 1) behind portrait left side */}
                <motion.div
                  style={{
                    x: textMouseX,
                    y: textTotalY,
                  }}
                  className="hero-outline-text hidden lg:flex absolute z-[1] left-0 xl:-left-2 top-0 flex-col pointer-events-none select-none text-left leading-[0.82]"
                  aria-hidden="true"
                >
                  {["BUILD", "INNOVATE", "REPEAT"].map((word, index) => (
                    <div key={word} className="overflow-hidden">
                      <motion.span
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                                y: 10,
                                opacity: 0,
                              }
                        }
                        animate={{
                          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                          y: 0,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.15 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="block font-outfit font-black tracking-[-0.04em] text-[clamp(4.2rem,5vw,5.6rem)] xl:text-[5.4rem] uppercase [-webkit-text-stroke:1.5px_rgba(15,23,42,0.18)] dark:[-webkit-text-stroke:1.6px_rgba(255,255,255,0.22)] text-transparent"
                      >
                        {word}
                      </motion.span>
                    </div>
                  ))}
                </motion.div>

                {/* 2. Unified Portrait & Halo Circle Container (strictly locked together) */}
                <div className="absolute z-[2] bottom-0 left-[30px] xl:left-[45px] h-full aspect-square pointer-events-none select-none">
                  {/* 2a. Orange Circle (z-index: 1) mathematically centered on Mohan's head */}
                  <motion.div
                    style={{
                      x: circleMouseX,
                      y: circleTotalY,
                    }}
                    className="hero-circle absolute z-[1] left-[52.8%] top-[24%] -translate-x-1/2 -translate-y-1/2 w-[clamp(280px,36vh,330px)] aspect-square rounded-full pointer-events-none opacity-65 dark:opacity-85"
                  >
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? false
                          : {
                              scale: 0.86,
                              opacity: 0,
                              boxShadow: "0 0 50px rgba(255, 69, 0, 0.22), inset 0 0 30px rgba(255, 120, 0, 0.15)",
                            }
                      }
                      animate={{
                        scale: [0.86, 1.03, 1],
                        opacity: [0, 1, 1],
                        boxShadow: [
                          "0 0 50px rgba(255, 69, 0, 0.22), inset 0 0 30px rgba(255, 120, 0, 0.15)",
                          "0 0 75px rgba(255, 69, 0, 0.40), inset 0 0 35px rgba(255, 120, 0, 0.25)",
                          "0 0 50px rgba(255, 69, 0, 0.22), inset 0 0 30px rgba(255, 120, 0, 0.15)",
                        ],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.22,
                        times: [0, 0.7, 1],
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      style={{
                        background:
                          "radial-gradient(circle at 45% 45%, rgba(255, 75, 10, 0.94) 0%, rgba(220, 50, 0, 0.82) 50%, rgba(160, 30, 0, 0.65) 85%, transparent 100%)",
                      }}
                      className="w-full h-full rounded-full"
                    >
                      {/* Very subtle 1% breathing scale for Phase 14 */}
                      <motion.div
                        animate={
                          prefersReducedMotion
                            ? {}
                            : {
                                scale: [1, 1.01, 1],
                              }
                        }
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.5,
                        }}
                        className="w-full h-full rounded-full"
                      />
                    </motion.div>
                  </motion.div>

                  {/* 2b. Cutout Portrait (z-index: 2) in front of circle */}
                  <motion.div
                    style={{
                      x: portraitMouseX,
                      y: portraitTotalY,
                    }}
                    className="absolute z-[2] inset-0 w-full h-full pointer-events-none select-none"
                  >
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 24,
                              scale: 1.035,
                              filter: "blur(6px)",
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full h-full"
                    >
                      <motion.div
                        animate={
                          prefersReducedMotion
                            ? {}
                            : {
                                y: [0, -2, 0],
                              }
                        }
                        transition={{
                          duration: 4.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 5.8,
                        }}
                        className="w-full h-full"
                      >
                        <img
                          src="/comrademohan.webp"
                          alt="Mohan Reddy"
                          width="1254"
                          height="1254"
                          loading="eager"
                          className="hero-portrait w-full h-full object-contain object-bottom contrast-[1.04] brightness-[1.0]"
                          style={{
                            maskImage: "linear-gradient(to bottom, black 0%, black 93%, rgba(0,0,0,0.8) 97%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 93%, rgba(0,0,0,0.8) 97%, transparent 100%)",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
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
