import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Cpu,
  Terminal,
  CheckCircle2,
  Activity,
  Layers,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Globe,
    badge: "Primary",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3", "Vite", "Framer Motion"],
  },
  {
    id: "java-core",
    title: "Java & Core",
    icon: Terminal,
    badge: "OCP Certified",
    skills: ["Java SE 17", "Data Structures & DSA", "OOP Principles", "Python", "C / C++"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Server,
    badge: "Server-Side",
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Supabase", "JWT / OAuth"],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    badge: "SQL & NoSQL",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL"],
  },
  {
    id: "devops-cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    badge: "OCI Certified",
    skills: ["AWS", "Docker", "OCI Cloud", "Git / GitHub", "CI/CD Pipelines", "Linux"],
  },
  {
    id: "ai-mobile",
    title: "AI & Mobile",
    icon: Cpu,
    badge: "Android & ML",
    skills: ["Android (Kotlin)", "OpenCV", "Machine Learning", "Pandas", "TensorFlow", "UniVault App"],
  },
];

const coreProficiencies = [
  { name: "React / Next.js", level: 90 },
  { name: "Java SE 17 (OCP Certified)", level: 87 },
  { name: "TypeScript", level: 85 },
  { name: "Data Structures & Algorithms", level: 84 },
  { name: "Node.js & Express", level: 82 },
  { name: "Cloud & DevOps (AWS/OCI/Docker)", level: 78 },
];

const techMarquee = [
  "React", "TypeScript", "Next.js", "Java 17", "Python", "Node.js", "AWS", "Docker",
  "PostgreSQL", "MongoDB", "Tailwind CSS", "Kotlin", "Git", "Figma", "Redis", "GraphQL",
  "TensorFlow", "Supabase", "Linux", "Firebase", "Vercel", "OpenCV",
];

// Counting Number Component for smooth count-up from 0 to value
const CountUpNumber = ({ target, isVisible }: { target: number; isVisible: boolean }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const duration = 1200; // 1.2s smooth count-up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(easeProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  return <span>{current}%</span>;
};

