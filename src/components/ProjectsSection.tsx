import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, Github, Camera, Users, Database, Truck, Activity,
  FileText, MessageSquare, Share2, Calculator, Calendar, Lock, TrendingUp,
  BookOpen, Smartphone, ShieldCheck, Crosshair, GitBranch, Coins, Brain, FileDown,
  X, Star, Linkedin, Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { SpotlightCard } from "./SpotlightCard";
import { ProgressiveImage } from "./ProgressiveImage";

const Sparkline = ({ colorClass, path }: { colorClass: string; path: string }) => (
  <svg className={`w-full h-8 mt-2 opacity-60 ${colorClass}`} viewBox="0 0 100 30" fill="none">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d={path}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EthereumLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 784 1277" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <polygon points="392,0 383.5,29 383.5,873 392,881.5 784,650" fill="currentColor" opacity="0.6" />
      <polygon points="392,0 0,650 392,881.5 392,472.5" fill="currentColor" opacity="0.85" />
      <polygon points="392,881.5 383.5,890 383.5,1268 392,1277 784,650" fill="currentColor" opacity="0.7" />
      <polygon points="392,1277 392,881.5 0,650" fill="currentColor" opacity="0.85" />
      <polygon points="392,881.5 784,650 392,472.5" fill="currentColor" opacity="0.4" />
      <polygon points="392,881.5 392,472.5 0,650" fill="currentColor" opacity="0.5" />
    </g>
  </svg>
);

const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "file": return FileText;
    case "chat": return MessageSquare;
    case "collab": return Share2;
    case "calc": return Calculator;
    case "event": return Calendar;
    case "lock": return Lock;
    case "book": return BookOpen;
    case "phone": return Smartphone;
    case "shield": return ShieldCheck;
    default: return FileText;
  }
};

const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case "users": return Users;
    case "book": return BookOpen;
    case "test": return FileText;
    case "trend": return TrendingUp;
    case "crosshair": return Crosshair;
    case "branch": return GitBranch;
    case "coins": return Coins;
    case "brain": return Brain;
    default: return Activity;
  }
};

