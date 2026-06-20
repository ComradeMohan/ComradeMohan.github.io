import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Github, ExternalLink, ArrowLeft, MessageSquare, 
  BookOpen, Calculator, Calendar, Plus, Trash, Sparkles 
} from "lucide-react";
import { Link } from "react-router-dom";

// CountUp Component for animating stats on scroll
const CountUp = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const endVal = parseInt(end.toString().replace(/,/g, ""));
    if (isNaN(endVal) || start === endVal) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / endVal), 8);
    const startTime = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime;
      if (timePassed >= totalMiliseconds) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        const progress = timePassed / totalMiliseconds;
        const easingProgress = progress * (2 - progress); // easeOutQuad
        setCount(Math.floor(endVal * easingProgress));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  const formatted = count.toLocaleString();
  return <span ref={ref}>{formatted}{suffix}</span>;
};

// Hand-Drawn SVG Components
const HandDrawnUnderline = () => (
  <svg className="absolute -bottom-3 left-0 w-full h-4 text-[#F05323] opacity-80 animate-doodle-vibrate" viewBox="0 0 100 10" preserveAspectRatio="none">
    <motion.path 
      d="M 1 5 C 20 2, 40 8, 60 4 C 80 1, 90 6, 99 3" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </svg>
);

const HandDrawnCircle = () => (
  <svg className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] text-[#F05323] pointer-events-none opacity-80 animate-doodle-vibrate" viewBox="0 0 100 100" preserveAspectRatio="none">
    <motion.path 
      d="M 5 50 C 5 20, 95 15, 95 50 C 95 85, 8 80, 10 50 C 12 25, 88 18, 90 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    />
  </svg>
);

const CurvedDivider = () => (
  <div className="w-full flex justify-center py-12 overflow-hidden">
    <svg className="w-full max-w-4xl h-8 text-orange-200" viewBox="0 0 1200 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8">
      <path d="M 0 20 Q 150 5, 300 20 T 600 20 T 900 20 T 1200 20" />
    </svg>
  </div>
);

const TornPaperDividerTop = () => (
  <div className="w-full h-8 bg-orange-100/30 overflow-hidden relative">
    <svg className="absolute bottom-0 w-full h-8 text-[#FAF6EE] fill-current animate-paper-vibrate" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0 L1200,0 L1200,80 L1170,75 L1140,85 L1110,78 L1080,82 L1050,75 L1020,83 L990,77 L960,81 L930,74 L900,85 L870,78 L840,82 L810,75 L780,83 L750,77 L720,81 L690,74 L660,85 L630,78 L600,82 L570,75 L540,83 L510,77 L480,81 L450,74 L420,85 L390,78 L360,82 L330,75 L300,83 L270,77 L240,81 L210,74 L180,85 L150,78 L120,82 L90,75 L60,83 L30,77 L0,81 Z" />
    </svg>
  </div>
);

const HandDrawnCheck = () => (
  <svg className="w-6 h-6 text-[#F05323] shrink-0 transform -rotate-6 animate-doodle-vibrate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M 4 12 C 6.5 13.5, 7.5 17.5, 9.5 18 C 12.5 13.5, 16.5 7.5, 20.5 4.5" 
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </svg>
);

const HandDrawnPin = () => (
  <motion.div 
    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
    animate={{ 
      rotate: [-3, 3, -3, 3, -3],
      x: ["-50%", "-48%", "-52%", "-48%", "-50%"]
    }}
    transition={{
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }}
  >
    <div className="w-4 h-4 bg-red-600 rounded-full shadow-md border border-red-700"></div>
    <div className="w-1 h-3 bg-slate-400 opacity-80 -mt-1"></div>
  </motion.div>
);

