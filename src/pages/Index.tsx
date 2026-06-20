import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic SEO Metadata for Home Page
    document.title = "Mohan Reddy | Full Stack Developer | Open to Work";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Mohan Reddy's professional portfolio and resume for technical recruiters. Full Stack Developer specializing in React, Next.js, Kotlin, Java, Python, SQL, and Machine Learning. Open to full-time roles, internships, and software engineering opportunities.");
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Mohan Reddy | Full Stack Developer | Open to Work");

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "Portfolio and resume-style site for Mohan Reddy. Full stack developer open to job opportunities, internships, freelance work, and recruiter outreach.");

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", "Mohan Reddy | Full Stack Developer | Open to Work");

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", "Portfolio and resume-style site for Mohan Reddy. Full stack developer open to job opportunities, internships, freelance work, and recruiter outreach.");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', "https://comrademohan.netlify.app/");
  }, []);

  useEffect(() => {
    if (loading) return;

    const trackedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !trackedSections.has(sectionId)) {
              trackedSections.add(sectionId);
              
              // Map section ids to descriptive display names
              let displayName = sectionId;
              if (sectionId === "home") displayName = "hero";
              if (sectionId === "certifications") displayName = "certificates";
              
              // Capitalize name for cleaner analytics display
              const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
              
              trackEvent("scroll", "section_view", formattedName);
            }
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
      }
    );

    const sectionIds = ["home", "about", "skills", "projects", "certifications", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={loading ? "hidden" : ""}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
