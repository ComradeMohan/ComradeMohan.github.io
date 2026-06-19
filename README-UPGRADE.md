Upgrade Summary

What I changed
- Global visual refresh: updated `src/index.css` with richer backgrounds, selection styles, focus-visible outlines, and two new themes (`.midnight`, `.violet`).
- Added a reusable `SectionHeader` component at `src/components/SectionHeader.tsx` and applied it to multiple sections.
- Reworked `HeroSection` to render a canvas-based portrait with watermark overlay and image fallbacks (tries `/profle pic.webp` then `/profle pic.png`).
- Introduced `ThemeSwitcher` component at `src/components/ThemeSwitcher.tsx` and integrated it into the `Navbar` for a persistent theme chooser.
- Restyled `About`, `Skills`, `Projects`, `Profiles`, `Certifications`, `Contact`, `Footer`, and `LoadingScreen` to use a coordinated luxury visual system (rounded cards, glassmorphism, shadows, improved spacing).
- Added entrance and hover micro-interactions using Framer Motion (staggered lists in Projects & Profiles).
- Added `robots` meta and `robots.txt` adjustments to reduce image indexing.

Files changed or added (high level)
- Added: `src/components/SectionHeader.tsx`, `src/components/ThemeSwitcher.tsx`, `README-UPGRADE.md`
- Modified: `src/index.css`, `src/components/*` (HeroSection, Navbar, AboutSection, SkillsSection, ProjectsSection, ProfilesSection, CertificationsSection, ContactSection, Footer, LoadingScreen)

Why the canvas & watermark approach?
- It increases scraping effort by avoiding a plain `<img>` tag and compositing the watermark client-side. It does not make the image private; if the browser can display it, it can be copied.

Image optimization & recommended workflow
1. Create a watermarked, lower-resolution public preview for the site (800x800 web-friendly):

  Using ImageMagick:

  ```bash
  magick "profle pic.png" -resize 800x800 -quality 85 -strip -unsharp 0x0.5 "profle pic.webp"
  magick "profle pic.png" -resize 800x800 -gravity south -background none -fill "rgba(255,255,255,0.75)" -pointsize 28 -annotate +0+10 "mohan.dev" "profle pic-watermarked.png"
  ```

  Or with `sharp` (Node):

  ```js
  // install: npm i sharp
  const sharp = require('sharp')
  sharp('profle pic.png').resize(800,800).webp({quality:85}).toFile('profle pic.webp')
  sharp('profle pic.png').resize(800,800)
    .composite([{ input: Buffer.from('<svg>...your watermark svg...</svg>'), gravity: 'south' }])
    .toFile('profle pic-watermarked.png')
  ```

2. Place the optimized file in `public/` as `profle pic.webp` (the code tries webp first). Keep the original high-resolution image off the public folder if you can.

Build & QA
- Dev server (hot reload):

```bash
npm install
npm run dev
```

- Production build (recommended before deploying):

```bash
npm run build
```

Notes about the build step
- I attempted a build from this environment but the build command was skipped; you can run `npm run build` locally to confirm production output.

Next recommended steps (I can do any of these):
- Add a small design tokens file and centralize button/card variants so new UI primitives are easier to reuse.
- Add a small `theme` selector UI in the footer or a persistent control (done in the navbar already).
- Convert and add an optimized watermarked preview image to `public/` (I cannot modify images in this environment).
- Run `npm run build` locally and fix any production-only issues.

If you want, I can now:
- Commit these visual changes and open a PR.
- Help generate the watermarked preview using a script (requires `sharp` or ImageMagick locally).
- Run the production build here if you allow the build to run.

---

How to run the project locally

1. Install deps:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

