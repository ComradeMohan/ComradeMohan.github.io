import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowLeft, BookOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/data/blogArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(blogArticles.flatMap((article) => article.tags)));

  // Filter articles based on query and tag
  const filteredArticles = blogArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

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
    "description": "Articles on React, TypeScript, Java, Firebase, Android development, and Technical SEO.",
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
        title="Technical Blog | Mohan Reddy - Full Stack Software Developer"
        description="Read articles and tutorials on React state management, real-time Firebase databases, advanced TypeScript, Java LTS features, Android security, and Technical SEO."
        keywords="Mohan Reddy Blog, Comrade Mohan blog, software engineering blog, React tutorial, Java SE 17 records, Android AES-256 Room, Firebase snapshot listeners, TypeScript template literals, React SEO guides"
        schema={[breadcrumbSchema, collectionPageSchema]}
      />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-12 relative">
            <Button asChild variant="ghost" className="mb-6 hover:bg-foreground/5 hover:text-primary text-muted-foreground gap-2 pl-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" /> Back to Portfolio
              </Link>
            </Button>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              Developer <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-md max-w-2xl font-grotesk">
              Deep dives into full stack engineering, platform architectures, security standards, and web performance. Written by a product-minded developer.
            </p>
          </div>

          {/* Search and Tags row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-foreground/10 focus:border-primary/50 text-foreground placeholder-muted-foreground focus:outline-none transition-colors font-grotesk text-sm"
                aria-label="Search blog articles"
              />
            </div>

            {/* Filter Tags */}
            <div className="lg:col-span-8 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold font-grotesk uppercase text-gray-500 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedTag === null
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-card border-foreground/10 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    tag === selectedTag
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-card border-foreground/10 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card rounded-2xl border border-foreground/10 overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Category and Read time header */}
                  <div className="p-6 pb-0 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-widest font-jetbrains">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-grotesk">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-3 text-foreground font-outfit group-hover:text-primary transition-colors line-clamp-2">
                        <Link to={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted-foreground font-grotesk leading-relaxed mb-6 line-clamp-3">
                        {article.description}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between border-t border-foreground/10 pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-grotesk">
                        <Calendar className="w-3.5 h-3.5" /> {article.date}
                      </span>
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
            <div className="text-center py-20 bg-card rounded-2xl border border-foreground/10">
              <p className="text-muted-foreground font-grotesk mb-4">No articles found matching your criteria.</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedTag(null); }} className="bg-primary hover:bg-primary/80">
                Clear Filters
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

