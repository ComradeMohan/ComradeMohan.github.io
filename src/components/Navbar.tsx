import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Sun, Moon, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
      metaThemeColor?.setAttribute("content", "hsla(12, 65%, 88%, 1.00)");
    } else {
      metaThemeColor?.setAttribute("content", "hsl(289, 65%, 10%)");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (next) {
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
        metaThemeColor?.setAttribute("content", "hsl(289, 65%, 10%)");
      } else {
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
        metaThemeColor?.setAttribute("content", "hsl(289, 65%, 95%)");
      }
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // If scroll is near top of the page, force Home active to avoid layout calculation races on reload
      if (window.scrollY < 80) {
        setActiveSection("#home");
        return;
      }

      const sections = navLinks.map((link) => link.href.replace("#", ""));
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

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl">
      <div
        className="relative rounded-[2rem] border border-foreground/10 px-5 sm:px-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(var(--background) / 0.25), hsl(var(--background) / 0.15))",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          boxShadow:
            "0 8px 32px hsl(var(--primary) / 0.08), inset 0 1px 0 hsl(var(--foreground) / 0.08), inset 0 -1px 0 hsl(var(--foreground) / 0.04)",
        }}
      >
        {/* Liquid glass highlight */}
        <div
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 0%, hsl(var(--primary) / 0.12), transparent 70%), radial-gradient(ellipse 40% 40% at 80% 100%, hsl(var(--accent) / 0.08), transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between h-14">
          <a href="#home" className="font-outfit text-xl font-extrabold tracking-wider">
            <span className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]">COMRADE</span>
            <span className="text-foreground">MOHAN</span>
          </a>

          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 font-grotesk relative px-2 py-1 rounded-full ${activeSection === link.href
                  ? "text-primary"
                  : "text-foreground/60 hover:text-primary"
                  }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: "hsl(var(--primary) / 0.12)",
                      boxShadow: "0 0 12px hsl(var(--primary) / 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-primary transition-colors"
              style={{
                background: "hsl(var(--foreground) / 0.06)",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/80 shadow-[0_0_16px_hsl(var(--primary)/0.3)]">
              <a href="mailto:madhiremohanreddy@gmail.com">
                <Mail className="w-4 h-4 mr-1" /> Hire Me
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-primary transition-colors"
              style={{ background: "hsl(var(--foreground) / 0.06)" }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="text-foreground p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 md:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="mt-2 mx-2 rounded-[1.5rem] border border-foreground/10 p-4 flex flex-col gap-0.5 md:hidden z-50 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--background) / 0.35), hsl(var(--background) / 0.2))",
                backdropFilter: "blur(32px) saturate(1.8)",
                WebkitBackdropFilter: "blur(32px) saturate(1.8)",
                boxShadow:
                  "0 16px 48px hsl(var(--background) / 0.4), inset 0 1px 0 hsl(var(--foreground) / 0.08)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 30% 0%, hsl(var(--primary) / 0.1), transparent 60%)",
                }}
              />
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative text-sm font-medium transition-all font-outfit px-3 py-2 rounded-lg ${activeSection === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                    }`}
                  style={
                    activeSection === link.href
                      ? {
                        background: "hsl(var(--primary) / 0.1)",
                        boxShadow: "0 0 12px hsl(var(--primary) / 0.1)",
                      }
                      : {}
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button asChild className="mt-2 rounded-full bg-primary hover:bg-primary/80 shadow-[0_0_16px_hsl(var(--primary)/0.3)]">
                <a href="mailto:madhiremohanreddy@gmail.com">
                  <Mail className="w-4 h-4 mr-1" /> Hire Me
                </a>
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
