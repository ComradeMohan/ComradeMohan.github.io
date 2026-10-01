import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowLeft, ArrowRight, Sparkles, Flame, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/data/blogArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Distinct curated categories
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(blogArticles.map((a) => a.category)))];
  }, []);

  // Filter articles based on search query and category
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const isDefaultView = searchQuery.trim() === "" && selectedCategory === "All";
  const featuredArticle = isDefaultView ? filteredArticles[0] : null;
  const gridArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;

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
      }
    ]
  };

  // CollectionPage schema
  const collectionPageSchema = {
    "@type": "CollectionPage",
    "@id": "https://mohanreddy.me/blog#webpage",
    "url": "https://mohanreddy.me/blog",
    "name": "Mohan Reddy's Technical Developer Blog",
    "description": "In-depth engineering deep dives on Java SE 17, offline-first mobile systems, AI fraud detection, and modern web architecture by Mohan Reddy.",
    "publisher": {
      "@type": "Person",
      "name": "Mohan Reddy",
      "url": "https://mohanreddy.me/"
    },
    "about": {
      "@type": "Person",
      "name": "Mohan Reddy"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredArticles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://mohanreddy.me/blog/${article.slug}`
      }))
    }
  };

  return (
    <>
      <SEO
        title="Technical Blog & Architecture Deep Dives | Mohan Reddy"
        description="Engineering deep dives into Oracle Java SE 17, offline-first mobile architecture, Ethereum fraud detection ML, and scalable web platforms by Mohan Reddy."
        keywords="Mohan Reddy Blog, Oracle Certified Java SE 17 Developer, UniVault architecture, Ethereum fraud detection XGBoost, React 18 Zustand, ComradeMohan"
        schema={[breadcrumbSchema, collectionPageSchema]}
      />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
        <Navbar />

        {/* Main Content Container */}
        <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="mb-10">
            <Button
              asChild
              variant="ghost"
              className="mb-6 hover:bg-foreground/5 hover:text-primary text-muted-foreground gap-2 pl-2 text-sm"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4" /> Back to Portfolio
              </Link>
            </Button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary mb-4 font-jetbrains">
              <Sparkles className="w-3.5 h-3.5" /> High-Impact Engineering Deep Dives
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Developer <span className="text-primary">Blog</span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl font-grotesk mt-3 leading-relaxed">
                  In-depth architectural breakdowns on enterprise Java, offline-first mobile applications, ML fraud detection, and modern web platforms.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card/60 border border-border px-3.5 py-2 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{blogArticles.length} Curated Deep Dives</span>
              </div>
            </div>
          </div>

          {/* Clean Laptop Controls: Search & Category Filter */}
          <div className="bg-card/40 border border-border/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 mb-10 shadow-sm">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Category Pills Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                          : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="blog-search"
                  type="text"
                  placeholder="Search architecture, Java, ML..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-background border border-border focus:border-primary/60 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm font-grotesk focus:outline-none transition-colors"
                  aria-label="Search articles"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured Spotlight Article (When on Default View on Laptop) */}
          {featuredArticle && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="group relative bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  
                  {/* Left: Cover Image */}
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-muted/30">
                    <img
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg font-jetbrains">
                        <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Featured Deep Dive
                      </span>
                    </div>
                  </div>

                  {/* Right: Content & Metadata */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full space-y-5">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-jetbrains mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
                          {featuredArticle.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                        <Link to={`/blog/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      <p className="text-muted-foreground text-sm sm:text-base font-grotesk leading-relaxed line-clamp-3 mb-4">
                        {featuredArticle.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featuredArticle.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono text-muted-foreground bg-muted border border-border/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-grotesk">
                        <Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}
                      </span>
                      <Button asChild size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-grotesk text-xs">
                        <Link to={`/blog/${featuredArticle.slug}`}>
                          Read Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* Section Divider if Spotlight is present */}
          {featuredArticle && gridArticles.length > 0 && (
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-border/80">
              <h3 className="text-xl font-bold tracking-tight text-foreground font-outfit">
                Latest Architecture &amp; Case Studies
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {gridArticles.length} Articles
              </span>
            </div>
          )}

          {/* Curated Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {gridArticles.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Card Cover Image */}
                  <Link to={`/blog/${article.slug}`} className="relative h-48 w-full overflow-hidden bg-muted/40 block">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-primary bg-background/90 backdrop-blur-md border border-primary/20 uppercase tracking-widest font-jetbrains shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-grotesk mb-2.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>

                      <h2 className="text-lg font-bold text-foreground font-outfit group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                        <Link to={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-muted-foreground font-grotesk leading-relaxed line-clamp-3 mb-4">
                        {article.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-muted/60 border border-border/40"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-border/80 pt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-grotesk">By Mohan Reddy</span>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="text-xs font-semibold text-primary group-hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        Read Post <BookOpen className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/60 rounded-3xl border border-border max-w-lg mx-auto">
              <p className="text-foreground font-semibold text-base mb-1">No articles found</p>
              <p className="text-muted-foreground text-xs sm:text-sm font-grotesk mb-5">
                We couldn't find any articles matching "{searchQuery}" in "{selectedCategory}".
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-primary hover:bg-primary/90 text-xs"
              >
                Reset Filters
              </Button>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
