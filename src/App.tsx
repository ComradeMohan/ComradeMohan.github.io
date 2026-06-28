import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import SaveethaHubCaseStudy from "./pages/SaveethaHubCaseStudy";
import UniVaultCaseStudy from "./pages/UniVaultCaseStudy";
import NotFound from "./pages/NotFound";
import CommandMenu from "./components/CommandMenu";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP" && !hash) {
      // Small timeout allows framer-motion's IntersectionObserver (whileInView) to register the correct viewport after route transition
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-MZYV7RYP9N", {
        page_path: pathname,
        page_title: document.title
      });
    }
  }, [pathname, hash, navType]);

  return null;
};

// Wrapper for page transition animations
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full min-h-screen flex flex-col relative z-0"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
      <Route path="/saveethahub" element={<PageWrapper><SaveethaHubCaseStudy /></PageWrapper>} />
      <Route path="/case-study/saveethahub" element={<PageWrapper><SaveethaHubCaseStudy /></PageWrapper>} />
      <Route path="/case study/saveethahub" element={<PageWrapper><SaveethaHubCaseStudy /></PageWrapper>} />
      <Route path="/univault" element={<PageWrapper><UniVaultCaseStudy /></PageWrapper>} />
      <Route path="/case-study/univault" element={<PageWrapper><UniVaultCaseStudy /></PageWrapper>} />
      <Route path="/case study/univault" element={<PageWrapper><UniVaultCaseStudy /></PageWrapper>} />
      <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        }>
          <CommandMenu />
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
