import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Mail, 
  Sun, 
  Moon, 
  Home, 
  User, 
  Code2, 
  FolderGit2, 
  BookOpen, 
  Send,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "About", href: "/#about", icon: User },
  { label: "Skills", href: "/#skills", icon: Code2 },
  { label: "Projects", href: "/#projects", icon: FolderGit2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact", href: "/#contact", icon: Send },
];

export const HIRE_ME_MAILTO = `mailto:madhiremohanreddy@gmail.com?subject=${encodeURIComponent(
  "Hiring Inquiry / SDE Opportunity for Mohan Reddy"
)}&body=${encodeURIComponent(
  `Hi Mohan,\n\nWe came across your portfolio and would like to discuss an engineering opportunity with you.\n\nOpportunity Overview:\n- Company / Organization: \n- Role / Position: (e.g. SDE Intern / Full-Stack Engineer)\n- Employment Type: (Full-time / Internship / Contract)\n- Location / Work Mode: (Remote / Hybrid / On-site)\n- Estimated Timeline / Start Date: \n\nPlease let us know your availability for a brief introductory conversation.\n\nBest regards,\n[Your Name / Title]\n[Company / LinkedIn]`
)}`;

const Navbar = ({ skipEntryAnim: _skipEntryAnim = false, introActive = false }: { skipEntryAnim?: boolean; introActive?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      const id = hash.replace("#", "");
      if (location.pathname === "/") {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
          setActiveSection("#home");
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
          }
        }
      } else {
        navigate(href);
        setTimeout(() => {
          if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }, 150);
      }
    } else {
      navigate(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveSection("#home");
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (location.pathname === "/") {
        return activeSection === hash;
      }
      return false;
    }
    if (href === "/blog") {
      return location.pathname.startsWith("/blog");
    }
    return location.pathname === href;
  };

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (saved === "light") {
        setIsDark(false);
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        metaThemeColor?.setAttribute("content", "hsla(12, 65%, 88%, 1.00)");
      } else {
        setIsDark(true);
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        metaThemeColor?.setAttribute("content", "hsl(289, 65%, 10%)");
      }
    };
    handleThemeChange();

    window.addEventListener("storage", handleThemeChange);
    window.addEventListener("local-storage", handleThemeChange);
    return () => {
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener("local-storage", handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (next) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        metaThemeColor?.setAttribute("content", "hsl(289, 65%, 10%)");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        metaThemeColor?.setAttribute("content", "hsl(289, 65%, 95%)");
      }
      window.dispatchEvent(new Event("local-storage"));
      window.dispatchEvent(new Event("storage"));
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("#home");
        return;
      }

      const sections = navLinks
        .filter((link) => link.href.includes("#"))
        .map((link) => link.href.split("#")[1]);
      let current = "#home";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.height > 0 && rect.top <= 160) {
            current = `#${id}`;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarContent = (
    <>
      {/* Mobile Backdrop Blur Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md md:hidden z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-50 mx-auto max-w-5xl flex flex-col items-center pointer-events-none">
        {/* Main Navbar Pill */}
        <div className="relative w-full pointer-events-auto h-13 sm:h-14 rounded-full border border-border/70 dark:border-white/10 bg-background/80 dark:bg-[#070a12]/80 backdrop-blur-xl shadow-xs dark:shadow-md dark:shadow-black/30 px-3 sm:px-6 flex items-center justify-between transition-colors">
          <a 
            href="/" 
            onClick={handleLogoClick}
            id="navbar-logo"
            className={`font-outfit text-base sm:text-lg font-black tracking-tight cursor-pointer select-none whitespace-nowrap shrink-0 transition-opacity duration-200 flex items-center gap-1.5 ${
              introActive ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <span className="text-primary font-black">MOHAN</span>
            <span className="font-bold text-foreground">REDDY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`text-xs font-medium font-grotesk tracking-wide relative px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-secondary/90 dark:bg-white/[0.08] -z-10 border border-border/70 dark:border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer border border-border/50 dark:border-white/5"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>
            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-3.5 h-8 shadow-xs transition-all duration-200">
              <a href={HIRE_ME_MAILTO}>
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Hire Me
              </a>
            </Button>
          </div>

          {/* Mobile Header Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full text-foreground/80 hover:text-primary transition-all flex items-center justify-center border border-border/60 dark:border-white/10 active:scale-95 bg-secondary/40 dark:bg-white/5"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border active:scale-95 ${
                mobileOpen
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 dark:border-white/10 bg-secondary/40 dark:bg-white/5 text-foreground/80 hover:text-primary"
              }`}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              className="w-full mt-2 rounded-2xl bg-card/95 dark:bg-[#070a12]/95 border border-border/80 dark:border-white/10 backdrop-blur-2xl p-3 shadow-xl flex flex-col gap-1 md:hidden z-50 relative overflow-hidden pointer-events-auto"
            >
              {/* Navigation Items */}
              <div className="space-y-0.5 relative z-10">
                {navLinks.map((link, i) => {
                  const active = isLinkActive(link.href);
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 + 0.02, duration: 0.18 }}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleNavLinkClick(e, link.href);
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 font-grotesk ${
                        active
                          ? "bg-primary/10 text-primary font-semibold border border-primary/25"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted dark:bg-white/5 text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium">{link.label}</span>
                      </div>

                      {active ? (
                        <div className="flex items-center gap-1 font-mono text-[9px] text-primary font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>ACTIVE</span>
                        </div>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile CTA button */}
              <div className="pt-2 mt-1 border-t border-border/70 dark:border-white/10 relative z-10">
                <a
                  href={HIRE_ME_MAILTO}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-xs active:scale-[0.98] transition-all font-outfit"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Hire Me / Get in Touch</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );

  return createPortal(navbarContent, document.body);
};

export default Navbar;
