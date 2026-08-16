import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Printer, Copy, Check, ExternalLink, ArrowLeft, Mail,
  FileText, Sparkles, Code2, GraduationCap, Award, Briefcase,
  CheckCircle2, Globe, Shield, Smartphone, Terminal, Eye, Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { useGithubContributions, useLeetcodeStats } from "@/hooks/useDeveloperStats";

type RoleFilter = "all" | "fullstack" | "android" | "backend";

const plainTextResume = `MOHAN REDDY
Full Stack Developer & Android Software Engineer
Email: madhiremohanreddy@gmail.com | Portfolio: https://mohanreddy.me | Location: Chennai, India
LinkedIn: https://www.linkedin.com/in/mmohanreddy/ | GitHub: https://github.com/ComradeMohan | LeetCode: https://leetcode.com/u/Comrademohan

================================================================================
EDUCATION
================================================================================
Saveetha School of Engineering (SIMATS), Chennai, India
Bachelor of Engineering in Computer Science & Engineering (2022 - 2026)
CGPA: 8.646 / 10.0

================================================================================
TECHNICAL SKILLS
================================================================================
- Languages: Java (SE 17), Kotlin, TypeScript, JavaScript, Python, C/C++, SQL
- Frontend: React, Vite, Next.js, Tailwind CSS, Framer Motion, HTML5, CSS3, Shadcn UI
- Mobile & Android: Android SDK, Jetpack Compose, Room Database, Kotlin Coroutines, MVVM
- Backend & Cloud: Node.js, Express, Firebase Firestore, REST APIs, Room DB, MySQL, Docker
- Security & Systems: AES-256-GCM Encryption, Offline-First Architecture, Git, CI/CD

================================================================================
FEATURED PROJECTS
================================================================================
1. UniVault – Offline-First Android Password Manager
   Stack: Kotlin, Jetpack Compose, Android SDK, Room DB, AES-256 Encryption
   - Architected a zero-knowledge, 100% offline-first credential vault storing passwords and 2FA tokens.
   - Implemented military-grade AES-256-GCM encryption with Android Keystore hardware-backed keys.
   - Built a custom biometric authentication lock and automated encrypted backup mechanism.
   - GitHub: https://github.com/ComradeMohan/UniVault

2. SaveethaHub – College Campus Management System
   Stack: React, TypeScript, Tailwind CSS, Firebase, Vite
   - Engineered an all-in-one portal supporting course resources, attendance tracking, and internal marks.
   - Scaled to over 2,000+ active student users with sub-50ms query response time.
   - Integrated real-time notifications, timetable management, and automated GPA calculators.
   - Live URL: https://saveethahub.site

================================================================================
CODING & PROBLEM SOLVING
================================================================================
- LeetCode: 467+ Problems Solved (178 Easy, 254 Medium, 35 Hard) | Contest Rating: 1512 (Top 32%)
- GitHub: 4,532+ Lifetime Contributions across 98+ repositories
- Primary Languages: Java (413+ solved), SQL, Python, TypeScript

================================================================================
CERTIFICATIONS
================================================================================
- Cisco Certified: Networking & Cybersecurity Essentials
- Oracle Cloud Infrastructure Certified
- AWS Certified Cloud Practitioner Knowledge
- HackerRank: 5-Star Java & Problem Solving Verified
`;

