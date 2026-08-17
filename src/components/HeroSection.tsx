import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Download, GraduationCap, BarChart3, FolderCode, Code2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { MagneticButton } from "./MagneticButton";
import { CyberHUD } from "./CyberHUD";
import { useGithubContributions } from "@/hooks/useDeveloperStats";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const roles = ["Software Developer", "Freelancer", "Problem Solver", "Cyber Expert"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHudActive, setIsHudActive] = useState(false);

  const { data: contributionsData } = useGithubContributions("hero");
  const liveCommitsCount = contributionsData?.totalLifetime
    ? `${contributionsData.totalLifetime.toLocaleString()}+`
    : "4,500+";

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting ? current.slice(0, displayText.length - 1) : current.slice(0, displayText.length + 1)
          );
        },
        isDeleting ? 50 : 100
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const stats = [
    { value: "2026", label: "Graduate", icon: GraduationCap },
    { value: "8.646", label: "CGPA", icon: BarChart3 },
    { value: "10+", label: "Projects", icon: FolderCode },
    { value: liveCommitsCount, label: "Code Commits", icon: Code2 },
  ];

  return (
    <section id="home" className="min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-[clamp(68px,8svh,82px)] pb-[clamp(14px,2svh,24px)] lg:min-h-[100svh] lg:pt-24 lg:pb-20">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* ========================================================================= */}
        {/* MOBILE & TABLET HERO LAYOUT (Fluid svh clamp on mobile, 4-col stats on tablet, visible on < lg) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-[clamp(10px,2svh,22px)] md:gap-5 lg:hidden max-w-md sm:max-w-lg md:max-w-2xl mx-auto w-full"
        >
          {/* Top Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card/75 border border-border/80 rounded-[2rem] md:rounded-[2.5rem] p-[clamp(11px,2svh,22px)] md:p-6 shadow-xl backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center gap-[clamp(10px,2.2svh,22px)] md:gap-6">
              {/* Left Portrait Card with expanded fluid height clamp for 800px+ tall screens */}
              <div className="w-[clamp(110px,17svh,165px)] md:w-[170px] h-[clamp(135px,21svh,205px)] md:h-[205px] rounded-2xl md:rounded-3xl overflow-hidden relative shrink-0 border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-card to-card p-[1px]">
                <img
                  src="/mohan-reddy-full-stack-developer.webp"
                  alt="Mohan Reddy - Full Stack Developer"
                  className="w-full h-full object-cover object-top rounded-[15px] md:rounded-[23px]"
                />
                {/* Green Status indicator */}
                <span className="absolute bottom-2 right-2 md:bottom-2.5 md:right-2.5 flex h-3.5 w-3.5 md:h-4 md:w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 md:h-4 md:w-4 bg-emerald-500 border-2 border-background"></span>
                </span>
              </div>

              {/* Right Content info */}
              <div className="flex flex-col justify-between py-0.5 md:py-1 flex-1 min-w-0">
                {/* Available for opportunities pill */}
                <div className="mb-1.5 md:mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-grotesk whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for opportunities
                  </span>
                </div>

                {/* Name */}
                <div className="mb-0.5 md:mb-1">
                  <h1 className="text-[clamp(1.45rem,4svh,2.2rem)] md:text-3xl lg:text-4xl font-extrabold font-outfit tracking-tight leading-tight">
                    <span className="text-primary">Mohan</span>{" "}
                    <span className="text-foreground">Reddy</span>
                  </h1>
                </div>

                {/* Typewriter Role */}
                <div className="h-5 sm:h-6 md:h-7 flex items-center mb-1.5 md:mb-3">
                  <span className="text-[clamp(0.8rem,1.8svh,1.05rem)] md:text-base font-semibold font-mono text-purple-400 truncate">
                    {displayText}
                    <span className="animate-pulse text-primary">|</span>
                  </span>
                </div>

                {/* Social Icons row */}
                <div className="flex items-center gap-2 md:gap-3">
                  <Button asChild variant="outline" size="icon" className="w-8 h-8 md:w-9 md:h-9 rounded-full border-border/80 text-foreground hover:border-foreground hover:text-foreground hover:bg-foreground/10 dark:hover:border-white dark:hover:text-white dark:hover:bg-white/10 transition-colors" onClick={() => trackEvent("click", "social", "github_hero")}>
                    <a href="https://github.com/comrademohan" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><Github className="w-3.5 h-3.5 md:w-4 md:h-4" /></a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="w-8 h-8 md:w-9 md:h-9 rounded-full border-border/80 text-foreground hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors" onClick={() => trackEvent("click", "social", "linkedin_hero")}>
                    <a href="https://www.linkedin.com/in/mmohanreddy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" /></a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="w-8 h-8 md:w-9 md:h-9 rounded-full border-border/80 text-foreground hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors" onClick={() => trackEvent("click", "social", "instagram_hero")}>
                    <a href="https://www.instagram.com/comrade_mohan666/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile"><Instagram className="w-3.5 h-3.5 md:w-4 md:h-4" /></a>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="w-8 h-8 md:w-9 md:h-9 rounded-full border-border/80 text-foreground hover:border-[#FFA116] hover:text-[#FFA116] hover:bg-[#FFA116]/10 transition-colors" onClick={() => trackEvent("click", "social", "leetcode_hero")}>
                    <a href="https://leetcode.com/u/Comrademohan" target="_blank" rel="noopener noreferrer" aria-label="LeetCode Profile">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio text with fluid font clamp */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-muted-foreground text-[clamp(11.5px,1.6svh,15px)] md:text-sm lg:text-base leading-relaxed font-grotesk px-1"
          >
            Product-Minded Developer crafting digital experiences with modern technologies. Turning ideas into elegant, functional solutions.
          </motion.p>
          {/* Full-width Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Button asChild className="w-full h-[clamp(40px,5.2svh,50px)] md:h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold font-outfit text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer" onClick={() => trackEvent("download", "resume", "resume_hero")}>
              <a href="/mohan_resume_.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 md:w-5 md:h-5" /> Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats Grid: 2x2 on Mobile, 4 columns on Tablet (md:) with expanded height scaling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(8px,1.5svh,16px)] md:gap-3.5 pt-0.5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                  className="p-[clamp(9px,1.6svh,16px)] md:p-3.5 rounded-2xl bg-card/75 border border-border/70 backdrop-blur-xs flex items-center gap-2.5 md:gap-3 shadow-2xs"
                >
                  <div className="w-[clamp(34px,4.5svh,44px)] h-[clamp(34px,4.5svh,44px)] rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/25">
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[clamp(1.05rem,2.5svh,1.45rem)] md:text-xl font-extrabold text-primary font-outfit leading-tight truncate">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-grotesk truncate">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Opportunities / Looking For Card (Mobile & Tablet only) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-card/75 border border-border/70 backdrop-blur-xs shadow-2xs text-left"
          >
            <p className="text-[11px] font-bold font-grotesk tracking-wider uppercase text-emerald-400 mb-1">
              LOOKING FOR
            </p>
            <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug mb-3">
              Full Stack Developer & Software Engineer roles.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium text-center font-grotesk">
                Full Time
              </span>
              <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium text-center font-grotesk">
                Remote
              </span>
              <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium text-center font-grotesk">
                Internships
              </span>
              <span className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium text-center font-grotesk">
                On-site
              </span>
            </div>
          </motion.div>

          {/* Animated Down Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex justify-center pt-0.5 animate-bounce"
          >
            <ChevronDown className="w-5 h-5 text-orange-500" />
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* DESKTOP HERO LAYOUT (Completely preserved 2-column layout on lg+) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >
            {/* Headline Block */}
            <div>
              <p className="text-muted-foreground text-sm font-grotesk tracking-wide uppercase mb-1">Hi there, I'm</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-outfit tracking-tight leading-[1.02]">
                <span className="text-primary">Mohan</span>{" "}
                <span className="text-foreground">Reddy</span>
              </h1>
            </div>

            {/* Typewriter Role */}
            <div className="h-8 flex items-center">
              <span className="text-xl lg:text-2xl font-mono text-accent tracking-wide leading-none">
                {displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </div>

            {/* Bio Description */}
            <p className="text-muted-foreground max-w-lg text-base leading-relaxed font-grotesk">
              Product-Minded Developer crafting digital experiences with modern technologies. Turning ideas into elegant, functional solutions.
            </p>

            {/* Social & Resume Action Row */}
            <div className="flex flex-wrap gap-3 items-center pt-1">
              <MagneticButton>
                <Button asChild variant="outline" size="icon" className="rounded-full border-border text-foreground hover:border-foreground hover:text-foreground hover:bg-foreground/10 dark:hover:border-white dark:hover:text-white dark:hover:bg-white/10 transition-colors w-10 h-10" onClick={() => trackEvent("click", "social", "github_hero")}>
                  <a href="https://github.com/comrademohan" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><Github className="w-5 h-5" /></a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="icon" className="rounded-full border-border text-foreground hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors w-10 h-10" onClick={() => trackEvent("click", "social", "linkedin_hero")}>
                  <a href="https://www.linkedin.com/in/mmohanreddy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><Linkedin className="w-5 h-5" /></a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="icon" className="rounded-full border-border text-foreground hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors w-10 h-10" onClick={() => trackEvent("click", "social", "instagram_hero")}>
                  <a href="https://www.instagram.com/comrade_mohan666/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile"><Instagram className="w-5 h-5" /></a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="icon" className="rounded-full border-border text-foreground hover:border-[#FFA116] hover:text-[#FFA116] hover:bg-[#FFA116]/10 transition-colors w-10 h-10" onClick={() => trackEvent("click", "social", "leetcode_hero")}>
                  <a href="https://leetcode.com/u/Comrademohan" target="_blank" rel="noopener noreferrer" aria-label="LeetCode Profile">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                    </svg>
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton className="ml-2">
                <Button asChild className="bg-primary hover:bg-primary/80 h-10 text-sm px-4" onClick={() => trackEvent("download", "resume", "resume_hero")}>
                  <a href="/mohan_resume_.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" /> Resume
                  </a>
                </Button>
              </MagneticButton>
            </div>

            {/* Desktop Stats Metric Cards: 4 columns */}
            <div className="grid grid-cols-4 gap-4 pt-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-center p-3 rounded-xl bg-card/60 border border-border/50 backdrop-blur-xs shadow-2xs"
                >
                  <div className="text-2xl lg:text-3xl font-extrabold text-primary font-outfit leading-tight">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-grotesk">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Desktop-Only Full Size CyberHUD Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Left dot grid (subtle and visible on sm+) */}
              <svg width="80" fill="none" className="absolute -left-6 lg:-left-8 top-[15%] text-primary/30 w-12 lg:w-16 h-28 lg:h-36 pointer-events-none hidden sm:block" viewBox="0 0 80 144">
                <defs>
                  <pattern id="dot-grid-1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="80" height="144" fill="url(#dot-grid-1)" />
              </svg>

              {/* Right dot grid (subtle and visible on sm+) */}
              <svg width="80" fill="none" className="absolute -right-6 lg:-right-8 bottom-[5%] text-accent/30 w-12 lg:w-16 h-28 lg:h-36 pointer-events-none hidden sm:block" viewBox="0 0 80 144">
                <defs>
                  <pattern id="dot-grid-2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="80" height="144" fill="url(#dot-grid-2)" />
              </svg>

              {/* Outer Card with border gradient - compact on mobile, full size on desktop */}
              <div className="w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] md:w-[310px] md:h-[390px] lg:w-[350px] lg:h-[430px] rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent p-[2px] shadow-2xl relative z-10">
                <div
                  className="w-full h-full rounded-[1.9rem] lg:rounded-[2.4rem] bg-background/90 overflow-visible relative group cursor-pointer"
                  onMouseEnter={() => setIsHudActive(true)}
                  onMouseLeave={() => setIsHudActive(false)}
                  onClick={() => setIsHudActive((prev) => !prev)}
                >
                  {!isImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/10 animate-pulse rounded-[1.9rem] lg:rounded-[2.4rem]">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                    </div>
                  )}
                  <figure className="w-full h-full">
                    <img
                      src="/mohan-reddy-full-stack-developer.webp"
                      alt="Mohan Reddy - Full Stack Software Developer and Android Engineer based in India"
                      title="Mohan Reddy Professional Profile Photo"
                      width="350"
                      height="430"
                      loading="eager"
                      onLoad={() => setIsImageLoaded(true)}
                      className={`w-full h-full object-cover rounded-[1.9rem] lg:rounded-[2.4rem] transition-all duration-700 group-hover:scale-105 group-hover:brightness-75 ${isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                    />
                    <figcaption className="sr-only">Mohan Reddy - Full Stack Developer Profile Photo</figcaption>
                  </figure>

                  <CyberHUD isVisible={isHudActive} />

                  {/* Badge */}
                  <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-foreground/10 flex items-center gap-1.5 sm:gap-2 shadow-lg z-20 whitespace-nowrap">
                    <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-foreground tracking-wide font-grotesk">
                      Available for opportunities
                    </span>
                  </div>
                </div>
              </div>

              {/* Ambient Glows */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-24 h-24 lg:w-32 lg:h-32 bg-accent/30 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
