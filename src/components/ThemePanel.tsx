import { useEffect } from "react";

type Theme = "dark" | "light" | "midnight" | "violet";

const themes: Theme[] = ["dark", "midnight", "violet", "light"];

export default function ThemePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const apply = (t: Theme) => {
    localStorage.setItem("theme", t);
    document.documentElement.classList.remove("light", "midnight", "violet");
    if (t !== "dark") document.documentElement.classList.add(t);
    const meta = document.querySelector("meta[name='theme-color']");
    const map: Record<Theme, string> = {
      dark: "hsl(289, 65%, 10%)",
      light: "hsl(12, 65%, 88%)",
      midnight: "hsl(205, 90%, 12%)",
      violet: "hsl(286, 80%, 12%)",
    };
    meta?.setAttribute("content", map[t]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-end lg:items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-card/90 border border-white/8 p-4 shadow-2xl">
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <p className="text-sm text-muted-foreground mb-4">Choose a theme for the site</p>
        <div className="flex gap-3 flex-wrap">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => apply(t)}
              className="px-3 py-2 rounded-lg border border-white/8 bg-white/3 text-sm hover:scale-105 transition-transform"
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-primary">Close</button>
        </div>
      </div>
    </div>
  );
}
