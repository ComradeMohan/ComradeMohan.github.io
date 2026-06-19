import { useState } from "react";
import { Settings } from "lucide-react";
import ThemePanel from "./ThemePanel";

export default function SettingsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open settings"
          className="w-12 h-12 rounded-full bg-card/75 border border-white/8 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <Settings className="w-5 h-5 text-foreground/90" />
        </button>
      </div>
      <ThemePanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
