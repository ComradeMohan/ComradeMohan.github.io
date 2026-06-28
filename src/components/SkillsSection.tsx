import { motion } from "framer-motion";
import { Code2, Database, Cloud, Globe, Cpu, Layers, Smartphone, Terminal, Braces, FileCode, Server, Palette } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Globe,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Python", "Java", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL"],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["AWS", "Docker", "Git/GitHub", "CI/CD", "Linux"],
  },
  {
    title: "AI & Data",
    icon: Cpu,
    skills: ["Machine Learning", "OpenCV", "Pandas", "TensorFlow", "Data Analytics"],
  },
  {
    title: "Tools & Design",
    icon: Palette,
    skills: ["Figma", "VS Code", "Postman", "Video Editing", "UI/UX Design"],
  },
];

const coreSkills = [
  { name: "React / Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 78 },
  { name: "Java", level: 87 },
  { name: "Node.js", level: 82 },
  { name: "Cloud & DevOps", level: 70 },
];

const techMarquee = [
  "React", "TypeScript", "Next.js", "Python", "Node.js", "AWS", "Docker",
  "PostgreSQL", "MongoDB", "Tailwind", "Git", "Figma", "Redis", "GraphQL",
  "TensorFlow", "Linux", "Firebase", "Vercel",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 font-outfit">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-grotesk max-w-xl mx-auto">
            Technologies and tools I work with to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <cat.icon className="w-8 h-8 text-primary" />
                <h3 className="font-bold text-foreground font-outfit text-lg">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground font-mono border border-border group-hover:border-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core proficiency bars */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-foreground mb-8 font-outfit text-center"
          >
            Core <span className="text-primary">Proficiency</span>
          </motion.h3>
          <div className="space-y-5">
            {coreSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground font-outfit">{skill.name}</span>
                  <span className="text-sm text-primary font-bold font-mono">{skill.level}%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-foreground/10" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Marquee */}
        <div className="overflow-hidden py-6 border-t border-b border-border">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={i}
                className="text-base font-mono text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg border border-border/50 bg-card/50"
              >
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
