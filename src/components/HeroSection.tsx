import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const roles = ["Software Developer", "Freelancer", "Problem Solver", "Cyber Expert"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
    { value: "2026", label: "Graduate" },
    { value: "8.61", label: "CGPA" },
    { value: "10+", label: "Projects" },
    { value: "1000+", label: "Code Commits" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-muted-foreground text-lg mb-2 font-grotesk tracking-wide uppercase text-sm">Hi there, I'm</p>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 font-outfit tracking-tight">
              <span className="text-primary">Mohan</span>{" "}
              <span className="text-foreground">Reddy</span>
            </h1>
            <div className="h-10 mb-6">
              <span className="text-xl md:text-2xl font-mono text-accent tracking-wide">
                {displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-lg leading-relaxed font-grotesk">
             Product-Minded Developer crafting digital experiences with modern technologies. Turning ideas into elegant, functional solutions.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-white hover:text-white hover:bg-white/10 transition-colors" onClick={() => trackEvent("click", "social", "github_hero")}>
                <a href="https://github.com/comrademohan" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><Github className="w-5 h-5" /></a>
              </Button>
              <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors" onClick={() => trackEvent("click", "social", "linkedin_hero")}>
                <a href="https://www.linkedin.com/in/mmohanreddy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><Linkedin className="w-5 h-5" /></a>
              </Button>
              <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors" onClick={() => trackEvent("click", "social", "instagram_hero")}>
                <a href="https://www.instagram.com/comrade_mohan666/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile"><Instagram className="w-5 h-5" /></a>
              </Button>
              <Button asChild className="ml-2 bg-primary hover:bg-primary/80" onClick={() => trackEvent("download", "resume", "resume_hero")}>
                <a href="/mohan_resume_.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" /> Resume
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-3xl font-extrabold text-primary font-outfit">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-grotesk">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Left dot grid */}
              <svg width="80" fill="none" className="absolute -left-8 top-[15%] text-primary/30 w-16 h-36 pointer-events-none" viewBox="0 0 80 144">
                <defs>
                  <pattern id="dot-grid-1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="80" height="144" fill="url(#dot-grid-1)" />
              </svg>

              {/* Right dot grid */}
              <svg width="80" fill="none" className="absolute -right-8 bottom-[5%] text-accent/30 w-16 h-36 pointer-events-none" viewBox="0 0 80 144">
                <defs>
                  <pattern id="dot-grid-2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="80" height="144" fill="url(#dot-grid-2)" />
              </svg>

              {/* Outer Card with border gradient */}
              <div className="w-[320px] h-[400px] lg:w-[350px] lg:h-[430px] rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent p-[2px] shadow-2xl relative z-10">
                <div className="w-full h-full rounded-[2.4rem] bg-background/90 overflow-hidden relative group">
                  {!isImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/10 animate-pulse">
                      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                    </div>
                  )}
                  <img
                    src="/comrademohan.webp"
                    alt="Mohan Reddy"
                    onLoad={() => setIsImageLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                      isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                  
                  {/* Badge */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-5 py-2 rounded-full border border-foreground/10 flex items-center gap-2 shadow-lg z-20">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-foreground tracking-wide font-grotesk whitespace-nowrap">
                      Available for opportunities
                    </span>
                  </div>
                </div>
              </div>

              {/* Ambient Glows */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
