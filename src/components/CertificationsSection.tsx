import { useState, lazy, Suspense, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  ExternalLink,
  Eye,
  Building,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  Code2,
  Atom,
  BarChart3,
  Terminal,
  Cpu,
  Trophy,
  LayoutGrid,
  List,
  Filter,
  MoreVertical,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trackEvent } from "@/lib/analytics";

const PdfViewerModal = lazy(() => import("./PdfViewerModal"));

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  startValue?: number;
}

const AnimatedCounter = ({ value, duration = 1.5, suffix = "", prefix = "", startValue = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(startValue);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (value - startValue) + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, value, startValue, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText = ({ text, delay = 120 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [isInView, text, delay]);

  return (
    <span ref={ref}>
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse text-primary ml-0.5">|</span>
      )}
    </span>
  );
};

export interface Certification {
  title: string;
  org: string;
  link?: string;
  pdf?: string;
  previewUrl?: string;
  credentialId?: string;
  date?: string;
  category: string;
  skills?: string[];
  featured?: boolean;
}

export interface OtherCertItem {
  id: string;
  title: string;
  org: string;
  category: string;
  date: string;
  skills: string[];
  link?: string;
  pdf?: string;
  previewUrl?: string;
  credentialId?: string;
  iconType: "cloud" | "code" | "react" | "chart" | "python" | "cpu";
  theme: {
    accentColor: string;
    borderLeft: string;
    borderGlow: string;
    bgIcon: string;
    numBadge: string;
    btnStyle: string;
    badgeBg: string;
  };
}

const featuredCert: Certification & { description?: string } = {
  title: "Oracle Certified Professional: Java SE 17 Developer",
  org: "Oracle University",
  pdf: "/certifications/Oracle Certified Professional_ Java SE 17 Developer.pdf",
  previewUrl: "/certifications/Oracle Certified Professional_ Java SE 17 Developer.webp",
  credentialId: "102029574OCPJSE17",
  date: "July 14, 2025",
  category: "Featured",
  featured: true,
  description: "Industry-standard professional certification demonstrating mastery in Java SE 17 enterprise development, object-oriented design, concurrency, collections, and modern Java features.",
  skills: [
    "Core Java",
    "Object-Oriented Programming",
    "Collections Framework",
    "Exception Handling",
    "Multithreading",
    "Java SE 17 Features",
  ],
};

