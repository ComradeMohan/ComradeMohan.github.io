import React from "react";

const themes = [
  { id: "dark", label: "Dark", color: "bg-[#0b1020]" },
  { id: "midnight", label: "Midnight", color: "bg-[#071025]" },
  { id: "violet", label: "Violet", color: "bg-[#1b052f]" },
  { id: "light", label: "Light", color: "bg-white" },
];

const ThemeSwitcher = ({ current, onChange }: { current: string; onChange: (t: string) => void }) => {
  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          title={t.label}
          className={`h-8 w-8 rounded-full ring-1 ring-white/6 transition-transform ${t.color} ${current === t.id ? "scale-110 ring-4 ring-primary/40" : "hover:scale-105"}`}
          aria-pressed={current === t.id}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
