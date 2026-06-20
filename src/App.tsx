import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";

const SaveethaHubCaseStudy = lazy(() => import("./pages/SaveethaHubCaseStudy"));
const UniVaultCaseStudy = lazy(() => import("./pages/UniVaultCaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/saveethahub" element={<SaveethaHubCaseStudy />} />
            <Route path="/case-study/saveethahub" element={<SaveethaHubCaseStudy />} />
            <Route path="/univault" element={<UniVaultCaseStudy />} />
            <Route path="/case-study/univault" element={<UniVaultCaseStudy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
