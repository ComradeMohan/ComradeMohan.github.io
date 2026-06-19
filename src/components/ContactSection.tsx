import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Send, Github, Linkedin, FileText, ArrowRight, ShieldCheck, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security: Client-side rate limiting (60s cooldown to prevent API spamming)
    const lastSub = localStorage.getItem("form_last_submission");
    if (lastSub) {
      const elapsed = Date.now() - parseInt(lastSub, 10);
      const cooldown = 60000;
      if (elapsed < cooldown) {
        const remaining = Math.ceil((cooldown - elapsed) / 1000);
        toast({
          title: "Please wait",
          description: `You are sending messages too quickly. Please wait ${remaining} seconds.`,
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("fi-sender-fullName", form.name);
      formData.append("fi-sender-email", form.email);
      formData.append("fi-text-subject", form.subject);
      formData.append("fi-text-message", form.message);

      // Capture UTM tracking URL queries if present (matching Forminit SDK)
      const searchParams = new URLSearchParams(window.location.search);
      const trackingParams = {
        utm_source: "utmSource",
        utm_medium: "utmMedium",
        utm_campaign: "utmCampaign",
        utm_term: "utmTerm",
        utm_content: "utmContent",
        gclid: "gclid",
        wbraid: "wbraid",
        gbraid: "gbraid",
        fbclid: "fbclid",
        msclkid: "msclkid",
        ttclid: "ttclid",
        twclid: "twclid",
        li_fat_id: "li_fat_id",
        amzclid: "amzclid",
        mc_cid: "mc_cid",
        mc_eid: "mc_eid"
      };

      Object.entries(trackingParams).forEach(([urlKey, formKey]) => {
        const val = searchParams.get(urlKey);
        if (val) {
          formData.append(`fi-tracking-${formKey}`, val);
        }
      });

      const response = await fetch("https://forminit.com/f/t6libcvtapx", {
        method: "POST",
        headers: {
          "FormInit-SDK-Version": "0.2.3",
          "Accept": "application/json"
        },
        body: formData
      });

      const resJson = await response.json();

      if (response.ok && resJson.success !== false) {
        // Persist rate limit timestamp on success
        localStorage.setItem("form_last_submission", Date.now().toString());

        // Track Contact Form Submission Event in GA4
        trackEvent("submit", "contact", "contact_form_success");

        toast({ 
          title: "Message sent!", 
          description: "Thank you for reaching out. I'll get back to you soon." 
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({ 
          title: "Submission failed", 
          description: resJson.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({ 
        title: "Connection failed", 
        description: "Could not reach the server. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 scroll-mt-20 bg-card/20 border-t border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Connect Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-card/45 shadow-sm w-full h-full flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-primary/30 text-primary uppercase tracking-wider font-outfit w-fit">
                🚀 Let's Connect
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-outfit leading-tight">
                Have an opportunity?<br />
                Let's <span className="text-primary">build something amazing</span> together.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-grotesk leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, and innovative ideas.
              </p>
            </div>

            {/* Quick Contact Panels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Email Me */}
              <a 
                href="mailto:madhiremohanreddy@gmail.com"
                className="p-3.5 rounded-xl border border-border bg-secondary/30 dark:bg-black/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex items-center justify-between group"
                onClick={() => trackEvent("click", "social", "email_contact")}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-foreground font-outfit block">Email Me</span>
                    <span className="text-[10px] text-muted-foreground font-grotesk block truncate" title="madhiremohanreddy@gmail.com">
                      madhiremohanreddy@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/mmohanreddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-border bg-secondary/30 dark:bg-black/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex items-center justify-between group"
                onClick={() => trackEvent("click", "social", "linkedin_contact")}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-[#0077b5]/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-4.5 h-4.5 text-[#0077b5]" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-foreground font-outfit block">LinkedIn</span>
                    <span className="text-[10px] text-muted-foreground font-grotesk block truncate" title="linkedin.com/in/mmohanreddy">
                      in/mmohanreddy
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/ComradeMohan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-border bg-secondary/30 dark:bg-black/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex items-center justify-between group"
                onClick={() => trackEvent("click", "social", "github_contact")}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0">
                    <Github className="w-4.5 h-4.5 text-foreground" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-foreground font-outfit block">GitHub</span>
                    <span className="text-[10px] text-muted-foreground font-grotesk block truncate">
                      ComradeMohan
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* Download Resume */}
              <a 
                href="/mohan_resume_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-border bg-secondary/30 dark:bg-black/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex items-center justify-between group"
                onClick={() => trackEvent("download", "resume", "resume_contact")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground font-outfit block">Download Resume</span>
                    <span className="text-[10px] text-muted-foreground font-grotesk">View my latest resume</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Available for Opportunities Bar */}
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-emerald-500 font-outfit uppercase tracking-wider">Available for Opportunities</span>
              </div>
              <p className="text-xs text-muted-foreground font-grotesk leading-snug">
                Actively looking for Full Stack Developer & Software Engineer roles.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["Full Time", "Internships", "Remote", "On-site"].map(tag => (
                  <span key={tag} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-grotesk">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-card/45 shadow-sm w-full h-full flex flex-col justify-between"
          >
            <div className="space-y-1.5 text-left mb-4">
              <h3 className="text-lg font-bold text-foreground font-outfit flex items-center gap-2">
                ✉️ Send a Message
              </h3>
              <p className="text-xs text-muted-foreground font-grotesk">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="fi-sender-fullName"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-11 bg-background/50 border-border focus:border-primary text-xs"
                  />
                  <Input
                    type="email"
                    name="fi-sender-email"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="h-11 bg-background/50 border-border focus:border-primary text-xs"
                  />
                </div>
                <Input
                  name="fi-text-subject"
                  placeholder="Subject *"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="h-11 bg-background/50 border-border focus:border-primary text-xs"
                />
                <Textarea
                  name="fi-text-message"
                  placeholder="Your Message *"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="flex-1 min-h-[140px] bg-background/50 border-border focus:border-primary text-xs resize-none p-3"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border/40 mt-1">
                <div className="flex items-center gap-2 text-left text-[11px] text-muted-foreground font-grotesk">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="block font-semibold text-foreground/90 leading-tight">Your information is safe with me.</span>
                    <span className="leading-tight">I respect your privacy.</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-5 shadow-md transition-all duration-300 min-w-[145px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
