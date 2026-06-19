import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const PdfViewerModal = lazy(() => import("./PdfViewerModal"));

interface Certification {
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

const certs: Certification[] = [
  {
    title: "Oracle Certified Professional: Java SE 17 Developer",
    org: "Oracle University",
    pdf: "/certifications/Oracle Certified Professional_ Java SE 17 Developer.pdf",
    previewUrl: "/certifications/Oracle Certified Professional_ Java SE 17 Developer.webp",
    credentialId: "102029574OCPJSE17",
    date: "July 14, 2025",
    category: "Featured",
    featured: true,
    skills: [
      "Core Java",
      "Object-Oriented Programming",
      "Collections Framework",
      "Exception Handling",
      "Multithreading",
      "Java SE 17 Features",
    ],
  },
  {
    title: "Oracle Cloud Infrastructure",
    org: "Oracle",
    date: "Aug 3, 2024",
    previewUrl: "/certifications/OCI.webp",
    category: "Cloud",
    skills: ["Cloud Services", "OCI", "Compute", "Storage"],
  },
  {
    title: "Programming in Java",
    org: "NPTEL",
    date: "2023",
    previewUrl: "/certifications/nptel java.webp",
    category: "Programming",
    skills: ["Core Java", "OOP", "Collections", "Exception Handling"],
  },
  {
    title: "Frontend Developer (React)",
    org: "HackerRank",
    date: "March 22, 2025",
    link: "https://www.hackerrank.com/certificates/d0ed9abff6e9",
    category: "Frontend",
    skills: ["React.js", "JavaScript", "UI/UX", "Component Design"],
  },
  {
    title: "Data Analytics",
    org: "Cisco",
    date: "2024",
    link: "#",
    category: "Data",
    skills: ["Data Analysis", "Excel", "Visualization", "Statistics"],
  },
  {
    title: "Python",
    org: "Kaggle",
    date: "Aug 19, 2023",
    previewUrl: "/certifications/python kaggle.webp",
    category: "Data Science",
    skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
  },
  {
    title: "Software Engineering Job Simulation",
    org: "JPMorgan Chase",
    date: "July 22, 2024",
    previewUrl: "/certifications/jpmorgan.webp",
    category: "Software Eng",
    skills: ["Agile", "SDLC", "System Design", "Problem Solving"],
  },
];

const categoryColors: Record<string, string> = {
  Cloud: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Programming: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Frontend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Data: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Data Science": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Software Eng": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

const getCategoryIcon = (category: string) => {
  const iconClass = "w-6 h-6 transition-colors duration-300";
  switch (category) {
    case "Cloud":
      return <Cloud className={`${iconClass} text-sky-400 group-hover:text-sky-300`} />;
    case "Programming":
      return <Code2 className={`${iconClass} text-emerald-400 group-hover:text-emerald-300`} />;
    case "Frontend":
      return <Atom className={`${iconClass} text-purple-400 group-hover:text-purple-300`} />;
    case "Data":
      return <BarChart3 className={`${iconClass} text-blue-400 group-hover:text-blue-300`} />;
    case "Data Science":
      return <Terminal className={`${iconClass} text-teal-400 group-hover:text-teal-300`} />;
    case "Software Eng":
      return <Cpu className={`${iconClass} text-indigo-400 group-hover:text-indigo-300`} />;
    default:
      return <Award className={`${iconClass} text-primary group-hover:text-primary-foreground`} />;
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

  const handleOpenCert = (cert: Certification) => {
    if (cert.pdf || cert.previewUrl) {
      setSelectedCert(cert);
      setIsModalOpen(true);
    }
  };

  const featuredCert = certs.find((c) => c.featured)!;
  const otherCerts = certs.filter((c) => !c.featured);

  return (
    <section id="certifications" className="py-24 border-t border-border/40 bg-gradient-to-b from-transparent via-background/40 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
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
              <div className="flex-1 space-y-6 text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-outfit text-foreground leading-tight">
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

                <p className="text-sm md:text-base text-muted-foreground font-grotesk leading-relaxed">
                  {featuredCert.description}
                </p>

                {/* Skills Checklist */}
                <div className="space-y-3">
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

        {/* Other Certifications */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8 text-left">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold font-outfit text-foreground">
              Other Certifications
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {otherCerts.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon and Category Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 border border-border/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      {getCategoryIcon(cert.category)}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColors[cert.category] || "bg-muted text-muted-foreground border-border"}`}>
                      {cert.category}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h4 className="font-bold text-foreground mb-1 font-outfit text-left text-base group-hover:text-primary transition-colors duration-300 leading-snug">
                    {cert.title}
                  </h4>
                  
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <p className="text-sm text-muted-foreground text-left font-grotesk">
                      {cert.org}
                    </p>
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-500 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      Verified
                    </span>
                  </div>

                  {/* Skills Gained (Compact Flow) */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1 mb-1 mt-2">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/50 text-foreground/80 border border-border/30 font-grotesk">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Issued date & Link / Button */}
                <div>
                  <div className="border-t border-border/40 pt-2.5 mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-grotesk">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary/75" />
                      Issued: {cert.date}
                    </span>
                    {cert.link && cert.link !== "#" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline font-medium font-outfit cursor-pointer"
                      >
                        Credential ID
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                      </a>
                    )}
                  </div>

                  {cert.previewUrl || cert.pdf ? (
                    <Button 
                      onClick={() => {
                        trackEvent("preview", "certificate", cert.title);
                        handleOpenCert(cert);
                      }}
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 h-8 text-xs border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground font-medium transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                    </Button>
                  ) : cert.link && cert.link !== "#" ? (
                    <Button 
                      asChild
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 h-8 text-xs border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground font-medium transition-all"
                    >
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("verify", "certificate", cert.title)}>
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Verify Credential
                      </a>
                    </Button>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-border/40 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-extrabold font-outfit text-foreground">5+</span>
            <span className="text-xs text-muted-foreground font-grotesk">Certifications Earned</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-extrabold font-outfit text-foreground">4</span>
            <span className="text-xs text-muted-foreground font-grotesk">Trusted Issuers</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-extrabold font-outfit text-foreground">2023 - 2025</span>
            <span className="text-xs text-muted-foreground font-grotesk">Active Learning Period</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-extrabold font-outfit text-foreground">100%</span>
            <span className="text-xs text-muted-foreground font-grotesk">Verified Credentials</span>
          </div>
        </motion.div>

      </div>

      {/* Lazy loaded PDF viewer modal with Suspense fallback */}
      {isModalOpen && selectedCert && (selectedCert.pdf || selectedCert.previewUrl) && (
        <Suspense fallback={null}>
          <PdfViewerModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCert(null);
            }}
            pdfUrl={selectedCert.pdf || ""}
            previewUrl={selectedCert.previewUrl}
            title={selectedCert.title}
            org={selectedCert.org}
            credentialId={selectedCert.credentialId}
            date={selectedCert.date}
          />
        </Suspense>
      )}
    </section>
  );
}
