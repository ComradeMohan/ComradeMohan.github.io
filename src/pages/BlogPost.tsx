import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Bookmark, Share2, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/data/blogArticles";
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

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center font-outfit p-4">
        <h1 className="text-3xl font-extrabold text-primary mb-4">Post Not Found</h1>
        <p className="text-gray-400 mb-8 font-grotesk">The article you are looking for does not exist or has been moved.</p>
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
    const replaceStr = `<h2 id="${h.id}" class="text-2xl font-bold text-white mt-10 mb-4 font-outfit border-b border-white/5 pb-2 scroll-mt-24">${h.text}</h2>`;
    modifiedContent = modifiedContent.replace(searchStr, replaceStr);
  });

  // Inject class styling into code blocks, tables, lists, and paragraphs in article content
  modifiedContent = modifiedContent
    .replace(/<pre><code>/g, '<pre class="bg-black/45 border border-white/5 p-4 rounded-xl font-mono text-sm overflow-x-auto text-emerald-400/90 my-6 shadow-inner"><code class="block">')
    .replace(/<\/code><\/pre>/g, '</code></pre>')
    .replace(/<p>/g, '<p class="text-gray-300 font-grotesk leading-relaxed text-md mb-6">')
    .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-2 mb-6 font-grotesk text-gray-300">')
    .replace(/<li>/g, '<li class="leading-relaxed">')
    .replace(/<h3>/g, '<h3 class="text-xl font-bold text-white mt-8 mb-3 font-outfit">')
    .replace(/<table>/g, '<table class="w-full border-collapse border border-white/10 my-6 font-grotesk text-sm">')
    .replace(/<th>/g, '<th class="border border-white/10 bg-white/5 p-3 text-left font-semibold text-white">')
    .replace(/<td>/g, '<td class="border border-white/10 p-3 text-gray-300">');

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

  // Article / BlogPosting schema
  const articleSchema = {
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mohanreddy.me/blog/${article.slug}`
    },
    "headline": article.title,
    "description": article.description,
    "image": "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp",
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title={`${article.title} | Mohan Reddy Developer Blog`}
        description={article.description}
        keywords={`${article.tags.join(", ")}, Mohan Reddy technical post, code guides, web engineering`}
        ogType="article"
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

        <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left/Center Column (Article Body) */}
            <article className="lg:col-span-8 space-y-6">
              
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
                    onClick={copyLink}
                    className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none"
                    aria-label="Share article"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" /> Share
                      </>
                    )}
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
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 lg:border-l lg:border-foreground/10 lg:pl-6">
              
              {headers.length > 0 && (
                <nav className="space-y-4" aria-label="Table of contents">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-grotesk flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5" /> Table of Contents
                  </h2>
                  <ul className="space-y-2.5 font-grotesk text-xs">
                    {headers.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-muted-foreground hover:text-primary transition-colors block leading-snug py-0.5 border-l border-transparent hover:border-primary pl-3 -ml-px"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
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
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;

