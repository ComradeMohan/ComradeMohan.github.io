import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Send, Github, Linkedin, FileText, ArrowRight, ShieldCheck, Loader2,
  Copy, Check, ExternalLink, Download, Eye, MapPin, Briefcase, BookOpen, Clock,
  User, Pencil, MessageSquare, Rocket, X, Undo2, Zap, RotateCcw, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

// Fallback GitHub data
const githubFallback = {
  avatar: "https://avatars.githubusercontent.com/u/108343711?v=4",
  name: "Mohan Reddy",
  bio: "Full Stack Developer specializing in React, TypeScript, Java, and Kotlin. Builder of UniVault & SaveethaHub.",
  followers: 12,
  following: 15,
  publicRepos: 18,
  location: "India",
  company: "Saveetha School of Engineering",
  website: "https://mohanreddy.me",
  htmlUrl: "https://github.com/ComradeMohan",
  latestRepo: {
    name: "UniVault",
    url: "https://github.com/ComradeMohan/UniVault",
    description: "Secure local offline-first Android password manager using AES-256 and Room database.",
    updatedAt: "Jun 2026"
  }
};

// LinkedIn Information
const linkedinInfo = {
  name: "Mohan Reddy",
  title: "Full Stack Developer & Software Engineer",
  avatar: "/mohan-reddy-full-stack-developer.webp",
  location: "Chennai, Tamil Nadu, India",
  education: "Saveetha School of Engineering (SIMATS)",
  headline: "Building UniVault & SaveethaHub. Open to full-time roles & internships starting 2026.",
  profileUrl: "https://www.linkedin.com/in/mmohanreddy/",
  skills: ["React", "TypeScript", "Android/Kotlin", "Java", "Firebase", "SQL"]
};

// Resume Information
const resumeInfo = {
  education: "B.E. Computer Science & Engineering",
  experience: "Lead Creator of UniVault (AES-256 Room DB) & SaveethaHub (2000+ users)",
  skills: ["React/Vite", "TypeScript", "Kotlin/Android", "Java SE 17", "Tailwind CSS", "Firebase/SQL"],
  downloadUrl: "/mohan_resume_.pdf",
  previewUrl: "/mohan_resume_.pdf"
};

// Email Information
const emailInfo = {
  address: "madhiremohanreddy@gmail.com",
  preferredMethod: "Email (Direct response within 24 hours)",
  availability: "Available for technical discussions and inquiries."
};

