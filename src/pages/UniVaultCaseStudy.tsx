import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Github, ArrowLeft, Smartphone, Play, 
  BookOpen, Calculator, Calendar, Plus, Trash, Sparkles, Check, Info, Star, Rocket
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

// Phone Mockup wrapper component
const PhoneFrame = ({ children, className = "" }) => (
  <div className={`w-[260px] h-[520px] bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col ${className}`}>
    {/* Speaker / Notch */}
    <div className="w-24 h-4 bg-slate-800 rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center gap-1 z-25">
      <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
      <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
    </div>
    
    {/* Screen Container */}
    <div className="w-full h-full bg-[#FAF9F5] rounded-[28px] overflow-hidden relative flex flex-col pt-3 z-10">
      {children}
    </div>
  </div>
);

const ArchitectureExplorer = ({ project }: { project: "saveethahub" | "univault" }) => {
  const [activeNode, setActiveNode] = useState<string>("client");

  const nodes = project === "saveethahub" ? {
    client: {
      name: "React Frontend",
      tech: "Vite + Tailwind",
      role: "Client Interface",
      description: "Handles responsive UI layout, local state management, and real-time socket connections with Firebase. Built on Vite with client-side history API routing.",
      detailsTitle: "Data Binding Details",
      details: [
        "Dynamic updates: listens to Firestore streams via onSnapshot listener.",
        "Routing: client-side fallback via public/_redirects rule.",
        "Optimization: code-splitting with React lazy/Suspense on dynamic route pages."
      ],
      code: `// Real-time listener in SaveethaHub
const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  const postsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setPosts(postsList);
});`
    },
    cdn: {
      name: "Netlify Hosting",
      tech: "Global Edge Network",
      role: "Asset Delivery",
      description: "Serves compiled static HTML/JS/CSS assets. Configured for SPA client-side routing fallback.",
      detailsTitle: "Server Redirect Rule",
      details: [
        "Asset compression: Gzip/Brotli compression handled natively by edge nodes.",
        "Direct routing support: maps all non-asset requests to index.html.",
        "SSL termination: automatic Let's Encrypt renewal."
      ],
      code: `# public/_redirects config
/*    /index.html   200`
    },
    auth: {
      name: "Firebase Auth",
      tech: "OAuth 2.0 / JWT",
      role: "Identity Provider",
      description: "Manages student sessions and restricts database reads to authorized domain users.",
      detailsTitle: "Verification Pipeline",
      details: [
        "Domain lock: regex checks for student emails during registration.",
        "Token: Firebase ID token validated by client SDK.",
        "Security: integrated directly with Firestore Security Rules."
      ],
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /community_posts/{postId} {
      allow read, write: if request.auth != null && 
        request.auth.token.email.matches('.*@saveetha\\\\.com$');
    }
  }
}`
    },
    db: {
      name: "Cloud Firestore",
      tech: "NoSQL DB",
      role: "Real-time DB",
      description: "Document-oriented database storing community messages, study guide indexes, and user profiles.",
      detailsTitle: "Firestore Collections Schema",
      details: [
        "Collection /users: indexed by Firebase auth UID.",
        "Collection /community_posts: stores thread text and replies sub-collection.",
        "Collection /materials: course-specific indexes."
      ],
      code: `// Firestore Schema draft
{
  "community_posts": {
    "postId": "UUID",
    "title": "Exam Prep Tips",
    "content": "Make sure to review past papers...",
    "author": "Mohan Reddy",
    "authorId": "UID",
    "likes": 24,
    "createdAt": "Timestamp"
  }
}`
    },
    storage: {
      name: "Firebase Storage",
      tech: "Google Cloud Bucket",
      role: "File Storage",
      description: "Stores academic resources, study PDFs, and presentation slides uploaded by students.",
      detailsTitle: "Storage Metadata Structure",
      details: [
        "Upload restriction: maximum size capped at 15MB.",
        "MIME checks: limited to .pdf, .docx, .png, .jpg.",
        "CORS: configured to allow Netlify domain reads."
      ],
      code: `// File Metadata payload
{
  "name": "Unit-1-OOP-Notes.pdf",
  "size": "4820120", // bytes
  "contentType": "application/pdf",
  "downloadURL": "https://firebasestorage.googleapis.com/...",
  "uploadedBy": "UID"
}`
    }
  } : {
    client: {
      name: "Kotlin Mobile App",
      tech: "Kotlin + Native Android SDK",
      role: "Native Android Mobile App",
      description: "Delivers a fast, native mobile experience on Android devices. Integrates with the backend REST API using Retrofit and processes local files.",
      detailsTitle: "Mobile Integration Pipeline",
      details: [
        "Local Storage: caches downloaded syllabus sheets and exams locally.",
        "Network Engine: uses Retrofit for standard CRUD and HTTP REST operations.",
        "Native view: renders unit tests and progress with custom UI components."
      ],
      code: `// Retrofit Service in Kotlin
interface UniVaultApi {
    @GET("api/materials.php")
    fun getStudyMaterials(
        @Query("courseId") id: String
    ): Call<List<Material>>
}`
    },
    web: {
      name: "Next.js Web Portal",
      tech: "Next.js + Tailwind CSS",
      role: "Web Companion Portal",
      description: "Web portal allowing students to access course materials, syllabi, and practice tests through any web browser. Server-side rendered (SSR) for search engines.",
      detailsTitle: "SSR & Hydration Details",
      details: [
        "Hydration: Next.js pre-renders course routes for search optimization.",
        "Styling: modern responsive grids built with Tailwind CSS.",
        "Fetch api: reads data from the PHP API layer on server render."
      ],
      code: `// Next.js Server Side Props page
export async function getServerSideProps(context) {
  const res = await fetch('https://api.univault.live/api/materials.php');
  const materials = await res.json();
  return { props: { materials } };
}`
    },
    api: {
      name: "PHP Backend API",
      tech: "PHP 8.x REST API",
      role: "API Gateway & Router",
      description: "Handles secure endpoint routing, test answer validations, and returns course materials queries in JSON format.",
      detailsTitle: "REST Endpoints Pipeline",
      details: [
        "Payload verification: checks user request headers and params.",
        "Database bridge: runs parameterized SQL queries using PDO bindings.",
        "Cross-origin access: handles CORS validations for Next.js web clients."
      ],
      code: `<?php
// materials.php endpoint in PHP
header("Content-Type: application/json");
require_once "db_config.php";

$course_id = $_GET['courseId'];
$stmt = $pdo->prepare("SELECT * FROM materials WHERE course_id = ?");
$stmt->execute([$course_id]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));`
    },
    db: {
      name: "Relational SQL Database",
      tech: "SQL (MySQL / MariaDB)",
      role: "Relational Storage",
      description: "Acts as the central system of record, storing normalized course data, exam structures, student progress logs, and test results.",
      detailsTitle: "Relational SQL Schema Details",
      details: [
        "Normalized structures: separate tables for courses, tests, and student progress.",
        "Foreign constraints: links attempt logs securely to test definitions.",
        "Indexes: indexed on course_id and student_uid for high-speed queries."
      ],
      code: `-- Schema Creation for Attempts