const TechIcon = ({ name, className = "w-3.5 h-3.5 shrink-0" }: { name: string; className?: string }) => {
  switch (name) {
    case "React":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.536 7.634c.83 0 1.54.187 2.13.56.59.373.978.89 1.164 1.55l-2.08.85c-.097-.367-.282-.647-.555-.84-.273-.193-.655-.29-1.145-.29-.63 0-1.135.197-1.515.59-.38.393-.57.94-.57 1.64v.05c0 .7.195 1.25.585 1.65.39.4 1.05.79 1.98 1.17 1.29.53 2.235 1.13 2.835 1.8.6.67.9 1.54.9 2.61v.05c0 1.44-.51 2.575-1.53 3.405-1.02.83-2.39 1.245-4.11 1.245-1.39 0-2.58-.32-3.57-.96-.99-.64-1.59-1.57-1.8-2.79l2.16-.62c.12.69.41 1.2.87 1.53.46.33 1.09.495 1.89.495.73 0 1.325-.19 1.785-.57.46-.38.69-.89.69-1.53v-.05c0-.68-.2-1.22-.6-1.62-.4-.4-1.07-.79-2.01-1.17-1.26-.52-2.18-1.12-2.76-1.8-.58-.68-.87-1.54-.87-2.58v-.05c0-1.37.5-2.465 1.5-3.285 1-.82 2.31-1.23 3.93-1.23zm-9.336.21h7.02v2.01h-2.34v10.98H7.655V9.854H5.325V7.844z" />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current text-foreground`}>
          <path d="M18.665 21.978l-7.392-9.614v9.614H9.006V2.022h2.267l7.392 9.614V2.022h2.267v19.956h-2.267zm-13.33 0l-5.335-6.93v6.93H0V2.022h2.267l5.335 6.93V2.022h2.267v19.956H5.335z" />
        </svg>
      );
    case "Java 17":
    case "Java SE 17":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#ED8B00" d="M8.851 18.56s-.917.534.667.708c2.309.253 3.796.222 6.551-.253 0 0 .762.434 1.543.766-4.908 1.748-11.233-.075-8.761-1.221zm-1.077-2.618s-1.037.747.536.953c2.909.38 5.753.331 9.479-.443 0 0 .543.348 1.134.618-5.748 1.942-13.626.31-11.149-1.128zm10.743-4.004c.828.917-.468 2.062-.468 2.062s2.21-.954 1.34-2.528c-.897-1.62-3.037-2.023-3.037-2.023s1.337.662 2.165 2.489zm-4.708-8.176s3.149 2.502-1.944 6.32c-4.108 3.056-1.123 4.887 0 6.945-2.825-2.064-4.882-3.921-3.486-5.999 1.954-2.909 6.273-3.978 5.43-7.266zm-4.568 18.428c3.966.257 8.049-.125 11.218-1.503l.429.622c-7.391 3.253-15.827.604-11.647-.881zm13.784-5.385s.896-.649.972-1.171c.076-.522-.303-.84-.908-.522-.605.318-.832.648-.832.648s.53-.159.98.159c.454.318-.212.886-.212.886zM4.62 13.916s-2.083 1.174.568 1.48c4.276.492 8.948.337 14.183-.878 0 0-.909.529-1.969.878-6.479 1.761-15.63.456-12.782-1.48zM14.07 0s3.258 2.59-2.012 6.54c-4.251 3.163-1.162 5.058 0 7.189-2.923-2.137-5.053-4.06-3.608-6.21C10.474 4.509 14.943 3.4 14.07 0z" />
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3776AB" d="M11.914 0C5.824 0 6.19 2.65 6.19 2.65l.006 2.744h5.81v.827H3.92S0 5.766 0 11.892c0 6.124 3.42 5.918 3.42 5.918h2.04v-2.868s-.11-3.42 3.366-3.42h5.77s3.256.052 3.256-3.15V3.15S18.39 0 11.914 0zm-3.21 1.884a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02z" />
          <path fill="#FFD43B" d="M12.086 24c6.09 0 5.724-2.65 5.724-2.65l-.006-2.744h-5.81v-.827h8.086s3.92.455 3.92-5.67c0-6.125-3.42-5.92-3.42-5.92h-2.04v2.87s.11 3.42-3.366 3.42h-5.77s-3.256-.053-3.256 3.15v5.228S5.61 24 12.086 24zm3.21-1.884a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#5FA04E" d="M12 1.6l8.8 5.1v10.6L12 22.4 3.2 17.3V6.7L12 1.6zm0 2.3L5.2 8.4v7.2L12 19.6l6.8-4V8.4L12 3.9zm-1 3.5h2v4.2l3.4-3.4h2.4l-3.8 3.8 4 4.5h-2.5l-3.1-3.6-.4.4v3.2h-2V7.4z" />
        </svg>
      );
    case "AWS":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FF9900" d="M12.63 15.39c-2.73 0-5.18-1.02-7.14-2.74-.23-.2-.24-.55-.03-.77.2-.22.55-.23.77-.04 1.78 1.55 4.02 2.47 6.4 2.47 3.2 0 6.07-1.44 8.04-3.79.19-.23.53-.26.76-.08.23.19.26.54.07.77-2.18 2.59-5.36 4.18-8.87 4.18z" />
          <path fill="#FF9900" d="M21.98 11.75c-.32.06-.6-.18-.63-.5-.03-.23.1-.46.32-.54l.8-.29c.14-.05.28.02.33.16l.29.8c.08.22-.04.47-.26.55-.22.08-.47-.04-.55-.26l-.15-.42-.15.5z" />
          <path fill="#232F3E" className="dark:fill-white" d="M7.4 6.2h1.6l2.1 6.8H9.6L9.1 11H6.9l-.5 2H5l2.4-6.8zm1.4 3.6l-.7-2.4-.7 2.4h1.4zm5.5-3.6h1.5l1.3 4.9 1.3-4.9h1.5l-2 6.8h-1.6l-1.3-4.6-1.3 4.6H12.3l-2-6.8z" />
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.76 9.89c-.614-.424-1.57-.488-2.38-.344-.127-.584-.46-1.127-.978-1.55-.91-.74-2.164-.913-3.26-.454-.108.045-.213.1-.31.162a.185.185 0 00-.077.165v2.986c0 .103.083.186.185.186h.022c.94-.038 1.88.225 2.628.75.894.628 1.408 1.63 1.408 2.748 0 3.73-3.32 6.76-7.416 6.76-2.617 0-4.993-1.246-6.353-3.238-.396-.58-.69-1.228-.865-1.916H.482a.185.185 0 00-.185.185C.28 19.34 2.87 22.04 6.78 22.04c4.685 0 8.498-3.46 8.528-7.75.002-.132.062-.256.166-.337 1.848-1.428 4.793-1.04 6.368.188.136.106.326.096.446-.026.47-.48.973-1.2 1.48-2.12.302-.55.513-1.122.617-1.685.023-.127-.05-.25-.17-.294l-.455-.126z" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#4169E1" d="M12.016 0C5.38 0 0 5.38 0 12.016c0 6.637 5.38 12.017 12.016 12.017 6.637 0 12.017-5.38 12.017-12.017C24.033 5.38 18.653 0 12.016 0zm3.87 17.51c-.6.44-1.38.65-2.28.65-.63 0-1.24-.1-1.81-.31-.57-.2-1.06-.51-1.47-.9-.41-.4-.73-.89-.94-1.46-.22-.57-.3-1.22-.24-1.93.06-.71.26-1.37.6-1.95.34-.58.8-1.04 1.37-1.38.57-.33 1.25-.5 2.01-.5.67 0 1.29.13 1.83.38.54.25.99.6 1.34 1.05l-1.38 1.13c-.23-.3-.51-.53-.84-.69-.33-.16-.71-.24-1.12-.24-.51 0-.96.12-1.34.36-.38.24-.68.57-.89 1-.21.42-.32.92-.32 1.48 0 .54.1 1.02.3 1.43.2.4.49.72.86.95.37.23.82.35 1.35.35.45 0 .86-.09 1.23-.26.37-.17.68-.42.94-.74l1.39 1.04zM8.5 7.5h7v1.8h-4.9v2.1h4.4v1.8h-4.4v3.3H8.5V7.5z" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#47A248" d="M12 0C11.666 0 11.233.242 11.083.56c-1.399 2.97-6.242 10.36-4.526 16.035 1.235 4.084 4.542 6.557 5.253 7.086.113.084.25.127.387.127.135 0 .27-.043.383-.125.713-.53 4.02-3.004 5.256-7.09 1.714-5.674-3.13-13.064-4.53-16.034C12.756.242 12.332 0 12 0zm.014 3.096c1.614 2.87 4.793 9.07 3.528 13.256-.88 2.915-3.076 4.966-3.528 5.37V3.096z" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    default:
      return null;
  }
};

