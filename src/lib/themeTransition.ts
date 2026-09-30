/**
 * Ultra-Smooth Circle Theme Transition Engine.
 *
 * Uses the native document.startViewTransition API with expanding circular clip-path
 * for a zero-freeze, GPU-accelerated circular reveal that expands directly from
 * the clicked button coordinates to cover the entire screen.
 *
 * Gracefully falls back to a GPU-accelerated circular clip-path overlay on browsers
 * without View Transitions support.
 */

const THEME_COLORS: Record<string, string> = {
  dark: "#0b1020",
  light: "#fafafa",
  midnight: "#071025",
  violet: "#1b052f",
};

let isTransitioning = false;

export const executeCircleThemeTransition = (
  event:
    | React.MouseEvent
    | MouseEvent
    | { clientX?: number; clientY?: number; currentTarget?: any; target?: any }
    | null
    | undefined,
  applyThemeChange: () => void,
  targetTheme?: string
) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    applyThemeChange();
    return;
  }

  // Prevent multiple rapid clicks from glitching the transition
  if (isTransitioning) {
    applyThemeChange();
    return;
  }

  // Safety unlock after 800ms
  setTimeout(() => {
    isTransitioning = false;
  }, 800);

  // 1. Calculate origin coordinates (x, y) relative to the viewport
  let x = Math.round(window.innerWidth - 60);
  let y = 40;

  if (event) {
    const target = (event as any).currentTarget || (event as any).target;
    if (target && typeof target.getBoundingClientRect === "function") {
      const rect = target.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    } else if (
      "clientX" in event &&
      typeof event.clientX === "number" &&
      (event.clientX > 0 || (event.clientY ?? 0) > 0)
    ) {
      x = Math.round(event.clientX);
      y = Math.round(event.clientY ?? 40);
    }
  } else {
    // If no event was provided (e.g. keyboard command), locate any visible theme toggle button
    const themeBtn = document.querySelector("button[aria-label*='theme' i]");
    if (themeBtn) {
      const rect = themeBtn.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    }
  }

  // 2. Calculate the maximum radius required to cover all 4 viewport corners from (x, y)
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // Check if View Transitions API is supported and user doesn't prefer reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsViewTransition =
    "startViewTransition" in document &&
    typeof (document as any).startViewTransition === "function" &&
    !prefersReducedMotion;

  if (supportsViewTransition) {
    isTransitioning = true;
    try {
      const transition = (document as any).startViewTransition(() => {
        applyThemeChange();
      });

      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 480,
              easing: "cubic-bezier(0.2, 0, 0, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );

          const onEnd = () => {
            isTransitioning = false;
          };
          animation.onfinish = onEnd;
          animation.oncancel = onEnd;
        })
        .catch(() => {
          isTransitioning = false;
        });

      transition.finished
        .then(() => {
          isTransitioning = false;
        })
        .catch(() => {
          isTransitioning = false;
        });

      return;
    } catch {
      isTransitioning = false;
      // If startViewTransition failed, proceed to fallback overlay
    }
  }

  // Fallback for browsers without View Transitions support
  if (prefersReducedMotion) {
    applyThemeChange();
    return;
  }

  isTransitioning = true;

  const isCurrentlyDark = !document.documentElement.classList.contains("light");
  const willBeDark = targetTheme ? targetTheme !== "light" : !isCurrentlyDark;
  const overlayColor = targetTheme
    ? THEME_COLORS[targetTheme] || (willBeDark ? "#0b1020" : "#fafafa")
    : willBeDark ? "#0b1020" : "#fafafa";

  const overlay = document.createElement("div");
  overlay.className = "circle-theme-wipe-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${overlayColor};
    pointer-events: none;
    z-index: 999999;
    will-change: clip-path, opacity;
    clip-path: circle(0px at ${x}px ${y}px);
    transition: clip-path 450ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms ease 400ms;
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
  });

  const switchTimer = setTimeout(() => {
    applyThemeChange();
    overlay.style.opacity = "0";
  }, 400);

  const cleanupTimer = setTimeout(() => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    isTransitioning = false;
  }, 580);

  return () => {
    clearTimeout(switchTimer);
    clearTimeout(cleanupTimer);
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    isTransitioning = false;
  };
};