const otherCertificationsData: OtherCertItem[] = [
  {
    id: "01",
    title: "Oracle Cloud Infrastructure",
    org: "Oracle",
    category: "Cloud",
    date: "Aug 3, 2024",
    skills: ["Cloud Services", "OCI", "Compute", "Storage"],
    previewUrl: "/certifications/OCI.webp",
    iconType: "cloud",
    theme: {
      accentColor: "text-sky-400",
      borderLeft: "border-l-sky-500",
      borderGlow: "hover:border-sky-500/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]",
      bgIcon: "bg-gradient-to-br from-sky-500/25 via-blue-600/15 to-sky-950/40 text-sky-400 border-sky-500/40",
      numBadge: "border-sky-500/40 text-sky-400 bg-sky-500/10",
      btnStyle: "border-sky-500/40 text-sky-400 hover:bg-sky-500/20 bg-sky-500/10",
      badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    },
  },
  {
    id: "02",
    title: "Programming in Java",
    org: "NPTEL",
    category: "Programming",
    date: "2023",
    skills: ["Core Java", "OOP", "Collections", "Exception Handling"],
    previewUrl: "/certifications/nptel java.webp",
    iconType: "code",
    theme: {
      accentColor: "text-emerald-400",
      borderLeft: "border-l-emerald-500",
      borderGlow: "hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(52,211,153,0.18)]",
      bgIcon: "bg-gradient-to-br from-emerald-500/25 via-green-600/15 to-emerald-950/40 text-emerald-400 border-emerald-500/40",
      numBadge: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      btnStyle: "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
  },
  {
    id: "03",
    title: "Frontend Developer (React)",
    org: "HackerRank",
    category: "Frontend",
    date: "March 22, 2025",
    skills: ["React.js", "JavaScript", "UI/UX", "Component Design"],
    link: "https://www.hackerrank.com/certificates/d0ed9abff6e9",
    credentialId: "d0ed9abff6e9",
    iconType: "react",
    theme: {
      accentColor: "text-purple-400",
      borderLeft: "border-l-purple-500",
      borderGlow: "hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(192,132,252,0.18)]",
      bgIcon: "bg-gradient-to-br from-purple-500/25 via-fuchsia-600/15 to-purple-950/40 text-purple-400 border-purple-500/40",
      numBadge: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      btnStyle: "border-purple-500/40 text-purple-400 hover:bg-purple-500/20 bg-purple-500/10",
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  },
  {
    id: "04",
    title: "Data Analytics",
    org: "Cisco",
    category: "Data",
    date: "2024",
    skills: ["Data Analysis", "Excel", "Visualization", "Statistics"],
    link: "#",
    iconType: "chart",
    theme: {
      accentColor: "text-orange-400",
      borderLeft: "border-l-orange-500",
      borderGlow: "hover:border-orange-500/60 hover:shadow-[0_0_30px_rgba(251,146,60,0.18)]",
      bgIcon: "bg-gradient-to-br from-orange-500/25 via-amber-600/15 to-orange-950/40 text-orange-400 border-orange-500/40",
      numBadge: "border-orange-500/40 text-orange-400 bg-orange-500/10",
      btnStyle: "border-orange-500/40 text-orange-400 hover:bg-orange-500/20 bg-orange-500/10",
      badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
  },
  {
    id: "05",
    title: "Python",
    org: "Kaggle",
    category: "Data Science",
    date: "Aug 19, 2023",
    skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
    previewUrl: "/certifications/python kaggle.webp",
    iconType: "python",
    theme: {
      accentColor: "text-yellow-400",
      borderLeft: "border-l-yellow-500",
      borderGlow: "hover:border-yellow-500/60 hover:shadow-[0_0_30px_rgba(250,204,21,0.18)]",
      bgIcon: "bg-gradient-to-br from-yellow-500/25 via-amber-500/15 to-yellow-950/40 text-yellow-400 border-yellow-500/40",
      numBadge: "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
      btnStyle: "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20 bg-yellow-500/10",
      badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
  },
  {
    id: "06",
    title: "Software Engineering Job Simulation",
    org: "JPMorgan Chase",
    category: "Software Eng",
    date: "July 22, 2024",
    skills: ["Agile", "SDLC", "System Design", "Problem Solving"],
    previewUrl: "/certifications/jpmorgan.webp",
    iconType: "cpu",
    theme: {
      accentColor: "text-indigo-400",
      borderLeft: "border-l-indigo-500",
      borderGlow: "hover:border-indigo-500/60 hover:shadow-[0_0_30px_rgba(129,140,248,0.18)]",
      bgIcon: "bg-gradient-to-br from-indigo-500/25 via-purple-600/15 to-indigo-950/40 text-indigo-400 border-indigo-500/40",
      numBadge: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
      btnStyle: "border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/20 bg-indigo-500/10",
      badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
  },
];

const renderCertIcon = (iconType: OtherCertItem["iconType"], className = "w-6 h-6") => {
  switch (iconType) {
    case "cloud":
      return <Cloud className={className} />;
    case "code":
      return <Code2 className={className} />;
    case "react":
      return <Atom className={className} />;
    case "chart":
      return <BarChart3 className={className} />;
    case "python":
      return <Terminal className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    default:
      return <Award className={className} />;
  }
};

const OracleBadge = () => (
  <div className="relative w-32 h-32 md:w-36 md:h-36 shrink-0 flex items-center justify-center select-none">
    {/* Glowing background circles */}
    <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
    {/* Outer border circles */}
    <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_40s_linear_infinite]" />
    <div className="absolute inset-2 rounded-full border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-sm" />

    {/* Badge Body */}
    <div className="absolute inset-4 rounded-full border-2 border-primary/60 flex flex-col items-center justify-center p-2 text-center bg-card shadow-[0_0_20px_rgba(234,88,12,0.2)]">
      <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-outfit">Oracle</span>
      <div className="w-8 h-px bg-primary/30 my-1" />
      <span className="text-[11px] font-extrabold text-foreground leading-tight">Certified</span>
      <span className="text-[10px] font-medium text-muted-foreground leading-none">Professional</span>
      <div className="w-8 h-px bg-primary/30 my-1" />
      <span className="text-[8px] font-semibold text-primary uppercase tracking-wider">Java SE 17</span>
    </div>
  </div>
);

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return "list";
    }
    return "grid";
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("list");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenCert = (cert: Certification | OtherCertItem) => {
    setSelectedCert({
      title: cert.title,
      org: cert.org,
      pdf: cert.pdf,
      previewUrl: cert.previewUrl,
      credentialId: cert.credentialId,
      date: cert.date,
      category: cert.category,
      skills: cert.skills,
      link: cert.link,
    });
    setIsModalOpen(true);
  };

  const filteredCerts = selectedCategory === "All"
    ? otherCertificationsData
    : otherCertificationsData.filter(c => c.category === selectedCategory);

  const categories = ["All", ...Array.from(new Set(otherCertificationsData.map(c => c.category)))];

  return (
    <TooltipProvider>
      <section id="certifications" className="py-12 sm:py-16 scroll-mt-20 md:scroll-mt-24 border-t border-border/40 bg-gradient-to-b from-transparent via-background/40 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-12 transform-gpu"
          >
            <h2 className="text-4xl font-extrabold mb-3 font-outfit">
              <span className="text-primary">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-grotesk max-w-md mx-auto">
              Professional certifications & achievements
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Featured Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 sm:mb-16 transform-gpu"
          >
            <div className="relative p-6 md:p-8 rounded-2xl bg-card/60 backdrop-blur-sm border-2 border-primary/30 shadow-[0_0_30px_rgba(234,88,12,0.05)] overflow-hidden group">

              {/* Featured Badge tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Trophy className="w-3.5 h-3.5" />
                <span>Featured Certification</span>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8 mt-6">
                {/* Left Side: Oracle Badge */}
                <OracleBadge />

                {/* Middle Side: Details & Checklist */}
                <div className="flex-1 w-full space-y-4 sm:space-y-6 text-left">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold font-outfit text-foreground leading-snug sm:leading-tight">
                      {featuredCert.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-grotesk">
                      <span className="flex items-center gap-1.5 text-primary">
                        <Building className="w-4 h-4 shrink-0" />
                        {featuredCert.org}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 shrink-0" />
                        Issued: {featuredCert.date}
                      </span>
                    </div>
                  </div>

                  {featuredCert.description && (
                    <p className="hidden sm:block text-sm md:text-base text-muted-foreground font-grotesk leading-relaxed">
                      {featuredCert.description}
                    </p>
                  )}

                  {/* Skills Checklist */}
                  <div className="hidden sm:block space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground font-outfit">
                      Skills Validated
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {featuredCert.skills?.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-sm text-foreground/90 font-grotesk">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Preview & Buttons */}
                <div className="flex flex-col gap-4 w-full max-w-[280px] sm:max-w-[320px] shrink-0">
                  <div
                    className="relative group/img overflow-hidden rounded-xl border border-border bg-card shadow-lg aspect-[1.414/1] cursor-pointer"
                    onClick={() => {
                      trackEvent("preview", "certificate", featuredCert.title);
                      handleOpenCert(featuredCert);
                    }}
                  >
                    {featuredCert.previewUrl && (
                      <img
                        src={featuredCert.previewUrl}
                        alt="Certificate Preview"
                        className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-1.5 shadow-md bg-background/90 text-foreground hover:bg-background"
                      >
                        <Eye className="w-4 h-4" />
                        Quick Preview
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 h-10 border-border/80 hover:bg-accent/40 text-foreground font-medium font-outfit"
                      onClick={() => {
                        trackEvent("preview", "certificate", featuredCert.title);
                        handleOpenCert(featuredCert);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 gap-1.5 h-10 shadow-md font-medium font-outfit bg-primary text-primary-foreground hover:bg-primary/95"
                      asChild
                    >
                      <a
                        href={featuredCert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("verify", "certificate", featuredCert.title)}
                      >
                        Verify Credential
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* OTHER CERTIFICATIONS SECTION (MATCHING USER DEMO DESIGNS)  */}
          {/* ========================================================= */}
          <div className="">

            {/* Header Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -30px 0px" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-left transform-gpu"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
                <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-foreground tracking-tight">
                  Other Certifications
                </h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-grotesk">
                {viewMode === "list"
                  ? "Explore my professional certifications"
                  : "Professional certifications and achievements"}
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 via-primary to-transparent mt-2 rounded-full" />
            </motion.div>

            {/* Controls Bar: Top Pill Counter, Filter Dropdown & View Mode Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -20px 0px" }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 transform-gpu"
            >
              {/* Left Counter Pill (hidden on mobile) */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card/90 border border-border/70 backdrop-blur-md shadow-sm text-xs font-semibold font-grotesk text-foreground w-fit">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{filteredCerts.length} Certifications</span>
              </div>

              {/* Right Toolbar Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {/* Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-2 text-xs font-medium font-grotesk border-border/70 bg-card/70 hover:bg-accent/40 text-foreground"
                    >
                      <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{selectedCategory === "All" ? "All Certifications" : selectedCategory}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-popover/95 backdrop-blur-md border-border/80 z-50">
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs font-grotesk cursor-pointer ${selectedCategory === cat ? "text-primary font-bold bg-primary/10" : ""
                          }`}
                      >
                        {cat === "All" ? "All Certifications" : cat}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-card/90 border border-border/70 gap-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                    className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "grid"
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                      }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    title="List View"
                    className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "list"
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>



            {/* ========================================================= */}
            {/* GRID VIEW (IMAGE 1 STYLE)                                 */}
            {/* ========================================================= */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCerts.map((cert, i) => (
                  <motion.div
                    key={cert.id + cert.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
                    transition={{
                      duration: 0.38,
                      delay: (i % 3) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative p-5 rounded-2xl bg-card/90 backdrop-blur-md border border-border/60 border-l-4 ${cert.theme.borderLeft} ${cert.theme.borderGlow} transition-shadow transition-colors duration-300 group flex flex-col justify-between overflow-hidden shadow-lg text-left transform-gpu will-change-transform`}
                  >
                    <div>
                      {/* Top Header: Logo Icon, Title & Org, and Circle Number Badge */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Logo Squircle Icon Container */}
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner p-2.5 transition-transform duration-300 group-hover:scale-105 ${cert.theme.bgIcon}`}>
                            {renderCertIcon(cert.iconType, "w-6 h-6")}
                          </div>

                          {/* Title & Issuer */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-foreground font-outfit text-base md:text-lg group-hover:text-primary transition-colors leading-snug truncate">
                              {cert.title}
                            </h4>
                            <p className={`text-sm font-semibold font-grotesk mt-0.5 ${cert.theme.accentColor}`}>
                              {cert.org}
                            </p>
                          </div>
                        </div>

                        {/* ID Badge Circle */}
                        <div className={`w-7 h-7 rounded-full border text-xs font-mono font-bold flex items-center justify-center shrink-0 ${cert.theme.numBadge}`}>
                          {cert.id}
                        </div>
                      </div>

                      {/* Skills Tags Row (First 3 tags + +1 badge) */}
                      <div className="flex flex-wrap items-center gap-1.5 my-4">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium font-grotesk bg-secondary/60 text-foreground/90 border border-border/40"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="px-2 py-1 rounded-lg text-[11px] font-bold font-grotesk bg-secondary/80 text-muted-foreground hover:text-foreground border border-border/50 cursor-pointer transition-colors">
                                +{cert.skills.length - 3}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs font-grotesk bg-popover text-popover-foreground border-border">
                              <p className="font-semibold text-primary mb-0.5">Additional Skill:</p>
                              {cert.skills.slice(3).join(", ")}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    {/* Footer Row: Date & Action Button */}
                    <div className="border-t border-border/40 pt-3 mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-grotesk">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" />
                        <span>{cert.date}</span>
                      </div>

                      {cert.previewUrl || cert.pdf ? (
                        <button
                          onClick={() => {
                            trackEvent("preview", "certificate", cert.title);
                            handleOpenCert(cert);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-outfit flex items-center gap-1.5 border transition-all cursor-pointer ${cert.theme.btnStyle}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      ) : cert.link && cert.link !== "#" ? (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("verify", "certificate", cert.title)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-outfit flex items-center gap-1.5 border transition-all cursor-pointer ${cert.theme.btnStyle}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </a>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl text-xs font-medium font-outfit text-muted-foreground/50 border border-border/30 bg-secondary/20 cursor-not-allowed"
                        >
                          Issued
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* ========================================================= */
              /* LIST VIEW (IMAGE 2 STYLE)                                 */
              /* ========================================================= */
              <div className="space-y-3.5">
                {filteredCerts.map((cert, i) => (
                  <motion.div
                    key={cert.id + cert.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12, margin: "0px 0px -30px 0px" }}
                    transition={{
                      duration: 0.32,
                      delay: Math.min((i % 3) * 0.04, 0.08),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border/60 border-l-4 ${cert.theme.borderLeft} ${cert.theme.borderGlow} transition-shadow transition-colors duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md text-left transform-gpu will-change-transform`}
                  >
                    <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
                      {/* Logo Squircle Icon Container */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-inner p-2.5 transition-transform duration-300 group-hover:scale-105 ${cert.theme.bgIcon}`}>
                        {renderCertIcon(cert.iconType, "w-5 h-5")}
                      </div>

                      {/* Title & Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div>
                          <h4 className="font-bold text-foreground font-outfit text-base group-hover:text-primary transition-colors leading-snug truncate pr-2">
                            {cert.title}
                          </h4>
                        </div>

                        <p className={`text-xs font-semibold font-grotesk ${cert.theme.accentColor}`}>
                          {cert.org}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium font-grotesk bg-secondary/60 text-foreground/80 border border-border/30"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold font-grotesk bg-secondary/80 text-muted-foreground hover:text-foreground border border-border/40 cursor-pointer">
                                  +{cert.skills.length - 3}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs font-grotesk bg-popover text-popover-foreground border-border">
                                <p className="font-semibold text-primary mb-0.5">Additional Skill:</p>
                                {cert.skills.slice(3).join(", ")}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side: Date and Button */}
                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2.5 md:pt-0 border-border/40 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-grotesk">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" />
                        <span>Issued: {cert.date}</span>
                      </div>

                      {cert.previewUrl || cert.pdf ? (
                        <button
                          onClick={() => {
                            trackEvent("preview", "certificate", cert.title);
                            handleOpenCert(cert);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-outfit flex items-center gap-1.5 border transition-all cursor-pointer ${cert.theme.btnStyle}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      ) : cert.link && cert.link !== "#" ? (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("verify", "certificate", cert.title)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-outfit flex items-center gap-1.5 border transition-all cursor-pointer ${cert.theme.btnStyle}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </a>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -30px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border/40 pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transform-gpu"
          >
            {/* Card 1 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <Award className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                  <AnimatedCounter value={6} suffix="+" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground font-grotesk tracking-wide uppercase mt-0.5">Certifications Earned</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <ShieldCheck className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                  <AnimatedCounter value={5} />
                </span>
                <span className="text-xs font-semibold text-muted-foreground font-grotesk tracking-wide uppercase mt-0.5">Trusted Issuers</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <Calendar className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                  <TypewriterText text="2022 - 2026" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground font-grotesk tracking-wide uppercase mt-0.5">Active Learning Period</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-extrabold font-outfit text-foreground tracking-tight">
                  <AnimatedCounter value={100} suffix="%" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground font-grotesk tracking-wide uppercase mt-0.5">Verified Credentials</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Lazy loaded PDF viewer modal with Suspense fallback */}
        {isModalOpen && selectedCert && (
          <Suspense fallback={null}>
            <PdfViewerModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedCert(null);
              }}
              pdfUrl={selectedCert.pdf || selectedCert.link || ""}
              previewUrl={selectedCert.previewUrl}
              title={selectedCert.title}
              org={selectedCert.org}
              credentialId={selectedCert.credentialId}
              date={selectedCert.date}
              category={selectedCert.category}
              skills={selectedCert.skills}
              verifyUrl={selectedCert.link}
            />
          </Suspense>
        )}
      </section>
    </TooltipProvider>
  );
}
