import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  ExternalLink,
  Loader2,
  Check,
  Copy,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Calendar,
  Building2,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  previewUrl?: string;
  title: string;
  org: string;
  credentialId?: string;
  date?: string;
  category?: string;
  skills?: string[];
  verifyUrl?: string;
}

export default function PdfViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  previewUrl,
  title,
  org,
  credentialId,
  date,
  category,
  verifyUrl,
}: PdfViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens or target certificate changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setCopied(false);
    }
  }, [isOpen, pdfUrl, previewUrl, title]);

  const handleCopyId = () => {
    if (!credentialId) return;
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    trackEvent("copy", "credential_id", credentialId);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Mouse & Touch Dragging for Panning Zoomed Certificates
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const effectiveVerifyUrl = verifyUrl || (pdfUrl && pdfUrl.startsWith("http") ? pdfUrl : undefined);
  const effectiveDownloadUrl = pdfUrl || previewUrl;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`max-w-5xl w-[95vw] lg:w-[90vw] ${
          isFullscreen ? "h-[98vh] w-[98vw] max-w-[98vw]" : "h-auto max-h-[92vh] sm:max-h-[90vh]"
        } flex flex-col p-3 sm:p-5 md:p-6 bg-card/80 dark:bg-[#0c0e14]/80 backdrop-blur-xl border border-border/60 shadow-[0_0_40px_rgba(0,0,0,0.35)] rounded-2xl sm:rounded-3xl transition-all duration-200 overflow-hidden my-auto`}
      >
        {/* ========================================================================= */}
        {/* MODAL HEADER: Clean Title, Issuer, Credential ID & Action Buttons        */}
        {/* ========================================================================= */}
        <DialogHeader className="pb-2.5 sm:pb-3 border-b border-border/40 shrink-0 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pr-8 sm:pr-10">
            
            {/* Title & Metadata row */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                {category && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 font-grotesk">
                    {category}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground font-outfit">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  {org}
                </span>
              </div>

              <DialogTitle className="text-base sm:text-lg md:text-xl font-extrabold font-outfit text-foreground leading-snug tracking-tight truncate pr-1">
                {title}
              </DialogTitle>

              {/* Date & Credential ID with 1-Click Copy */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-grotesk text-muted-foreground">
                {date && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground/80">
                    <Calendar className="w-3 h-3" />
                    Issued: {date}
                  </span>
                )}

                {credentialId && (
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary/50 hover:bg-secondary border border-border/50 text-[11px] font-mono text-foreground transition-all cursor-pointer group"
                    title="Click to copy Credential ID"
                  >
                    <span>ID: <strong className="text-primary">{credentialId}</strong></span>
                    {copied ? (
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Header Primary Action Buttons (Themed for Light & Dark Mode) */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0 pt-0.5 md:pt-0">
              {effectiveVerifyUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 px-3 gap-1.5 text-xs font-semibold font-outfit border-border/70 bg-secondary/40 hover:bg-secondary/70 text-foreground shadow-xs transition-colors"
                >
                  <a
                    href={effectiveVerifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("verify", "certificate_modal", title)}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                    <span className="hidden sm:inline">Verify Online</span>
                    <span className="sm:hidden">Verify</span>
                  </a>
                </Button>
              )}

              {effectiveDownloadUrl && (
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="h-8 sm:h-9 px-3.5 gap-1.5 text-xs font-semibold font-outfit shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <a
                    href={effectiveDownloadUrl}
                    download
                    onClick={() => trackEvent("download", "certificate_modal", title)}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download Certificate</span>
                    <span className="sm:hidden">Download</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* ========================================================================= */}
        {/* INTERACTIVE INSPECTION TOOLBAR (Zoom, Rotate, Fullscreen Controls)        */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between px-2 py-1 sm:px-3 bg-secondary/20 border border-border/30 text-xs font-grotesk text-muted-foreground shrink-0 rounded-xl my-1.5">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[11px] font-medium hidden sm:inline text-muted-foreground/80">
              Zoom:
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-secondary text-foreground hover:text-primary transition-all cursor-pointer"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-secondary text-foreground hover:text-primary transition-all cursor-pointer"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 rounded-lg hover:bg-secondary text-[11px] font-mono text-foreground transition-all cursor-pointer"
              title="Reset Zoom (100%)"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 rounded-lg hover:bg-secondary text-foreground hover:text-primary transition-all cursor-pointer"
              title="Rotate 90°"
              aria-label="Rotate Certificate"
            >
              <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg hover:bg-secondary text-foreground hover:text-primary transition-all cursor-pointer hidden sm:flex items-center gap-1"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN CERTIFICATE PREVIEW VIEWPORT (AUTO-FITTING WRAPPER)                  */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[74vh] flex items-center justify-center rounded-xl overflow-hidden border border-border/30 bg-secondary/5 dark:bg-black/10 select-none ${
            zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
          }`}
        >
          {/* Loading Skeleton Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 space-y-3 bg-background/80 dark:bg-[#0c0e14]/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
              <p className="text-xs font-semibold font-outfit text-foreground">Loading Certificate Preview...</p>
            </div>
          )}

          {/* Certificate Media Element */}
          {isOpen && (
            previewUrl ? (
              <div className="w-full flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={previewUrl}
                  alt={title}
                  draggable={false}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                    transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
                  }}
                  className={`w-auto h-auto max-w-full max-h-[58vh] sm:max-h-[68vh] md:max-h-[72vh] object-contain rounded-lg shadow-lg border border-border/60 transition-opacity duration-300 ${
                    isLoading ? "opacity-0 scale-95" : "opacity-100"
                  }`}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            ) : pdfUrl ? (
              <div className="w-full h-[55vh] sm:h-[65vh]">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={title}
                  className="w-full h-full border-none rounded-lg bg-white"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            ) : (
              <div className="p-6 text-center space-y-2">
                <Award className="w-10 h-10 text-primary mx-auto opacity-70" />
                <h4 className="text-base font-bold text-foreground font-outfit">{title}</h4>
                <p className="text-xs text-muted-foreground font-grotesk max-w-sm">
                  Online verified credential issued by <strong>{org}</strong>.
                </p>
                {effectiveVerifyUrl && (
                  <Button asChild size="sm" className="mt-2 font-outfit gap-2">
                    <a href={effectiveVerifyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify on Official Platform
                    </a>
                  </Button>
                )}
              </div>
            )
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
