import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import SaveethaHubCaseStudy from "./pages/SaveethaHubCaseStudy";
import UniVaultCaseStudy from "./pages/UniVaultCaseStudy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track SPA page view on route transition
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-MZYV7RYP9N", {
        page_path: pathname,
        page_title: document.title
      });
    }
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/saveethahub" element={<SaveethaHubCaseStudy />} />
          <Route path="/case-study/saveethahub" element={<SaveethaHubCaseStudy />} />
          <Route path="/univault" element={<UniVaultCaseStudy />} />
          <Route path="/case-study/univault" element={<UniVaultCaseStudy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