const Resume = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [copied, setCopied] = useState(false);

  const { data: contribData } = useGithubContributions("resume");
  const { data: leetcodeData } = useLeetcodeStats("resume");

  const totalCommits = contribData?.totalLifetime ? `${contribData.totalLifetime.toLocaleString()}+` : "4,532+";
  const totalSolved = leetcodeData?.profile?.solvedProblem ?? 467;
  const contestRating = Math.round(leetcodeData?.contest?.contestRating ?? 1512);

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    trackEvent("copy", "resume", "copy_plain_text_resume");
    toast({
      title: "Plain Text Resume Copied! 📋",
      description: "Formatted for instant copy-pasting into ATS and job application forms."
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackEvent("print", "resume", "print_resume_page");
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mohan Reddy - Resume",
        text: "Check out Mohan Reddy's interactive resume and software engineering portfolio.",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Resume URL copied to clipboard."
      });
    }
  };

  const isProjectVisible = (type: "fullstack" | "android" | "backend") => {
    if (roleFilter === "all") return true;
    return roleFilter === type;
  };

  return (
    <>
      <SEO
        title="Resume | Mohan Reddy - Full Stack & Android Developer"
        description="Official interactive resume of Mohan Reddy. B.E. CSE 2026 graduate with 4,532+ commits and expertise in React, TypeScript, Kotlin, Java, and offline-first architectures."
        canonical="https://mohanreddy.me/resume"
      />

      <Navbar />

      <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black">
        <div className="max-w-5xl mx-auto space-y-8 print:max-w-none print:space-y-4">

          {/* Top Navigation & Utility Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/80 print:hidden">
            <Button asChild variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" /> Back to Portfolio
              </Link>
            </Button>

            {/* View Mode Toggle: Interactive CV vs PDF */}
            <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-xl border border-border/70">
              <button
                onClick={() => setViewMode("interactive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-outfit font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "interactive"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Interactive CV
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1.5 rounded-lg text-xs font-outfit font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "pdf"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Original PDF
              </button>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
              <Button
                onClick={handleCopyText}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs gap-1.5 border-border/80 hover:bg-secondary cursor-pointer"
                title="Copy Plain Text for ATS forms"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy ATS Text"}</span>
              </Button>

              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs gap-1.5 border-border/80 hover:bg-secondary cursor-pointer hidden md:inline-flex"
                title="Print Resume (Ctrl+P)"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs gap-1.5 border-border/80 hover:bg-secondary cursor-pointer"
                title="Share Resume"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </Button>

              <Button
                asChild
                size="sm"
                className="rounded-xl text-xs gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-md shadow-orange-500/20 cursor-pointer"
              >
                <a href="/mohan_resume_.pdf" download="Mohan_Reddy_Resume.pdf">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </Button>
            </div>
          </div>

          {/* Conditional View: PDF Canvas Mode */}
          {viewMode === "pdf" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card/80 overflow-hidden shadow-2xl backdrop-blur-md"
            >
              <div className="p-4 bg-secondary/60 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-grotesk text-muted-foreground">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span>mohan_resume_.pdf (Official ATS Format)</span>
                </div>
                <Button asChild variant="outline" size="sm" className="h-8 rounded-lg text-xs gap-1.5">
                  <a href="/mohan_resume_.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
                  </a>
                </Button>
              </div>
              <div className="w-full h-[85vh] bg-zinc-900 flex items-center justify-center">
                <iframe
                  src="/mohan_resume_.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  className="w-full h-full border-0"
                  title="Mohan Reddy Resume PDF"
                />
              </div>
            </motion.div>
          ) : (
            /* Interactive Resume Mode */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 print:space-y-4"
            >
              {/* Recruiter Role Filter Bar */}
              <div className="flex items-center flex-wrap gap-2 print:hidden">
                <span className="text-xs font-bold text-muted-foreground font-grotesk uppercase tracking-wider mr-1">
                  Focus Filter:
                </span>
                {[
                  { id: "all", label: "🌟 All Experience" },
                  { id: "fullstack", label: "💻 Full Stack / Web" },
                  { id: "android", label: "📱 Android / Mobile" },
                  { id: "backend", label: "⚙️ Backend / Java" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRoleFilter(item.id as RoleFilter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-grotesk font-semibold transition-all cursor-pointer ${
                      roleFilter === item.id
                        ? "bg-primary/20 text-primary border border-primary/40 shadow-xs"
                        : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Resume Header Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card/85 border border-border/80 shadow-xl backdrop-blur-md relative overflow-hidden print:border-none print:p-0 print:shadow-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none print:hidden" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-grotesk uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Available for Full-Time Roles & Internships
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-foreground tracking-tight">
                      Mohan Reddy
                    </h1>
                    <p className="text-base sm:text-lg text-primary font-grotesk font-semibold">
                      Full Stack Developer & Android Software Engineer
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-grotesk max-w-2xl leading-relaxed">
                      Passionate software engineer with hands-on expertise building production-ready web apps and secure offline-first mobile applications. Creator of SaveethaHub (2,000+ active users) and UniVault (AES-256 offline vault).
                    </p>
                  </div>

                  {/* Contact Badges */}
                  <div className="flex flex-col gap-2.5 text-xs font-grotesk shrink-0 w-full md:w-auto">
                    <a
                      href="mailto:madhiremohanreddy@gmail.com"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/70 transition-colors text-foreground"
                    >
                      <Mail className="w-4 h-4 text-orange-500" />
                      <span>madhiremohanreddy@gmail.com</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/ComradeMohan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/70 transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5 text-purple-400" /> GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/mmohanreddy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/70 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-sky-400" /> LinkedIn
                      </a>
                      <a
                        href="https://leetcode.com/u/Comrademohan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/70 transition-colors"
                      >
                        <Terminal className="w-3.5 h-3.5 text-amber-500" /> LeetCode
                      </a>
                    </div>
                  </div>
                </div>

                {/* Real-time Proof Metrics Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/80 print:grid-cols-4 print:mt-3 print:pt-3">
                  <div className="p-3 rounded-2xl bg-secondary/30 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block font-grotesk">
                      Education & CGPA
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-foreground font-outfit mt-0.5 block">
                      8.646 CGPA
                    </span>
                    <span className="text-[10px] text-emerald-500 font-semibold font-grotesk">Saveetha University</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-secondary/30 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block font-grotesk">
                      GitHub Activity
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-purple-400 font-outfit mt-0.5 block">
                      {totalCommits}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-grotesk">Lifetime Commits</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-secondary/30 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block font-grotesk">
                      LeetCode Solved
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-amber-500 font-outfit mt-0.5 block">
                      {totalSolved}+ Solved
                    </span>
                    <span className="text-[10px] text-muted-foreground font-grotesk">Rating {contestRating} (Top 32%)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-secondary/30 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block font-grotesk">
                      SaveethaHub Reach
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-400 font-outfit mt-0.5 block">
                      2,000+ Users
                    </span>
                    <span className="text-[10px] text-muted-foreground font-grotesk">Active Campus Portal</span>
                  </div>
                </div>
              </div>

              {/* Technical Skills Section */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card/85 border border-border/80 shadow-lg backdrop-blur-md space-y-4 print:p-0 print:border-none print:shadow-none">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                    Technical Skills
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-grotesk">
                  <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/60 space-y-1.5">
                    <span className="font-bold text-foreground block text-sm font-outfit">Programming Languages</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Java (SE 17)", "Kotlin", "TypeScript", "JavaScript (ES6+)", "Python", "C/C++", "SQL"].map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/25 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/60 space-y-1.5">
                    <span className="font-bold text-foreground block text-sm font-outfit">Frontend & Web Development</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["React 18", "Vite", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn UI", "HTML5/CSS3"].map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/25 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/60 space-y-1.5">
                    <span className="font-bold text-foreground block text-sm font-outfit">Mobile & Android Engineering</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Android SDK", "Jetpack Compose", "Room DB", "Coroutines & Flow", "MVVM Architecture", "Offline-First"].map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/60 space-y-1.5">
                    <span className="font-bold text-foreground block text-sm font-outfit">Backend, Databases & Security</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Node.js", "Express", "Firebase Firestore", "SQLite", "MySQL", "AES-256 Encryption", "Docker", "Git & GitHub"].map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Projects Section */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card/85 border border-border/80 shadow-lg backdrop-blur-md space-y-6 print:p-0 print:border-none print:shadow-none">
                <div className="flex items-center justify-between pb-2 border-b border-border/80">
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-xl sm:text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                      Featured Engineering Projects
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Project 1: UniVault */}
                  {isProjectVisible("android") && (
                    <div className="p-5 rounded-2xl bg-secondary/20 border border-border/70 space-y-3 print:bg-transparent print:p-0">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold font-outfit text-foreground">
                              UniVault – Secure Offline-First Android Password Manager
                            </h3>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-grotesk">
                              Lead Creator
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-grotesk mt-0.5">
                            Kotlin • Jetpack Compose • Room DB • AES-256-GCM • Android Keystore
                          </p>
                        </div>
                        <div className="flex items-center gap-2 print:hidden">
                          <Button asChild variant="outline" size="sm" className="h-8 rounded-xl text-xs gap-1">
                            <Link to="/univault">
                              <Eye className="w-3.5 h-3.5" /> Case Study
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="h-8 rounded-xl text-xs gap-1">
                            <a href="https://github.com/ComradeMohan/UniVault" target="_blank" rel="noopener noreferrer">
                              <Code2 className="w-3.5 h-3.5" /> Code
                            </a>
                          </Button>
                        </div>
                      </div>

                      <ul className="list-disc list-inside space-y-1.5 text-xs text-muted-foreground font-grotesk leading-relaxed">
                        <li>
                          Architected an offline-first password vault with zero network dependencies, safeguarding credentials from cloud data leaks.
                        </li>
                        <li>
                          Implemented AES-256-GCM encryption with cryptographic keys anchored inside the hardware-backed Android Keystore.
                        </li>
                        <li>
                          Engineered local password generator, multi-category organization, biometric app lock, and encrypted local backup/restore functionality.
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Project 2: SaveethaHub */}
                  {isProjectVisible("fullstack") && (
                    <div className="p-5 rounded-2xl bg-secondary/20 border border-border/70 space-y-3 print:bg-transparent print:p-0">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold font-outfit text-foreground">
                              SaveethaHub – College Campus Management & Student Portal
                            </h3>
                            <span className="px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 text-[10px] font-bold font-grotesk">
                              Production App
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-grotesk mt-0.5">
                            React 18 • TypeScript • Tailwind CSS • Firebase Firestore • Vite
                          </p>
                        </div>
                        <div className="flex items-center gap-2 print:hidden">
                          <Button asChild variant="outline" size="sm" className="h-8 rounded-xl text-xs gap-1">
                            <Link to="/saveethahub">
                              <Eye className="w-3.5 h-3.5" /> Case Study
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="h-8 rounded-xl text-xs gap-1">
                            <a href="https://saveethahub.site" target="_blank" rel="noopener noreferrer">
                              <Globe className="w-3.5 h-3.5" /> Live Demo
                            </a>
                          </Button>
                        </div>
                      </div>

                      <ul className="list-disc list-inside space-y-1.5 text-xs text-muted-foreground font-grotesk leading-relaxed">
                        <li>
                          Developed and deployed an all-in-one portal providing course syllabus, timetable tracking, GPA calculators, and circular broadcasts.
                        </li>
                        <li>
                          Reached over 2,000+ active student users across departments with client-side caching achieving sub-50ms render latency.
                        </li>
                        <li>
                          Engineered responsive dark/light UI, fast search filters, and real-time announcements synchronization with Firebase.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Education & Academic Excellence */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card/85 border border-border/80 shadow-lg backdrop-blur-md space-y-4 print:p-0 print:border-none print:shadow-none">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                    Education
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-base font-bold font-outfit text-foreground">
                      Saveetha School of Engineering (SIMATS)
                    </h3>
                    <p className="text-xs text-primary font-semibold font-grotesk">
                      Bachelor of Engineering in Computer Science & Engineering
                    </p>
                    <p className="text-xs text-muted-foreground font-grotesk">
                      Chennai, Tamil Nadu, India • Specialization in Software Engineering & Distributed Systems
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-grotesk block sm:inline-block">
                      8.646 CGPA
                    </span>
                    <span className="text-xs text-muted-foreground font-grotesk block mt-1">
                      2022 – 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Certifications & Badges */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card/85 border border-border/80 shadow-lg backdrop-blur-md space-y-4 print:p-0 print:border-none print:shadow-none">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
                  <Award className="w-5 h-5 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                    Certifications & Verifications
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-grotesk">
                  <div className="p-3 rounded-xl bg-secondary/20 border border-border/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-foreground block">Cisco Certified Network Associate</span>
                      <span className="text-[11px] text-muted-foreground">Networking & Cybersecurity Essentials</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/20 border border-border/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-foreground block">Oracle Cloud Infrastructure</span>
                      <span className="text-[11px] text-muted-foreground">Cloud Foundations & Architecture</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/20 border border-border/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-foreground block">HackerRank 5-Star Java</span>
                      <span className="text-[11px] text-muted-foreground">Problem Solving & Algorithms</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/20 border border-border/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-foreground block">AWS Certified Cloud Practitioner</span>
                      <span className="text-[11px] text-muted-foreground">Cloud Architecture Fundamentals</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/15 via-primary/10 to-amber-500/15 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left print:hidden">
                <div>
                  <h3 className="text-lg font-bold font-outfit text-foreground">
                    Interested in working together?
                  </h3>
                  <p className="text-xs text-muted-foreground font-grotesk mt-0.5">
                    Open to full-time roles, contracts, and software engineering internships.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button asChild className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                    <a href="mailto:madhiremohanreddy@gmail.com">
                      <Mail className="w-4 h-4 mr-1.5" /> Get in Touch
                    </a>
                  </Button>
                </div>
              </div>

            </motion.div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Resume;
