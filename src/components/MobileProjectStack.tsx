import { Link } from "react-router-dom";
import {
  ExternalLink, Github, BookOpen, FileDown, FileText,
  Smartphone, Linkedin, Instagram, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "./SpotlightCard";

interface TechItem {
  name: string;
  icon: string;
}

interface ProjectItem {
  title: string;
  desc: string;
  link?: string;
  githubLink?: string;
  caseStudyLink?: string;
  playStoreLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  pptLink?: string;
  researchPaperLink?: string;
  color?: string;
  activeColor?: string;
  icon: any;
  iconColor?: string;
  iconBg?: string;
  logoImg?: string;
  isFeatured?: boolean;
  liveBadges?: Array<{ text: string; color: string }>;
  platformBadges?: Array<{ text: string; url: string; icon: string }>;
  stats?: Array<{ label: string; value: string; iconName?: string; sublabel?: string }>;
  techStack: TechItem[];
  hasLiveDemo?: boolean;
}

interface MobileProjectStackProps {
  projects: ProjectItem[];
  saveethaStars: number | null;
  onOpenModal: (index: number) => void;
  trackEvent: (action: string, category: string, label: string) => void;
}

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

export const MobileProjectStack = ({
  projects,
  saveethaStars,
  onOpenModal,
  trackEvent,
}: MobileProjectStackProps) => {
  return (
    <div className="block sm:hidden relative pb-1 pt-1">
      {projects.map((project, i) => {
        const ProjectIcon = project.icon;
        // Staggered sticky offset starting under the sticky 'My Projects' header
        // 48px offset preserves the exact title and icon tab of previous cards
        const stickyTop = 150 + i * 48;

        return (
          <div
            key={project.title}
            className="sticky transition-all duration-300"
            style={{
              top: `${stickyTop}px`,
              zIndex: 10 + i * 2,
              marginBottom: i === projects.length - 1 ? 0 : "1.25rem",
            }}
          >
            <SpotlightCard
              className={`rounded-2xl border border-border/80 bg-card/85 dark:bg-card/80 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 bg-gradient-to-br ${project.color} cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-[0_-6px_20px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_-14px_35px_rgba(0,0,0,0.9),0_6px_20px_rgba(0,0,0,0.4)] border-t-black/10 dark:border-t-white/20 w-full`}
              innerClassName="p-6 flex flex-col justify-between w-full h-full min-h-[300px]"
              onClick={() => {
                onOpenModal(i);
                trackEvent("view", "project", project.title);
              }}
            >
              <div>
                {/* Header: Original Title (text-lg), Icon (w-8 h-8 / w-4.5 h-4.5), Badges */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${project.logoImg ? "p-1" : project.iconBg
                        }`}
                    >
                      {project.logoImg === "ethereum" ? (
                        <EthereumLogo className="w-full h-full text-indigo-400" />
                      ) : project.logoImg ? (
                        <img
                          src={project.logoImg}
                          alt={project.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ProjectIcon className={`w-4.5 h-4.5 ${project.iconColor}`} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="text-lg font-bold text-foreground font-outfit">
                        {project.title}
                      </h3>
                      {project.title === "Saveetha Hub" && (
                        <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border border-yellow-500/20 bg-yellow-500/10 text-yellow-500 shrink-0">
                          <Star className="w-2.5 h-2.5 fill-current" />{" "}
                          {saveethaStars !== null ? saveethaStars : "22"}
                        </div>
                      )}
                    </div>
                  </div>
                  {project.isFeatured && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary whitespace-nowrap shrink-0">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Description: Original font size (text-sm) and line clamp */}
                <p className="text-sm text-muted-foreground line-clamp-3 font-grotesk mb-4">
                  {project.desc}
                </p>

                {/* Tech Stack: Original badges and spacing */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-0.5 rounded-md bg-secondary/50 border border-border/40 text-[10px] text-foreground/80 font-grotesk flex items-center gap-1"
                    >
                      <span>{tech.icon}</span> {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Exact original button sizes and layout */}
              <div
                className="flex flex-wrap gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {project.pptLink ? (
                  <>
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/80"
                      onClick={() => trackEvent("download", "ppt", project.title)}
                    >
                      <a
                        href={project.pptLink}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileDown className="w-3.5 h-3.5 mr-1.5" /> PPT Slides
                      </a>
                    </Button>
                    {project.researchPaperLink && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-border bg-background hover:bg-secondary/60 hover:text-foreground"
                        onClick={() =>
                          trackEvent("click", "research_paper", project.title)
                        }
                      >
                        <a
                          href={project.researchPaperLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
                        onClick={() =>
                          trackEvent("click", "case_study", project.title)
                        }
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                      >
                        <BookOpen className="w-4 h-4 mr-2" /> Open Case Study
                      </Link>
                    )}
                    {project.hasLiveDemo && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary hover:bg-primary/80"
                        onClick={() =>
                          trackEvent("click", "demo", project.title)
                        }
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Demo
                        </a>
                      </Button>
                    )}
                    {project.playStoreLink && (
                      <Button
                        asChild
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-full border-border bg-background hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:scale-110 transition-transform"
                        onClick={() =>
                          trackEvent("click", "play_store", project.title)
                        }
                      >
                        <a
                          href={project.playStoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Play Store"
                        >
                          <img
                            src="/icons/googleplay.svg"
                            alt="Play Store"
                            className="w-4 h-4 object-contain"
                          />
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button
                        asChild
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-full border-border bg-background hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:scale-110 transition-transform"
                        onClick={() =>
                          trackEvent("click", "github_project", project.title)
                        }
                      >
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.linkedinLink && (
                      <Button
                        asChild
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-full border-[#0077b5]/30 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 hover:scale-110 transition-transform"
                        onClick={() =>
                          trackEvent("click", "linkedin_project", project.title)
                        }
                      >
                        <a
                          href={project.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn Post"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.instagramLink && (
                      <Button
                        asChild
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-full border-[#E1306C]/30 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 hover:scale-110 transition-transform"
                        onClick={() =>
                          trackEvent(
                            "click",
                            "instagram_project",
                            project.title
                          )
                        }
                      >
                        <a
                          href={project.instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Instagram Reel"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </SpotlightCard>
          </div>
        );
      })}
    </div>
  );
};

export default MobileProjectStack;
