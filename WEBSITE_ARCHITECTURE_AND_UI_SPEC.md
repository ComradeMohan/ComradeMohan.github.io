# Portfolio Web Application: Complete Architecture, UI Elements & System Specification

> **Target Audience**: AI Agents, LLM Coding Assistants, and Developers  
> **Repository**: `ComradeMohan/ComradeMohan.github.io`  
> **Production URL**: [https://mohanreddy.me/](https://mohanreddy.me/)  
> **Owner**: M Mohan Reddy (Comrade Mohan) — Full Stack Developer & Software Engineer  
> **Last Updated**: August 2026  

---

## 1. Executive Summary & Tech Stack

This repository is a production-grade, high-performance developer portfolio built with modern web technologies, strict accessibility, zero layout-shift animations, and a cyber-aesthetic luxury design system.

### Core Technology Stack
- **Framework & Runtime**: React 18 (`react` 18.3.1) with TypeScript (`typescript` 5.8.3)
- **Bundler & Build Tool**: Vite 5 (`vite` 5.4.19) using `@vitejs/plugin-react-swc`
- **Styling**: Tailwind CSS (`tailwindcss` 3.4.17) + `tailwindcss-animate` + `@tailwindcss/typography`
- **UI Component Primitives**: Radix UI primitives (`@radix-ui/react-*`), `shadcn/ui` architecture, `cmdk`
- **Animation & Physics**: Framer Motion (`framer-motion` 11.18.2) for scroll-linked animations, layout transitions, and micro-interactions
- **Routing**: React Router DOM (`react-router-dom` 6.30.1) with route-level code splitting (`React.lazy` + `Suspense`)
- **State & Data Fetching**: TanStack React Query (`@tanstack/react-query` 5.83.0), custom hooks for GitHub & LeetCode APIs
- **Forms & Validation**: React Hook Form (`react-hook-form` 7.61.1) + Zod (`zod` 3.25.76)
- **Testing**: Playwright (`@playwright/test` 1.61.1) for End-to-End browser tests & Vitest (`vitest` 3.2.4) for unit testing

---

## 2. Directory & File Organization

```
Portfolio/
├── .github/workflows/          # CI/CD deployment pipelines
├── public/                     # Static assets (SVGs, PDFs, WebP preview images, icons)
│   ├── banner-laptop.svg       # Responsive GitHub banner
│   ├── banner-mobile.svg
│   ├── mohan_resume_.pdf       # Direct downloadable resume
│   ├── certifications/         # WebP and PDF certificates (Oracle, OCI, NPTEL, etc.)
│   └── icons/                  # Custom brand and technology SVG vectors
├── src/
│   ├── main.tsx                # React DOM root entry point
│   ├── App.tsx                 # Master routing, providers, code-splitting, scroll manager
│   ├── index.css               # Design tokens, CSS variables, multi-theme definitions
│   ├── App.css                 # Supplementary utility styles
│   ├── components/             # Reusable UI & Page Section components
│   │   ├── LoadingScreen.tsx   # Intro splash animation with staged letter reveals
│   │   ├── Navbar.tsx          # Responsive floating glass navbar with scroll-spy
│   │   ├── ThemeSwitcher.tsx   # Color palette selector (Dark, Midnight, Violet, Light)
│   │   ├── ThemePanel.tsx      # Slide-out theme configuration drawer
│   │   ├── CommandMenu.tsx     # Cmd+K / Ctrl+K keyboard shortcut palette
│   │   ├── CustomCursor.tsx    # Smooth canvas/DOM trailing interactive cursor
│   │   ├── CyberHUD.tsx        # Cyberpunk biometric stat HUD overlay on hero avatar
│   │   ├── HeroSection.tsx     # Interactive hero with canvas avatar & typewriter
│   │   ├── AboutSection.tsx    # Academic journey, timeline, and education details
│   │   ├── SkillsSection.tsx   # Categorized skills matrix, proficiencies, marquee
│   │   ├── ProjectsSection.tsx # Master container for projects showcase
│   │   ├── ProjectScrollyStage.tsx # 6-stage sticky desktop scrollytelling showcase
│   │   ├── MobileProjectStack.tsx  # Touch-optimized mobile card stack for projects
│   │   ├── CertificationsSection.tsx # Verified credentials, Oracle badge, PDF modal
│   │   ├── OracleCertModal.tsx # Dedicated verification modal for Java SE 17 OCP
│   │   ├── PdfViewerModal.tsx  # In-browser interactive PDF viewer modal
│   │   ├── ContactSection.tsx  # Contact form, live validation, social links, resume
│   │   ├── Footer.tsx          # Sitemap, back-to-top, copyright, quick social docks
│   │   ├── ProgressiveImage.tsx# Blur-up progressive image loader
│   │   ├── SpotlightCard.tsx   # Mouse-following radial glow card wrapper
│   │   ├── MagneticButton.tsx  # Spring-physics magnetic hover button
│   │   ├── SectionHeader.tsx   # Standardized section title with subtitle and pill
│   │   ├── SEO.tsx             # Dynamic React Helmet / Head meta tags & JSON-LD schema
│   │   ├── motion/             # Framer Motion utility animations (e.g. ScrollProgress)
│   │   └── ui/                 # 30+ Radix/shadcn atomic primitives (buttons, dialogs, etc.)
│   ├── data/
│   │   ├── blogArticles.ts     # In-depth technical articles (React, Java, Firebase, TS)
│   │   └── developerProfileFallback.json # Offline fallback for developer stats
│   ├── hooks/
│   │   ├── useDeveloperStats.ts# Real-time GitHub and LeetCode API data fetchers
│   │   ├── useTheme.ts         # Multi-theme state and localStorage synchronization
│   │   └── use-toast.ts        # Toast notifications trigger
│   ├── lib/
│   │   ├── utils.ts            # clsx & tailwind-merge helper
│   │   └── analytics.ts        # Google Analytics 4 (GA4) event tracker
│   └── pages/                  # Page routes (Lazy-loaded)
│       ├── Index.tsx           # Single-page portfolio homepage
│       ├── SaveethaHubCaseStudy.tsx # Full case study for SaveethaHub
│       ├── UniVaultCaseStudy.tsx    # Full case study for UniVault Android app
│       ├── DeveloperProfile.tsx# Live code metrics, GitHub contribution calendar
│       ├── About.tsx           # Dedicated comprehensive bio and education
│       ├── Resume.tsx          # Interactive web resume with print styles
│       ├── Blog.tsx            # Engineering articles index with search & tags
│       ├── BlogPost.tsx        # Individual markdown/HTML blog post reader
│       └── NotFound.tsx        # Cyberpunk 404 error page with terminal recovery
├── index.html                  # Core HTML template, font preloads, SEO meta tags
├── package.json                # Dependencies and npm build scripts
├── tailwind.config.ts          # Extended colors, animations, keyframes, typography
└── vite.config.ts              # Vite plugins and path alias resolution (`@/*`)
```

---

## 3. Application Routing & Page Flows

All routes are declared in [App.tsx](file:///c:/Users/madhi/Downloads/Portfolio/src/App.tsx) wrapped in `BrowserRouter` and an animated `PageWrapper`:

| Route Path | Page Component | Description & Key Features |
| :--- | :--- | :--- |
| `/` | `Index.tsx` | Single-page flagship experience featuring all sections (Hero, About, Skills, Projects, Certifications, Contact, Footer). |
| `/saveethahub` & `/case-study/saveethahub` | `SaveethaHubCaseStudy.tsx` | Deep dive into SaveethaHub (3.8K+ MAU, 24.7K+ Google search clicks). Includes architecture diagrams, interactive GPA calculator demo, features breakdown, and metrics. |
| `/univault` & `/case-study/univault` | `UniVaultCaseStudy.tsx` | Deep dive into UniVault Android App (Google Play Store, 2.4K+ active students). Highlights Kotlin MVVM, AES-256 encryption, Room DB, and mock test engine. |
| `/developer` | `DeveloperProfile.tsx` | Comprehensive developer metrics: Live GitHub streak, commit charts, LeetCode contest rankings (1673 rating, Top 16%), language breakdowns. |
| `/about` | `About.tsx` | Extended bio, philosophy, education at Saveetha School of Engineering, and career milestones. |
| `/resume` | `Resume.tsx` | Formatted web resume with PDF download, ATS-friendly layout, and verified skill matrix. |
| `/blog` | `Blog.tsx` | Technical article archive with category filtering, search bar, and reading time estimates. |
| `/blog/:slug` | `BlogPost.tsx` | Full-text article view with interactive code snippets, tables, and social sharing. |
| `*` | `NotFound.tsx` | Interactive 404 page featuring glitch animation, command prompt recovery, and quick navigation back to home. |

---

## 4. Design System & Theme Engine

The application supports four coordinated luxury themes configured via CSS variables in `src/index.css`:

### 1. Color Palettes
- **Dark Theme (Default)**: Deep midnight navy background (`hsl(230, 25%, 10%)`), slate foreground (`hsl(210, 40%, 95%)`), vibrant orange primary (`#f97316` / `hsl(12, 95%, 58%)`), purple accent (`hsl(289, 65%, 60%)`).
- **Midnight Theme (`.midnight`)**: Ultra-dark abyss navy (`#071025`) with cobalt and cyan glow accents.
- **Violet Theme (`.violet`)**: Deep royal purple (`#1b052f`) with fuchsia and magenta highlights.
- **Light Theme (`.light`)**: Clean porcelain white/slate (`hsl(0, 0%, 98%)`) with high-contrast slate text (`#0f172a`) and burnt orange accents.

### 2. Typography
- **Primary Body & Display**: `'Outfit', sans-serif` (Google Font with weight options 300 to 900)
- **Monospace & Code Elements**: JetBrains Mono / font-mono for stats, tags, and commit counters
- **Accent Script**: `'Pacifico', cursive` for signature highlights

### 3. Glassmorphism & Visual Tokens
- Standard card background: `bg-card/80 backdrop-blur-md border border-border/80`
- Glowing borders: `hover:border-primary/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]`
- Selection highlight: Custom orange selection (`#f97316` background with `#ffffff` text) across all inputs and text.

---

## 5. UI Elements & Component Deep-Dive

### A. Loading Screen (`LoadingScreen.tsx`)
- Animated intro modal showing the handle `COMRADEMOHAN`.
- Staggered letter-by-letter entrance animation with spring physics.
- Each letter has an individual curated rainbow/cyber tone.
- Guarded by `sessionStorage.getItem("portfolio_has_loaded")` and module-level singleton so it renders strictly once per browser session.

### B. Floating Navbar (`Navbar.tsx`)
- Fixed top navigation with glassmorphism blur and dynamic scroll shadow.
- Navigation links with smooth scroll anchors: `#home`, `#about`, `#skills`, `#projects`, `#certifications`, `#contact`.
- Quick router links to `/blog`, `/resume`, and `/developer`.
- Integrated `ThemeSwitcher` pill and Command Menu trigger (`Cmd + K`).
- Mobile hamburger menu with smooth slide-down animation.

### C. Command Menu (`CommandMenu.tsx`)
- Accessible via global shortcut `Ctrl + K` (Windows/Linux) or `Cmd + K` (macOS), or via navbar button.
- Fuzzy search across navigation targets, case studies, blog posts, external profiles (GitHub, LinkedIn, Instagram), and theme switching commands.

### D. Hero Section (`HeroSection.tsx`)
- **Typewriter Effect**: Zero-layout-shift word-by-word reveal cycling through:
  `["Software Developer", "Freelancer", "Problem Solver", "Cyber Expert"]`.
- **Canvas-Protected Portrait**: Avatar rendered onto an HTML5 `<canvas>` element with client-side watermark overlay (`mohan.dev`) to mitigate raw scraping.
- **CyberHUD Overlay (`CyberHUD.tsx`)**: Hovering over the avatar activates HUD targeting vectors connecting to live GitHub repository counts (98), followers (13), and LeetCode metrics (477 solved, 1673 rating, Top 16%).
- **Interactive Metric Badges**: Live counters for Graduation Year (2026), CGPA (8.646), Projects (10+), and Live GitHub Commits (4,500+).
- **Magnetic Buttons (`MagneticButton.tsx`)**: CTAs with physics spring tracking that pull toward the cursor on hover.

### E. About Section (`AboutSection.tsx`)
- Split layout with scroll-linked vertical timeline.
- **Education Milestones**:
  1. *B.E. Computer Science & Engineering* at Saveetha School of Engineering (SIMATS), Chennai (2022–2026, CGPA: 8.646/10).
  2. *Intermediate (MPC + Computer Science)* at Loyola Public School, Guntur (2020–2022, 81.6%).
- **Core Focus Tags**: Full Stack Development, Java & Software Engineering, Database Management, and Cloud Architecture.

### F. Skills Section (`SkillsSection.tsx`)
- **6 Categorized Skill Cards** wrapped in radial `SpotlightCard`:
  1. *Frontend* (Primary): React, TypeScript, Next.js, Tailwind CSS, Vite, Framer Motion.
  2. *Java & Core* (OCP Certified): Java SE 17, Data Structures & DSA, OOP Principles, Python, C/C++.
  3. *Backend & APIs*: Node.js, Express.js, REST APIs, GraphQL, Supabase, JWT/OAuth.
  4. *Database*: PostgreSQL, MongoDB, Firebase, Redis, MySQL.
  5. *Cloud & DevOps* (OCI Certified): AWS, Docker, OCI Cloud, Git/GitHub, CI/CD, Linux.
  6. *AI & Mobile*: Android (Kotlin), OpenCV, Machine Learning, Pandas, TensorFlow.
- **Proficiency Sliders**: Animated percentage bars showing mastery in React/Next.js (90%), Java SE 17 (87%), TypeScript (85%), DSA (84%), and Node.js (82%).
- **Infinite Marquee**: Auto-scrolling horizontal band of 22+ technology badges.

### G. Projects Showcase (`ProjectsSection.tsx`, `ProjectScrollyStage.tsx`, `MobileProjectStack.tsx`)
Dual presentation modes based on viewport:
- **Desktop Sticky Scrolly Stage**: A 6-stage scroll-driven presentation where scrolling smoothly transitions between the 6 flagship projects with live background glow changes:
  1. **Object Detection in Python**: Computer vision YOLOv8n pipeline, 45+ FPS, 80 COCO classes.
  2. **SaveethaHub**: Academic preparation web app, 3.8K+ monthly users, Supabase + Next.js.
  3. **UniVault**: Offline-first Android app published on Google Play Store, AES-256 encryption, Room DB.
  4. **Ethereum Fraud Detection**: Machine learning security model using XGBoost with 98.4% detection accuracy.
  5. **Skylink Deliveries**: Automated drone logistics & delivery tracking simulation.
  6. **DevPulse**: Developer analytics platform for tracking productivity and commit velocity.
- **Mobile Stack**: Touch-optimized swipeable card stack ensuring smooth performance on mobile devices.
- **Secondary Project Grid**: Filterable grid featuring additional repositories (Blood Donation Management, Weather App, Portfolio V1).

### H. Certifications & Credentials (`CertificationsSection.tsx`)
- **Oracle Certified Professional Java SE 17 Developer** featured showcase with interactive animated spinning gold badge, verification modal (`OracleCertModal.tsx`), and credential ID `102029574OCPJSE17`.
- **7 Verified Industry Credentials**:
  1. Oracle Certified Professional: Java SE 17 Developer (Oracle University)
  2. Oracle Cloud Infrastructure 2024 Certified Foundations Associate (Oracle)
  3. Programming in Java - Silver Elite (NPTEL / IIT Kharagpur)
  4. Frontend Developer React (HackerRank - ID: `d0ed9abff6e9`)
  5. Data Analytics Essentials (Cisco Networking Academy)
  6. Python for Data Science (Kaggle)
  7. Software Engineering Job Simulation (JPMorgan Chase & Co.)
- **Interactive PDF Viewer Modal (`PdfViewerModal.tsx`)**: Allows visitors to inspect certificates directly on-page without leaving the site.

### I. Contact & Social Section (`ContactSection.tsx`)
- **Interactive Form**: Name, Email, Subject, and Message inputs with real-time validation, character counters, spam prevention, and auto-reset.
- **One-Click Email Copy**: Instant copy button for `madhiremohanreddy@gmail.com` with toast feedback.
- **Direct Resume Download**: Button with automated download of `mohan_resume_.pdf` and GA4 analytics event tracking.
- **Live Social & Profile Badges**:
  - GitHub: `@ComradeMohan` (99 repos, streak stats)
  - LinkedIn: `in/mmohanreddy`
  - LeetCode: `@Comrademohan` (100+ solved, contest rating)
  - Instagram: `@comrade_mohan666`

### J. Footer (`Footer.tsx`)
- Quick sitemap anchors, availability badge ("Open to Work 2026"), direct contact links, and back-to-top button.

---

## 6. Data & Content Models

### 1. Blog Articles (`src/data/blogArticles.ts`)
Each blog post adheres to the TypeScript interface:
```typescript
interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string; // Rich semantic HTML with code blocks, tables, and headers
}
```
Featured topics include:
- *Advanced State Management in React 18: Beyond Redux* (`react-state-management`)
- *Building Real-Time Web Apps with Cloud Firestore and React* (`firestore-realtime-react`)
- *Mastering TypeScript: Type-Safe Development for Full Stack Engineers* (`typescript-type-safety`)
- *Oracle Java SE 17: Deep Dive into Modern Language Features* (`modern-java-features`)

### 2. SEO & Schema Data (`src/components/SEO.tsx`)
Every page injects rich JSON-LD structured data:
- `WebSite` schema with internal search target action
- `Person` schema for Mohan Reddy (alumniOf SIMATS, sameAs links, knowsAbout topics)
- `FAQPage` schema addressing common queries regarding projects and certifications

---

## 7. Developer Commands & Build Scripts

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (Vite hot reload on http://localhost:5173)
npm run dev

# 3. Compile and build production bundle
npm run build

# 4. Preview local production build
npm run preview

# 5. Run unit & component tests (Vitest)
npm run test

# 6. Run End-to-End browser tests (Playwright)
npm run test:e2e
```

---

## 8. Summary for AI Agents Calling or Editing This Codebase

1. **Routing**: When adding pages, register the route in `src/App.tsx` inside `AnimatedRoutes` with `React.lazy` and wrap in `<PageWrapper>`.
2. **Components**: Follow the `shadcn/ui` pattern in `src/components/ui/` and compose complex sections in `src/components/`.
3. **Styling**: Use Tailwind utility classes with CSS variable tokens (e.g. `bg-card`, `text-primary`, `border-border`). Avoid hardcoding arbitrary hex colors unless matching specific brand assets.
4. **Performance**: Preserve zero-CLS techniques, responsive WebP image pipelines, and Framer Motion reduced-motion support (`useReducedMotion`).
5. **Analytics**: Log custom interactions through `trackEvent(action, category, label)` imported from `@/lib/analytics`.
