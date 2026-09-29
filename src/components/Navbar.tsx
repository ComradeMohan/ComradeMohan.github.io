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

      <nav className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-50 mx-auto max-w-6xl flex flex-col items-center pointer-events-none">
        {/* Main Navbar Pill */}
        <div
          className="relative overflow-hidden w-full pointer-events-auto shadow-lg h-14 rounded-[2rem] border border-foreground/10"
          style={{
            backgroundColor: "hsl(var(--background) / 0.20)",
            boxShadow:
              "0 8px 32px hsl(var(--primary) / 0.08), inset 0 1px 0 hsl(var(--foreground) / 0.08), inset 0 -1px 0 hsl(var(--foreground) / 0.04)",
            backdropFilter: "blur(24px) saturate(1.6)",
            WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{
              background: "linear-gradient(135deg, hsl(var(--background) / 0.75), hsl(var(--background) / 0.55))",
            }}
          />

          <div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 0%, hsl(var(--primary) / 0.15), transparent 70%), radial-gradient(ellipse 40% 40% at 80% 100%, hsl(var(--accent) / 0.08), transparent 70%)",
            }}
          />

          <div className="relative flex items-center justify-between h-14 px-4 sm:px-8 w-full">
            <a 
              href="/" 
              onClick={handleLogoClick}
              id="navbar-logo"
              className={`font-outfit text-xl font-extrabold tracking-wider cursor-pointer select-none whitespace-nowrap shrink-0 transition-opacity duration-200 ${
                introActive ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <span className="text-[#FF5722] drop-shadow-[0_0_8px_rgba(255,87,34,0.4)]">MOHAN</span>{" "}
              <span className="text-foreground dark:text-white">REDDY</span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`text-sm font-medium transition-colors duration-200 font-grotesk relative px-3 py-1 rounded-full ${active
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-primary"
                      }`}
                  >
                    {link.label}
                    {active && (
                      <div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: "hsl(var(--primary) / 0.12)",
                          boxShadow: "0 0 12px hsl(var(--primary) / 0.15)",
                        }}
                      />
                    )}
                  </a>
                );
              })}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-foreground/60 hover:text-primary transition-colors cursor-pointer"
                style={{
                  background: "hsl(var(--foreground) / 0.06)",
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <div>
                <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/80 shadow-[0_0_16px_hsl(var(--primary)/0.3)]">
                  <a href={HIRE_ME_MAILTO}>
                    <Mail className="w-4 h-4 mr-1" /> Hire Me
                  </a>
                </Button>
              </div>
            </div>

            {/* Mobile Header Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full text-foreground/75 hover:text-[#FF5722] transition-all flex items-center justify-center border border-border/50 dark:border-white/10 active:scale-95 bg-secondary/40 dark:bg-white/5"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border active:scale-95 ${
                  mobileOpen
                    ? "border-[#FF5722] bg-[#FF5722]/15 text-[#FF5722] shadow-[0_0_12px_rgba(255,87,34,0.35)]"
                    : "border-border/50 dark:border-white/10 bg-secondary/40 dark:bg-white/5 text-foreground/80 hover:text-[#FF5722]"
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
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              className="w-full mt-2.5 rounded-2xl bg-card/95 dark:bg-[#0c1017]/95 border border-border/80 dark:border-[#22283a] backdrop-blur-2xl p-3 sm:p-4 shadow-2xl flex flex-col gap-1.5 md:hidden z-50 relative overflow-hidden pointer-events-auto"
            >
              {/* Subtle ambient gradient highlights */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF5722]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#FF5722]/5 rounded-full blur-xl pointer-events-none" />

              {/* Navigation Items */}
              <div className="space-y-1 relative z-10">
                {navLinks.map((link, i) => {
                  const active = isLinkActive(link.href);
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 + 0.04, duration: 0.2 }}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleNavLinkClick(e, link.href);
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-grotesk ${
                        active
                          ? "bg-[#FF5722]/12 text-[#FF5722] font-semibold border border-[#FF5722]/30 shadow-xs"
                          : "text-foreground/80 dark:text-slate-300 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            active
                              ? "bg-[#FF5722] text-white shadow-[0_0_10px_rgba(255,87,34,0.5)]"
                              : "bg-muted dark:bg-white/5 text-muted-foreground dark:text-slate-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium">{link.label}</span>
                      </div>

                      {active ? (
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#FF5722] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
                          <span>ACTIVE</span>
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* CTA button */}
              <div className="pt-2 mt-1 border-t border-border/70 dark:border-white/10 relative z-10">
                <a
                  href={HIRE_ME_MAILTO}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FF5722] text-white font-semibold text-sm shadow-[0_0_18px_rgba(255,87,34,0.4)] active:scale-[0.98] transition-all font-outfit"
                >
                  <Mail className="w-4 h-4" />
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
