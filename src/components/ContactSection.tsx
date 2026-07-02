import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Send, Github, Linkedin, FileText, ArrowRight, ShieldCheck, Loader2,
  Copy, Check, ExternalLink, Download, Eye, MapPin, Briefcase, BookOpen, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

// Fallback GitHub data (in case rate limit is hit or API fails)
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

// Manually supplied LinkedIn information for custom preview
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
          className="badge-base__link LI-simple-link text-xs text-primary font-grotesk font-semibold hover:underline" 
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // Monitor screen size to toggle mobile Bottom Sheet vs desktop Popover
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

  // Escape key handler to close popovers/bottom sheets
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

  // Monitor window scrolling and resizing to recalculate viewport positions of active hovered elements
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
    };
  }, []);

  // Lazy load and cache GitHub API data
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security Cooldown rate limiting
    const lastSub = localStorage.getItem("form_last_submission");
    if (lastSub) {
      const elapsed = Date.now() - parseInt(lastSub, 10);
      const cooldown = 60000;
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

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("fi-sender-fullName", form.name);
      formData.append("fi-sender-email", form.email);
      formData.append("fi-text-subject", form.subject);
      formData.append("fi-text-message", form.message);

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
        localStorage.setItem("form_last_submission", Date.now().toString());
        trackEvent("submit", "contact", "contact_form_success");

        toast({ 
          title: "Message sent!", 
          description: "Thank you for reaching out. I'll get back to you soon." 
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({ 
          title: "Submission failed", 
          description: resJson.message || "Something went wrong. Please try again.",
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

  const contactMethods = [
    {
      id: "email",
      label: "Email Me",
      value: "madhiremohanreddy@gmail.com",
      icon: <Mail className="w-4 h-4 text-primary" />,
      iconBg: "bg-primary/10",
      href: "mailto:madhiremohanreddy@gmail.com",
      trackType: "email_contact"
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/mmohanreddy",
      icon: <Linkedin className="w-4 h-4 text-[#0077b5]" />,
      iconBg: "bg-[#0077b5]/10",
      href: "https://www.linkedin.com/in/mmohanreddy/",
      trackType: "linkedin_contact"
    },
    {
      id: "github",
      label: "GitHub",
      value: "ComradeMohan",
      icon: <Github className="w-4 h-4 text-foreground" />,
      iconBg: "bg-foreground/10",
      href: "https://github.com/ComradeMohan",
      trackType: "github_contact"
    },
    {
      id: "resume",
      label: "Download Resume",
      value: "View my latest resume",
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      iconBg: "bg-emerald-500/10",
      href: "/mohan_resume_.pdf",
      trackType: "resume_contact"
    }
  ];

  // Component renderers for hover panels (shared between popover and bottom sheet)
  const renderGithubContent = () => {
    const loading = githubLoading;
    const error = githubError;
    const data = githubData;

    if (loading) {
      return (
        <div className="w-full p-4 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-foreground/10" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-foreground/10 rounded w-2/3" />
              <div className="h-3 bg-foreground/10 rounded w-1/2" />
            </div>
          </div>
          <div className="h-3 bg-foreground/10 rounded w-full" />
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-foreground/5">
            <div className="h-8 bg-foreground/10 rounded" />
            <div className="h-8 bg-foreground/10 rounded" />
            <div className="h-8 bg-foreground/10 rounded" />
          </div>
          <div className="h-10 bg-foreground/10 rounded-lg w-full" />
        </div>
      );
    }

    const user = error || !data ? githubFallback : data;

    return (
      <div className="w-full text-left space-y-4 font-outfit">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border border-foreground/10 object-cover shrink-0" />
          <div>
            <h4 className="text-sm font-extrabold text-foreground leading-tight">{user.name}</h4>
            <p className="text-[10px] text-primary font-grotesk mt-0.5 leading-none">@ComradeMohan</p>
            <span className="text-[9px] text-muted-foreground flex items-center gap-1 mt-1 font-grotesk">
              <MapPin className="w-3 h-3" /> {user.location}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-grotesk leading-normal">
          {user.bio}
        </p>

        <div className="grid grid-cols-3 gap-2 py-2 border-y border-foreground/10 text-center font-grotesk">
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
          <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/40 text-xs">
            <span className="text-[9px] font-bold text-primary font-grotesk uppercase tracking-wider flex items-center gap-1 mb-1">
              <BookOpen className="w-3 h-3" /> Latest Activity
            </span>
            <a href={user.latestRepo.url} target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:text-primary transition-colors block leading-tight truncate">
              {user.latestRepo.name}
            </a>
            <p className="text-[10px] text-muted-foreground font-grotesk line-clamp-2 mt-1 leading-snug">
              {user.latestRepo.description}
            </p>
            <span className="text-[9px] text-muted-foreground font-grotesk mt-1 block">
              Updated {user.latestRepo.updatedAt}
            </span>
          </div>
        )}

        <Button asChild variant="outline" className="w-full rounded-xl text-xs py-2.5 h-auto font-grotesk border-primary/20 hover:border-primary/50 hover:bg-primary/5">
          <a href={user.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
            View Github Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    );
  };

  const renderLinkedinContent = () => {
    return (
      <div className="w-full text-left space-y-4 font-outfit">
        <LinkedInBadge theme={isDark ? "dark" : "light"} />
        
        <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk leading-normal border-t border-border/40 pt-3">
          <div className="flex items-start gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span>{linkedinInfo.title}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span>{linkedinInfo.education}</span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground font-grotesk leading-snug bg-secondary/30 p-2.5 rounded-xl border border-border/20">
          "{linkedinInfo.headline}"
        </p>

        <Button asChild className="w-full rounded-xl text-xs py-2.5 h-auto font-grotesk bg-[#0077b5] hover:bg-[#0077b5]/90 text-white">
          <a href={linkedinInfo.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
            View Full Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    );
  };

  const renderEmailContent = () => {
    return (
      <div className="w-full text-left space-y-4 font-outfit">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-foreground">Email Address</h4>
          <span className="text-xs text-muted-foreground font-grotesk block truncate select-all bg-secondary/40 px-2.5 py-1.5 rounded-xl border border-border/30">
            {emailInfo.address}
          </span>
        </div>

        <div className="space-y-1 text-xs font-grotesk">
          <span className="text-[9px] font-bold text-foreground/80 uppercase tracking-wider block">Response Window</span>
          <p className="text-muted-foreground leading-relaxed">
            {emailInfo.preferredMethod}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 font-grotesk">
          <Button onClick={handleCopyEmail} variant="outline" className="rounded-xl text-xs py-2.5 h-auto flex items-center justify-center gap-1 border-primary/20 hover:border-primary/50 hover:bg-primary/5">
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
          <Button asChild className="rounded-xl text-xs py-2.5 h-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href={`mailto:${emailInfo.address}`} className="flex items-center justify-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Open Mail
            </a>
          </Button>
        </div>
      </div>
    );
  };

  const renderResumeContent = () => {
    return (
      <div className="w-full text-left space-y-4 font-outfit">
        <div className="flex gap-4">
          {/* Mock Resume Document Layout */}
          <div className="w-20 h-28 bg-secondary/40 rounded-xl border border-border/40 shrink-0 p-2 flex flex-col justify-between select-none">
            <div className="space-y-1">
              <div className="w-8 h-2 bg-primary/30 rounded" />
              <div className="w-full h-1 bg-foreground/10 rounded" />
              <div className="w-4/5 h-1 bg-foreground/10 rounded" />
              <div className="w-full h-1 bg-foreground/10 rounded" />
              <div className="w-2/3 h-1 bg-foreground/10 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="w-4 h-4 bg-emerald-500/10 rounded flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
              </div>
              <span className="text-[7px] text-muted-foreground font-grotesk">PDF</span>
            </div>
          </div>

          <div className="flex-grow space-y-2 text-xs font-grotesk leading-snug">
            <div>
              <span className="text-[9px] font-bold text-foreground/85 uppercase tracking-wider block font-outfit">Education</span>
              <p className="text-muted-foreground text-[10px] leading-tight mt-0.5">
                {resumeInfo.education}
              </p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-foreground/85 uppercase tracking-wider block font-outfit">Experience Summary</span>
              <p className="text-muted-foreground text-[10px] leading-tight mt-0.5">
                {resumeInfo.experience}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[9px] font-bold text-foreground/80 font-grotesk uppercase tracking-wider block">Top Skills</span>
          <div className="flex flex-wrap gap-1">
            {resumeInfo.skills.map(s => (
              <span key={s} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-secondary/55 text-foreground/80 border border-border/20 font-grotesk">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 font-grotesk">
          <Button asChild variant="outline" className="rounded-xl text-xs py-2.5 h-auto flex items-center justify-center gap-1 border-primary/20 hover:border-primary/50 hover:bg-primary/5">
            <a href={resumeInfo.previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Preview PDF
            </a>
          </Button>
          <Button asChild className="rounded-xl text-xs py-2.5 h-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href={resumeInfo.downloadUrl} download className="flex items-center justify-center gap-1">
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
    // Delay closing to let mouse transition over to popover
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
    // Delay closing to let mouse transition back to card if needed
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

  // Popover panel dimensions
  const getPopoverDimensions = (id: string) => {
    switch (id) {
      case "github": return { width: 300, height: 380 };
      case "linkedin": return { width: 300, height: 340 };
      case "email": return { width: 280, height: 180 };
      case "resume": return { width: 310, height: 290 };
      default: return { width: 300, height: 300 };
    }
  };

  // Viewport-clamped style calculator
  const getPopoverStyle = () => {
    if (!activeId || !activeCardRect) return {};

    const { width, height } = getPopoverDimensions(activeId);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Place popover to the right of the card by default
    let left = activeCardRect.right + 16;
    
    // Flip to the left if it overflows the right edge of the screen
    if (left + width > viewportWidth - 16) {
      left = activeCardRect.left - width - 16;
    }
    
    // Clamp to left screen boundary
    if (left < 16) {
      left = 16;
    }

    // Centered vertically relative to the card's bounding rectangle
    let top = activeCardRect.top + activeCardRect.height / 2 - height / 2;

    // Critical Viewport Clamp: Force the popover to remain inside the screen's visible area
    // Leave 16px padding from the top and bottom of the screen
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
    <section id="contact" className="py-12 scroll-mt-20 bg-card/20 border-t border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Connect Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-card/45 shadow-sm w-full h-full flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-primary/30 text-primary uppercase tracking-wider font-outfit w-fit">
                🚀 Let's Connect
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-outfit leading-tight">
                Have an opportunity?<br />
                Let's <span className="text-primary">build something amazing</span> together.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-grotesk leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, and innovative ideas.
              </p>
            </div>

            {/* Quick Contact Panels Grid Wrapper */}
            <div className="relative w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative">
                {contactMethods.map((method) => (
                  <div key={method.id} className="relative z-10">
                    <a 
                      href={method.href}
                      target={method.id !== "email" ? "_blank" : undefined}
                      rel={method.id !== "email" ? "noopener noreferrer" : undefined}
                      data-contact-card={method.id}
                      className="p-3.5 rounded-xl border border-border bg-secondary/30 dark:bg-black/20 hover:border-primary/45 hover:bg-card/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300 flex items-center justify-between group h-full cursor-pointer select-none"
                      onClick={(e) => handleCardClick(e, method)}
                      onMouseEnter={(e) => handleCardInteractionStart(e, method.id)}
                      onMouseLeave={handleCardInteractionEnd}
                      onFocus={(e) => handleFocus(e, method.id)}
                      onBlur={() => setFocusedCard(null)}
                      aria-haspopup="dialog"
                      aria-expanded={activeId === method.id}
                      aria-label={`${method.label} Card - Press Escape to close preview tooltip`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-9 h-9 rounded-lg ${method.iconBg} flex items-center justify-center shrink-0`}>
                          {method.icon}
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-foreground font-outfit block">{method.label}</span>
                          <span className="text-[10px] text-muted-foreground font-grotesk block truncate" title={method.value}>
                            {method.value}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Available for Opportunities Bar */}
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-emerald-500 font-outfit uppercase tracking-wider">Available for Opportunities</span>
              </div>
              <p className="text-xs text-muted-foreground font-grotesk leading-snug">
                Actively looking for Full Stack Developer & Software Engineer roles.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["Full Time", "Internships", "Remote", "On-site"].map(tag => (
                  <span key={tag} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-grotesk">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-card/45 shadow-sm w-full h-full flex flex-col justify-between"
          >
            <div className="space-y-1.5 text-left mb-4">
              <h3 className="text-lg font-bold text-foreground font-outfit flex items-center gap-2">
                ✉️ Send a Message
              </h3>
              <p className="text-xs text-muted-foreground font-grotesk">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="fi-sender-fullName"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-11 bg-background/50 border-border focus:border-primary text-xs"
                  />
                  <Input
                    type="email"
                    name="fi-sender-email"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="h-11 bg-background/50 border-border focus:border-primary text-xs"
                  />
                </div>
                <Input
                  name="fi-text-subject"
                  placeholder="Subject *"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="h-11 bg-background/50 border-border focus:border-primary text-xs"
                />
                <Textarea
                  name="fi-text-message"
                  placeholder="Your Message *"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="flex-1 min-h-[140px] bg-background/50 border-border focus:border-primary text-xs resize-none p-3"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border/40 mt-1">
                <div className="flex items-center gap-2 text-left text-[11px] text-muted-foreground font-grotesk">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="block font-semibold text-foreground/90 leading-tight">Your information is safe with me.</span>
                    <span className="leading-tight">I respect your privacy.</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-5 shadow-md transition-all duration-300 min-w-[145px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Viewport-Clamped Floating macOS Inspector Panel (Desktop) - Placed outside animated containers */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.22 }}
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
            className="z-[100] p-4 bg-background/60 dark:bg-black/60 backdrop-blur-xl border border-foreground/10 rounded-[20px] shadow-2xl select-none overflow-hidden"
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
        {isMobile && activeBottomSheet && (
          <>
            {/* Dark Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBottomSheet(null)}
              className="fixed inset-0 bg-black z-[100] backdrop-blur-xs"
            />
            {/* Sheet Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="fixed bottom-0 left-0 right-0 bg-background/95 border-t border-border backdrop-blur-md rounded-t-[20px] p-6 pb-8 z-[101] shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Drag bar decoration */}
              <div className="w-12 h-1.5 bg-foreground/15 rounded-full mx-auto mb-2 shrink-0" />

              {/* Header title */}
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <h3 className="font-extrabold text-foreground font-outfit uppercase tracking-wider text-xs">
                  {activeBottomSheet === "github" && "GitHub Profile Preview"}
                  {activeBottomSheet === "linkedin" && "LinkedIn Profile Preview"}
                  {activeBottomSheet === "email" && "Email Quick Actions"}
                  {activeBottomSheet === "resume" && "Resume & Experience"}
                </h3>
                <span className="text-[10px] text-muted-foreground font-grotesk flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Press Drag to close
                </span>
              </div>

              {/* Render dynamic sheet body */}
              <div className="flex justify-center py-2">
                {activeBottomSheet === "github" && renderGithubContent()}
                {activeBottomSheet === "linkedin" && renderLinkedinContent()}
                {activeBottomSheet === "email" && renderEmailContent()}
                {activeBottomSheet === "resume" && renderResumeContent()}
              </div>

              <Button 
                onClick={() => setActiveBottomSheet(null)} 
                variant="secondary" 
                className="w-full rounded-xl font-semibold mt-2 h-11"
              >
                Dismiss
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
