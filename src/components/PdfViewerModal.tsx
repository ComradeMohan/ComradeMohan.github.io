import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  previewUrl?: string;
  title: string;
  org: string;
  credentialId?: string;
  date?: string;
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
}: PdfViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when the modal opens or URL changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, pdfUrl, previewUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-[85vh] flex flex-col p-4 md:p-6 bg-background/95 backdrop-blur-md border-border/80 shadow-2xl">
        <DialogHeader className="pb-4 border-b border-border/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-8 md:pr-10">
            <div className="space-y-1 text-left">
              <DialogTitle className="text-xl md:text-2xl font-bold font-outfit text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                {title}
              </DialogTitle>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 px-3 gap-1.5 text-xs font-medium border-border/80 hover:bg-accent/50 hover:text-accent-foreground"
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in New Tab
                </a>
              </Button>
              <Button
                asChild
                variant="default"
                size="sm"
                className="h-9 px-3 gap-1.5 text-xs font-medium shadow-sm hover:opacity-95"
              >
                <a href={pdfUrl} download>
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content Container */}
        <div className="relative flex-1 w-full mt-4 bg-muted/20 rounded-lg overflow-hidden border border-border/40 min-h-[300px] flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 space-y-4 bg-background/85 backdrop-blur-sm">
              <div className="relative flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <FileText className="absolute w-4 h-4 text-primary" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">Loading Certificate Preview...</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Optimized for fast preview. If on a slow network, this may take a few seconds.
                </p>
              </div>
              
              {/* Skeleton UI */}
              <div className="w-full max-w-md space-y-3 mt-4 opacity-50">
                <Skeleton className="h-4 w-3/4 mx-auto rounded" />
                <Skeleton className="h-3 w-1/2 mx-auto rounded" />
                <div className="space-y-2 pt-4">
                  <Skeleton className="h-2 w-full rounded" />
                  <Skeleton className="h-2 w-full rounded" />
                  <Skeleton className="h-2 w-5/6 rounded" />
                </div>
              </div>
            </div>
          )}

          {isOpen && (
            previewUrl ? (
              <div className="w-full h-full overflow-auto flex items-center justify-center p-2 md:p-4">
                <img
                  src={previewUrl}
                  alt={title}
                  className={`max-w-full max-h-[70vh] object-contain rounded-md shadow-lg border border-border/50 transition-all duration-300 ${
                    isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            ) : (
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                title={title}
                className="w-full h-full border-none rounded-lg"
                onLoad={() => setIsLoading(false)}
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
