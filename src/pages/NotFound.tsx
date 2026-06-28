import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [countdown, setCountdown] = useState(15);
  const [codeText, setCodeText] = useState("404");
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Track cursor movement for interactive light glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard shortcut: Press "H" to go home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  // Glitch effect on mouse enter
  const handleMouseEnter = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    const vals = ["400", "401", "402", "403", "404"];
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(vals[i++]);
      if (i === vals.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }
    }, 120);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background font-grotesk text-foreground select-none">
      <style>{`
        @keyframes moveBg {
          0% { transform: translate(-2%, 0) scale(1); }
          100% { transform: translate(2%, -3%) scale(1.1); }
        }
        .animate-bg-move {
          animation: moveBg 16s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Radial glow background blobs */}
      <div 
        className="absolute inset-[-20%] filter blur-[40px] opacity-60 pointer-events-none animate-bg-move"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.22), transparent 35%),
            radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.20), transparent 35%),
            radial-gradient(circle at 50% 90%, hsl(var(--primary) / 0.15), transparent 35%)
          `
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage: "radial-gradient(circle, black 45%, transparent 100%)",
          maskImage: "radial-gradient(circle, black 45%, transparent 100%)"
        }}
      />

      {/* Interactive mouse follow glow */}
      <div 
        ref={glowRef}
        className="absolute w-[280px] h-[280px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out filter blur-[60px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--accent) / 0.08) 100%)",
          left: "-999px",
          top: "-999px"
        }}
      />

      {/* Card container */}
      <div 
        className="relative z-10 w-[min(92%,720px)] rounded-[28px] border border-foreground/10 bg-card/30 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-300"
        style={{
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 hsl(var(--foreground) / 0.08)"
        }}
      >
        <h1 
          id="code"
          onMouseEnter={handleMouseEnter}
          className="font-grotesk text-8xl sm:text-[9rem] font-bold tracking-widest text-transparent cursor-default select-none"
          style={{
            WebkitTextStroke: "2px hsl(var(--primary))",
            textShadow: "0 0 40px hsl(var(--primary) / 0.15)",
          }}
        >
          {codeText}
        </h1>

        <h2 className="mt-4 font-outfit text-2xl sm:text-3xl font-semibold tracking-wide text-foreground">
          Lost in the Code?
        </h2>

        <p className="mx-auto my-6 max-w-[520px] font-outfit text-muted-foreground text-sm sm:text-base leading-relaxed">
          The page you're looking for doesn't exist, may have been moved, or the URL was typed incorrectly. Let's get you back to something awesome.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="px-7 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_12px_30px_hsl(var(--primary)/0.25)] hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              color: "hsl(var(--primary-foreground))"
            }}
          >
            🏠 Home
          </Link>
          <Link 
            to="/#projects" 
            className="px-7 py-3 rounded-full font-semibold border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            🚀 Projects
          </Link>
          <Link 
            to="/#contact" 
            className="px-7 py-3 rounded-full font-semibold border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            ✉ Contact
          </Link>
        </div>

        {/* Info / Auto-redirect info */}
        <div className="mt-8 font-outfit text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Press <kbd className="px-1.5 py-0.5 rounded border border-foreground/20 bg-foreground/5 text-foreground font-mono text-[10px]">H</kbd> anytime to return Home.<br />
          Redirecting automatically in <span className="font-semibold text-primary" id="count">{countdown}</span>s...
        </div>
      </div>
    </div>
  );
};

export default NotFound;
