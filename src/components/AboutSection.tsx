import { motion } from "framer-motion";
import { MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Saveetha School of Engineering (SIMATS)",
    duration: "2022 – 2026",
    location: "Chennai, Tamil Nadu",
    grade: "CGPA: 8.646 / 10",
  },
  {
    degree: "Intermediate (MPC + Computer Science)",
    school: "Loyola Public School",
    duration: "2020 – 2022",
    location: "Guntur, Andhra Pradesh",
    grade: "Percentage: 81.6%",
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
  return (
    <section id="about" className="pb-12 sm:pb-16 scroll-mt-20 md:scroll-mt-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-4xl font-extrabold mb-2 font-outfit">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Biography & Interests */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-outfit">
                Passionate about{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Software Development
                </span>
              </h3>

              <p className="text-muted-foreground leading-relaxed font-grotesk">
                Final-year Computer Science and Engineering student at Saveetha School of Engineering (SIMATS), Chennai, with a{" "}
                <StaggeredHighlight delay={0.3}>CGPA of 8.646</StaggeredHighlight>. I enjoy building practical software that solves real problems and can be used beyond the classroom.
              </p>
              <p className="text-muted-foreground leading-relaxed font-grotesk">
                I have independently built{" "}
                <StaggeredHighlight delay={0.75}>SaveethaHub</StaggeredHighlight>, an academic platform using React, Supabase, Firebase, and AI features, and{" "}
                <StaggeredHighlight delay={1.2}>UniVault</StaggeredHighlight>, an Android exam-preparation app published on the Google Play Store. I also hold the{" "}
                <StaggeredHighlight delay={1.65}>Oracle Certified Professional: Java SE 17 Developer</StaggeredHighlight>{" "}
                certification and am strengthening my skills in data structures, algorithms, and full-stack development.
              </p>
            </div>

            {/* Core Interests */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 font-outfit">
                Core Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-sm text-foreground/90 font-grotesk flex items-center transition-colors duration-300 hover:border-primary/30"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Link to Full Standalone About Biography Page */}
            <div className="!mt-4 pt-0">
              <Button asChild className="rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-grotesk font-semibold group shadow-sm">
                <a href="/about">
                  Read Full Biography & Stats
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1.5">→</span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold font-outfit">Education</h3>

            <div className="relative pl-8 space-y-10 sm:space-y-12">
              {/* Timeline Track & Animated Line (starts exactly at the top circle node) */}
              <div className="absolute left-0 top-7 bottom-6 w-4 flex justify-center pointer-events-none z-0">
                {/* Static background timeline track */}
                <div className="w-0.5 h-full bg-border/60 rounded-full" />

                {/* Glowing animated line that draws downward starting from the top circle */}
                <motion.div
                  className="absolute top-0 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
                  style={{ originY: 0 }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, x: 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.15 + idx * 0.2, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Circle on timeline with spring pop-in - centered on the timeline line */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + idx * 0.2, type: "spring", stiffness: 350, damping: 15 }}
                    className="absolute -left-8 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)] z-10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  </motion.span>

                  {/* Card Content */}
                  <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg relative group overflow-hidden hover:shadow-primary/5 hover:-translate-y-0.5">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />

                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 font-jetbrains border border-primary/20">
                      {edu.duration}
                    </span>

                    <h4 className="text-xl font-bold text-foreground font-outfit mb-1 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-md font-medium text-foreground/80 font-grotesk mb-2">
                      {edu.school}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-4 border-t border-border pt-4">
                      <span className="flex items-center gap-1.5 font-grotesk">
                        <MapPin className="w-4 h-4 text-primary" /> {edu.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-foreground/90 font-grotesk">
                        <Award className="w-4 h-4 text-primary" /> {edu.grade}
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
