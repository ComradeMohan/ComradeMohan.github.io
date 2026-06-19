import { Code2, Award, GraduationCap, Trophy, Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/35 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Compact Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl border border-border/40 bg-secondary/20 dark:bg-black/25 mb-8 max-w-5xl mx-auto items-center">
          {/* Projects Completed */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-outfit font-extrabold text-foreground leading-tight">10+</span>
              <span className="text-[10px] font-bold text-foreground/90 font-outfit uppercase tracking-wider leading-snug">Projects Completed</span>
              <span className="text-[9px] text-muted-foreground font-grotesk leading-none mt-0.5">Full Stack & Research</span>
            </div>
          </div>

          {/* Certifications Earned */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-outfit font-extrabold text-foreground leading-tight">6+</span>
              <span className="text-[10px] font-bold text-foreground/90 font-outfit uppercase tracking-wider leading-snug">Certifications Earned</span>
              <span className="text-[9px] text-muted-foreground font-grotesk leading-none mt-0.5">Professional & Technical</span>
            </div>
          </div>

          {/* CGPA */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-outfit font-extrabold text-foreground leading-tight">8.61</span>
              <span className="text-[10px] font-bold text-foreground/90 font-outfit uppercase tracking-wider leading-snug">CGPA</span>
              <span className="text-[9px] text-muted-foreground font-grotesk leading-none mt-0.5">Academic Performance</span>
            </div>
          </div>

          {/* Graduation Year */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-outfit font-extrabold text-foreground leading-tight">2026</span>
              <span className="text-[10px] font-bold text-foreground/90 font-outfit uppercase tracking-wider leading-snug">Graduation Year</span>
              <span className="text-[9px] text-muted-foreground font-grotesk leading-none mt-0.5">B.E. Computer Science</span>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        {/* <div className="flex justify-center items-center gap-6 mb-6">
          <a 
            href="https://github.com/ComradeMohan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mmohanreddy/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://www.instagram.com/comrade_mohan666/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="mailto:madhiremohanreddy@gmail.com" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div> */}

        {/* Copyright */}
        <p className="text-xs text-muted-foreground font-grotesk text-center">
          © {new Date().getFullYear()} <span className="text-primary font-semibold font-outfit">@comrademohan</span>. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