// Component to dynamically load the official LinkedIn Badge
const LinkedInBadge = ({ theme }: { theme: "light" | "dark" }) => {
  useEffect(() => {
    const scriptId = "linkedin-badge-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://platform.linkedin.com/badge/js/profile.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const renderTimer = setTimeout(() => {
      // @ts-ignore
      if (window.LIRenderAll) {
        // @ts-ignore
        window.LIRenderAll();
      }
    }, 150);

    return () => clearTimeout(renderTimer);
  }, [theme]);

  return (
    <div className="flex justify-center items-center py-1">
      <div
        key={theme}
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme={theme}
        data-type="VERTICAL"
        data-vanity="mmohanreddy"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link text-xs text-orange-400 font-grotesk font-semibold hover:underline"
          href="https://in.linkedin.com/in/mmohanreddy?trk=profile-badge"
        >
          Mohan Reddy
        </a>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Field completion & progress line metrics
  const isNameValid = form.name.trim().length > 0;
  const isEmailValid = form.email.trim().length > 0 && form.email.includes("@");
  const isSubjectValid = form.subject.trim().length > 0;
  const isMessageValid = form.message.trim().length > 0;

  const completedCount = [isNameValid, isEmailValid, isSubjectValid, isMessageValid].filter(Boolean).length;

  let timelineLineHeight = "0%";
  if (isMessageValid) timelineLineHeight = "100%";
  else if (isSubjectValid || focusedField === "message") timelineLineHeight = "76%";
  else if (isEmailValid || focusedField === "subject") timelineLineHeight = "51%";
  else if (isNameValid || focusedField === "email") timelineLineHeight = "26%";
  else if (focusedField === "name") timelineLineHeight = "8%";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // 20-Second Undo Send Buffer state
  const [undoCountdown, setUndoCountdown] = useState<number>(20);
  const [isUndoPending, setIsUndoPending] = useState<boolean>(false);
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const undoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pendingFormRef = useRef<{ name: string; email: string; subject: string; message: string } | null>(null);

  // Interaction States
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null);

  // Refs for tracking hover tunnel bridging
  const isHoveringPopoverRef = useRef(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // GitHub API state
  const [githubData, setGithubData] = useState<any>(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState(false);

  // Monitor screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Monitor theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredCard(null);
        setFocusedCard(null);
        setActiveBottomSheet(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Viewport position updates
  useEffect(() => {
    const handleViewportChange = () => {
      const activeId = hoveredCard || focusedCard;
      if (activeId) {
        const activeElement = document.querySelector(`[data-contact-card="${activeId}"]`);
        if (activeElement) {
          setActiveCardRect(activeElement.getBoundingClientRect());
        }
      }
    };

    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    return () => {
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [hoveredCard, focusedCard]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
      if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
    };
  }, []);

  // Keyboard shortcut listener: Press Escape or Ctrl/Cmd + Z to undo send while buffer is pending
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUndoPending) {
        if (e.key === "Escape" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z")) {
          e.preventDefault();
          handleCancelAndUndo();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isUndoPending]);

  // GitHub API fetch
  const fetchGithubData = async () => {
    if (githubData || githubLoading) return;
    setGithubLoading(true);
    setGithubError(false);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch("https://api.github.com/users/ComradeMohan"),
        fetch("https://api.github.com/users/ComradeMohan/repos?sort=updated&per_page=1")
      ]);

      if (!userRes.ok) throw new Error("GitHub user endpoint failed");
      const userData = await userRes.json();

      let latestRepo = null;
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (reposData && reposData.length > 0) {
          latestRepo = {
            name: reposData[0].name,
            url: reposData[0].html_url,
            description: reposData[0].description,
            updatedAt: new Date(reposData[0].pushed_at).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric"
            })
          };
        }
      }

      setGithubData({
        avatar: userData.avatar_url,
        name: userData.name || "Mohan Reddy",
        bio: userData.bio || "Full Stack Developer",
        followers: userData.followers,
        following: userData.following,
        publicRepos: userData.public_repos,
        location: userData.location || "India",
        company: userData.company || "SIMATS",
        website: userData.blog || "https://mohanreddy.me",
        htmlUrl: userData.html_url,
        latestRepo
      });
    } catch (err) {
      console.error("Error fetching GitHub profile:", err);
      setGithubError(true);
    } finally {
      setGithubLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailInfo.address);
    setCopied(true);
    toast({
      title: "Email copied",
      description: "Copied to clipboard successfully."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Actual Network Dispatch function (triggered after 20s or on "Send Now")
  const executeActualSend = async (dataToSend: { name: string; email: string; subject: string; message: string }) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
    setIsUndoPending(false);
    setIsSubmitting(true);

    const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    try {
      let success = false;

      if (isLocalhost) {
        // Local Dev: Simulated timer-based test submission without calling FormInit API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        success = true;
      } else {
        // Production: Real FormInit API endpoint form posting
        const formData = new FormData();
        formData.append("fi-sender-fullName", dataToSend.name);
        formData.append("fi-sender-email", dataToSend.email);
        formData.append("fi-text-subject", dataToSend.subject);
        formData.append("fi-text-message", dataToSend.message);

        const searchParams = new URLSearchParams(window.location.search);
        const trackingParams = {
          utm_source: "utmSource",
          utm_medium: "utmMedium",
          utm_campaign: "utmCampaign",
          utm_term: "utmTerm",
          utm_content: "utmContent",
          gclid: "gclid",
          wbraid: "wbraid",
          gbraid: "gbraid",
          fbclid: "fbclid",
          msclkid: "msclkid",
          ttclid: "ttclid",
          twclid: "twclid",
          li_fat_id: "li_fat_id",
          amzclid: "amzclid",
          mc_cid: "mc_cid",
          mc_eid: "mc_eid"
        };

        Object.entries(trackingParams).forEach(([urlKey, formKey]) => {
          const val = searchParams.get(urlKey);
          if (val) {
            formData.append(`fi-tracking-${formKey}`, val);
          }
        });

        const response = await fetch("https://forminit.com/f/t6libcvtapx", {
          method: "POST",
          headers: {
            "FormInit-SDK-Version": "0.2.3",
            "Accept": "application/json"
          },
          body: formData
        });

        const resJson = await response.json();
        if (response.ok && resJson.success !== false) {
          success = true;
        }
      }

      if (success) {
        localStorage.setItem("form_last_submission", Date.now().toString());
        trackEvent("submit", "contact", "contact_form_success");

        setIsSent(true);
        setTimeout(() => setIsSent(false), 3800);

        toast({
          title: isLocalhost ? "Test Message Sent (Local Mode)" : "Message sent!",
          description: isLocalhost ? "Form submission simulated locally. Real emails will be sent in production." : "Thank you for reaching out. I'll get back to you soon."
        });
        setForm({ name: "", email: "", subject: "", message: "" });
        pendingFormRef.current = null;
      } else {
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Connection failed",
        description: "Could not reach the server. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initiates the 20-second Undo Send grace period buffer
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast({
        title: "Incomplete form",
        description: "Please fill out all fields before sending.",
        variant: "destructive"
      });
      return;
    }

    const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    // Security Cooldown rate limiting (5s on localhost, 30s in production)
    const lastSub = localStorage.getItem("form_last_submission");
    if (lastSub) {
      const elapsed = Date.now() - parseInt(lastSub, 10);
      const cooldown = isLocalhost ? 5000 : 30000;
      if (elapsed < cooldown) {
        const remaining = Math.ceil((cooldown - elapsed) / 1000);
        toast({
          title: "Please wait",
          description: `You are sending messages too quickly. Please wait ${remaining} seconds.`,
          variant: "destructive"
        });
        return;
      }
    }

    const currentSnapshot = { ...form };
    pendingFormRef.current = currentSnapshot;
    setIsUndoPending(true);
    setUndoCountdown(20);

    trackEvent("queue", "contact", "contact_form_undo_started");

    const startTime = Date.now();
    const totalDuration = 20000;

    if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

    undoIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingMs = Math.max(0, totalDuration - elapsed);
      const remainingSec = Math.ceil(remainingMs / 1000);
      setUndoCountdown(remainingSec);

      if (remainingMs <= 0) {
        if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
      }
    }, 150);

    undoTimerRef.current = setTimeout(() => {
      if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
      executeActualSend(currentSnapshot);
    }, totalDuration);
  };

  const handleCancelAndUndo = () => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
    setIsUndoPending(false);
    setUndoCountdown(20);

    trackEvent("undo", "contact", "contact_form_undone");

    toast({
      title: "Send Cancelled ↩️",
      description: "Your message was not sent. You can edit and send whenever you're ready."
    });
  };

  const handleSendImmediately = () => {
    if (pendingFormRef.current) {
      executeActualSend(pendingFormRef.current);
    } else {
      executeActualSend(form);
    }
  };

  const contactMethods = [
    {
      id: "email",
      label: "Email Me",
      value: "madhiremohanreddy@gmail.com",
      icon: <Mail className="w-5 h-5 text-orange-500 dark:text-orange-400" />,
      iconBoxClass: "bg-orange-500/10 border-orange-500/30 text-orange-500 dark:bg-[#1E1714] dark:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
      arrowClass: "text-orange-500 border-orange-500/30 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-black group-hover:border-orange-500",
      href: "mailto:madhiremohanreddy@gmail.com",
      trackType: "email_contact"
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "/in/mmohanreddy",
      icon: <Linkedin className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      iconBoxClass: "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:bg-[#0E1A29] dark:text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]",
      arrowClass: "text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10 group-hover:bg-sky-500 group-hover:text-white dark:group-hover:text-black group-hover:border-sky-500",
      href: "https://www.linkedin.com/in/mmohanreddy/",
      trackType: "linkedin_contact"
    },
    {
      id: "github",
      label: "GitHub",
      value: "ComradeMohan",
      icon: <Github className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      iconBoxClass: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:bg-[#181426] dark:text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      arrowClass: "text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white dark:group-hover:text-black group-hover:border-purple-500",
      href: "https://github.com/ComradeMohan",
      trackType: "github_contact"
    },
    {
      id: "resume",
      label: "Download Resume",
      value: "View my latest resume",
      icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      iconBoxClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:bg-[#0F221B] dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      arrowClass: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-black group-hover:border-emerald-500",
      href: "/mohan_resume_.pdf",
      trackType: "resume_contact"
    }
  ];

  // Component renderers for hover popovers
  const renderGithubContent = () => {
    const loading = githubLoading;
    const error = githubError;
    const data = githubData;

    if (loading) {
      return (
        <div className="w-full p-4 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-secondary rounded w-2/3" />
              <div className="h-3 bg-secondary rounded w-1/2" />
            </div>
          </div>
          <div className="h-3 bg-secondary rounded w-full" />
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-border">
            <div className="h-8 bg-secondary rounded" />
            <div className="h-8 bg-secondary rounded" />
            <div className="h-8 bg-secondary rounded" />
          </div>
          <div className="h-10 bg-secondary rounded-lg w-full" />
        </div>
      );
    }

    const user = error || !data ? githubFallback : data;

    return (
      <div className="w-full text-left space-y-4 font-outfit text-foreground">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border border-purple-500/40 object-cover shrink-0" />
          <div>
            <h4 className="text-sm font-extrabold text-foreground leading-tight">{user.name}</h4>
            <p className="text-xs text-orange-500 font-grotesk mt-0.5 leading-none">@ComradeMohan</p>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-grotesk">
              <MapPin className="w-3 h-3 text-purple-500" /> {user.location}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-grotesk leading-normal">
          {user.bio}
        </p>

        <div className="grid grid-cols-3 gap-2 py-2 border-y border-border text-center font-grotesk">
          <div>
            <span className="block text-xs font-bold text-foreground">{user.publicRepos}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Repos</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-foreground">{user.followers}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Followers</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-foreground">{user.following}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Following</span>
          </div>
        </div>

        {user.latestRepo && (
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs">
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 font-grotesk uppercase tracking-wider flex items-center gap-1 mb-1">
              <BookOpen className="w-3 h-3" /> Latest Activity
            </span>
            <a href={user.latestRepo.url} target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:text-orange-500 transition-colors block leading-tight truncate">
              {user.latestRepo.name}
            </a>
            <p className="text-[11px] text-muted-foreground font-grotesk line-clamp-2 mt-1 leading-snug">
              {user.latestRepo.description}
            </p>
          </div>
        )}

        <Button asChild variant="outline" className="w-full rounded-xl text-xs py-2.5 h-auto font-grotesk border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-500/20">
          <a href={user.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
            View Github Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    );
  };

  const renderLinkedinContent = () => {
    return (
      <div className="w-full text-left space-y-4 font-outfit text-foreground">
        <LinkedInBadge theme={isDark ? "dark" : "light"} />

        <div className="space-y-2 text-xs text-muted-foreground font-grotesk leading-normal border-t border-border pt-3">
          <div className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
            <span>{linkedinInfo.title}</span>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
            <span>{linkedinInfo.education}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-grotesk leading-snug bg-sky-500/10 p-3 rounded-xl border border-sky-500/30">
          "{linkedinInfo.headline}"
        </p>

        <Button asChild className="w-full rounded-xl text-xs py-2.5 h-auto font-grotesk bg-[#0077b5] hover:bg-[#0077b5]/90 text-white shadow-md">
          <a href={linkedinInfo.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
            View Full Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    );
  };

  const renderEmailContent = () => {
    return (
      <div className="w-full text-left space-y-4 font-outfit text-foreground">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-foreground">Email Address</h4>
          <span className="text-xs text-muted-foreground font-grotesk block truncate select-all bg-secondary/50 px-3 py-2 rounded-xl border border-orange-500/30">
            {emailInfo.address}
          </span>
        </div>

        <div className="space-y-1 text-xs font-grotesk">
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block">Response Window</span>
          <p className="text-muted-foreground leading-relaxed">
            {emailInfo.preferredMethod}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 font-grotesk">
          <Button onClick={handleCopyEmail} variant="outline" className="rounded-xl text-xs py-2.5 h-auto flex items-center justify-center gap-1.5 border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-300 hover:bg-orange-500/20">
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Email
              </>
            )}
          </Button>
          <Button asChild className="rounded-xl text-xs py-2.5 h-auto bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md">
            <a href={`mailto:${emailInfo.address}`} className="flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Open Mail
            </a>
          </Button>
        </div>
      </div>
    );
  };

  const renderResumeContent = () => {
    return (
      <div className="w-full text-left space-y-4 font-outfit text-foreground">
        <div className="flex gap-4">
          <div className="w-20 h-28 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shrink-0 p-2 flex flex-col justify-between select-none">
            <div className="space-y-1">
              <div className="w-8 h-2 bg-emerald-500/40 rounded" />
              <div className="w-full h-1 bg-border rounded" />
              <div className="w-4/5 h-1 bg-border rounded" />
              <div className="w-full h-1 bg-border rounded" />
              <div className="w-2/3 h-1 bg-border rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="w-4 h-4 bg-emerald-500/20 rounded flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
              </div>
              <span className="text-[7px] text-muted-foreground font-grotesk">PDF</span>
            </div>
          </div>

          <div className="flex-grow space-y-2 text-xs font-grotesk leading-snug">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-outfit">Education</span>
              <p className="text-muted-foreground text-[11px] leading-tight mt-0.5">
                {resumeInfo.education}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-outfit">Experience</span>
              <p className="text-muted-foreground text-[11px] leading-tight mt-0.5">
                {resumeInfo.experience}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-grotesk uppercase tracking-wider block">Top Skills</span>
          <div className="flex flex-wrap gap-1">
            {resumeInfo.skills.map(s => (
              <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-grotesk">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 font-grotesk">
          <Button asChild variant="outline" className="rounded-xl text-xs py-2.5 h-auto flex items-center justify-center gap-1.5 border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20">
            <a href={resumeInfo.previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Preview PDF
            </a>
          </Button>
          <Button asChild className="rounded-xl text-xs py-2.5 h-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md">
            <a href={resumeInfo.downloadUrl} download className="flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          </Button>
        </div>
      </div>
    );
  };

  const handleCardInteractionStart = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isMobile) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredCard(id);
    setActiveCardRect(e.currentTarget.getBoundingClientRect());
    if (id === "github") {
      fetchGithubData();
    }
  };

  const handleCardInteractionEnd = () => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopoverRef.current && !focusedCard) {
        setHoveredCard(null);
      }
    }, 150);
  };

  const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>, id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setFocusedCard(id);
    setActiveCardRect(e.currentTarget.getBoundingClientRect());
    if (id === "github") fetchGithubData();
  };

  const handlePopoverMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    isHoveringPopoverRef.current = true;
  };

  const handlePopoverMouseLeave = () => {
    isHoveringPopoverRef.current = false;
    closeTimeoutRef.current = setTimeout(() => {
      if (!focusedCard) {
        setHoveredCard(null);
      }
    }, 150);
  };

  const handleCardClick = (e: React.MouseEvent, method: typeof contactMethods[0]) => {
    if (isMobile) {
      e.preventDefault();
      setActiveBottomSheet(method.id);
      if (method.id === "github") {
        fetchGithubData();
      }
    } else {
      trackEvent("click", "social", method.trackType);
    }
  };

  const activeId = hoveredCard || focusedCard;
  const showPreview = !isMobile && activeId !== null;

  const getPopoverDimensions = (id: string) => {
    switch (id) {
      case "github": return { width: 320, height: 390 };
      case "linkedin": return { width: 310, height: 340 };
      case "email": return { width: 290, height: 200 };
      case "resume": return { width: 320, height: 310 };
      default: return { width: 300, height: 300 };
    }
  };

  const getPopoverStyle = () => {
    if (!activeId || !activeCardRect) return {};

    const { width, height } = getPopoverDimensions(activeId);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = activeCardRect.right + 16;
    if (left + width > viewportWidth - 16) {
      left = activeCardRect.left - width - 16;
    }
    if (left < 16) left = 16;

    let top = activeCardRect.top + activeCardRect.height / 2 - height / 2;
    top = Math.max(16, Math.min(viewportHeight - height - 16, top));

    return {
      position: "fixed" as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      maxHeight: `${viewportHeight - 32}px`,
    };
  };

  return (
    <section id="contact" className="pb-6 sm:pb-10 lg:pb-12 scroll-mt-20 md:scroll-mt-24 relative overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Card constructed with Pure HTML/CSS/SVG for dynamic Light/Dark theme switching */}
        <div className="relative rounded-2xl sm:rounded-[40px] bg-card/90 dark:bg-[#090C15]/95 border border-orange-500/30 dark:border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.08)] dark:shadow-[0_0_80px_rgba(249,115,22,0.12)] backdrop-blur-2xl p-4 sm:p-8 lg:p-10 overflow-hidden transition-colors duration-300">

          {/* Decorative Corner Dotted Matrix SVG */}
          <svg className="absolute top-4 right-4 w-32 h-32 text-orange-500/20 dark:text-orange-500/30 pointer-events-none" fill="currentColor">
            <pattern id="matrix-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#matrix-dots)" />
          </svg>

          {/* Central Curved Arc & Orbit Rings (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-20 w-[300px]">
            <svg className="w-full h-full" viewBox="0 0 300 600" preserveAspectRatio="none" fill="none">
              <path
                d="M 30,0 Q 270,300 30,600"
                stroke="url(#center-arc-gradient)"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]"
              />
              <defs>
                <linearGradient id="center-arc-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.05" />
                  <stop offset="20%" stopColor="#f97316" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                  <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centered Orbit Rings & Node */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
              <div className="w-24 h-24 rounded-full border border-orange-500/30 border-dashed animate-[spin_40s_linear_infinite] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-orange-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  <div className="w-10 h-10 rounded-full bg-card border border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Send className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch relative z-10">

            {/* Left Column: Let's Connect */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between text-left space-y-7"
            >
              {/* Header Info */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-wider font-outfit shadow-[0_0_12px_rgba(249,115,22,0.15)]">
                  <Rocket className="w-3.5 h-3.5 text-orange-500" />
                  <span>Let's Connect</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-foreground leading-[1.18] font-outfit tracking-tight">
                  Have an opportunity?<br />
                  Let's <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.3)]">build something amazing</span> together.
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground font-grotesk leading-relaxed">
                  I'm always open to discussing new opportunities, interesting projects, and innovative ideas.
                </p>
              </div>

              {/* 2x2 Grid of Social/Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {contactMethods.map((method) => (
                  <a
                    key={method.id}
                    href={method.href}
                    target={method.id !== "email" ? "_blank" : undefined}
                    rel={method.id !== "email" ? "noopener noreferrer" : undefined}
                    data-contact-card={method.id}
                    className="p-3.5 rounded-2xl border border-border/60 bg-secondary/30 dark:bg-black/20 hover:border-orange-500/40 hover:bg-secondary/60 transition-all duration-300 flex items-center justify-between group cursor-pointer select-none"
                    onClick={(e) => handleCardClick(e, method)}
                    onMouseEnter={(e) => handleCardInteractionStart(e, method.id)}
                    onMouseLeave={handleCardInteractionEnd}
                    onFocus={(e) => handleFocus(e, method.id)}
                    onBlur={() => setFocusedCard(null)}
                    aria-haspopup="dialog"
                    aria-expanded={activeId === method.id}
                    aria-label={`${method.label} Card - Press Escape to close preview`}
                  >
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${method.iconBoxClass}`}>
                        {method.icon}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-foreground font-outfit block">{method.label}</span>
                        <span className="text-[11px] text-muted-foreground font-grotesk block truncate" title={method.value}>
                          {method.value}
                        </span>
                      </div>
                    </div>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${method.arrowClass}`}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Available for Opportunities Bar */}
              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 font-outfit uppercase tracking-wider">
                    Available for Opportunities
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-grotesk leading-snug">
                  Actively looking for Full Stack Developer & Software Engineer roles.
                </p>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {["Full Time", "Internships", "Remote", "On-site"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-grotesk"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Send A Message Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between text-left space-y-8"
            >
              {/* Form Title Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-outfit">
                    SEND A MESSAGE
                  </span>
                </div>

                {/* Live Step Completion Counter Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-bold text-orange-500 dark:text-orange-400 font-grotesk shadow-[0_0_10px_rgba(249,115,22,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span>{completedCount}/4 Completed</span>
                </div>
              </div>

              {/* Connected Timeline Form Fields */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-8">
                <div className="relative space-y-7">
                  {/* Base Inactive Vertical Timeline Guide Line */}
                  <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-border/60 rounded-full pointer-events-none z-0" />

                  {/* Active Animated Glowing Timeline Progress Line */}
                  <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: timelineLineHeight }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute left-[19px] top-6 w-[2px] bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500 shadow-[0_0_12px_#f97316] rounded-full pointer-events-none z-0 max-h-[calc(100%-48px)]"
                  />

                  {/* Field 1: Name */}
                  <div className="relative flex items-start gap-4 z-10">
                    <motion.div
                      animate={{
                        scale: focusedField === "name" || isNameValid ? 1.08 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isNameValid
                        ? "bg-emerald-500/15 border-2 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : focusedField === "name"
                          ? "bg-orange-500/20 border-2 border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                          : "bg-secondary/70 border border-border/80 text-muted-foreground"
                        }`}
                    >
                      {isNameValid ? <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> : <User className="w-4 h-4" />}
                    </motion.div>
                    <div className="flex-1 relative">
                      <label className={`block text-xs font-semibold font-outfit mb-1 transition-colors ${focusedField === "name" ? "text-orange-500" : isNameValid ? "text-emerald-500" : "text-foreground"
                        }`}>
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fi-sender-fullName"
                          placeholder="e.g. Mohan Reddy"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          disabled={isSubmitting || isUndoPending}
                          required
                          spellCheck={false}
                          className="w-full bg-transparent border-b border-border/80 pb-2 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 disabled:opacity-60 transition-colors font-grotesk selection:bg-orange-500 selection:text-white"
                        />
                        <motion.span
                          animate={{ scale: focusedField === "name" || isNameValid ? 1.3 : 1 }}
                          className={`absolute right-0 bottom-0 translate-y-1/2 rounded-full transition-all duration-300 ${isNameValid
                            ? "w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            : focusedField === "name"
                              ? "w-2.5 h-2.5 bg-orange-500 shadow-[0_0_12px_#f97316]"
                              : "w-2 h-2 bg-orange-500/40"
                            }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 2: Email */}
                  <div className="relative flex items-start gap-4 z-10">
                    <motion.div
                      animate={{
                        scale: focusedField === "email" || isEmailValid ? 1.08 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isEmailValid
                        ? "bg-emerald-500/15 border-2 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : focusedField === "email"
                          ? "bg-orange-500/20 border-2 border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                          : "bg-secondary/70 border border-border/80 text-muted-foreground"
                        }`}
                    >
                      {isEmailValid ? <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> : <Mail className="w-4 h-4" />}
                    </motion.div>
                    <div className="flex-1 relative">
                      <label className={`block text-xs font-semibold font-outfit mb-1 transition-colors ${focusedField === "email" ? "text-orange-500" : isEmailValid ? "text-emerald-500" : "text-foreground"
                        }`}>
                        Your Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="fi-sender-email"
                          placeholder="e.g. mohanreddy@gmail.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          disabled={isSubmitting || isUndoPending}
                          required
                          spellCheck={false}
                          className="w-full bg-transparent border-b border-border/80 pb-2 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 disabled:opacity-60 transition-colors font-grotesk selection:bg-orange-500 selection:text-white"
                        />
                        <motion.span
                          animate={{ scale: focusedField === "email" || isEmailValid ? 1.3 : 1 }}
                          className={`absolute right-0 bottom-0 translate-y-1/2 rounded-full transition-all duration-300 ${isEmailValid
                            ? "w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            : focusedField === "email"
                              ? "w-2.5 h-2.5 bg-orange-500 shadow-[0_0_12px_#f97316]"
                              : "w-2 h-2 bg-orange-500/40"
                            }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 3: Subject */}
                  <div className="relative flex items-start gap-4 z-10">
                    <motion.div
                      animate={{
                        scale: focusedField === "subject" || isSubjectValid ? 1.08 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isSubjectValid
                        ? "bg-emerald-500/15 border-2 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : focusedField === "subject"
                          ? "bg-orange-500/20 border-2 border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                          : "bg-secondary/70 border border-border/80 text-muted-foreground"
                        }`}
                    >
                      {isSubjectValid ? <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> : <Pencil className="w-4 h-4" />}
                    </motion.div>
                    <div className="flex-1 relative">
                      <label className={`block text-xs font-semibold font-outfit mb-1 transition-colors ${focusedField === "subject" ? "text-orange-500" : isSubjectValid ? "text-emerald-500" : "text-foreground"
                        }`}>
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fi-text-subject"
                          placeholder="e.g. Project Collaboration"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          disabled={isSubmitting || isUndoPending}
                          required
                          spellCheck={false}
                          className="w-full bg-transparent border-b border-border/80 pb-2 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 disabled:opacity-60 transition-colors font-grotesk selection:bg-orange-500 selection:text-white"
                        />
                        <motion.span
                          animate={{ scale: focusedField === "subject" || isSubjectValid ? 1.3 : 1 }}
                          className={`absolute right-0 bottom-0 translate-y-1/2 rounded-full transition-all duration-300 ${isSubjectValid
                            ? "w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            : focusedField === "subject"
                              ? "w-2.5 h-2.5 bg-orange-500 shadow-[0_0_12px_#f97316]"
                              : "w-2 h-2 bg-orange-500/40"
                            }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 4: Message */}
                  <div className="relative flex items-start gap-4 z-10">
                    <motion.div
                      animate={{
                        scale: focusedField === "message" || isMessageValid ? 1.08 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isMessageValid
                        ? "bg-emerald-500/15 border-2 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : focusedField === "message"
                          ? "bg-orange-500/20 border-2 border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                          : "bg-secondary/70 border border-border/80 text-muted-foreground"
                        }`}
                    >
                      {isMessageValid ? <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> : <MessageSquare className="w-4 h-4" />}
                    </motion.div>
                    <div className="flex-1 relative">
                      <label className={`block text-xs font-semibold font-outfit mb-1 transition-colors ${focusedField === "message" ? "text-orange-500" : isMessageValid ? "text-emerald-500" : "text-foreground"
                        }`}>
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          name="fi-text-message"
                          placeholder="Write your message here..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          disabled={isSubmitting || isUndoPending}
                          required
                          spellCheck={false}
                          rows={3}
                          className="w-full bg-transparent border-b border-border/80 pb-2 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange-500 disabled:opacity-60 transition-colors font-grotesk resize-none selection:bg-orange-500 selection:text-white"
                        />
                        <motion.span
                          animate={{ scale: focusedField === "message" || isMessageValid ? 1.3 : 1 }}
                          className={`absolute right-0 bottom-0 translate-y-1/2 rounded-full transition-all duration-300 ${isMessageValid
                            ? "w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            : focusedField === "message"
                              ? "w-2.5 h-2.5 bg-orange-500 shadow-[0_0_12px_#f97316]"
                              : "w-2 h-2 bg-orange-500/40"
                            }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Footer & Send Button / 20s Undo Buffer HUD */}
                <div className="pt-4 border-t border-border/60">
                  <AnimatePresence mode="wait">
                    {isUndoPending ? (
                      <motion.div
                        key="undo-hud"
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="rounded-2xl border-2 border-orange-500/60 bg-card/95 dark:bg-[#120D08]/95 p-4 sm:p-5 shadow-[0_0_35px_rgba(249,115,22,0.25)] backdrop-blur-xl relative overflow-hidden space-y-3.5"
                      >
                        {/* Glowing Animated Progress Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary/80 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 shadow-[0_0_12px_#f97316]"
                            style={{ width: `${(undoCountdown / 20) * 100}%` }}
                            transition={{ ease: "linear", duration: 0.15 }}
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
                          {/* Left: Countdown Timer & Status */}
                          <div className="flex items-center gap-3.5">
                            <div className="relative flex items-center justify-center shrink-0">
                              <div className="w-11 h-11 rounded-full border border-orange-500/40 bg-orange-500/15 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.35)]">
                                <span className="text-xs font-black text-orange-500 font-outfit">{undoCountdown}s</span>
                              </div>
                              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-orange-500 animate-ping opacity-75" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs sm:text-sm font-bold text-foreground font-outfit tracking-wide">
                                  Message queued to send
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-grotesk font-semibold">
                                  Dispatching in {undoCountdown}s
                                </span>
                              </div>
                              <p className="text-[11px] text-muted-foreground font-grotesk">
                                Need changes? Click Undo or press <kbd className="px-1.5 py-0.5 text-[9px] bg-secondary border border-border/80 rounded font-mono text-foreground">Esc</kbd> to edit.
                              </p>
                            </div>
                          </div>

                          {/* Right: Actions (Undo & Send Immediately) */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            <Button
                              type="button"
                              onClick={handleCancelAndUndo}
                              variant="outline"
                              className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border-orange-500/60 bg-card hover:bg-orange-500/10 text-orange-500 hover:text-orange-400 font-outfit font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.15)] cursor-pointer"
                            >
                              <Undo2 className="w-4 h-4" />
                              <span>Undo & Edit</span>
                            </Button>

                            <Button
                              type="button"
                              onClick={handleSendImmediately}
                              className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-outfit font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
                            >
                              <Zap className="w-3.5 h-3.5 fill-current" />
                              <span>Send Now</span>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-6"
                      >
                        {/* Privacy Info */}
                        <div className="flex items-center gap-3 text-muted-foreground text-xs font-grotesk">
                          <div className="w-9 h-9 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div>
                            <p className="text-foreground font-medium leading-tight">Your information is safe with me.</p>
                            <p className="text-muted-foreground text-[11px]">I respect your privacy.</p>
                          </div>
                        </div>

                        {/* Liquid Wave Action Submit Button */}
                        <LiquidWaveButton isSubmitting={isSubmitting} isSent={isSent} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
      {/* Floating Inspector Panel (Desktop Popover) */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
            className="z-[100] p-5 bg-card/95 text-card-foreground border border-orange-500/40 dark:border-orange-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl select-none overflow-hidden"
            style={getPopoverStyle()}
            aria-label="Contact Card Details Panel"
          >
            {activeId === "github" && renderGithubContent()}
            {activeId === "linkedin" && renderLinkedinContent()}
            {activeId === "email" && renderEmailContent()}
            {activeId === "resume" && renderResumeContent()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Swipe-Up Bottom Sheet */}
      <AnimatePresence>
        {/* Mobile Interactive Bottom Sheet Drawer */}
        {isMobile && activeBottomSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBottomSheet(null)}
              className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              dragSnapToOrigin={true}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setActiveBottomSheet(null);
                }
              }}
              className="fixed bottom-0 left-0 right-0 bg-card/95 text-card-foreground border-t border-orange-500/40 dark:border-orange-500/30 backdrop-blur-2xl rounded-t-[32px] p-6 pb-8 z-[101] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col space-y-4 max-h-[85vh] overflow-y-auto touch-pan-y"
            >
              {/* Drag Handle Indicator Pill */}
              <div className="w-14 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-1 shrink-0 cursor-grab active:cursor-grabbing hover:bg-orange-500/50 transition-colors" />

              {/* Header with Title and Close X Button */}
              <div className="flex justify-between items-center pb-3 border-b border-border/80">
                <div>
                  <h3 className="font-extrabold text-foreground font-outfit uppercase tracking-wider text-xs">
                    {activeBottomSheet === "github" && "GitHub Profile Preview"}
                    {activeBottomSheet === "linkedin" && "LinkedIn Profile Preview"}
                    {activeBottomSheet === "email" && "Email Quick Actions"}
                    {activeBottomSheet === "resume" && "Resume & Experience"}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-grotesk mt-0.5">
                    Swipe down to close
                  </p>
                </div>

                <button
                  onClick={() => setActiveBottomSheet(null)}
                  className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus:outline-none"
                  aria-label="Close sheet"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-center py-2">
                {activeBottomSheet === "github" && renderGithubContent()}
                {activeBottomSheet === "linkedin" && renderLinkedinContent()}
                {activeBottomSheet === "email" && renderEmailContent()}
                {activeBottomSheet === "resume" && renderResumeContent()}
              </div>

              <Button
                onClick={() => setActiveBottomSheet(null)}
                variant="secondary"
                className="w-full rounded-xl font-semibold mt-2 h-11 bg-secondary text-foreground hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
              >
                Close
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

// Liquid Wave Button Component matching exact design specs: Normal -> On Click Ripple -> Sending -> Sent
const LiquidWaveButton = ({
  isSubmitting,
  isSent
}: {
  isSubmitting: boolean;
  isSent: boolean;
}) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev.slice(-2), newRipple]);
  };

  return (
    <motion.button
      type="submit"
      disabled={isSubmitting || isSent}
      onClick={handleButtonClick}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden group min-w-[210px] sm:min-w-[240px] h-[54px] rounded-full border-2 px-8 font-outfit font-extrabold text-sm transition-all duration-500 flex items-center justify-center gap-3 select-none cursor-pointer focus:outline-none ${isSent
        ? "border-emerald-500 bg-emerald-950/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.45)]"
        : isSubmitting
          ? "border-orange-500 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-[0_0_35px_rgba(249,115,22,0.6)]"
          : "border-orange-500/70 bg-card/90 dark:bg-[#0E121E]/90 text-foreground hover:border-orange-500 hover:bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:shadow-[0_0_35px_rgba(249,115,22,0.45)]"
        }`}
    >
      {/* 1. Ripple Rings Effect on Click */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ left: r.x, top: r.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-orange-400 pointer-events-none z-20"
        />
      ))}

      {/* 2. Dynamic Liquid Wave Motion Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        {/* Primary Wave */}
        <motion.svg
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-6 opacity-45"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C150,95 350,-30 500,45 C650,115 900,-15 1200,45 L1200,120 L0,120 Z"
            fill={isSent ? "#10b981" : "#f97316"}
          />
        </motion.svg>
        {/* Secondary Wave */}
        <motion.svg
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-4.5 opacity-35"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 C200,-15 400,85 600,25 C800,-35 1000,65 1200,25 L1200,120 L0,120 Z"
            fill={isSent ? "#34d399" : "#fb923c"}
          />
        </motion.svg>
      </div>

      {/* 3. Liquid Wave Button Animation States */}
      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex items-center gap-2.5 z-10 text-emerald-400 font-bold"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            </div>
            <span className="text-base tracking-tight font-extrabold">Message Sent!</span>
            {/* Success Celebration Sparkles */}
            <motion.span
              animate={{ opacity: [0, 1, 0], y: [-4, -14] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-xs ml-0.5"
            >
              ✨
            </motion.span>
          </motion.div>
        ) : isSubmitting ? (
          <motion.div
            key="sending"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex items-center gap-2.5 z-10 text-white font-bold"
          >
            <Loader2 className="w-5 h-5 text-white animate-spin" />
            <span className="text-base tracking-tight font-extrabold">Sending...</span>
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex items-center gap-3 z-10 text-foreground group-hover:text-orange-500 transition-colors"
          >
            <Send className="w-4 h-4 text-orange-500 transition-transform group-hover:scale-110 group-hover:translate-x-0.5" />
            <span className="font-extrabold text-base tracking-wide">Send Message</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ContactSection;

