import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

const articles = [
  {
    slug: "oracle-java-se-17-certification-guide",
    title: "How I Passed the Oracle Certified Professional Java SE 17 (1Z0-829) Exam as an Undergrad",
    description: "A complete preparation roadmap for the Oracle Certified Professional Java SE 17 Developer exam (1Z0-829): core syllabus breakdown, switch pattern matching, sealed classes, and concurrency tips.",
    tags: ["Java", "Oracle OCP", "JVM Architecture"],
    coverImage: "/certifications/Oracle Certified Professional_ Java SE 17 Developer.webp",
    datePublished: "2026-09-24T00:00:00+05:30"
  },
  {
    slug: "scaling-univault-offline-first-architecture",
    title: "Architecting UniVault: Scaling an Offline-First Android & Web Platform to 50,000+ Students",
    description: "A system design deep-dive into how we built UniVault's local-first sync pipeline using Room Database, Kotlin Coroutines, and Firebase Firestore to serve 50,000+ students during peak semester exams.",
    tags: ["Android", "Kotlin", "System Design"],
    coverImage: "/univault_mobile.webp",
    datePublished: "2026-09-28T00:00:00+05:30"
  },
  {
    slug: "ethereum-fraud-detection-xgboost",
    title: "Detecting Ethereum Fraud with XGBoost: Achieving 94% Accuracy on Imbalanced Blockchain Data",
    description: "How we developed an automated fraud detection pipeline for Ethereum transactions using machine learning, addressing severe class imbalance with SMOTE and outperforming legacy tree ensembles.",
    tags: ["Machine Learning", "XGBoost", "FinTech"],
    coverImage: "/object_detection_comparison.webp",
    datePublished: "2026-10-01T00:00:00+05:30"
  },
  {
    slug: "react-state-management",
    title: "Advanced State Management in React 18: Beyond Redux",
    description: "Explore modern state management paradigms in React 18, including Zustand, Recoil, and Signals, comparing performance and developer experience.",
    tags: ["React", "Zustand", "Performance"],
    coverImage: "/saveetha_hub_screenshot.webp",
    datePublished: "2026-07-02T00:00:00+05:30"
  }
];

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setMetaTag(html, attrName, attrValue, content) {
  const regex = new RegExp(`<meta\\s+[^>]*?${attrName}=["']${attrValue}["'][^>]*?>`, 'i');
  const safeContent = escapeHtml(content);
  const newTag = `<meta ${attrName}="${attrValue}" content="${safeContent}" />`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

function setLinkTag(html, rel, href) {
  const regex = new RegExp(`<link\\s+[^>]*?rel=["']${rel}["'][^>]*?>`, 'i');
  const newTag = `<link rel="${rel}" href="${href}" />`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

function setTitle(html, title) {
  const safeTitle = escapeHtml(title);
  const regex = /<title>[\s\S]*?<\/title>/i;
  const newTag = `<title>${safeTitle}</title>`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

function injectSchema(html, schemaObj) {
  const scriptRegex = /<script\s+type=["']application\/ld\+json["']\s+id=["']jsonld-seo["']>[\s\S]*?<\/script>/i;
  const newScript = `<script type="application/ld+json" id="jsonld-seo">${JSON.stringify(schemaObj)}</script>`;
  if (scriptRegex.test(html)) {
    return html.replace(scriptRegex, newScript);
  }
  return html.replace('</head>', `  ${newScript}\n</head>`);
}

async function prerenderBlogPages() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.warn(`[Prerender] Skipped: ${indexHtmlPath} not found.`);
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  console.log('[Prerender] Generating static HTML for blog posts to ensure rich social previews (WhatsApp, LinkedIn, Twitter, Telegram)...');

  // 1. Generate /blog index page
  const blogDir = path.join(distDir, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  let blogIndexHtml = baseHtml;
  blogIndexHtml = setTitle(blogIndexHtml, "Technical Articles & Engineering Deep Dives | Mohan Reddy");
  blogIndexHtml = setMetaTag(blogIndexHtml, "name", "description", "Read technical engineering deep-dives by Mohan Reddy covering Oracle Certified Java SE 17 JVM internals, offline-first Android architecture with UniVault, and Ethereum ML fraud detection.");
  blogIndexHtml = setLinkTag(blogIndexHtml, "canonical", "https://mohanreddy.me/blog");
  blogIndexHtml = setMetaTag(blogIndexHtml, "property", "og:title", "Technical Articles & Engineering Deep Dives | Mohan Reddy");
  blogIndexHtml = setMetaTag(blogIndexHtml, "property", "og:description", "Read technical engineering deep-dives by Mohan Reddy covering Oracle Certified Java SE 17 JVM internals, offline-first Android architecture with UniVault, and Ethereum ML fraud detection.");
  blogIndexHtml = setMetaTag(blogIndexHtml, "property", "og:url", "https://mohanreddy.me/blog");
  blogIndexHtml = setMetaTag(blogIndexHtml, "property", "og:image", "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp");
  blogIndexHtml = setMetaTag(blogIndexHtml, "property", "og:image:secure_url", "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp");
  blogIndexHtml = setMetaTag(blogIndexHtml, "name", "twitter:title", "Technical Articles & Engineering Deep Dives | Mohan Reddy");
  blogIndexHtml = setMetaTag(blogIndexHtml, "name", "twitter:description", "Read technical engineering deep-dives by Mohan Reddy covering Oracle Certified Java SE 17 JVM internals, offline-first Android architecture with UniVault, and Ethereum ML fraud detection.");
  blogIndexHtml = setMetaTag(blogIndexHtml, "name", "twitter:image", "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp");
  blogIndexHtml = setMetaTag(blogIndexHtml, "name", "thumbnail", "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp");
  blogIndexHtml = setLinkTag(blogIndexHtml, "image_src", "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp");

  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml, 'utf-8');
  console.log('  ✓ Generated dist/blog/index.html');

  // 2. Generate each article page
  for (const article of articles) {
    const articleDir = path.join(blogDir, article.slug);
    fs.mkdirSync(articleDir, { recursive: true });

    const rawCover = article.coverImage;
    const fullImageUrl = rawCover.startsWith('http')
      ? rawCover
      : `https://mohanreddy.me${rawCover.startsWith('/') ? '' : '/'}${rawCover}`;
    const encodedImageUrl = encodeURI(fullImageUrl);
    const postUrl = `https://mohanreddy.me/blog/${article.slug}`;

    let postHtml = baseHtml;
    postHtml = setTitle(postHtml, `${article.title} | Mohan Reddy Developer Blog`);
    postHtml = setMetaTag(postHtml, "name", "description", article.description);
    postHtml = setMetaTag(postHtml, "name", "keywords", `${article.tags.join(', ')}, Mohan Reddy, technical post, code guides, web engineering`);
    postHtml = setLinkTag(postHtml, "canonical", postUrl);

    // OpenGraph Metas
    postHtml = setMetaTag(postHtml, "property", "og:title", article.title);
    postHtml = setMetaTag(postHtml, "property", "og:description", article.description);
    postHtml = setMetaTag(postHtml, "property", "og:type", "article");
    postHtml = setMetaTag(postHtml, "property", "og:url", postUrl);
    postHtml = setMetaTag(postHtml, "property", "og:image", encodedImageUrl);
    postHtml = setMetaTag(postHtml, "property", "og:image:secure_url", encodedImageUrl);
    postHtml = setMetaTag(postHtml, "property", "og:image:alt", article.title);
    postHtml = setMetaTag(postHtml, "property", "og:image:width", "1200");
    postHtml = setMetaTag(postHtml, "property", "og:image:height", "630");
    postHtml = setMetaTag(postHtml, "property", "og:site_name", "Mohan Reddy Portfolio");

    // Twitter Metas
    postHtml = setMetaTag(postHtml, "name", "twitter:card", "summary_large_image");
    postHtml = setMetaTag(postHtml, "name", "twitter:title", article.title);
    postHtml = setMetaTag(postHtml, "name", "twitter:description", article.description);
    postHtml = setMetaTag(postHtml, "name", "twitter:image", encodedImageUrl);
    postHtml = setMetaTag(postHtml, "name", "twitter:image:alt", article.title);
    postHtml = setMetaTag(postHtml, "name", "twitter:image:width", "1200");
    postHtml = setMetaTag(postHtml, "name", "twitter:image:height", "630");

    // Fallback Image Scrapers & Favicon
    postHtml = setMetaTag(postHtml, "name", "thumbnail", encodedImageUrl);
    postHtml = setLinkTag(postHtml, "image_src", encodedImageUrl);
    postHtml = setLinkTag(postHtml, "icon", "/favicon.png");

    // Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      },
      "headline": article.title,
      "description": article.description,
      "image": encodedImageUrl,
      "datePublished": article.datePublished,
      "dateModified": article.datePublished,
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
    postHtml = injectSchema(postHtml, schema);

    fs.writeFileSync(path.join(articleDir, 'index.html'), postHtml, 'utf-8');
    console.log(`  ✓ Generated dist/blog/${article.slug}/index.html (Cover: ${encodedImageUrl})`);
  }

  console.log('[Prerender] All blog static pages successfully generated!');
}

prerenderBlogPages().catch(err => {
  console.error('[Prerender Error]', err);
  process.exit(1);
});
