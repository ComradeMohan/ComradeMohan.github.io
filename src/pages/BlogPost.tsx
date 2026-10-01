import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Bookmark, Share2, Check, User, Copy, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/data/blogArticles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface HeaderItem {
  id: string;
  text: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [headers, setHeaders] = useState<HeaderItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Find corresponding article
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;

    // Parse headers (h2) from article body content for Table of Contents
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = article.content;
    const h2Elements = tempDiv.getElementsByTagName("h2");
    
    const parsedHeaders: HeaderItem[] = [];
    for (let i = 0; i < h2Elements.length; i++) {
      const el = h2Elements[i];
      // Generate ID from header text
      const id = el.innerText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      // Inject ID into content element so hash scroll works
      parsedHeaders.push({ id, text: el.innerText });
    }
    setHeaders(parsedHeaders);
  }, [article]);

  // Scrollspy: automatically highlight visible heading in Table of Contents
  useEffect(() => {
    if (headers.length === 0) return;

    const currentHash = window.location.hash.replace("#", "");
    if (currentHash && headers.some((h) => h.id === currentHash)) {
      setActiveId(currentHash);
    } else {
      setActiveId(headers[0].id);
    }

    const handleScroll = () => {
      // If near the bottom of page, activate the last header
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveId(headers[headers.length - 1].id);
        return;
      }

      // Offset from top of viewport for sticky navbar
      const scrollPosition = window.scrollY + 160;

      const headerElements = headers
        .map((h) => ({ id: h.id, el: document.getElementById(h.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (headerElements.length === 0) return;

      let currentActive = headerElements[0].id;
      for (let i = 0; i < headerElements.length; i++) {
        const top = headerElements[i].el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition) {
          currentActive = headerElements[i].id;
        } else {
          break;
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [headers]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-outfit p-4">
        <h1 className="text-3xl font-extrabold text-primary mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8 font-grotesk">The article you are looking for does not exist or has been moved.</p>
        <Button asChild className="bg-primary hover:bg-primary/80">
          <Link to="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  // Generate customized body content injecting ID tags on H2 headers
  let modifiedContent = article.content;
  headers.forEach((h) => {
    // Replace the first occurrence of <h2>Header text</h2> with <h2 id="header-id">Header text</h2>
    const searchStr = `<h2>${h.text}</h2>`;
    const replaceStr = `<h2 id="${h.id}" class="text-2xl font-bold text-foreground mt-10 mb-4 font-outfit border-b border-border pb-2 scroll-mt-24">${h.text}</h2>`;
    modifiedContent = modifiedContent.replace(searchStr, replaceStr);
  });

  // Inject class styling into code blocks, tables, lists, and paragraphs in article content
  modifiedContent = modifiedContent
    .replace(/<pre><code>/g, '<pre class="bg-muted border border-border p-4 rounded-xl font-mono text-sm overflow-x-auto text-primary my-6 shadow-inner"><code class="block">')
    .replace(/<\/code><\/pre>/g, '</code></pre>')
    .replace(/<p>/g, '<p class="text-muted-foreground font-grotesk leading-relaxed text-md mb-6">')
    .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-2 mb-6 font-grotesk text-muted-foreground">')
    .replace(/<li>/g, '<li class="leading-relaxed">')
    .replace(/<h3>/g, '<h3 class="text-xl font-bold text-foreground mt-8 mb-3 font-outfit">')
    .replace(/<table>/g, '<table class="w-full border-collapse border border-border my-6 font-grotesk text-sm">')
    .replace(/<th>/g, '<th class="border border-border bg-muted p-3 text-left font-semibold text-foreground">')
    .replace(/<td>/g, '<td class="border border-border p-3 text-muted-foreground">');

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mohanreddy.me/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://mohanreddy.me/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://mohanreddy.me/blog/${article.slug}`
      }
    ]
  };

  const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  const articleShareUrl = isLocalhost
    ? `https://mohanreddy.me/blog/${article.slug}`
    : (typeof window !== "undefined" ? window.location.href : `https://mohanreddy.me/blog/${article.slug}`);

  const fullCoverImageUrl = article?.coverImage
    ? article.coverImage.startsWith("http")
      ? article.coverImage
      : `https://mohanreddy.me${article.coverImage.startsWith("/") ? "" : "/"}${article.coverImage}`
    : "https://mohanreddy.me/favicon.png";

  const encodedCoverImageUrl = encodeURI(fullCoverImageUrl);

  // Article / BlogPosting schema
  const articleSchema = {
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mohanreddy.me/blog/${article.slug}`
    },
    "headline": article.title,
    "description": article.description,
    "image": encodedCoverImageUrl,
    "datePublished": "2026-07-02T00:00:00+05:30",
    "dateModified": "2026-07-02T00:00:00+05:30",
    "author": {
      "@type": "Person",
      "name": "Mohan Reddy",
      "jobTitle": "Full Stack Developer",
      "url": "https://mohanreddy.me/"
    },
    "publisher": {
      "@type": "Person",
      "name": "Mohan Reddy",
      "url": "https://mohanreddy.me/"
    }
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    const url = articleShareUrl;
    const title = article.title;
    const text = article.description;

    // 1. Native Web Share API (opens native Android/iOS share drawer if available in context)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return; // Native share drawer successfully opened
      } catch (err: any) {
        if (err.name === "AbortError") {
          return; // User dismissed share sheet
        }
      }
    }

    // 2. Open Interactive Social Share Modal on mobile/desktop
    setIsShareModalOpen(true);
  };

  const handleCopyLink = async () => {
    const url = articleShareUrl;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-secure contexts (e.g. mobile testing on local Wi-Fi)
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <>
      <SEO
        title={`${article.title} | Mohan Reddy Developer Blog`}
        description={article.description}
        keywords={`${article.tags.join(", ")}, Mohan Reddy technical post, code guides, web engineering`}
        ogType="article"
        ogImage={fullCoverImageUrl}
        ogUrl={`https://mohanreddy.me/blog/${article.slug}`}
        schema={[breadcrumbSchema, articleSchema]}
      />
      <style>{`
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: hsl(var(--foreground));
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          color: hsl(var(--muted-foreground));
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: hsl(var(--muted-foreground));
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content pre {
          background-color: hsl(var(--muted) / 0.5);
          border: 1px solid hsl(var(--border) / 0.3);
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
        }
        .blog-content code {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          background-color: hsl(var(--muted) / 0.5);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
        }
      `}</style>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
        <Navbar />

        <main className="flex-grow pt-24 pb-16 px-3 sm:px-5 lg:px-6 max-w-[96%] xl:max-w-[1550px] 2xl:max-w-[1700px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left/Center Column (Article Body) */}
            <article className="lg:col-span-9 space-y-6 w-full">
              
              {/* Back button */}
              <Button asChild variant="ghost" className="hover:bg-foreground/5 hover:text-primary text-muted-foreground gap-2 pl-2">
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4" /> Back to Articles
                </Link>
              </Button>

              {/* Category tag */}
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-widest font-jetbrains">
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground font-grotesk flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                {article.title}
              </h1>

              {/* Published Date & Author */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground leading-none">Mohan Reddy</div>
                    <div className="text-[10px] text-muted-foreground font-grotesk mt-0.5">Author</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground font-grotesk">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {article.date}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card hover:bg-muted border border-border text-xs text-muted-foreground hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    aria-label="Share article"
                  >
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Rich Body Content */}
              <div
                className="blog-content pt-4"
                dangerouslySetInnerHTML={{ __html: modifiedContent }}
              />

              {/* Tag Badges footer */}
              <div className="border-t border-foreground/10 pt-8 mt-12 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-muted-foreground font-grotesk uppercase tracking-wider mr-2">Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-secondary/30 border border-border text-xs text-muted-foreground font-grotesk"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Card */}
              <div className="mt-12 p-6 rounded-2xl bg-card border border-foreground/10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <figure className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-foreground/10 bg-muted">
                  <img
                    src="/mohan-reddy-full-stack-developer.webp"
                    alt="Mohan Reddy profile"
                    title="Mohan Reddy"
                    width="64"
                    height="64"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </figure>
                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-lg font-bold text-foreground font-outfit">Mohan Reddy</h3>
                  <p className="text-sm text-primary font-medium leading-none font-grotesk">Full Stack Developer & Software Engineer</p>
                  <p className="text-xs text-muted-foreground font-grotesk leading-relaxed">
                    Student at Saveetha School of Engineering (SIMATS) specializing in React, TypeScript, Java, and Kotlin. Builder of UniVault and SaveethaHub.
                  </p>
                </div>
              </div>

            </article>

            {/* Right Column (Sidebar - Table of Contents) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6 lg:border-l lg:border-border/80 lg:pl-5">
              
              {headers.length > 0 && (
                <nav className="space-y-4" aria-label="Table of contents">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-grotesk flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5" /> Table of Contents
                  </h2>
                  <ul className="space-y-1.5 font-grotesk text-xs">
                    {headers.map((h) => {
                      const isActive = activeId === h.id;
                      return (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(h.id);
                              if (el) {
                                const yOffset = -100;
                                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: "smooth" });
                                setActiveId(h.id);
                                window.history.pushState(null, "", `#${h.id}`);
                              }
                            }}
                            className={`group flex items-center justify-between text-xs py-1.5 pl-3 -ml-px border-l-2 transition-all duration-200 leading-snug rounded-r-md ${
                              isActive
                                ? "border-primary text-primary font-semibold bg-primary/10 shadow-sm"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted/40"
                            }`}
                          >
                            <span className="truncate">{h.text}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary ml-2 mr-1 animate-pulse shrink-0" />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}

              {/* Related posts placeholder details */}
              <div className="p-5 rounded-2xl bg-card/50 border border-foreground/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-grotesk mb-3">Newsletter</h3>
                <p className="text-xs text-muted-foreground font-grotesk leading-relaxed mb-4">
                  Sign up for my email feed to receive notifications about new articles on tech and software engineering.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 rounded-xl bg-background border border-foreground/10 text-xs focus:border-primary/50 placeholder-muted-foreground focus:outline-none font-grotesk"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/80 text-xs py-2 rounded-xl h-auto font-semibold">
                    Subscribe
                  </Button>
                </div>
              </div>

            </aside>

          </div>

          {/* Social Share Modal for Mobile & Desktop */}
          <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
            <DialogContent className="sm:max-w-md bg-card border-border p-6 rounded-2xl">
              <DialogHeader className="text-left space-y-1">
                <DialogTitle className="text-lg font-bold font-outfit flex items-center gap-2 text-foreground">
                  <Share2 className="w-4 h-4 text-primary" /> Share Article
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground font-grotesk">
                  Share "{article.title}" with your network or friends.
                </DialogDescription>
              </DialogHeader>

              {/* Social Share Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 font-grotesk">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + "\n\n" + articleShareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">WhatsApp</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleShareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 text-[#0A66C2] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-sm font-bold font-mono">in</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">LinkedIn</span>
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleShareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/15 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-sm font-bold font-mono">𝕏</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">X (Twitter)</span>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(articleShareUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/20 text-[#229ED9] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5 ml-0.5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Telegram</span>
                </a>
              </div>

              {/* Quick Copy Link Row */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <input
                  type="text"
                  readOnly
                  value={articleShareUrl}
                  className="flex-grow px-3 py-2 text-xs rounded-xl bg-muted/60 border border-border text-muted-foreground font-mono truncate focus:outline-none"
                />
                <Button
                  onClick={handleCopyLink}
                  size="sm"
                  className="gap-1.5 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;

