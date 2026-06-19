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
      {!loading && (
        <>
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
        </>
      )}
    </>
  );
};

export default Index;
