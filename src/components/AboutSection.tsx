import { motion } from "framer-motion";
import { MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Saveetha School of Engineering (SIMATS)",
    duration: "2022 – 2026",
    location: "Chennai, Tamil Nadu",
    grade: "CGPA: 8.61 / 10",
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
  "📚 Problem Solving & DSA",
  "☁️ Cloud & Modern Technologies"
];

const focusItems = [
  "🎯 Software Engineering Roles",
  "🎯 Full Stack Development",
  "🎯 Data Structures & Algorithms",
  "🎯 Internship Opportunities",
  "🎯 Product Development",
  "🎯 Continuous Learning"
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-extrabold mb-3 font-outfit">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
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
  Final-year Computer Science and Engineering student at Saveetha School of
  Engineering (SIMATS), Chennai, with a{" "}
  <span className="text-primary font-medium">CGPA of 8.61</span>. My focus
  is on building functional, real-world software rather than isolated
  academic exercises.
</p>
<p className="text-muted-foreground leading-relaxed font-grotesk">
  I have independently designed and built two complete products:{" "}
  <span className="text-primary font-medium">SaveethaHub</span>, an academic
  platform built with React, Supabase, and Firebase that integrates AI
  features for students, and{" "}
  <span className="text-primary font-medium">UniVault</span>, an Android
  exam-preparation app published on the Google Play Store. Both were built
  from initial concept through deployment.
</p>
<p className="text-muted-foreground leading-relaxed font-grotesk">
  I hold an{" "}
  <span className="text-primary font-medium">
    Oracle Certified Professional: Java SE 17 Developer
  </span>{" "}
  certification, and I continue to strengthen my foundation in data
  structures, algorithms, and full-stack development as I prepare to take
  on a software engineering role.
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
            <div className="pt-2">
              <Button asChild variant="outline" className="rounded-xl border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-grotesk group">
                <a href="/about">
                  Read Full Biography & Stats 
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1.5">→</span>
                </a>
              </Button>
            </div>

            {/* Career Focus */}
            {/* <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 font-outfit">
                Career Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {focusItems.map((focus) => (
                  <span
                    key={focus}
                    className="px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary font-grotesk flex items-center transition-colors duration-300 hover:bg-primary/20"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div> */}
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
            
            <div className="relative pl-6 border-l-2 border-primary/20 space-y-12">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Circle on timeline */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  </span>
                  
                  {/* Card Content */}
                  <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg relative group overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />
                    
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 font-jetbrains">
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
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