export default function SaveethaHubCaseStudy() {
  useEffect(() => {
    // Dynamic SEO Metadata for SaveethaHub Case Study
    document.title = "SaveethaHub Case Study | Mohan Reddy";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Case study on SaveethaHub: A comprehensive web application designed for students at SIMATS Saveetha University. Designed and developed by Mohan Reddy.");
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "SaveethaHub Case Study | Mohan Reddy");

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "Case study on SaveethaHub: A comprehensive web application designed for students at SIMATS Saveetha University. Designed and developed by Mohan Reddy.");

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", "SaveethaHub Case Study | Mohan Reddy");

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", "Case study on SaveethaHub: A comprehensive web application designed for students at SIMATS Saveetha University. Designed and developed by Mohan Reddy.");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', "https://comrademohan.netlify.app/case-study/saveethahub");
  }, []);

  // Stats Section Data
  const stats = [
    { value: "24706", label: "Search Clicks", sub: "Google Search (lifetime)", note: "real organic clicks! 🚀" },
    { value: "3800", label: "Active Users", sub: "Last 28 days", note: "highly active student base 👥", suffix: "+" },
    { value: "1700", label: "New Users", sub: "Last 28 days", note: "organic freshman onboarding! 🌱", suffix: "+" },
    { value: "50", label: "Avg Engagement", sub: "Per active user", note: "they actually stay & read! ⏱️", suffix: "s" },
  ];

  // CGPA Calculator State & Logic
  const [courses, setCourses] = useState([
    { id: 1, name: "Web Technology", grade: "O", credits: 4 },
    { id: 2, name: "Data Structures", grade: "A+", credits: 3 },
    { id: 3, name: "Firebase Backend", grade: "A", credits: 3 },
  ]);

  const gradePoints: { [key: string]: number } = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
  };

  const addCourse = () => {
    const id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id, name: `Course ${id}`, grade: "B+", credits: 3 }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: string, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      totalPoints += gradePoints[c.grade] * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
  };

  // Community Hub Simulator State & Logic
  const [threads, setThreads] = useState([
    {
      id: 1,
      author: "Adarsh (CSE)",
      content: "Does anyone have the Unit 3 Web Tech Notes? Our test is tomorrow!",
      replies: 2,
      tag: "Urgent 📝"
    },
    {
      id: 2,
      author: "Sneha (ECE)",
      content: "Firebase sync working flawlessly in the event feed today! Huge upgrade.",
      replies: 4,
      tag: "Feedback 🔥"
    }
  ]);
  const [newThreadContent, setNewThreadContent] = useState("");

  const handlePostThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadContent.trim()) return;
    const newThread = {
      id: threads.length + 1,
      author: "You (Student)",
      content: newThreadContent,
      replies: 0,
      tag: "General 💬"
    };
    setThreads([newThread, ...threads]);
    setNewThreadContent("");
  };

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-slate-800 font-outfit relative selection:bg-[#F05323] selection:text-white pb-24 overflow-x-hidden">
      
      {/* Background grid texture simulating paper */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Decorative floating sketch stars/dots */}
      <div className="absolute top-48 left-10 text-orange-300 font-handwritten text-4xl select-none hidden md:block">✦</div>
      <div className="absolute top-96 right-12 text-blue-300 font-handwritten text-4xl select-none rotate-12 hidden md:block">★</div>
      <div className="absolute bottom-[20%] left-8 text-orange-200 font-handwritten text-5xl select-none -rotate-12 hidden md:block">✎</div>

      {/* Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex gap-4">
          <a 
            href="https://github.com/ComradeMohan/saveetha-companion" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-orange-50 rounded-full transition-all border border-transparent hover:border-orange-100"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://saveetha-hub.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-orange-50 rounded-full transition-all border border-transparent hover:border-orange-100"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Section 1: Hero Block */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 bg-orange-100 text-[#F05323] text-sm font-semibold rounded-full mb-6 border border-orange-200"
        >
          Live Project · Web Platform
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative inline-block mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 font-grotesk select-none relative z-10 px-4">
            SaveethaHub
          </h1>
          <HandDrawnCircle />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium mt-4"
        >
          The centralized academic companion for Saveetha University students.
        </motion.p>

        {/* Hero Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-slate-200 shadow-sm"
        >
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Role</span>
            <span className="font-semibold text-slate-700 text-sm md:text-base">Solo Full Stack Dev</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Timeline</span>
            <span className="font-semibold text-slate-700 text-sm md:text-base">2023 – Present</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Platform</span>
            <span className="font-semibold text-slate-700 text-sm md:text-base">Web Application</span>
          </div>
        </motion.div>

        {/* Decorative arrow drawing attention downwards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hidden md:block"
        >
          <svg className="w-12 h-16 animate-bounce animate-doodle-vibrate" viewBox="0 0 50 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <motion.path 
              d="M25,10 Q35,50 25,90" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.path 
              d="M15,80 L25,90 L35,80" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
          <span className="font-handwritten text-blue-600 text-lg absolute left-14 top-8 w-32 text-left rotate-6">
            scroll down to read the story!
          </span>
        </motion.div>
      </section>

      {/* Torn paper partition */}
      <TornPaperDividerTop />

      {/* Section 2: The Story */}
      <section className="bg-orange-100/30 py-16 border-b border-orange-100">
        <motion.div 
          className="max-w-2xl mx-auto px-6 relative"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -left-12 top-0 text-blue-600 opacity-60 hidden lg:block">
            <span className="font-handwritten text-4xl">“</span>
          </div>
          
          <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-400 mb-6 font-grotesk">The Story</h2>
          
          <div className="text-lg md:text-xl text-slate-700 leading-relaxed space-y-6 font-medium relative">
            <p>
              SaveethaHub is a centralized web platform built for Saveetha University students to access study resources, collaborate on projects, and stay connected with campus life.
            </p>
            <p>
              It replaces the scattered mess of WhatsApp groups, random Google Drive links, and outdated notice boards that students were forced to rely on before. 
            </p>
            
            {/* Hand-drawn inline note callout */}
            <span className="font-handwritten text-blue-600 text-xl block mt-8 border-l-4 border-dashed border-blue-300 pl-4 py-1 rotate-1 max-w-md">
              "I wanted to build something I would actually use daily. It turned out 3.8K other students needed it too."
            </span>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Stat Band */}
      <section className="max-w-5xl mx-auto px-6 py-20 relative">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center font-grotesk relative inline-block left-1/2 -translate-x-1/2">
          Platform Performance
          <HandDrawnUnderline />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-between relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div>
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">{stat.label}</h3>
                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-grotesk">
                  <CountUp end={stat.value} suffix={stat.suffix || ""} />
                </div>
                <p className="text-slate-500 text-xs mt-1 font-semibold">{stat.sub}</p>
              </div>

              {/* Annotation labels underneath each stat card */}
              <div className="mt-6 border-t border-dashed border-slate-100 pt-3">
                <span className="font-handwritten text-blue-600 text-lg leading-tight block transform -rotate-1">
                  {stat.note}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-xl mx-auto text-center mt-12 text-slate-500 font-medium text-sm">
          * Source: Google Analytics & Search Console. These aren't projected numbers — this is a live platform with organic student traffic.
        </div>
      </section>

      <CurvedDivider />

      {/* Section 4: Why I Built This / Problem & Solution Diagram */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-grotesk relative inline-block">
            Why I Built This
            <HandDrawnUnderline />
          </h2>
          <p className="text-slate-500 text-lg mt-3 max-w-xl mx-auto font-medium">
            Bridging student frustration with a unified digital ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative">
          
          {/* Left: The Problem */}
          <motion.div 
            className="lg:col-span-5 bg-red-50/50 rounded-3xl p-8 border-2 border-red-100 relative flex flex-col justify-between"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-4 right-4 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
              BEFORE (The Chaos)
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-950 font-grotesk mb-6">The Problem</h3>
              <p className="text-red-900/80 mb-8 font-medium">
                Information was heavily fragmented across the campus. Students spent hours just trying to find essential resources.
              </p>
            </div>

            {/* Problem Bubbles Container */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm max-w-xs transform -rotate-1">
                <span className="font-bold text-xs text-red-500 block mb-1">WhatsApp Groups</span>
                <p className="text-sm font-medium text-slate-700">"Who has Unit 3 notes?" gets lost in 100+ spammed messages.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm max-w-xs ml-auto transform rotate-2">
                <span className="font-bold text-xs text-red-500 block mb-1">Google Drives</span>
                <p className="text-sm font-medium text-slate-700">Links constantly expire or files are unorganized.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm max-w-xs transform -rotate-2">
                <span className="font-bold text-xs text-red-500 block mb-1">Notice Boards</span>
                <p className="text-sm font-medium text-slate-700">Physical paper schedules missed by off-campus students.</p>
              </div>
            </div>
          </motion.div>

          {/* Middle: SVG connecting arrow */}
          <motion.div 
            className="lg:col-span-2 flex flex-col items-center justify-center min-h-[100px] lg:min-h-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="w-16 h-16 lg:w-full lg:h-40 text-orange-400 transform rotate-90 lg:rotate-0 animate-doodle-vibrate" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <motion.path 
                d="M 10 50 Q 50 20 90 50" 
                strokeDasharray="5 5" 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.path 
                d="M 75 35 L 90 50 L 75 65" 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
            <span className="font-handwritten text-[#F05323] text-xl absolute lg:-top-2 rotate-12 text-center w-36">
              one unified portal! 🎯
            </span>
          </motion.div>

          {/* Right: The Solution */}
          <motion.div 
            className="lg:col-span-5 bg-green-50/50 rounded-3xl p-8 border-2 border-green-100 relative flex flex-col justify-between"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              AFTER (The Solution)
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-950 font-grotesk mb-6">The Solution</h3>
              <p className="text-green-900/80 mb-8 font-medium">
                SaveethaHub functions as an all-in-one student portal containing tools tailored specifically to university curriculum.
              </p>
            </div>

            {/* Solution Highlights */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-green-200 shadow-sm transform rotate-1">
                <span className="font-bold text-xs text-green-600 block mb-1">📦 Study Materials Library</span>
                <p className="text-sm font-medium text-slate-700">Structured repository organized unit-wise for easy access.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-green-200 shadow-sm transform -rotate-1">
                <span className="font-bold text-xs text-green-600 block mb-1">💬 Real-time Community Hub</span>
                <p className="text-sm font-medium text-slate-700">Students communicate and share details instantly.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-green-200 shadow-sm transform rotate-2">
                <span className="font-bold text-xs text-green-600 block mb-1">🧮 Built-in CGPA Calculator</span>
                <p className="text-sm font-medium text-slate-700">Direct grade conversion mapped to Saveetha grading scheme.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 5: Tech Stack */}
      <section className="bg-[#FAF9F5]/40 text-slate-800 py-20 relative overflow-hidden border-y border-dashed border-slate-200">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold font-grotesk tracking-tight text-slate-900 mb-4">
            The Tech Stack Choice
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto mb-12 font-medium">
            Since I was building and shipping this project solo, developer velocity and real-time synchronization were my highest priorities.
          </p>

          {/* Staggered Vertical Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center max-w-xl mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform -translate-y-2 shadow-sm"
            >
              <span className="text-3xl">⚛️</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">React</span>
                <span className="text-xs text-slate-500 font-semibold">Fast Frontend VDOM</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform translate-y-3 shadow-sm"
            >
              <span className="text-3xl">🎨</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">Tailwind CSS</span>
                <span className="text-xs text-slate-500 font-semibold">Rapid UI Styling</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform -translate-y-3 shadow-sm"
            >
              <span className="text-3xl">🔥</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">Firebase</span>
                <span className="text-xs text-slate-500 font-semibold">Real-time DB & Auth</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform translate-y-1 shadow-sm"
            >
              <span className="text-3xl">⚡</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">Vite</span>
                <span className="text-xs text-slate-500 font-semibold">Instant HMR builds</span>
              </div>
            </motion.div>

          </div>

          <div className="mt-12 max-w-md mx-auto text-slate-600 text-sm leading-relaxed">
            <span className="font-handwritten text-[#F05323] text-xl block mb-2">why Firebase?</span>
            Firestore dynamic streams allowed real-time chats and materials indexing without writing a custom WebSocket layer.
          </div>
        </div>
      </section>

      {/* Section 6: My Role */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          <div className="absolute -top-5 right-8 bg-[#F05323] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transform rotate-3">
            End-To-End Execution
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 font-grotesk">My Role & Responsibilities</h2>

          <div className="space-y-6">
            <motion.div 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <HandDrawnCheck />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Firestore Schema Design</h3>
                <p className="text-slate-600 text-sm mt-1">Designed scalable data collections for real-time community threads, comment sub-collections, and structured academic study files.</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HandDrawnCheck />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Authentication & Security Rules</h3>
                <p className="text-slate-600 text-sm mt-1">Configured Firebase Security Rules to enforce university email domains, protecting academic resources from public access.</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <HandDrawnCheck />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Grading System Algorithm</h3>
                <p className="text-slate-600 text-sm mt-1">Translated Saveetha University's official grading scale (O, A+, A, B+, B, C, F) into a custom calculator algorithm mapping grade points to weighted credits.</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HandDrawnCheck />
              <div>
                <h3 className="font-bold text-lg text-slate-800">SEO & Deployment Maintenance</h3>
                <p className="text-slate-600 text-sm mt-1">Handled build compilation, deployed live via Netlify, registered pages with Google Search Console, and configured Google Analytics events.</p>
              </div>
            </motion.div>
          </div>
          
        </motion.div>
      </section>

      {/* Section 7: Polaroid Screenshot & Interactive Widget Gallery */}
      <section className="bg-orange-50/40 py-20 border-y border-dashed border-orange-200 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-grotesk relative inline-block">
              Interactive Blueprint Gallery
              <HandDrawnCircle />
            </h2>
            <p className="text-slate-500 text-sm font-semibold mt-4">
              Real screenshots and actual live-coded mini features built for you to test!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Polaroid 1: Real Landing Page Screenshot */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-slate-200 transform -rotate-3 hover:rotate-0 transition-transform relative hover:z-20"
            >
              <HandDrawnPin />
              <div className="aspect-[4/3] bg-slate-100 rounded overflow-hidden relative group">
                <img 
                  src="/saveetha_hub_screenshot.webp" 
                  alt="SaveethaHub Landing Page"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold px-3 py-1 bg-slate-900/80 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Landing Page
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-handwritten text-blue-700 text-2xl rotate-1">
                  landing dashboard UI 🖥️
                </p>
                <p className="text-slate-400 text-xs font-bold mt-1">Clean. Fast. Responsive.</p>
              </div>
            </motion.div>

            {/* Polaroid 2: Interactive CGPA Calculator Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-slate-200 transform rotate-2 hover:rotate-0 transition-transform relative hover:z-20"
            >
              <HandDrawnPin />
              
              {/* Actual Mini calculator app */}
              <div className="p-4 bg-[#FAF9F5] border border-dashed border-slate-200 rounded min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-[#F05323] flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5" /> CGPA Simulator
                    </span>
                    <button 
                      onClick={addCourse}
                      className="px-2 py-0.5 text-[10px] bg-slate-950 text-white font-bold rounded hover:bg-orange-600 transition-colors flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" /> Course
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {courses.map(c => (
                      <div key={c.id} className="flex gap-1.5 items-center bg-white p-1.5 rounded border border-slate-100 shadow-sm text-xs">
                        <input 
                          type="text" 
                          value={c.name}
                          onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                          className="w-full bg-slate-50 border-none focus:ring-1 focus:ring-orange-200 rounded px-1 text-[11px] font-semibold"
                        />
                        
                        <select 
                          value={c.grade}
                          onChange={(e) => updateCourse(c.id, "grade", e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-[10px] py-0.5 font-bold rounded"
                        >
                          {Object.keys(gradePoints).map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>

                        <select 
                          value={c.credits}
                          onChange={(e) => updateCourse(c.id, "credits", parseInt(e.target.value))}
                          className="bg-slate-50 border border-slate-200 text-[10px] py-0.5 font-bold rounded"
                        >
                          {[1, 2, 3, 4].map(cr => (
                            <option key={cr} value={cr}>{cr} Cr</option>
                          ))}
                        </select>

                        <button 
                          onClick={() => removeCourse(c.id)}
                          className="text-slate-400 hover:text-red-500 p-0.5"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 mt-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500">Calculated CGPA:</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight font-grotesk bg-orange-100/50 px-2.5 py-0.5 rounded border border-orange-200">
                    {calculateCGPA()}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwritten text-blue-700 text-2xl -rotate-1">
                  interactive CGPA tool! 🧮
                </p>
                <p className="text-slate-400 text-xs font-bold mt-1">Try adding and changing courses above.</p>
              </div>
            </motion.div>

            {/* Polaroid 3: Interactive Forum Feed Simulator */}
            <motion.div 
              initial={{ opacity: 0, x: 30, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-slate-200 transform -rotate-1 hover:rotate-0 transition-transform relative hover:z-20"
            >
              <HandDrawnPin />
              
              {/* Forum Feed Simulator */}
              <div className="p-4 bg-[#FAF9F5] border border-dashed border-slate-200 rounded min-h-[300px] flex flex-col justify-between text-xs">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wide text-blue-600 block mb-3 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Community Thread Sim
                  </span>

                  <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                    {threads.map(t => (
                      <div key={t.id} className="bg-white p-2 rounded border border-slate-100 shadow-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-700 text-[10px]">{t.author}</span>
                          <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">{t.tag}</span>
                        </div>
                        <p className="text-slate-600 text-[10px] leading-tight font-medium">{t.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handlePostThread} className="mt-3 pt-3 border-t border-slate-200 flex gap-1">
                  <input 
                    type="text" 
                    placeholder="Ask standard query..." 
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-[10px] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded hover:bg-blue-700 transition-colors text-[10px]"
                  >
                    Post
                  </button>
                </form>
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwritten text-blue-700 text-2xl rotate-1">
                  community live feed 💬
                </p>
                <p className="text-slate-400 text-xs font-bold mt-1">Simulated real-time db sync.</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Section 8: What I'd Improve Next (Sticky Note Style) */}
      <section className="max-w-2xl mx-auto px-6 py-20 relative">
        
        {/* Sticky Note Box */}
        <motion.div 
          className="bg-[#FEF9C3] p-8 md:p-12 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transform -rotate-1 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Subtle tape effect at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-200/50 backdrop-blur-xs border-x border-b border-slate-300 transform -translate-y-2"></div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 font-grotesk flex items-center gap-2">
            What I'd Improve Next
          </h2>

          <ul className="space-y-4 font-medium text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="text-[#F05323] text-lg select-none">📌</span>
              <span>
                <strong>Push Notifications:</strong> Add Firebase Cloud Messaging so students receive direct notifications for urgent announcements rather than checking the feed.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#F05323] text-lg select-none">📌</span>
              <span>
                <strong>CDN Storage Integration:</strong> As study material size expands, index metadata in Firestore but host actual PDFs on a CDN-backed bucket (e.g. AWS S3 / Cloudflare R2) to speed up download requests.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#F05323] text-lg select-none">📌</span>
              <span>
                <strong>Community Moderation Tools:</strong> Implement flag counters and reports, alongside automated word filtering for thread strings, ensuring the community stays respectful.
              </span>
            </li>
          </ul>

          <span className="font-handwritten text-[#b45309] text-xl absolute right-8 bottom-4 rotate-6 hidden sm:block">
            always iterating! 🔄
          </span>
        </motion.div>
      </section>

      {/* Section 9: CTA Section */}
      <motion.section 
        className="max-w-4xl mx-auto px-6 py-16 text-center relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-grotesk tracking-tight mb-4">
          Explore SaveethaHub
        </h2>
        <p className="text-slate-500 font-medium text-lg mb-10 max-w-lg mx-auto">
          Take a look at the live web portal or inspect the codebase configuration details on GitHub.
        </p>

        {/* Hand-drawn arrow pointing to buttons */}
        <div className="absolute top-0 right-1/4 text-blue-600 hidden md:block select-none transform rotate-12">
          <svg className="w-16 h-16 animate-doodle-vibrate" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <motion.path 
              d="M10,80 Q30,30 80,20" 
              strokeDasharray="4 4" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.path 
              d="M65,10 L80,20 L75,35" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
          <span className="font-handwritten text-lg block w-32 -mt-4 text-left font-bold rotate-1">
            inspect the source code!
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="https://saveetha-hub.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#F05323] hover:bg-orange-600 text-white font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Visit Live Portal</span>
          </a>

          <a 
            href="https://github.com/ComradeMohan/saveetha-companion" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <Github className="w-5 h-5" />
            <span>Source Code</span>
          </a>
        </div>
      </motion.section>

    </div>
  );
}
