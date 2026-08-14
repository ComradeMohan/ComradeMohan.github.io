import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Award,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Calendar,
  Building,
  Download,
  BadgeCheck,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface OracleCertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPdf?: () => void;
}

export const OracleCertModal = ({
  isOpen,
  onClose,
  onViewPdf,
}: OracleCertModalProps) => {
  const [copied, setCopied] = useState(false);

  const credentialId = "102029574OCPJSE17";
  const pdfPath = "/certifications/Oracle Certified Professional_ Java SE 17 Developer.pdf";
  const previewPath = "/certifications/Oracle Certified Professional_ Java SE 17 Developer.webp";

  const handleCopyId = () => {
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    trackEvent("certification", "copy_credential_id", "Oracle Java SE 17");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden bg-card/95 border-amber-500/30 backdrop-blur-xl shadow-2xl shadow-amber-500/10 rounded-2xl z-50">
        <DialogHeader className="sr-only">
          <DialogTitle>Oracle Certified Professional: Java SE 17 Developer</DialogTitle>
          <DialogDescription>Verified credentials for Oracle Certified Professional Java SE 17 Developer</DialogDescription>
        </DialogHeader>

        {/* Top Gold Gradient Glow Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Badge Block */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-orange-500/20 border border-amber-500/40 text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
              <Award className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-1">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>AUTHENTICATED DIGITAL CREDENTIAL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-foreground tracking-tight">
                Oracle Certified Professional
              </h3>
              <p className="text-amber-400 font-semibold font-grotesk text-base sm:text-lg">
                Java SE 17 Developer
              </p>
            </div>
          </div>

          {/* Certificate Image Preview Banner */}
          <div className="relative rounded-xl overflow-hidden border border-amber-500/20 group">
            <img
              src={previewPath}
              alt="Oracle Certified Professional Java SE 17 Developer Certificate"
              className="w-full h-44 sm:h-52 object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent flex items-end p-4 justify-between">
              <span className="text-xs font-mono text-muted-foreground bg-card/90 px-3 py-1 rounded-md border border-border/60">
                Official Seal • Oracle University
              </span>
              {onViewPdf && (
                <Button
                  onClick={onViewPdf}
                  size="sm"
                  variant="secondary"
                  className="gap-1.5 text-xs font-outfit bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View PDF Certificate
                </Button>
              )}
            </div>
          </div>

          {/* Credential Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-secondary/40 border border-border/60">
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Recipient Name
              </span>
              <p className="text-sm font-bold text-foreground font-outfit">
                Mohan Reddy (Comrade Mohan)
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Issuing Authority
              </span>
              <p className="text-sm font-bold text-foreground font-outfit flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                Oracle University
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Credential ID
              </span>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {credentialId}
                </code>
                <button
                  onClick={handleCopyId}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy Credential ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Issue Date
              </span>
              <p className="text-sm font-bold text-foreground font-outfit flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                July 14, 2025
              </p>
            </div>
          </div>

          {/* Verified Skills */}
          <div>
            <span className="text-xs font-bold text-foreground font-outfit uppercase tracking-wider block mb-2">
              Verified Technical Competencies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Core Java SE 17",
                "Object-Oriented Design",
                "Collections Framework",
                "Multithreading & Concurrency",
                "Exception Handling",
                "Java Modules & Lambdas",
                "Streams API",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border/60">
            <Button
              onClick={handleCopyId}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto gap-2 text-xs border-amber-500/30 hover:bg-amber-500/10 text-amber-400"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Credential ID Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Credential ID</span>
                </>
              )}
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                asChild
                size="sm"
                className="w-full sm:w-auto gap-2 text-xs font-outfit bg-amber-500 text-black hover:bg-amber-400 font-bold"
              >
                <a href={pdfPath} download target="_blank" rel="noopener noreferrer">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Certificate</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OracleCertModal;
