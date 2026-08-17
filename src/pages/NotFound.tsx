import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gamepad2, Trophy, RotateCcw, Home, Code2, ArrowLeft,
  Play, Sun, Moon, Compass, Sparkles, AlertCircle, FileText,
  Layers, Terminal, RefreshCw
} from "lucide-react";
import SEO from "@/components/SEO";
import { useTheme } from "@/hooks/useTheme";

// Grid configuration for Snake (Desktop Arcade)
const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [activeGame, setActiveGame] = useState<"snake" | "pong">("snake");

  // ==========================================
  // DESKTOP SNAKE GAME STATE
  // ==========================================
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    return parseInt(localStorage.getItem("mohan_snake_highscore") || "0", 10);
  });
  const [isSnakeRunning, setIsSnakeRunning] = useState(false);
  const [isSnakeGameOver, setIsSnakeGameOver] = useState(false);

  // Generate random food not on snake body
  const spawnFood = useCallback((currentSnake: Array<{ x: number; y: number }>) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetSnake = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(spawnFood(INITIAL_SNAKE));
    setSnakeScore(0);
    setIsSnakeGameOver(false);
    setIsSnakeRunning(true);
  };

  const snakeIntervalMs = Math.max(95, 170 - Math.floor(snakeScore / 40) * 10);

  // Snake game loop (Desktop)
  useEffect(() => {
    if (!isSnakeRunning || isSnakeGameOver || activeGame !== "snake") return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Wall collision check
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsSnakeGameOver(true);
          setIsSnakeRunning(false);
          return prevSnake;
        }

        // Self collision check
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setIsSnakeGameOver(true);
          setIsSnakeRunning(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Eat food check
        if (newHead.x === food.x && newHead.y === food.y) {
          setSnakeScore((s) => {
            const nextScore = s + 10;
            if (nextScore > snakeHighScore) {
              setSnakeHighScore(nextScore);
              localStorage.setItem("mohan_snake_highscore", nextScore.toString());
            }
            return nextScore;
          });
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, snakeIntervalMs);

    return () => clearInterval(interval);
  }, [isSnakeRunning, isSnakeGameOver, direction, food, snakeHighScore, spawnFood, activeGame, snakeIntervalMs]);

  // ==========================================
  // DESKTOP PONG GAME STATE
  // ==========================================
  const [playerY, setPlayerY] = useState(38);
  const [aiY, setAiY] = useState(38);
  const [ball, setBall] = useState({ x: 50, y: 50, dx: 0.55, dy: 0.38 });
  const [pongScore, setPongScore] = useState(0);
  const [pongHighScore, setPongHighScore] = useState(() => {
    return parseInt(localStorage.getItem("mohan_pong_highscore") || "0", 10);
  });
  const [isPongRunning, setIsPongRunning] = useState(false);
  const [isPongGameOver, setIsPongGameOver] = useState(false);
  const pongAreaRef = useRef<HTMLDivElement>(null);

  const resetPong = () => {
    setPlayerY(38);
    setAiY(38);
    setBall({ x: 50, y: 50, dx: 0.55, dy: 0.38 });
    setPongScore(0);
    setIsPongGameOver(false);
    setIsPongRunning(true);
  };

  useEffect(() => {
    if (!isPongRunning || isPongGameOver || activeGame !== "pong") return;

    const interval = setInterval(() => {
      setBall((prevBall) => {
        let newX = prevBall.x + prevBall.dx;
        let newY = prevBall.y + prevBall.dy;
        let newDx = prevBall.dx;
        let newDy = prevBall.dy;

        // Top/Bottom bounce
        if (newY <= 3 || newY >= 97) {
          newDy = -newDy;
        }

        // Player paddle hit
        if (newX <= 9 && newX >= 5) {
          if (newY >= playerY - 5 && newY <= playerY + 28) {
            newDx = Math.min(1.3, Math.abs(newDx) * 1.03);
            setPongScore((s) => {
              const next = s + 1;
              if (next > pongHighScore) {
                setPongHighScore(next);
                localStorage.setItem("mohan_pong_highscore", next.toString());
              }
              return next;
            });
          }
        }

        // AI paddle hit
        if (newX >= 91 && newX <= 95) {
          if (newY >= aiY - 5 && newY <= aiY + 28) {
            newDx = -Math.abs(newDx);
          }
        }

        // Miss check
        if (newX < 0) {
          setIsPongGameOver(true);
          setIsPongRunning(false);
          return prevBall;
        }
        if (newX > 100) {
          newDx = -newDx;
        }

        return { x: newX, y: newY, dx: newDx, dy: newDy };
      });

      // AI tracks ball with gentle lag
      setAiY((prev) => {
        const target = ball.y - 12;
        const diff = target - prev;
        return prev + diff * 0.10;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPongRunning, isPongGameOver, ball, playerY, aiY, pongHighScore, activeGame]);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h" && !isSnakeRunning && !isPongRunning) {
        navigate("/");
        return;
      }

      if (activeGame === "snake") {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          setDirection((prev) => (prev.y === 1 ? prev : { x: 0, y: -1 }));
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          setDirection((prev) => (prev.y === -1 ? prev : { x: 0, y: 1 }));
        } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          setDirection((prev) => (prev.x === 1 ? prev : { x: -1, y: 0 }));
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          setDirection((prev) => (prev.x === -1 ? prev : { x: 1, y: 0 }));
        } else if (e.key === " ") {
          setIsSnakeRunning((r) => !r);
        }
      } else if (activeGame === "pong") {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          setPlayerY((y) => Math.max(0, y - 8));
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          setPlayerY((y) => Math.min(76, y + 8));
        } else if (e.key === " ") {
          setIsPongRunning((r) => !r);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGame, isSnakeRunning, isPongRunning, navigate]);

  return (
    <>
      <SEO
        title="404 - Page Lost in Cyberspace | Mohan Reddy"
        description="404 Not Found. Return to Mohan Reddy's developer portfolio."
      />
      <div className="min-h-screen bg-background text-foreground font-grotesk flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none transition-colors duration-300">
        
        {/* Ambient Glows */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -bottom-20 -left-20 w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Top Header Row with Theme Toggle */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card hover:bg-accent border border-border text-xs font-semibold text-foreground shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-primary" /> Return to Portfolio
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/80 text-[11px] font-mono text-muted-foreground shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STATUS: 404</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-card hover:bg-accent border border-border text-foreground transition-colors shadow-xs active:scale-95"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </motion.header>

        {/* ========================================================================= */}
        {/* MOBILE VIEW: SLEEK CYBER 404 UI WITH GLITCH & CARDS (ZERO GAME SCROLL)   */}
        {/* ========================================================================= */}
        <div className="block lg:hidden relative z-10 max-w-md mx-auto w-full my-auto py-6 space-y-6 text-center">
          
          {/* Animated 404 Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center justify-center"
          >
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-primary/20 via-purple-500/15 to-amber-500/20 border border-primary/30 flex items-center justify-center shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              <span className="text-5xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-amber-400">
                404
              </span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-[2rem] border border-dashed border-primary/30 pointer-events-none"
            />
          </motion.div>

          {/* Text Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2 px-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold">
              <Compass className="w-3.5 h-3.5" /> ROUTE_NOT_FOUND
            </div>
            <h1 className="text-3xl font-black font-outfit text-foreground tracking-tight">
              Lost in Cyberspace
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The page you're trying to reach doesn't exist or was moved. Explore the main sections below:
            </p>
          </motion.div>

          {/* Terminal Path Debug Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card/90 backdrop-blur-md rounded-2xl border border-border p-3 text-left font-mono text-[11px] shadow-sm mx-2"
          >
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-border/60 text-muted-foreground text-[10px]">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>debug_route_trace.sh</span>
            </div>
            <div className="text-muted-foreground space-y-1">
              <div>$ GET {location.pathname}</div>
              <div className="text-rose-500 font-bold">» HTTP 404: Resource unreachable</div>
              <div className="text-emerald-500">» Redirect ready: [ Home / Stats / Resume ]</div>
            </div>
          </motion.div>

          {/* Mobile Quick Action Buttons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-2.5 px-2"
          >
            <Link
              to="/"
              className="p-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" /> Home Page
            </Link>
            <Link
              to="/developer"
              className="p-3 rounded-2xl bg-card hover:bg-accent text-foreground font-semibold text-xs border border-border flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <Code2 className="w-4 h-4 text-amber-500" /> Dev Stats
            </Link>
            <Link
              to="/resume"
              className="p-3 rounded-2xl bg-card hover:bg-accent text-foreground font-semibold text-xs border border-border flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4 text-primary" /> Resume
            </Link>
            <Link
              to="/blog"
              className="p-3 rounded-2xl bg-card hover:bg-accent text-foreground font-semibold text-xs border border-border flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <Layers className="w-4 h-4 text-purple-400" /> Tech Blog
            </Link>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / LAPTOP VIEW: FULL INTERACTIVE RETRO ARCADE (SNAKE & CYBER PONG) */}
        {/* ========================================================================= */}
        <main className="hidden lg:grid relative z-10 max-w-4xl mx-auto w-full my-auto py-6 grid-cols-12 gap-6 items-center">
          
          {/* Left: Info & Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="col-span-5 space-y-4 text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold animate-pulse">
              <Compass className="w-3.5 h-3.5" /> ERROR_404_PAGE_NOT_FOUND
            </div>

            <h1 className="text-5xl font-black text-foreground font-outfit tracking-tight">
              Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-amber-500">Cyberspace</span>
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              The link you followed doesn't exist or was moved. While you're here, take a calm breather and beat the arcade high score!
            </p>

            {/* Quick Link Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                to="/"
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95 transition-all"
              >
                <Home className="w-4 h-4" /> Home
              </Link>
              <Link
                to="/developer"
                className="px-4 py-2.5 rounded-xl bg-card hover:bg-accent text-foreground font-semibold text-xs border border-border transition-all flex items-center gap-2 shadow-xs active:scale-95"
              >
                <Code2 className="w-4 h-4 text-amber-500" /> Dev Stats
              </Link>
              <Link
                to="/resume"
                className="px-4 py-2.5 rounded-xl bg-card hover:bg-accent text-foreground font-semibold text-xs border border-border transition-all shadow-xs active:scale-95"
              >
                Resume
              </Link>
            </div>
          </motion.div>

          {/* Right: Retro Arcade Cabinet (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="col-span-7"
          >
            <div className="bg-card/90 dark:bg-[#0c0e14]/90 backdrop-blur-xl rounded-3xl border border-border p-6 shadow-2xl relative">
              
              {/* Cabinet Top Header & Game Switcher */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm text-foreground font-outfit">MOHAN-ARCADE</span>
                </div>

                {/* Game Tabs */}
                <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-[#06080b] border border-border/80 text-xs">
                  <button
                    onClick={() => {
                      setActiveGame("snake");
                      setIsPongRunning(false);
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      activeGame === "snake"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🐍 Snake
                  </button>
                  <button
                    onClick={() => {
                      setActiveGame("pong");
                      setIsSnakeRunning(false);
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      activeGame === "pong"
                        ? "bg-amber-500 text-black shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🏓 Cyber Pong
                  </button>
                </div>
              </div>

              {/* GAME 1: SNAKE */}
              {activeGame === "snake" && (
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-foreground font-bold">SCORE: <span className="text-emerald-500 font-bold">{snakeScore}</span></span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" /> HIGH: <span className="text-amber-500 font-bold">{snakeHighScore}</span>
                    </span>
                  </div>

                  {/* Snake Screen Matrix */}
                  <div className="aspect-square w-full max-w-[340px] mx-auto bg-slate-100/90 dark:bg-[#07090d] rounded-2xl border border-border/90 p-2 relative overflow-hidden shadow-inner flex items-center justify-center">
                    <div
                      className="w-full h-full grid gap-[1px]"
                      style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                      }}
                    >
                      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                        const x = index % GRID_SIZE;
                        const y = Math.floor(index / GRID_SIZE);

                        const isHead = snake[0].x === x && snake[0].y === y;
                        const isBody = snake.slice(1).some((seg) => seg.x === x && seg.y === y);
                        const isFood = food.x === x && food.y === y;

                        let bgClass = "bg-black/[0.03] dark:bg-white/[0.02]";
                        if (isHead) bgClass = "bg-emerald-500 rounded-[3px] shadow-[0_0_8px_rgba(16,185,129,0.5)]";
                        else if (isBody) bgClass = "bg-emerald-600/85 dark:bg-emerald-500/80 rounded-[2px]";
                        else if (isFood) bgClass = "bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]";

                        return <div key={index} className={`w-full h-full ${bgClass}`} />;
                      })}
                    </div>

                    {/* Overlay for Start / Game Over */}
                    {(!isSnakeRunning || isSnakeGameOver) && (
                      <div className="absolute inset-0 bg-background/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 text-center">
                        {isSnakeGameOver ? (
                          <>
                            <div className="text-lg font-bold text-rose-500 font-outfit">GAME OVER</div>
                            <div className="text-xs text-muted-foreground font-mono">Final Score: {snakeScore}</div>
                            <button
                              onClick={resetSnake}
                              className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> Play Again
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="text-base font-bold text-foreground font-outfit">Snake Byte</div>
                            <div className="text-[11px] text-muted-foreground max-w-[200px]">
                              Starts gently. Use Arrow keys or WASD to eat glowing bugs and grow.
                            </div>
                            <button
                              onClick={resetSnake}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-primary/25 active:scale-95 transition-all"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" /> Start Game
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GAME 2: CYBER PONG */}
              {activeGame === "pong" && (
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-foreground font-bold">RALLIES: <span className="text-amber-500 font-bold">{pongScore}</span></span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" /> BEST: <span className="text-amber-500 font-bold">{pongHighScore}</span>
                    </span>
                  </div>

                  {/* Pong Court */}
                  <div
                    ref={pongAreaRef}
                    onMouseMove={(e) => {
                      if (!isPongRunning || isPongGameOver) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const relY = ((e.clientY - rect.top) / rect.height) * 100;
                      setPlayerY(Math.max(0, Math.min(76, relY - 10)));
                    }}
                    className="aspect-video w-full max-w-[340px] mx-auto bg-slate-100/90 dark:bg-[#07090d] rounded-2xl border border-border/90 relative overflow-hidden shadow-inner cursor-ns-resize"
                  >
                    {/* Center Net Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-r border-dashed border-border" />

                    {/* Player Paddle (Left) */}
                    <div
                      className="absolute left-2 w-2 h-10 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                      style={{ top: `${playerY}%` }}
                    />

                    {/* AI Paddle (Right) */}
                    <div
                      className="absolute right-2 w-2 h-10 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                      style={{ top: `${aiY}%` }}
                    />

                    {/* Pong Ball */}
                    <div
                      className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
                    />

                    {/* Overlay for Start / Game Over */}
                    {(!isPongRunning || isPongGameOver) && (
                      <div className="absolute inset-0 bg-background/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 text-center">
                        {isPongGameOver ? (
                          <>
                            <div className="text-lg font-bold text-rose-500 font-outfit">BALL MISSED!</div>
                            <div className="text-xs text-muted-foreground font-mono">Rallies: {pongScore}</div>
                            <button
                              onClick={resetPong}
                              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> Replay Pong
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="text-base font-bold text-foreground font-outfit">Cyber Pong</div>
                            <div className="text-[11px] text-muted-foreground max-w-[200px]">
                              Starts gently. Move mouse up/down to deflect the ball.
                            </div>
                            <button
                              onClick={resetPong}
                              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" /> Start Pong
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cabinet Footer Controls Tip */}
              <div className="mt-3 pt-3 border-t border-border/60 text-center text-[10px] text-muted-foreground font-mono">
                💻 Desktop: Arrow Keys / WASD • Mouse to Move Paddle
              </div>

            </div>
          </motion.div>
        </main>

        {/* Bottom Status Ticker */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative z-10 max-w-5xl mx-auto w-full text-center text-[11px] text-muted-foreground font-grotesk pt-2"
        >
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-card border border-border text-[10px] font-mono text-foreground shadow-2xs">H</kbd> on your keyboard anytime to jump back Home.
        </motion.footer>
      </div>
    </>
  );
};

export default NotFound;