const projects = [
  {
    title: "Object Detection in Python",
    desc: "Real-time object detection system built with Python and OpenCV. Utilizes machine learning models for accurate identification and classification of objects.",
    link: "https://github.com/ComradeMohan/CSA0810PythonProgramming/tree/main/Various%20Object%20Identification",
    githubLink: "https://github.com/ComradeMohan/CSA0810PythonProgramming/tree/main/Various%20Object%20Identification",
    color: "from-slate-800/20 to-slate-800/5",
    activeColor: "border-primary",
    icon: Camera,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    isFeatured: true,
    techStack: [
      { name: "Python", icon: "🐍" },
      { name: "OpenCV", icon: "📷" },
      { name: "YOLOv8", icon: "🚀" },
      { name: "cvzone", icon: "📦" },
      { name: "ultralytics", icon: "🔥" }
    ],
    imports: [
      "import math",
      "import cv2",
      "from ultralytics import YOLO",
      "import cvzone"
    ],
    modelLink: "https://github.com/ComradeMohan/CSA0810PythonProgramming/blob/main/Various%20Object%20Identification/yolov8n.pt",
    problem: "Manual object identification is time-consuming and error-prone in real-world applications.",
    solution: "Built a real-time object detection system using ML models and OpenCV for accurate recognition.",
    impact: [
      "Detects multiple objects",
      "Real-time performance",
      "High accuracy"
    ],
    hasLiveDemo: false
  },
  {
    title: "Saveetha Hub",
    desc: "A centralized platform for Saveetha University students to access resources, collaborate on projects, and stay connected with campus activities.",
    link: "https://saveetha-hub.netlify.app/",
    githubLink: "https://github.com/ComradeMohan/saveetha-companion",
    caseStudyLink: "/case-study/saveethahub",
    color: "from-orange-500/20 to-orange-500/5",
    activeColor: "border-orange-500",
    icon: Users,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    isFeatured: false,
    liveBadges: [
      { text: "Live Project", color: "bg-green-500/10 border-green-500/20 text-green-500" },
      { text: "Web Platform", color: "bg-blue-500/10 border-blue-500/20 text-blue-500" }
    ],
    stats: [
      { label: "Search Clicks", sublabel: "(Google Search)", value: "24,706", color: "text-red-500", path: "M0,25 Q15,10 30,20 T60,12 T90,24 T100,8" },
      { label: "Active Users", sublabel: "(Last 28 Days)", value: "3.8K+", color: "text-green-500", path: "M0,28 Q20,25 40,15 T70,12 T90,6 T100,2" },
      { label: "New Users", sublabel: "(Last 28 Days)", value: "1.7K+", color: "text-purple-500", path: "M0,22 Q10,5 25,18 T50,5 T75,25 T100,15" },
      { label: "Avg Engagement Time", sublabel: "(Per Active User)", value: "50s", color: "text-blue-500", path: "M0,15 Q25,18 50,14 T75,16 T100,15" }
    ],
    features: [
      { name: "Study Materials", icon: "file" },
      { name: "Community Hub", icon: "chat" },
      { name: "Project Collaboration", icon: "collab" },
      { name: "CGPA Calculator", icon: "calc" },
      { name: "Events & Updates", icon: "event" },
      { name: "Secure Authentication", icon: "lock" }
    ],
    techStack: [
      { name: "React", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Firebase", icon: "🔥" },
      { name: "Vite", icon: "⚡" }
    ],
    problem: "Students lacked a unified portal to share study materials, check updates, and coordinate project work efficiently across campus.",
    solution: "Created an all-in-one platform with real-time database syncing, community discussions, file sharing, and academic utilities to improve student productivity.",
    impact: [
      "Unified access to student resources and academic tools",
      "Real-time collaboration and discussion",
      "Active and growing campus community"
    ],
    hasLiveDemo: true
  },
  {
    title: "Univault",
    desc: "A smart academic management platform designed for university students to track grades, calculate CGPA, manage courses, monitor attendance, and generate detailed academic reports — all in one centralized dashboard.",
    link: "https://web.univault.live/",
    githubLink: "https://github.com/ComradeMohan/192210400pdd",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.simats.univault",
    linkedinLink: "https://www.linkedin.com/posts/mmohanreddy_studenttools-campuscodex-univault-activity-7343688723240271872-Bt7C?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEq_4K8Bp2DUwoLoAZ6lkzx4xi4MtcsntWc",
    instagramLink: "https://www.instagram.com/simats_pdd_videos/reel/DPrKUfsCRfZ/",
    caseStudyLink: "/case-study/univault",
    color: "from-blue-600/20 to-blue-600/5",
    activeColor: "border-blue-600",
    icon: Database,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-600/10",
    logoImg: "/univault_logo.webp",
    isFeatured: true,
    liveBadges: [
      { text: "Exam Preparation Platform", color: "bg-blue-500/10 border-blue-500/20 text-blue-500" }
    ],
    platformBadges: [
      { text: "Website", url: "https://web.univault.live/", icon: "globe" },
      { text: "Play Store", url: "https://play.google.com/store/apps/details?id=com.simats.univault", icon: "playstore" }
    ],
    mobileMockup: "/univault_mobile.webp",
    videoMockup: "/univaultvideo.mp4",
    stats: [
      { label: "Active Students", value: "2.4K+", iconName: "users" },
      { label: "Study Materials", value: "10K+", iconName: "book" },
      { label: "Tests Attempted", value: "5K+", iconName: "test" },
      { label: "Preparation Focus", value: "98%", iconName: "trend" }
    ],
    features: [
      { name: "Unit-wise Study Materials", icon: "book" },
      { name: "Academic Progress Tracking", icon: "calc" },
      { name: "Practice & Model Tests", icon: "shield" },
      { name: "Exam-focused Preparation", icon: "event" },
      { name: "Previous Year Papers", icon: "file" },
      { name: "Android Application", icon: "phone" }
    ],
    techStack: [
      { name: "Next.js", icon: "⚛️" },
      { name: "Firebase", icon: "🔥" },
      { name: "Kotlin (Android)", icon: "🤖" },
      { name: "PHP", icon: "🐘" },
      { name: "SQL", icon: "🛢️" }
    ],
    problem: "Students often struggle with scattered resources, unorganized materials, and inefficient exam preparation.",
    solution: "Built a centralized platform with structured study materials, unit-wise tests, and smart tools for effective preparation.",
    impact: [
      "Faster access to academic resources",
      "Structured exam preparation",
      "Improved study organization",
      "Mobile-first learning experience"
    ],
    hasLiveDemo: true
  },
  {
    title: "Ethereum Fraud Detection Using XGBoost",
    desc: "Machine learning-based Ethereum fraud detection system achieving 94% accuracy using XGBoost and outperforming multiple classification algorithms.",
    link: "/Ethereum%20Fraud%20Detection%20Using%20XGBoost.pptx",
    githubLink: "https://github.com/ComradeMohan",
    color: "from-indigo-600/20 to-indigo-600/5",
    activeColor: "border-indigo-600",
    icon: Coins,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
    logoImg: "ethereum",
    isFeatured: false,
    liveBadges: [
      { text: "Research Project", color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" }
    ],
    stats: [
      { label: "Best Accuracy", value: "94%", iconName: "crosshair" },
      { label: "Algorithms Compared", value: "4", iconName: "branch" },
      { label: "Blockchain Dataset", value: "Ethereum", iconName: "coins" },
      { label: "Research Project", value: "ML", iconName: "brain" }
    ],
    techStack: [
      { name: "Python", icon: "🐍" },
      { name: "Pandas", icon: "🐼" },
      { name: "Scikit-Learn", icon: "🤖" },
      { name: "XGBoost", icon: "⚡" },
      { name: "Google Colab", icon: "♾️" },
      { name: "Machine Learning", icon: "🧠" }
    ],
    keyResults: [
      { name: "XGBoost (Proposed)", value: 94, color: "bg-indigo-500" },
      { name: "Decision Tree", value: 88.5, color: "bg-green-500" },
      { name: "Random Forest", value: 72.4, color: "bg-blue-500" },
      { name: "AdaBoost", value: 77.1, color: "bg-yellow-500" },
      { name: "K Nearest Neighbor", value: 82, color: "bg-blue-600" }
    ],
    problem: "Fraudulent Ethereum transactions can cause irreversible financial losses and are difficult to detect due to highly imbalanced blockchain datasets.",
    solution: "Developed a fraud detection model using XGBoost and compared its performance against Decision Tree, Random Forest, AdaBoost, and KNN classifiers.",
    impact: [
      "94% Detection Accuracy",
      "Statistically Significant Results",
      "Reduced False Predictions",
      "Improved Fraud Identification"
    ],
    pptLink: "/Ethereum%20Fraud%20Detection%20Using%20XGBoost.pptx",
    researchPaperLink: "https://github.com/ComradeMohan"
  },
  {
    title: "Skylink Deliveries",
    desc: "A logistics and delivery management system with real-time tracking, route optimization, and automated dispatch capabilities.",
    link: "https://skylinkdeliveries.netlify.app/",
    color: "from-sky-500/20 to-sky-500/5",
    activeColor: "border-sky-500",
    icon: Truck,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
    isFeatured: false,
    techStack: [
      { name: "React", icon: "⚛️" },
      { name: "Mapbox API", icon: "🗺️" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" }
    ],
    problem: "Traditional delivery operations struggle with inefficient route planning and lack of real-time client updates.",
    solution: "Designed a logistics engine with dynamic routing algorithms and an interactive tracking map for dispatchers and clients.",
    impact: [
      "Optimized dispatch routes",
      "Real-time location updates",
      "Reduced transit delays"
    ],
    hasLiveDemo: true
  },
  {
    title: "DevPulse ⭐",
    desc: "A full-stack GitHub analytics and widget generator that transforms developer activity into interactive, real-time insights. It provides dynamic widgets for READMEs, tracks commits, PRs, reviews, streaks, and delivers AI-powered tech stack evolution and profile analysis with public portfolio pages.",
    link: "https://devpulseweb.netlify.app/",
    color: "from-purple-600/20 to-purple-600/5",
    activeColor: "border-purple-600",
    icon: Activity,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-600/10",
    isFeatured: true,
    techStack: [
      { name: "React", icon: "⚛️" },
      { name: "GitHub API", icon: "🐙" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "✨" }
    ],
    problem: "Developers need an engaging, automated way to showcase their GitHub contribution metrics on personal portfolios.",
    solution: "Engineered a high-performance widget server that fetches, aggregates, and renders clean SVG metric summaries in real-time.",
    impact: [
      "Custom README widgets",
      "AI-powered stack analysis",
      "Real-time streak counting"
    ],
    hasLiveDemo: true
  }
];

const ProjectDetailContent = ({ project }: { project: any }) => {
  const [stars, setStars] = useState<number | null>(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (project.title === "Saveetha Hub") {
      fetch("https://api.github.com/repos/ComradeMohan/saveetha-companion")
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          if (data && typeof data.stargazers_count === "number") {
            setStars(data.stargazers_count);
          }
        })
        .catch(() => {
          setStars(21);
        });
    }
  }, [project.title]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${project.logoImg === "ethereum" ? "p-1.5 bg-indigo-500/10" : project.logoImg ? "p-1.5 bg-black/10" : project.iconBg}`}>
            {project.logoImg === "ethereum" ? (
              <EthereumLogo className="w-full h-full text-indigo-400" />
            ) : project.logoImg ? (
              <img src={project.logoImg} alt={project.title} className="w-full h-full object-contain" />
            ) : (
              (() => {
                const IconComp = project.icon;
                return <IconComp className={`w-6 h-6 ${project.iconColor}`} />;
              })()
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground font-outfit">{project.title}</h3>
              {project.liveBadges?.map((badge) => (
                <span key={badge.text} className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.text}
                </span>
              ))}
              {project.title === "Saveetha Hub" && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all duration-300"
                >
                  <Star className="w-3 h-3 fill-current text-yellow-500" /> {stars !== null ? stars : "21"} Stars
                </a>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-grotesk">{project.desc}</p>
          </div>
        </div>
        
        {/* Platform Badges */}
        {!project.pptLink && project.platformBadges && (
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
            {project.platformBadges?.map((badge) => {
              const BadgeIcon = badge.icon === "globe" ? ExternalLink : Smartphone;
              return (
                <a 
                  key={badge.text}
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/40 hover:bg-secondary/70 dark:bg-black/35 dark:hover:bg-black/50 text-xs font-semibold text-foreground/90 transition-all duration-300"
                  onClick={() => trackEvent("click", badge.icon === "globe" ? "demo" : "play_store", project.title)}
                >
                  <BadgeIcon className="w-3.5 h-3.5 text-primary" /> {badge.text}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Description and Stats side-by-side row for PPT/Research projects */}
      {project.pptLink && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-grotesk">{project.desc}</p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {project.stats?.map((stat) => {
              const StatIcon = getStatIcon(stat.iconName || "users");
              return (
                <div key={stat.label} className="p-3 rounded-xl bg-secondary/80 dark:bg-black/30 border border-border/30 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <StatIcon className="w-4.5 h-4.5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold text-foreground font-outfit leading-none block">
                      {stat.value}
                    </span>
                    <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-tight leading-none mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Layout (Conditional Mobile Mockup vs Standard Grid) */}
      {project.mobileMockup ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Details block (Tech, Key Features, Stats, Problem/Solution/Impact) */}
          <div className="md:col-span-8 space-y-4">
            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 font-outfit">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech.name} className="px-3 py-1 rounded-full bg-secondary/60 border border-border/50 text-xs text-foreground/80 font-grotesk">
                    <span>{tech.icon}</span> {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features List */}
            {project.features && (
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 font-outfit">⭐ Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feat) => {
                    const FeatIcon = getFeatureIcon(feat.icon);
                    return (
                      <div key={feat.name} className="flex items-center gap-2 text-xs text-foreground/95 font-grotesk">
                        <FeatIcon className="w-4 h-4 text-primary shrink-0" />
                        <span>{feat.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Problem, Solution, Impact Grid (Moved inside for mobile mockup layout) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
              <div className="space-y-1">
                <h5 className="text-[11px] font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#FF5E36]">🎯</span> Problem
                </h5>
                <p className="text-[11px] text-muted-foreground font-grotesk leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="space-y-1">
                <h5 className="text-[11px] font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#A020F0]">🚀</span> Solution
                </h5>
                <p className="text-[11px] text-muted-foreground font-grotesk leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div className="space-y-1">
                <h5 className="text-[11px] font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#10B981]">📈</span> Impact
                </h5>
                <ul className="space-y-0.5">
                  {project.impact.map((imp, idx) => (
                    <li key={idx} className="text-[11px] text-muted-foreground font-grotesk flex items-center gap-1">
                      <span className="text-[#10B981] font-bold">✓</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats Grid (Moved inside for mobile mockup layout) */}
            {project.stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-4 border-t border-border/40">
                {project.stats.map((stat) => {
                  const StatIcon = getStatIcon(stat.iconName || "users");
                  return (
                    <div key={stat.label} className="p-2.5 rounded-xl bg-secondary/80 dark:bg-black/30 border border-border/30 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <StatIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-extrabold text-foreground font-outfit">
                          {stat.value}
                        </span>
                        <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-tight leading-none">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Phone Mockup */}
          <div className="md:col-span-4 flex justify-center pt-2">
            <div 
              className="relative w-[180px] aspect-[474/1024] rounded-[2.2rem] border-[3.5px] border-slate-800 bg-slate-950 p-1 shadow-2xl overflow-hidden group cursor-pointer"
              onMouseEnter={() => {
                if (project.videoMockup) {
                  setIsHoveringVideo(true);
                  setIsVideoLoaded(false);
                }
              }}
              onMouseLeave={() => {
                if (project.videoMockup) {
                  setIsHoveringVideo(false);
                  setIsVideoLoaded(false);
                }
              }}
            >
              {/* Notch / Speaker */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 absolute left-2" />
                <div className="w-6 h-0.5 bg-slate-900 rounded-full" />
              </div>
              {/* Screen Image or Video */}
              <div className="w-full h-full rounded-[1.9rem] overflow-hidden bg-white relative">
                <ProgressiveImage 
                  src={project.mobileMockup} 
                  alt="App Mockup" 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isHoveringVideo ? 'opacity-0' : 'opacity-100'}`}
                  containerClassName={`w-full h-full absolute inset-0 ${isHoveringVideo ? 'z-0' : 'z-10'}`}
                />
                
                {project.videoMockup && isHoveringVideo && (
                  <div className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center z-20">
                    {!isVideoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <video 
                      src={project.videoMockup} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      onLoadedData={() => setIsVideoLoaded(true)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard non-mobile mockup content */
        <div className="space-y-4">
          {/* Show dynamic image comparison only for Object Detection */}
          {project.title === "Object Detection in Python" && (
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-border/50 bg-black/40">
              <ProgressiveImage
                src="/object_detection_comparison.webp"
                alt="Object Detection Comparison"
                className="w-full h-auto"
                containerClassName="w-full h-auto"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded bg-[#FF5E36] text-[10px] uppercase font-bold text-white tracking-wider">
                Original Image
              </span>
              <span className="absolute top-3 left-[51%] px-3 py-1 rounded bg-[#10B981] text-[10px] uppercase font-bold text-white tracking-wider">
                Detection Output
              </span>
            </div>
          )}

          {/* Saveetha Hub Custom Dashboard Row (expanded to full width) */}
          {project.title === "Saveetha Hub" && (
            <div className="p-5 rounded-xl border border-border/40 bg-card/40 shadow-inner">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5 uppercase tracking-wider mb-4 font-outfit">
                <TrendingUp className="w-4 h-4 text-primary" /> Live Performance
              </h4>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {project.stats?.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg bg-secondary/80 dark:bg-black/30 border border-border/30 flex flex-col justify-between h-24">
                    <div>
                      <span className={`text-base font-extrabold ${stat.color} font-outfit`}>
                        {stat.value}
                      </span>
                      <p className="text-[9px] text-foreground/80 font-bold uppercase tracking-tight mt-0.5 leading-none">
                        {stat.label}
                      </p>
                      <p className="text-[8px] text-muted-foreground leading-none mt-1">
                        {stat.sublabel}
                      </p>
                    </div>
                    <Sparkline colorClass={stat.color} path={stat.path} />
                  </div>
                ))}
              </div>
              
              {/* <div className="text-[9px] text-muted-foreground mt-4 flex items-center gap-1 border-t border-border/20 pt-3">
                🛡️ Analytics Data (Google Analytics & Search Console)
              </div> */}
            </div>
          )}

          {/* Tech Stack for Standard layout */}
          {!project.pptLink && (
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-outfit">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech.name} className="px-3 py-1 rounded-full bg-secondary/60 border border-border/50 text-xs text-foreground/80 font-grotesk">
                    <span>{tech.icon}</span> {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features for standard projects */}
          {project.features && (
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-outfit">⭐ Key Features</h4>
              <div className="flex flex-wrap gap-2.5">
                {project.features.map((feat) => {
                  const FeatIcon = getFeatureIcon(feat.icon);
                  return (
                    <span key={feat.name} className="px-3.5 py-2 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs text-foreground/95 font-grotesk flex items-center gap-2 transition-all duration-300">
                      <FeatIcon className="w-4 h-4 text-primary" /> {feat.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Results and Problem/Solution/Impact Row */}
          {project.keyResults && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 border-t border-border/40">
              {/* Left: Key Results Card */}
              <div className="md:col-span-5 p-4 rounded-xl bg-secondary/80 dark:bg-black/40 border border-border/50">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-outfit">📊 Key Results</h4>
                <div className="space-y-2">
                  {project.keyResults.map((res) => (
                    <div key={res.name} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold font-grotesk text-foreground/90 leading-none">
                        <span>{res.name}</span>
                        <span>{res.value}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${res.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${res.color}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[8px] text-muted-foreground mt-3 pt-2.5 border-t border-border/20 flex items-center gap-1.5 leading-tight font-grotesk">
                  📈 t-test (XGBoost vs Others): t = 5.892, p &lt; 0.001. Results are statistically significant.
                </div>
              </div>

              {/* Middle: Problem & Solution */}
              <div className="md:col-span-4 space-y-4">
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5 font-outfit">
                    <span className="text-[#FF5E36]">🎯</span> Problem
                  </h5>
                  <p className="text-xs text-muted-foreground font-grotesk leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="space-y-1 pt-2 border-t border-border/20">
                  <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5 font-outfit">
                    <span className="text-[#A020F0]">🚀</span> Solution
                  </h5>
                  <p className="text-xs text-muted-foreground font-grotesk leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Right: Impact */}
              <div className="md:col-span-3 space-y-2">
                <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#10B981]">📈</span> Impact
                </h5>
                <ul className="space-y-1.5">
                  {project.impact.map((imp, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground font-grotesk flex items-center gap-1.5">
                      <span className="text-[#10B981] font-bold">✓</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Standard Problem, Solution, Impact Grid for standard projects */}
          {!project.keyResults && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/40">
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#FF5E36]">🎯</span> Problem
                </h5>
                <p className="text-xs text-muted-foreground font-grotesk leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#A020F0]">🚀</span> Solution
                </h5>
                <p className="text-xs text-muted-foreground font-grotesk leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5 font-outfit">
                  <span className="text-[#10B981]">📈</span> Impact
                </h5>
                <ul className="space-y-1">
                  {project.impact.map((imp, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground font-grotesk flex items-center gap-1.5">
                      <span className="text-[#10B981] font-bold">✓</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tech Stack for Standard Layout rendering at the bottom when there are PPT slides */}
      {project.pptLink && (
        <div className="pt-4 border-t border-border/40">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5 font-outfit">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech.name} className="px-3 py-1 rounded-full bg-secondary/60 border border-border/50 text-xs text-foreground/80 font-grotesk">
                <span>{tech.icon}</span> {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Stat Cards for Mobile mockup */}
      {/* {project.mobileMockup && project.stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border/40">
          {project.stats.map((stat) => {
            const StatIcon = getStatIcon(stat.iconName || "users");
            return (
              <div key={stat.label} className="p-3 rounded-xl bg-secondary/80 dark:bg-black/30 border border-border/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <StatIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-foreground font-outfit">
                    {stat.value}
                  </span>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tight leading-none mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )} */}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border/40">
        {/* PPT Presentation Link */}
        {project.pptLink && (
          <Button asChild className="bg-primary hover:bg-primary/80" onClick={() => trackEvent("download", "ppt", project.title)}>
            <a href={project.pptLink} download target="_blank" rel="noopener noreferrer">
              <FileDown className="w-4 h-4 mr-2" /> View PPT Presentation
            </a>
          </Button>
        )}

        {/* Research Paper Link */}
        {project.researchPaperLink && (
          <Button asChild variant="outline" className="border-border hover:bg-white/5" onClick={() => trackEvent("click", "research_paper", project.title)}>
            <a href={project.researchPaperLink} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" /> View Research Paper
            </a>
          </Button>
        )}

        {/* Case Study Link */}
        {!project.pptLink && project.caseStudyLink && (
          <Link 
            to={project.caseStudyLink} 
            onClick={() => trackEvent("click", "case_study", project.title)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <BookOpen className="w-4 h-4 mr-2" /> Open Case Study
          </Link>
        )}

        {/* Play Store Link */}
        {!project.pptLink && project.playStoreLink && (
          <Button asChild size="icon" variant="outline" className="w-10 h-10 rounded-full border-border hover:bg-white/5 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "play_store", project.title)}>
            <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" title="View on Play Store">
              <img src="/icons/googleplay.svg" alt="Play Store" className="w-5 h-5 object-contain" />
            </a>
          </Button>
        )}

        {/* GitHub Link */}
        {!project.pptLink && project.githubLink && (
          <Button asChild size="icon" variant="outline" className="w-10 h-10 rounded-full border-border hover:bg-white/5 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "github_project", project.title)}>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" title="View on GitHub">
              <Github className="w-5 h-5" />
            </a>
          </Button>
        )}

        {/* LinkedIn Link */}
        {!project.pptLink && project.linkedinLink && (
          <Button asChild size="icon" variant="outline" className="w-10 h-10 rounded-full border-[#0077b5]/30 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "linkedin_project", project.title)}>
            <a href={project.linkedinLink} target="_blank" rel="noopener noreferrer" title="LinkedIn Post">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
        )}

        {/* Instagram Link */}
        {!project.pptLink && project.instagramLink && (
          <Button asChild size="icon" variant="outline" className="w-10 h-10 rounded-full border-[#E1306C]/30 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "instagram_project", project.title)}>
            <a href={project.instagramLink} target="_blank" rel="noopener noreferrer" title="Instagram Reel">
              <Instagram className="w-5 h-5" />
            </a>
          </Button>
        )}

        {/* Model Link */}
        {!project.pptLink && project.modelLink && (
          <Button asChild variant="outline" className="border-border hover:bg-white/5" onClick={() => trackEvent("download", "model", project.title)}>
            <a href={project.modelLink} target="_blank" rel="noopener noreferrer">
              📦 Download YOLO Model (yolov8n.pt)
            </a>
          </Button>
        )}

        {/* Live Demo Link */}
        {!project.pptLink && project.hasLiveDemo && (project.link || project.demoLink) && (
          <Button asChild variant="outline" className="border-border hover:bg-white/5" onClick={() => trackEvent("click", "demo", project.title)}>
            <a href={project.demoLink || project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
            </a>
          </Button>
        )}

        {/* Fallback button */}
        {!project.githubLink && !project.hasLiveDemo && !project.playStoreLink && !project.pptLink && (
          <Button asChild className="bg-primary hover:bg-primary/80" onClick={() => trackEvent("click", "project_link", project.title)}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> View Project
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [saveethaStars, setSaveethaStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/ComradeMohan/saveetha-companion")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setSaveethaStars(data.stargazers_count);
        }
      })
      .catch(() => {
        setSaveethaStars(21);
      });
  }, []);

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
          {projects.map((project, i) => {
            const ProjectIcon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <SpotlightCard
                  className={`rounded-2xl bg-gradient-to-br ${project.color} border border-border hover:border-primary/50 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 h-full`}
                  innerClassName="p-6 flex flex-col justify-between w-full h-full"
                  onClick={() => {
                    setActiveIndex(i);
                    setIsMobileOpen(true);
                    trackEvent("view", "project", project.title);
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${project.logoImg ? "p-1" : project.iconBg}`}>
                          {project.logoImg === "ethereum" ? (
                            <EthereumLogo className="w-full h-full text-indigo-400" />
                          ) : project.logoImg ? (
                            <img src={project.logoImg} alt={project.title} className="w-full h-full object-contain" />
                          ) : (
                            <ProjectIcon className={`w-4.5 h-4.5 ${project.iconColor}`} />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-foreground font-outfit">{project.title}</h3>
                          {project.title === "Saveetha Hub" && (
                            <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                              <Star className="w-2.5 h-2.5 fill-current" /> {saveethaStars !== null ? saveethaStars : "21"}
                            </div>
                          )}
                        </div>
                      </div>
                      {project.isFeatured && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary whitespace-nowrap">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 font-grotesk mb-4">{project.desc}</p>
                    
                    {/* Tech Stack for mobile */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech.name} className="px-2 py-0.5 rounded-md bg-secondary/50 border border-border/40 text-[10px] text-foreground/80 font-grotesk flex items-center gap-1">
                          <span>{tech.icon}</span> {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.pptLink ? (
                      <>
                        <Button asChild size="sm" className="bg-primary hover:bg-primary/80" onClick={() => trackEvent("download", "ppt", project.title)}>
                          <a href={project.pptLink} download target="_blank" rel="noopener noreferrer">
                            <FileDown className="w-3.5 h-3.5 mr-1.5" /> PPT Slides
                          </a>
                        </Button>
                        {project.researchPaperLink && (
                          <Button asChild size="sm" variant="outline" className="border-border" onClick={() => trackEvent("click", "research_paper", project.title)}>
                            <a href={project.researchPaperLink} target="_blank" rel="noopener noreferrer">
                              <FileText className="w-3.5 h-3.5 mr-1.5" /> Paper
                            </a>
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        {project.caseStudyLink && (
                          <Link 
                            to={project.caseStudyLink} 
                            onClick={() => trackEvent("click", "case_study", project.title)}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                          >
                            <BookOpen className="w-4 h-4 mr-2" /> Open Case Study
                          </Link>
                        )}
                        {project.hasLiveDemo && (
                          <Button asChild size="sm" className="bg-primary hover:bg-primary/80" onClick={() => trackEvent("click", "demo", project.title)}>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Demo
                            </a>
                          </Button>
                        )}
                        {project.playStoreLink && (
                          <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-border hover:bg-white/5 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "play_store", project.title)}>
                            <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" title="View on Play Store">
                              <img src="/icons/googleplay.svg" alt="Play Store" className="w-4 h-4 object-contain" />
                            </a>
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-border hover:bg-white/5 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "github_project", project.title)}>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.linkedinLink && (
                          <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-[#0077b5]/30 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "linkedin_project", project.title)}>
                            <a href={project.linkedinLink} target="_blank" rel="noopener noreferrer" title="LinkedIn Post">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.instagramLink && (
                          <Button asChild size="icon" variant="outline" className="w-9 h-9 rounded-full border-[#E1306C]/30 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 hover:scale-110 transition-transform" onClick={() => trackEvent("click", "instagram_project", project.title)}>
                            <a href={project.instagramLink} target="_blank" rel="noopener noreferrer" title="Instagram Reel">
                              <Instagram className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: Split view */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Project List */}
          <div className="lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-2 snap-y snap-mandatory">
            {projects.map((project, i) => {
              const ProjectIcon = project.icon;
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard
                    className={`rounded-2xl border cursor-pointer transition-all duration-300 snap-start ${
                      isActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                    innerClassName={`p-5 flex items-center gap-4 w-full h-full ${isActive ? 'pl-8' : ''}`}
                    onClick={() => {
                      setActiveIndex(i);
                      trackEvent("view", "project", project.title);
                    }}
                  >
                    {/* Left border active indicator dot */}
                  {isActive && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}

                  {/* Icon container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${project.logoImg ? "p-1.5" : project.iconBg}`}>
                    {project.logoImg === "ethereum" ? (
                      <EthereumLogo className="w-full h-full text-indigo-400" />
                    ) : project.logoImg ? (
                      <img src={project.logoImg} alt={project.title} className="w-full h-full object-contain" />
                    ) : (
                      <ProjectIcon className={`w-6 h-6 ${project.iconColor}`} />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 font-outfit">{project.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 font-grotesk">{project.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
            })}
          </div>

          {/* Right Project Detail View */}
          <div className="lg:col-span-7 sticky top-24">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <SpotlightCard
                className={`rounded-2xl bg-gradient-to-br ${projects[activeIndex].color} border border-border h-full`}
                innerClassName="p-6 flex flex-col justify-between w-full h-full"
              >
                <ProjectDetailContent project={projects[activeIndex]} />
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
        
        {/* Mobile Popup Modal */}
        {typeof document !== "undefined" && createPortal(
          <AnimatePresence>
            {isMobileOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:hidden">
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                  onClick={() => setIsMobileOpen(false)}
                />
                
                {/* Modal Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card bg-gradient-to-br ${projects[activeIndex].color} border border-border p-6 shadow-2xl z-10 flex flex-col justify-between`}
                >
                  {/* Close Button */}
                  <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-border/40 text-foreground transition-all duration-200 z-50"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="pt-2">
                    <ProjectDetailContent project={projects[activeIndex]} />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
