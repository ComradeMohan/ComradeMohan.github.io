import { useState, useEffect } from "react";
import { executeCircleThemeTransition } from "@/lib/themeTransition";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light") return false;
      return !document.documentElement.classList.contains("light");
    }
    return true;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      if (saved === "light") {
        setIsDark(false);
      } else {
        setIsDark(true);
      }
    };

    handleThemeChange();
    window.addEventListener("storage", handleThemeChange);
    window.addEventListener("local-storage", handleThemeChange);
    return () => {
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener("local-storage", handleThemeChange);
    };
  }, []);

  const toggleTheme = (e?: React.MouseEvent | MouseEvent | { clientX: number; clientY: number }) => {
    const nextIsDark = !isDark;
    const targetTheme = nextIsDark ? "dark" : "light";

    executeCircleThemeTransition(
      e,
      () => {
        setIsDark(nextIsDark);
        localStorage.setItem("theme", targetTheme);
        const metaThemeColor = document.querySelector("meta[name='theme-color']");
        if (nextIsDark) {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
          metaThemeColor?.setAttribute("content", "hsl(289, 65%, 10%)");
        } else {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
          metaThemeColor?.setAttribute("content", "hsla(12, 65%, 88%, 1.00)");
        }
        window.dispatchEvent(new Event("local-storage"));
      },
      targetTheme
    );
  };

  return { isDark, toggleTheme };
}