CREATE TABLE student_attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    student_uid VARCHAR(100) NOT NULL,
    test_id VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    }
  };

  const activeNodeData = nodes[activeNode as keyof typeof nodes];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
      {/* Blueprint Visualizer */}
      <div className="lg:col-span-6 flex flex-col justify-center space-y-4 bg-slate-900 border-2 border-slate-800 p-6 rounded-3xl relative overflow-hidden shadow-inner min-h-[450px]">
        {/* Grid lines simulating blueprint paper */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        
        <span className="absolute top-4 left-4 text-[10px] font-mono text-primary/60 uppercase tracking-widest z-10">System Schema Layout</span>

        {project === "saveethahub" ? (
          <div className="relative z-10 flex flex-col items-center space-y-8 w-full py-4">
            <button
              onClick={() => setActiveNode("client")}
              className={`w-48 p-3 rounded-xl border font-semibold text-center transition-all duration-300 font-outfit ${
                activeNode === "client" 
                  ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(240,83,35,0.4)]" 
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              🖥️ React Frontend
            </button>

            {/* Connection Line */}
            <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700"></div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
              <button
                onClick={() => setActiveNode("cdn")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 font-outfit ${
                  activeNode === "cdn" 
                    ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(240,83,35,0.4)]" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                🌐 Netlify CDN
              </button>

              <button
                onClick={() => setActiveNode("auth")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 font-outfit ${
                  activeNode === "auth" 
                    ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(240,83,35,0.4)]" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                🔑 Firebase Auth
              </button>
            </div>

            {/* Connection Lines */}
            <div className="flex justify-between w-full max-w-sm px-16">
              <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700"></div>
              <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
              <button
                onClick={() => setActiveNode("db")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 font-outfit ${
                  activeNode === "db" 
                    ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(240,83,35,0.4)]" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                🔥 Cloud Firestore
              </button>

              <button
                onClick={() => setActiveNode("storage")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 font-outfit ${
                  activeNode === "storage" 
                    ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(240,83,35,0.4)]" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                📦 Firebase Storage
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center space-y-8 w-full py-4">
            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
              <button
                onClick={() => setActiveNode("client")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 font-outfit ${
                  activeNode === "client" 
                    ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                📱 Kotlin Mobile App
              </button>

              <button
                onClick={() => setActiveNode("web")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all duration-300 font-outfit ${
                  activeNode === "web" 
                    ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                🌐 Next.js Web Portal
              </button>
            </div>

            {/* Connection Lines */}
            <div className="flex justify-between w-full max-w-sm px-16">
              <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700"></div>
              <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700"></div>
            </div>

            <button
              onClick={() => setActiveNode("api")}
              className={`w-48 p-3 rounded-xl border font-semibold text-center transition-all duration-300 font-outfit ${
                activeNode === "api" 
                  ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              🟢 PHP Backend API
            </button>

            {/* Connection Line */}
            <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-700"></div>

            <button
              onClick={() => setActiveNode("db")}
              className={`w-48 p-3 rounded-xl border font-semibold text-center transition-all duration-300 font-outfit ${
                activeNode === "db" 
                  ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              💾 Relational SQL DB
            </button>
          </div>
        )}
      </div>

      {/* Blueprint Inspector Card */}
      <div className="lg:col-span-6 flex flex-col justify-between border-2 border-slate-200 bg-white p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-slate-200 bg-slate-100 text-slate-600 font-grotesk uppercase">
              {activeNodeData.tech}
            </span>
            <span className="text-xs font-bold text-slate-400 font-grotesk">· {activeNodeData.role}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">{activeNodeData.name}</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-grotesk mb-6">
            {activeNodeData.description}
          </p>

          <div className="border-t border-slate-100 pt-4 mb-6">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 font-grotesk">
              {activeNodeData.detailsTitle}
            </h4>
            <ul className="space-y-1.5">
              {activeNodeData.details.map((detail, idx) => (
                <li key={idx} className="text-xs text-slate-500 font-medium font-grotesk flex items-start">
                  <span className={project === "saveethahub" ? "text-[#F05323] mr-1.5 shrink-0" : "text-[#6366f1] mr-1.5 shrink-0"}>•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl shadow-inner relative max-h-[160px] overflow-y-auto">
          <span className="absolute top-1.5 right-2 text-[8px] font-mono text-slate-600 select-none">CODE / BLUEPRINT</span>
          <pre className="text-[10px] font-mono text-slate-300 leading-normal overflow-x-auto select-all">
            <code>{activeNodeData.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default function UniVaultCaseStudy() {
  const navigate = useNavigate();
  useEffect(() => {
    // Dynamic SEO Metadata for UniVault Case Study
    document.title = "UniVault Case Study | Mohan Reddy";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Case study on UniVault: A secure, decentralized file storage system for university students. Designed and developed by Mohan Reddy.");
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "UniVault Case Study | Mohan Reddy");

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "Case study on UniVault: A secure, decentralized file storage system for university students. Designed and developed by Mohan Reddy.");

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", "UniVault Case Study | Mohan Reddy");

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", "Case study on UniVault: A secure, decentralized file storage system for university students. Designed and developed by Mohan Reddy.");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', "https://comrademohan.netlify.app/case-study/univault");
  }, []);

  // Stats Section Data
  const stats = [
    { value: "2400", label: "Active Students", note: "enrolled & studying! 👥", suffix: "+" },
    { value: "10000", label: "Study Materials", note: "organized unit-wise 📚", suffix: "+" },
    { value: "5000", label: "Tests Attempted", note: "systematic self-grading 📝", suffix: "+" },
  ];

  // Interactive Quiz Widget State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const quizOptions = [
    { id: 1, text: "React Native runs in a VM", isCorrect: false },
    { id: 2, text: "Compiles to native widgets", isCorrect: true },
    { id: 3, text: "It only supports iOS devices", isCorrect: false },
  ];

  // Interactive Syllabus Widget State
  const [activeUnit, setActiveUnit] = useState<number | null>(1);
  const syllabusData = [
    { 
      unit: 1, 
      title: "Unit 1: Introduction", 
      files: ["Course Outline.pdf", "Lecture 1 Slides.pdf"] 
    },
    { 
      unit: 2, 
      title: "Unit 2: State & Components", 
      files: ["Props vs State Guide.md", "Hooks CheatSheet.pdf", "Lab Exercise 2.pdf"] 
    },
    { 
      unit: 3, 
      title: "Unit 3: Native Bridges", 
      files: ["Unit 3 Syllabus.pdf", "Native Components Lab.zip"] 
    }
  ];

  // Interactive Offline Simulator State
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-slate-800 font-outfit relative selection:bg-[#F05323] selection:text-white pb-24 overflow-x-hidden">
      
      {/* Background grid texture simulating paper */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Decorative floating sketch stars/dots */}
      <div className="absolute top-48 left-10 text-orange-300 font-handwritten text-4xl select-none hidden md:block">✦</div>
      <div className="absolute top-96 right-12 text-blue-300 font-handwritten text-4xl select-none rotate-12 hidden md:block">★</div>
      <div className="absolute bottom-[20%] left-8 text-orange-200 font-handwritten text-5xl select-none -rotate-12 hidden md:block">📱</div>

      {/* Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/#projects");
            }
          }}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium bg-transparent border-none p-0 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>
        <div className="flex gap-4">
          <a 
            href="https://github.com/ComradeMohan/192210400pdd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-[#6366f1] hover:bg-indigo-50 rounded-full transition-all border border-slate-200 hover:border-indigo-200 text-xs font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://web.univault.live/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-[#6366f1] hover:bg-indigo-50 rounded-full transition-all border border-slate-200 hover:border-indigo-200 text-xs font-semibold"
          >
            <Rocket className="w-4 h-4 text-[#6366f1] animate-pulse" />
            <span>Live Project</span>
          </a>
        </div>
      </header>

      {/* Section 1: Hero Block */}
      {/* Section 1: Hero Block */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6 border border-blue-200">
              Exam Preparation Platform · Live on Play Store
            </div>
            
            <div className="relative inline-block mb-6">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 font-grotesk select-none relative z-10">
                UniVault
              </h1>
              <HandDrawnCircle />
            </div>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-xl font-medium mt-4 leading-relaxed">
              A mobile-first academic platform helping university students prepare for exams systematically.
            </p>

            {/* Links Block */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="https://web.univault.live/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl border border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm flex items-center gap-1.5"
              >
                <Rocket className="w-4 h-4" />
                <span>Website</span>
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.simats.univault" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#F05323] hover:bg-orange-600 text-white font-bold rounded-xl border border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm flex items-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Store</span>
              </a>
              <a 
                href="https://github.com/ComradeMohan/192210400pdd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-950 font-bold rounded-xl border border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Hero Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-slate-200 shadow-sm max-w-xl">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Role</span>
                <span className="font-semibold text-slate-700 text-sm">Solo Developer</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Timeline</span>
                <span className="font-semibold text-slate-700 text-sm">2025 – Present</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Scope</span>
                <span className="font-semibold text-slate-700 text-sm">Mobile + API Backend</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Tilted Phone Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="transform rotate-3 hover:rotate-0 transition-transform duration-300 relative z-10 cursor-pointer">
              <PhoneFrame>
                {/* Simulated Screen Homepage */}
                <div className="p-4 flex flex-col justify-between h-full bg-[#FAF9F5]">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">U</div>
                      <span className="font-black text-slate-800 text-sm tracking-tight">UniVault</span>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">Connected</span>
                  </div>

                  <div className="my-auto space-y-4">
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                      <span className="text-[9px] uppercase tracking-wide text-blue-500 font-bold block mb-1">Study materials</span>
                      <h4 className="font-extrabold text-xs text-slate-900">Structured Unit Syllabus</h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">Unit-wise notes, handbooks & lectures synced offline.</p>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                      <span className="text-[9px] uppercase tracking-wide text-[#F05323] font-bold block mb-1">practice assessments</span>
                      <h4 className="font-extrabold text-xs text-slate-900">Self-Grading Mock Tests</h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">Instant diagnostic grading on past year topics.</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 text-center">
                    <span className="text-[9px] text-slate-400 font-bold">Exam Preparation Companion</span>
                  </div>
                </div>
              </PhoneFrame>
            </div>

            {/* Handwritten callout pointing at phone mockup */}
            <div className="absolute -left-12 bottom-6 text-blue-600 font-handwritten text-lg rotate-[-6deg] max-w-[140px] text-center pointer-events-none hidden sm:block">
              <svg className="w-10 h-10 mx-auto transform -rotate-12 mb-1" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 80 20 Q 40 40 10 90" />
                <path d="M 25 90 L 10 90 L 15 75" />
              </svg>
              <span>mobile-first layout 📱</span>
            </div>
          </motion.div>

        </div>
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
              UniVault is a multi-platform academic companion that helps university students prepare for exams systematically via its Next.js website and native Kotlin Android application.
            </p>
            <p>
              It provides structured study materials, unit-wise practice tests, and previous year papers, all in one cohesive environment instead of forcing students to dig through scattered PDFs, Google Drives, and cluttered group chats.
            </p>
            
            {/* Hand-drawn inline note callout */}
            <span className="font-handwritten text-blue-600 text-xl block mt-8 border-l-4 border-dashed border-blue-300 pl-4 py-1 rotate-1 max-w-md">
              "Students cram using phones on the commute. Building a native Kotlin Android experience was the only option that made sense."
            </span>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Stat Band */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center font-grotesk relative inline-block left-1/2 -translate-x-1/2">
          Academic Reach
          <HandDrawnUnderline />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </section>

      <CurvedDivider />

      {/* Section 4: Problem -> Solution Diagram */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-grotesk relative inline-block">
            Structuring the Cram Cycle
            <HandDrawnUnderline />
          </h2>
          <p className="text-slate-500 text-lg mt-3 max-w-xl mx-auto font-medium">
            Turning disorganized PDFs into a structured self-assessment pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative">
          
          {/* Left Side: Fragmented Content */}
          <motion.div 
            className="lg:col-span-5 bg-red-50/50 rounded-3xl p-8 border-2 border-red-100 relative flex flex-col justify-between"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-4 right-4 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
              CHAOTIC PREPARATION
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-950 font-grotesk mb-6 font-semibold">The Problem</h3>
              <p className="text-red-900/80 mb-8 font-medium">
                Syllabuses are structured, but preparation content is a disorganized mess.
              </p>
            </div>

            {/* Scattered Icons */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm max-w-xs transform -rotate-1 flex gap-3 items-center">
                <span className="text-2xl">📁</span>
                <div>
                  <span className="font-bold text-xs text-red-500 block">Scattered Senior PDFs</span>
                  <p className="text-xs text-slate-600 leading-snug">"Download notes from this drive link before it goes offline."</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm max-w-xs ml-auto transform rotate-2 flex gap-3 items-center">
                <span className="text-2xl">💬</span>
                <div>
                  <span className="font-bold text-xs text-red-500 block">WhatsApp Cramming</span>
                  <p className="text-xs text-slate-600 leading-snug">"Who has solved the 2023 question bank paper?"</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm max-w-xs transform -rotate-2 flex gap-3 items-center">
                <span className="text-2xl">⚠️</span>
                <div>
                  <span className="font-bold text-xs text-red-500 block">No Way to Self-Assess</span>
                  <p className="text-xs text-slate-600 leading-snug">Students walk into final exams without attempting mock papers.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle Connecting Arrow */}
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
              structured & cacheable! ⚡
            </span>
          </motion.div>

          {/* Right Side: Structured Repository */}
          <motion.div 
            className="lg:col-span-5 bg-green-50/50 rounded-3xl p-8 border-2 border-green-100 relative flex flex-col justify-between"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              STRUCTURED PORTAL
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-950 font-grotesk mb-4 font-semibold">The Solution</h3>
              <p className="text-green-900/80 font-medium">
                UniVault bundles resources inside a clean application schema.
              </p>
            </div>

            <div className="flex flex-col items-center py-6 bg-white border border-green-200 rounded-2xl shadow-sm relative">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-md border-2 border-blue-700 relative z-10">
                U
              </div>
              <h4 className="font-black text-slate-800 text-xl mt-3 tracking-tight">UniVault App</h4>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">central vault</p>

              {/* Hand-drawn note inside solution box */}
              <span className="font-handwritten text-blue-600 text-lg absolute -bottom-4 rotate-3 bg-yellow-100 px-2 py-0.5 border border-dashed border-yellow-300 rounded">
                Syllabus-aligned preparation! 💯
              </span>
            </div>

            <div className="space-y-2 mt-6">
              <div className="flex gap-2 items-center bg-white/60 p-2 rounded-xl border border-green-100/50 text-xs">
                <span className="text-green-600">✓</span>
                <span className="font-bold text-slate-700">Unit Study Guides</span>
              </div>
              <div className="flex gap-2 items-center bg-white/60 p-2 rounded-xl border border-green-100/50 text-xs">
                <span className="text-green-600">✓</span>
                <span className="font-bold text-slate-700">Mock Assessments</span>
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
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center max-w-2xl mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform -translate-y-2 shadow-sm"
            >
              <span className="text-3xl">⚛️</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">Next.js</span>
                <span className="text-xs text-slate-500 font-semibold">Website Frontend</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform translate-y-3 shadow-sm"
            >
              <span className="text-3xl">🤖</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">Kotlin</span>
                <span className="text-xs text-slate-500 font-semibold">Native Android App</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform -translate-y-3 shadow-sm"
            >
              <span className="text-3xl">🐘</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">PHP</span>
                <span className="text-xs text-slate-500 font-semibold">Backend REST API</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform translate-y-1 shadow-sm"
            >
              <span className="text-3xl">🛢️</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">SQL</span>
                <span className="text-xs text-slate-500 font-semibold">Relational Database</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="px-6 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 transform -translate-y-1 shadow-sm"
            >
              <span className="text-3xl">🔥</span>
              <div className="text-left">
                <span className="font-bold block text-sm text-slate-800">Firebase</span>
                <span className="text-xs text-slate-500 font-semibold">Authentication & Sync</span>
              </div>
            </motion.div>

          </div>

          <div className="mt-12 max-w-md mx-auto text-slate-600 text-sm leading-relaxed">
            <span className="font-handwritten text-[#F05323] text-xl block mb-2">why Kotlin & PHP?</span>
            Kotlin delivers a high-performance native Android experience for students on-the-go, backed by a stable PHP/SQL relational database API.
          </div>
        </div>
      </section>

      {/* Section 5.5: System Architecture Explorer */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-handwritten text-[#6366f1] text-2xl block mb-2">interactive blueprints</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-grotesk tracking-tight">
              System Architecture Explorer
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-3 max-w-xl mx-auto">
              Click on components in the interactive blueprint below to inspect database schemas, token validation logic, and server endpoints.
            </p>
          </motion.div>

          <ArchitectureExplorer project="univault" />
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
                <h3 className="font-bold text-lg text-slate-800">Kotlin Android App Development</h3>
                <p className="text-slate-600 text-sm mt-1">Built the native Android app using Kotlin, implementing screen navigation, offline study caching, and practice test grading modules.</p>
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
                <h3 className="font-bold text-lg text-slate-800">PHP & SQL Backend API</h3>
                <p className="text-slate-600 text-sm mt-1">Designed relational database schemas in SQL and deployed PHP endpoints for structured academic content delivery and test submission tracking.</p>
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
                <h3 className="font-bold text-lg text-slate-800">Firebase User State Synchronization</h3>
                <p className="text-slate-600 text-sm mt-1">Integrated Firebase authentication and data sync listeners to sync user progress, bookmarks, and test history across multiple devices.</p>
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
                <h3 className="font-bold text-lg text-slate-800">App Store Publishing & Web Companion</h3>
                <p className="text-slate-600 text-sm mt-1">Managed Google Play Console assets, configured release bundles, and deployed a marketing landing page (web.univault.live) to drive discoverability.</p>
              </div>
            </motion.div>
          </div>
          
        </motion.div>
      </section>

      {/* Section 7: App Screenshot Gallery (Tilted Phone Polaroids) */}
      <section className="bg-orange-50/40 py-20 border-y border-dashed border-orange-200 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-grotesk relative inline-block">
              Interactive Screen Vault
              <HandDrawnCircle />
            </h2>
            <p className="text-slate-500 text-sm font-semibold mt-4">
              Explore the mobile interfaces and try out the test grading simulator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-items-center">
            
            {/* Polaroid 1: Unit-wise study materials */}
            <div className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-slate-200 transform -rotate-2 hover:rotate-0 transition-transform relative hover:z-20">
              <HandDrawnPin />
              <PhoneFrame>
                <div className="p-4 flex flex-col justify-between h-full bg-[#FAF9F5] text-xs">
                  <div>
                    <h4 className="font-black text-slate-800 mb-4 text-center">Structured Study Vault</h4>
                    
                    <div className="space-y-3">
                      {syllabusData.map(u => (
                        <div key={u.unit} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                          <button 
                            onClick={() => setActiveUnit(activeUnit === u.unit ? null : u.unit)}
                            className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-700"
                          >
                            <span>{u.title}</span>
                            <span>{activeUnit === u.unit ? "▲" : "▼"}</span>
                          </button>

                          {activeUnit === u.unit && (
                            <div className="p-2 border-t border-slate-100 space-y-1.5">
                              {u.files.map((f, fi) => (
                                <div key={fi} className="flex items-center gap-1.5 text-[9px] text-slate-600 font-semibold p-1 hover:bg-slate-50 rounded">
                                  <span>📄</span>
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-400 text-center font-bold">
                    tap unit titles to toggle files
                  </div>
                </div>
              </PhoneFrame>
              <div className="mt-4 text-center">
                <p className="font-handwritten text-blue-700 text-2xl rotate-1">
                  syllabus file library 📂
                </p>
              </div>
            </div>

            {/* Polaroid 2: Practice & Model Tests (Interactive Quiz) */}
            <div className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-slate-200 transform rotate-3 hover:rotate-0 transition-transform relative hover:z-20">
              <HandDrawnPin />
              <PhoneFrame>
                <div className="p-4 flex flex-col justify-between h-full bg-[#FAF9F5] text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-slate-400 font-bold">Assessments</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-bold">Question 4</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 mb-4 shadow-xs">
                      <h4 className="font-extrabold text-[10px] text-slate-800 leading-snug">
                        How does React Native compile custom JavaScript code?
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {quizOptions.map(opt => {
                        let btnStyle = "border-slate-200 bg-white text-slate-700";
                        if (selectedOption !== null) {
                          if (opt.id === selectedOption) {
                            btnStyle = opt.isCorrect 
                              ? "border-green-500 bg-green-50 text-green-700 font-bold" 
                              : "border-red-500 bg-red-50 text-red-700 font-bold";
                          } else if (opt.isCorrect) {
                            btnStyle = "border-green-500 bg-green-50 text-green-700 font-bold";
                          }
                        }
                        
                        return (
                          <button
                            key={opt.id}
                            disabled={selectedOption !== null}
                            onClick={() => setSelectedOption(opt.id)}
                            className={`w-full text-left p-2.5 border rounded-xl text-[9px] transition-all ${btnStyle}`}
                          >
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/60">
                    <span className="text-[9px] text-slate-400 font-bold">Self-Grading engine</span>
                    {selectedOption !== null && (
                      <button 
                        onClick={() => setSelectedOption(null)}
                        className="text-[9px] text-blue-600 font-bold hover:underline"
                      >
                        Reset Quiz
                      </button>
                    )}
                  </div>
                </div>
              </PhoneFrame>

              {/* Hand-drawn arrow pointing at the quiz screen */}
              <div className="absolute -right-16 top-1/3 text-blue-600 hidden lg:block select-none pointer-events-none">
                <svg className="w-16 h-12 animate-doodle-vibrate" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <motion.path 
                    d="M10,10 Q50,40 85,20" 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.path 
                    d="M70,15 L85,20 L80,35" 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
                <span className="font-handwritten text-lg block w-32 -mt-4 text-left font-bold rotate-1">
                  self-graded instantly! ⚡
                </span>
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwritten text-blue-700 text-2xl -rotate-1">
                  diagnostic quiz UI 📝
                </p>
              </div>
            </div>

            {/* Polaroid 3: Offline Mode Simulator */}
            <div className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-slate-200 transform -rotate-1 hover:rotate-0 transition-transform relative hover:z-20">
              <HandDrawnPin />
              <PhoneFrame>
                <div className="p-4 flex flex-col justify-between h-full bg-[#FAF9F5] text-xs">
                  <div>
                    <h4 className="font-black text-slate-800 mb-4 text-center">Offline Sync Vault</h4>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs space-y-4">
                      <div className="flex justify-center">
                        <span className={`text-4xl transition-all ${isOffline ? "grayscale-xs opacity-65" : "text-green-500"}`}>
                          {isOffline ? "📡" : "📶"}
                        </span>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-slate-800 text-[11px]">
                          {isOffline ? "Offline Caching Mode" : "Realtime Database Sync"}
                        </h5>
                        <p className="text-[9px] text-slate-500 mt-1 leading-normal">
                          {isOffline 
                            ? "Loading study files from AsyncStorage caching layers..." 
                            : "Reading active material indices dynamically from Firebase servers."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => setIsOffline(!isOffline)}
                      className={`w-full py-2.5 rounded-xl font-extrabold text-[10px] text-white transition-all shadow-sm ${isOffline ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                    >
                      {isOffline ? "Re-connect Online" : "Simulate Campus WiFi Outage"}
                    </button>
                  </div>
                </div>
              </PhoneFrame>
              <div className="mt-4 text-center">
                <p className="font-handwritten text-blue-700 text-2xl rotate-1">
                  offline-first fallback! 📶
                </p>
              </div>
            </div>

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
                <strong>Offline-First SQLite Caching:</strong> Optimize local database caching algorithms to fully store PDF blob buffers during low connectivity in campus tunnels.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#F05323] text-lg select-none">📌</span>
              <span>
                <strong>Weak-Topic AI Diagnostics:</strong> Train a small local classifier that analyzes quiz scores and outputs review recommendations pointing back to specific Unit PDFs.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#F05323] text-lg select-none">📌</span>
              <span>
                <strong>Multi-Tenant Content Structure:</strong> Refactor Firestore collections to scale beyond Saveetha, allowing other institutes to onboard their custom academic structures.
              </span>
            </li>
          </ul>

          <span className="font-handwritten text-[#b45309] text-xl absolute right-8 bottom-4 rotate-6 hidden sm:block">
            scaling fast! 🚀
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
          Get UniVault App
        </h2>
        <p className="text-slate-500 font-medium text-lg mb-10 max-w-lg mx-auto">
          Explore the web preview portal, install the app on Android, or inspect the project repository details on GitHub.
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
            install on Google Play!
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="https://web.univault.live/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <Rocket className="w-5 h-5" />
            <span>Visit Web Portal</span>
          </a>

          <a 
            href="https://play.google.com/store/apps/details?id=com.simats.univault" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#F05323] hover:bg-orange-600 text-white font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Install Play Store</span>
          </a>

          <a 
            href="https://github.com/ComradeMohan/192210400pdd" 
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
