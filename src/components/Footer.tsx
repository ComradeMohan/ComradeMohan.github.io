import { Code2, Award, GraduationCap, Trophy, Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/35 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <a 
            href="https://github.com/ComradeMohan" 
            target="_blank" 
            rel="noopener noreferrer me" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mmohanreddy/" 
            target="_blank" 
            rel="noopener noreferrer me" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://www.instagram.com/comrade_mohan666/" 
            target="_blank" 
            rel="noopener noreferrer me" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="mailto:madhiremohanreddy@gmail.com" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Email Address"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Site Footer Navigation for Search Engine Indexing */}
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-6 text-xs font-grotesk text-muted-foreground" aria-label="Footer Navigation">
          <a href="/#home" className="hover:text-primary transition-colors">Home</a>
          <a href="/about" className="hover:text-primary transition-colors">About Me</a>
          <a href="/#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="/#projects" className="hover:text-primary transition-colors">Case Studies</a>
          <a href="/case-study/saveethahub" className="hover:text-primary transition-colors">SaveethaHub Architecture</a>
          <a href="/case-study/univault" className="hover:text-primary transition-colors">UniVault Architecture</a>
          <a href="/blog" className="hover:text-primary transition-colors">Technical Articles</a>
          <a href="/developer" className="hover:text-primary transition-colors">Profile Dashboard</a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground font-grotesk text-center">
          © {new Date().getFullYear()} <span className="text-primary font-semibold font-outfit">@comrademohan</span>. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
