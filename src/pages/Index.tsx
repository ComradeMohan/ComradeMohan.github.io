import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import SEO from "@/components/SEO";

const Index = () => {
  const { hash } = useLocation();
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("portfolio_has_loaded");
    }
    return true;
  });



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

  useEffect(() => {
    if (!loading && hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, hash]);

  // Define schemas
  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://mohanreddy.me/#website",
    "url": "https://mohanreddy.me/",
    "name": "Mohan Reddy Portfolio",
    "description": "Professional developer portfolio of Mohan Reddy, Full Stack Software Engineer.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mohanreddy.me/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const personSchema = {
    "@type": "Person",
    "@id": "https://mohanreddy.me/#person",
    "name": "Mohan Reddy",
    "alternateName": "Comrade Mohan",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer specializing in React, Next.js, Kotlin, Java, Python, SQL, and Machine Learning.",
    "url": "https://mohanreddy.me/",
    "image": "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp",
    "email": "madhiremohanreddy@gmail.com",
    "gender": "Male",
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Saveetha School of Engineering (SIMATS)",
      "url": "https://saveetha.com/"
    },
    "sameAs": [
      "https://github.com/ComradeMohan",
      "https://www.linkedin.com/in/mmohanreddy/",
      "https://www.instagram.com/comrade_mohan666/"
    ],
    "knowsAbout": [
      "Software Engineering",
      "React",
      "Next.js",
      "TypeScript",
      "Java",
      "Kotlin",
      "Firebase",
      "Android Development"
    ]
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Mohan Reddy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mohan Reddy (alternate name Comrade Mohan) is a Full Stack Software Developer and student at Saveetha School of Engineering (SIMATS) in Chennai, India. He builds responsive web applications and secure offline-first mobile apps."
        }
      },
      {
        "@type": "Question",
        "name": "What are Mohan Reddy's main projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mohan's primary projects are SaveethaHub, a course prep web platform, and UniVault, a secure Android study companion app published on the Google Play Store."
        }
      },
      {
        "@type": "Question",
        "name": "What certifications does Mohan Reddy hold?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mohan is an Oracle Certified Professional: Java SE 17 Developer, an Oracle Cloud Infrastructure Certified Foundations Associate, and holds HackerRank Frontend React certificates."
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Mohan Reddy | Full Stack Developer & Software Engineer | Open to Work"
        description="Explore the professional portfolio and resume of Mohan Reddy. Specializing in React, TypeScript, Java, and Kotlin. Open to internships, full-time jobs, and projects."
        schema={[websiteSchema, personSchema, faqSchema]}
      />
      {loading && (
        <LoadingScreen
          onComplete={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("portfolio_has_loaded", "true");
            }
            setLoading(false);
          }}
        />
      )}
      <div className={loading ? "hidden" : ""}>
        {!loading && <Navbar />}
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

