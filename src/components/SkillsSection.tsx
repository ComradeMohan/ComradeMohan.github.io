import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Cpu,
  Terminal,
  CheckCircle2,
  Activity,
  Box,
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

export const SkillsSection = () => {
  return (
    <section id="skills" className="pb-12 sm:pb-16 scroll-mt-20 md:scroll-mt-24 relative overflow-hidden bg-background/50">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit tracking-tight mb-3">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-3" />
          <p className="text-muted-foreground font-grotesk max-w-xl mx-auto text-sm sm:text-base">
            Technologies and tools I work with to build modern, scalable applications.
          </p>
        </motion.div>

        {/* COMPACT BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {skillCategories.map((cat, index) => {
            const IconComponent = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SpotlightCard
                  spotlightColor="hsl(var(--primary) / 0.16)"
                  className="p-5 relative group h-full"
                >
                  {/* Top Bar: Icon, Title, Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground font-outfit text-base sm:text-lg">
                        {cat.title}
                      </h3>
                    </div>
                    {cat.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.04, y: -1 }}
                        className="text-xs px-3 py-1.5 rounded-lg font-mono border bg-secondary/70 text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/30 group-hover:border-primary/20 transition-all cursor-default"
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

        {/* CORE PROFICIENCY LINES */}
        <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-card/60 border border-border/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground font-outfit">
              Core <span className="text-primary">Proficiency</span>
            </h3>
          </div>

          <div className="space-y-4">
            {coreProficiencies.map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                  <span className="font-medium text-foreground font-outfit flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {item.name}
                  </span>
                  <span className="font-mono font-bold text-primary">{item.level}%</span>
                </div>
                <div className="h-2.5 bg-secondary/80 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.06, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH MARQUEE */}
        <div className="relative overflow-hidden py-4 border-t border-b border-border/70 bg-card/30 rounded-xl">
          <div className="animate-marquee flex gap-6 whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground hover:text-primary transition-colors px-3 py-1 rounded-lg border border-border/50 bg-card/60"
              >
                <Box className="w-3 h-3 text-primary/70" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