export const SkillsSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const proficiencyRef = useRef<HTMLDivElement>(null);
  const isProficiencyInView = useInView(proficiencyRef, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="pt-2 pb-12 sm:pt-3 sm:pb-16 scroll-mt-20 relative bg-background/50">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-primary/6 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit tracking-tight mb-3">
            Skills & <span className="text-primary">Tech</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-grotesk max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Technologies and tools I work with to build modern, scalable web platforms and software applications.
          </p>
        </div>

        {/* INTERACTIVE BENTO GRID WITH CATEGORY FOCUS HOVER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skillCategories.map((cat, index) => {
            const IconComponent = cat.icon;
            const isHovered = hoveredCategory === cat.id;
            const isDimmed = hoveredCategory !== null && !isHovered;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                animate={{
                  scale: isHovered ? 1.025 : isDimmed ? 0.98 : 1,
                  opacity: isDimmed ? 0.65 : 1,
                }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="transition-all duration-300"
              >
                <SpotlightCard
                  spotlightColor={isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(var(--primary) / 0.14)"}
                  className={`p-6 relative group h-full rounded-2xl border transition-all duration-300 ${isHovered
                    ? "border-primary/60 shadow-lg shadow-primary/10 bg-card/90"
                    : "border-border/80 bg-card/60"
                    }`}
                >
                  {/* Top Bar: Icon, Title, Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border transition-colors duration-300 ${isHovered ? "bg-primary/20 border-primary/40 text-primary" : "bg-primary/10 border-primary/20 text-primary"
                        }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-foreground font-outfit text-base sm:text-lg">
                        {cat.title}
                      </h3>
                    </div>
                    {cat.badge && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Skill Badges with Micro-Interaction */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.06, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="text-xs px-3 py-1.5 rounded-lg font-mono border bg-secondary/60 text-muted-foreground border-border/70 hover:text-foreground hover:border-primary/40 hover:bg-card transition-all cursor-default shadow-2xs"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* CORE PROFICIENCY: SCROLL-DRIVEN DATA VISUALIZATION WITH SMOOTH COUNT-UP */}
        <div
          ref={proficiencyRef}
          className="max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-card/75 border border-border/90 backdrop-blur-md shadow-xl relative overflow-hidden"
        >
          {/* Subtle accent border top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-orange-500 to-accent" />

          <div className="flex items-center justify-between gap-2 mb-8">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground font-outfit">
                Core <span className="text-primary">Proficiency</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-secondary/60 border border-border/60">
              Verified Technical Benchmarks
            </span>
          </div>

          <div className="space-y-5">
            {coreProficiencies.map((item, i) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-semibold text-foreground font-outfit flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item.name}
                  </span>
                  <span className="font-mono font-bold text-primary text-sm sm:text-base">
                    <CountUpNumber target={item.level} isVisible={isProficiencyInView} />
                  </span>
                </div>

                {/* Progress Bar with Shimmer Animation */}
                <div className="h-2.5 sm:h-3 bg-secondary/80 rounded-full overflow-hidden relative p-[1px] border border-border/50">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-orange-500 to-accent relative"
                    initial={{ width: 0 }}
                    animate={isProficiencyInView ? { width: `${item.level}%` } : { width: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 1.2,
                      delay: prefersReducedMotion ? 0 : i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH MARQUEE WITH PAUSE ON HOVER */}
        <div className="relative overflow-hidden py-4 border-t border-b border-border/70 bg-card/30 rounded-xl group">
          <div className="animate-marquee group-hover:[animation-play-state:paused] flex gap-6 whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground transition-all duration-200 px-3.5 py-1.5 rounded-lg border border-border/50 bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-sm cursor-default"
              >
                <TechIcon name={tech} className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
