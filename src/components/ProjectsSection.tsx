import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Object Detection in Python",
    desc: "Real-time object detection system built with Python and OpenCV. Utilizes machine learning models for accurate identification and classification of objects.",
    link: "https://github.com/ComradeMohan/CSA0810PythonProgramming/tree/main/Various%20Object%20Identification",
    color: "from-slate-800/20 to-slate-800/5",
  },
  {
    title: "Saveetha Hub",
    desc: "A centralized platform for Saveetha University students to access resources, collaborate on projects, and stay connected with campus activities.",
    link: "https://saveetha-companion.netlify.app/",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    title: "Univault",
    desc: "A smart academic management platform designed for university students to track grades, calculate CGPA, manage courses, monitor attendance, and generate detailed academic reports — all in one centralized dashboard.",
    link: "https://play.google.com/store/apps/details?id=com.simats.univault",
    color: "from-blue-600/20 to-blue-600/5",
  },
  {
    title: "Skylink Deliveries",
    desc: "A logistics and delivery management system with real-time tracking, route optimization, and automated dispatch capabilities.",
    link: "https://skylinkdeliveries.netlify.app/",
    color: "from-sky-500/20 to-sky-500/5",
  },
  {
    title: "DevPulse ⭐",
    desc: "A full-stack GitHub analytics and widget generator that transforms developer activity into interactive, real-time insights. It provides dynamic widgets for READMEs, tracks commits, PRs, reviews, streaks, and delivers AI-powered tech stack evolution and profile analysis with public portfolio pages.",
    link: "https://devpulseweb.netlify.app/",
    color: "from-purple-600/20 to-purple-600/5",
  }

];

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 font-outfit">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Mobile: Cards with direct links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${project.color} border border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <h3 className="text-lg font-bold text-foreground mb-2 font-outfit">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 font-grotesk mb-4">{project.desc}</p>
              <span className="inline-flex items-center text-xs text-primary font-semibold font-mono gap-1 group-hover:gap-2 transition-all">
                View Project <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Desktop: Split view */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 snap-y snap-mandatory">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 snap-start ${activeIndex === i
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 bg-card"
                  }`}
                onClick={() => setActiveIndex(i)}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 font-outfit">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 font-grotesk">{project.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="sticky top-24"
          >
            <div className={`rounded-2xl bg-gradient-to-br ${projects[activeIndex].color} border border-border p-8 min-h-[400px] flex flex-col justify-between`}>
              <div>
                <h3 className="text-2xl font-extrabold text-foreground mb-4 font-outfit">{projects[activeIndex].title}</h3>
                <p className="text-muted-foreground leading-relaxed font-grotesk">{projects[activeIndex].desc}</p>
              </div>
              <Button asChild className="mt-8 bg-primary hover:bg-primary/80 self-start">
                <a href={projects[activeIndex].link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> View Project
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
