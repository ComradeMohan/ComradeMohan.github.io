import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = ["Web Developer", "Freelancer", "Youtuber", "Cyber Expert"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
    { value: "2+", label: "Years Experience" },
    { value: "15+", label: "Technologies" },
    { value: "10+", label: "Projects" },
    { value: "500+", label: "Code Commits" },
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
              Passionate Full Stack Developer crafting digital experiences with modern technologies.
              Turning ideas into elegant, functional solutions.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-white hover:text-white hover:bg-white/10 transition-colors">
                <a href="https://github.com/comrademohan" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5" /></a>
              </Button>
              <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors">
                <a href="https://www.linkedin.com/in/mohan-reddy-39b989250/" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></a>
              </Button>
              <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors">
                <a href="https://www.instagram.com/mr_comrade_07/" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5" /></a>
              </Button>
              <Button asChild className="ml-2 bg-primary hover:bg-primary/80">
                <a href="/mohan_resume_.pdf" download>
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
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-secondary flex items-center justify-center text-4xl lg:text-6xl font-extrabold font-outfit text-primary">
                  MR
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
