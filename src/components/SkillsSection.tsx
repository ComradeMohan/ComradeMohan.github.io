import { motion } from "framer-motion";

const skills = [
  { name: "HTML", percent: 80 },
  { name: "CSS", percent: 85 },
  { name: "JavaScript", percent: 70 },
  { name: "Java", percent: 87 },
  { name: "Python", percent: 50 },
  { name: "Video Editing", percent: 60 },
  { name: "Communication", percent: 90 },
  { name: "Data Analysis", percent: 65 },
];

const techIcons = [
  "Angular", "JavaScript", "Node.js", "HTML5", "AWS", "GitLab", "React", "TypeScript",
  "Python", "Docker", "MongoDB", "PostgreSQL", "Firebase", "Figma", "Git", "Linux",
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
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground font-outfit">{skill.name}</span>
                <span className="text-sm text-primary font-bold font-mono">{skill.percent}%</span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Marquee */}
        <div className="overflow-hidden py-8">
          <div className="animate-marquee flex gap-12 whitespace-nowrap">
            {[...techIcons, ...techIcons].map((tech, i) => (
              <span
                key={i}
                className="text-lg font-mono text-muted-foreground hover:text-primary transition-colors px-4 py-2 border border-border rounded-lg"
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
