import { useRef, MouseEvent } from "react";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Smartphone,
  Terminal,
  Cpu,
} from "lucide-react";

// ============================================================================
// 1. BRAND SVG ICONS (Theme-aware, pixel-perfect, authentic brand SVGs)
// ============================================================================
export const TechIcon = ({
  name,
  className = "w-4 h-4",
}: {
  name: string;
  className?: string;
}) => {
  switch (name) {
    case "React":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="11" fill="currentColor" className="text-foreground" />
          <path
            fill="#FFFFFF"
            className="dark:fill-black"
            d="M14.6 16.5l-4.8-6.3v6.3H8.3V7.5h1.7l4.8 6.4V7.5h1.5v9z"
          />
        </svg>
      );

    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#06B6D4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );

    case "Vite":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="url(#vite-orbit-a)"
            d="m23.54 3.42-9.25 16.5a1.86 1.86 0 0 1-3.25.03L.47 3.42A1.86 1.86 0 0 1 2.08.7h19.84a1.86 1.86 0 0 1 1.62 2.72z"
          />
          <path fill="url(#vite-orbit-b)" d="M17.48.7 8.35 17.06a.93.93 0 0 1-1.62 0L2.17.7z" />
          <path fill="#FFD426" d="M12.63 7.82 10.2 13h3.6l-3.32 6.55 6.07-7.82h-3.6z" />
          <defs>
            <linearGradient id="vite-orbit-a" x1="1.45" y1="2.7" x2="21.8" y2="18.9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="vite-orbit-b" x1="3.2" y1="2.7" x2="16.5" y2="15.8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEA83" />
              <stop offset=".08" stopColor="#FFDD35" />
              <stop offset="1" stopColor="#FFA800" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "Framer Motion":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );

    case "Redux":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#764ABC">
          <path d="M15.72 13.06c.72.6 1.28 1.4 1.28 2.37 0 1.95-1.58 3.53-3.53 3.53-1.07 0-2.03-.49-2.67-1.25-.13.04-.26.06-.4.06-1.03 0-1.87-.84-1.87-1.87 0-.52.21-.99.55-1.33-.8-.9-1.29-2.07-1.29-3.36 0-2.85 2.32-5.17 5.17-5.17 2.05 0 3.82 1.2 4.65 2.92.51-.23 1.08-.36 1.68-.36 2.27 0 4.11 1.84 4.11 4.11 0 1.92-1.32 3.53-3.09 3.98-.36-.45-.63-.98-.79-1.54-.53-.16-1.03-.46-1.46-.86l.66-.23zm-5.75-2.22c0 .64.52 1.16 1.16 1.16.64 0 1.16-.52 1.16-1.16 0-.64-.52-1.16-1.16-1.16-.64 0-1.16.52-1.16 1.16z" />
        </svg>
      );

    case "HTML5 / CSS3":
    case "HTML5":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#E34F26" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8z" />
          <path fill="#EF652A" d="M12 22.1l7.1-2.3 1.6-18H12z" />
          <path fill="#ECECEC" d="M12 9.6H8.2l-.3-3.3h4.1V3H4.5l.8 9.9H12zm0 6.8l-.1.02-3.3-.9-.2-2.4H5.1l.4 4.7 6.5 1.8z" />
          <path fill="#FFFFFF" d="M12 9.6v3.3h3.6l-.3 3.5-3.3.9v3.3l6.5-1.8.8-9.2zM12 3v3.3h7.2l.3-3.3z" />
        </svg>
      );

    case "Java":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#ED8B00"
            d="M8.851 18.56s-.917.534.667.708c2.309.253 3.796.222 6.551-.253 0 0 .762.434 1.543.766-4.908 1.748-11.233-.075-8.761-1.221zm-1.077-2.618s-1.037.747.536.953c2.909.38 5.753.331 9.479-.443 0 0 .543.348 1.134.618-5.748 1.942-13.626.31-11.149-1.128zm10.743-4.004c.828.917-.468 2.062-.468 2.062s2.21-.954 1.34-2.528c-.897-1.62-3.037-2.023-3.037-2.023s1.337.662 2.165 2.489zm-4.708-8.176s3.149 2.502-1.944 6.32c-4.108 3.056-1.123 4.887 0 6.945-2.825-2.064-4.882-3.921-3.486-5.999 1.954-2.909 6.273-3.978 5.43-7.266zm-4.568 18.428c3.966.257 8.049-.125 11.218-1.503l.429.622c-7.391 3.253-15.827.604-11.647-.881zm13.784-5.385s.896-.649.972-1.171c.076-.522-.303-.84-.908-.522-.605.318-.832.648-.832.648s.53-.159.98.159c.454.318-.212.886-.212.886zM4.62 13.916s-2.083 1.174.568 1.48c4.276.492 8.948.337 14.183-.878 0 0-.909.529-1.969.878-6.479 1.761-15.63.456-12.782-1.48zM14.07 0s3.258 2.59-2.012 6.54c-4.251 3.163-1.162 5.058 0 7.189-2.923-2.137-5.053-4.06-3.608-6.21C10.474 4.509 14.943 3.4 14.07 0z"
          />
        </svg>
      );

    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#3178C6"
            d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.536 7.634c.83 0 1.54.187 2.13.56.59.373.978.89 1.164 1.55l-2.08.85c-.097-.367-.282-.647-.555-.84-.273-.193-.655-.29-1.145-.29-.63 0-1.135.197-1.515.59-.38.393-.57.94-.57 1.64v.05c0 .7.195 1.25.585 1.65.39.4 1.05.79 1.98 1.17 1.29.53 2.235 1.13 2.835 1.8.6.67.9 1.54.9 2.61v.05c0 1.44-.51 2.575-1.53 3.405-1.02.83-2.39 1.245-4.11 1.245-1.39 0-2.58-.32-3.57-.96-.99-.64-1.59-1.57-1.8-2.79l2.16-.62c.12.69.41 1.2.87 1.53.46.33 1.09.495 1.89.495.73 0 1.325-.19 1.785-.57.46-.38.69-.89.69-1.53v-.05c0-.68-.2-1.22-.6-1.62-.4-.4-1.07-.79-2.01-1.17-1.26-.52-2.18-1.12-2.76-1.8-.58-.68-.87-1.54-.87-2.58v-.05c0-1.37.5-2.465 1.5-3.285 1-.82 2.31-1.23 3.93-1.23zm-9.336.21h7.02v2.01h-2.34v10.98H7.655V9.854H5.325V7.844z"
          />
        </svg>
      );

    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#F7DF1E" d="M0 0h24v24H0z" />
          <path
            fill="#000000"
            d="M6.34 19.32c.67.4 1.47.64 2.27.64 1.59 0 2.62-.77 2.62-2.22v-7.8H9.36v7.75c0 .76-.45 1.15-1.1 1.15-.5 0-.96-.2-1.3-.48l-.62.96zm8.1-1.14c.78.48 1.79.79 2.76.79 1.63 0 2.58-.8 2.58-2.03 0-1.17-.72-1.74-2.08-2.33-1.65-.7-2.67-1.42-2.67-2.73 0-1.41 1.12-2.47 2.79-2.47 1.04 0 1.85.29 2.45.65l-.56 1.08c-.46-.28-1.13-.53-1.89-.53-1.01 0-1.64.6-1.64 1.34 0 .97.63 1.45 1.95 2.01 1.81.76 2.82 1.51 2.82 2.88 0 1.56-1.25 2.63-3.1 2.63-1.17 0-2.21-.36-2.87-.79l.45-1.11z"
          />
        </svg>
      );

    case "Kotlin":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <linearGradient id="kotlin-g" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7F52FF" />
              <stop offset="50%" stopColor="#C757BC" />
              <stop offset="100%" stopColor="#FF6B4A" />
            </linearGradient>
          </defs>
          <path fill="url(#kotlin-g)" d="M24 24H0V0h24L12 12Z" />
        </svg>
      );

    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#3776AB"
            d="M11.914 0C5.824 0 6.19 2.65 6.19 2.65l.006 2.744h5.81v.827H3.92S0 5.766 0 11.892c0 6.124 3.42 5.918 3.42 5.918h2.04v-2.868s-.11-3.42 3.366-3.42h5.77s3.256.052 3.256-3.15V3.15S18.39 0 11.914 0zm-3.21 1.884a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02z"
          />
          <path
            fill="#FFD43B"
            d="M12.086 24c6.09 0 5.724-2.65 5.724-2.65l-.006-2.744h-5.81v-.827h8.086s3.92.455 3.92-5.67c0-6.125-3.42-5.92-3.42-5.92h-2.04v2.87s.11 3.42-3.366 3.42h-5.77s-3.256-.053-3.256 3.15v5.228S5.61 24 12.086 24zm3.21-1.884a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z"
          />
        </svg>
      );

    case "C++":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#00599C">
          <path d="M22.394 6.702l-9.352-5.4a2.08 2.08 0 0 0-2.084 0l-9.352 5.4A2.08 2.08 0 0 0 .56 8.506v10.8a2.08 2.08 0 0 0 1.046 1.804l9.352 5.4a2.08 2.08 0 0 0 2.084 0l9.352-5.4a2.08 2.08 0 0 0 1.046-1.804v-10.8a2.08 2.08 0 0 0-1.046-1.804zm-10.394 13.7a8.402 8.402 0 1 1 5.94-14.343l-1.98 1.98a5.602 5.602 0 1 0 0 8.724l1.98 1.98a8.358 8.358 0 0 1-5.94 1.659zm9-5.902h-1.5v1.5h-1v-1.5H17v-1h1.5v-1.5h1v1.5H21v1zm-4.5 0h-1.5v1.5h-1v-1.5h-1.5v-1h1.5v-1.5h1v1.5h1.5v1z" />
        </svg>
      );

    case "SQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#00758F">
          <path d="M12 2C6.48 2 2 4.01 2 6.5s4.48 4.5 10 4.5 10-2.01 10-4.5S17.52 2 12 2zm0 6C7.58 8 4 6.66 4 6.5S7.58 5 12 5s8 1.34 8 1.5S16.42 8 12 8zm8 2.87c-.84.71-2.07 1.28-3.53 1.65l1.63 1.63c.69-.36 1.33-.8 1.9-1.28v-2zm-6 2.01c-.65.07-1.32.12-2 .12s-1.35-.05-2-.12v3.74c1.3.16 2.68.16 4 0v-3.74zm-8-2.01v2c.57.48 1.21.92 1.9 1.28l1.63-1.63C6.07 12.15 4.84 11.58 4 10.87zM20 15v-1.13c-.84.71-2.07 1.28-3.53 1.65l1.63 1.63c.69-.36 1.33-.8 1.9-1.28v-.87zm-16 0v.87c.57.48 1.21.92 1.9 1.28l1.63-1.63C6.07 16.15 4.84 15.58 4 14.87V15zm8 4.5c-4.42 0-8-1.34-8-1.5v2c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5v-2c0 .16-3.58 1.5-8 1.5z" />
        </svg>
      );

    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#5FA04E"
            d="M12 1.6l8.8 5.1v10.6L12 22.4 3.2 17.3V6.7L12 1.6zm0 2.3L5.2 8.4v7.2L12 19.6l6.8-4V8.4L12 3.9zm-1 3.5h2v4.2l3.4-3.4h2.4l-3.8 3.8 4 4.5h-2.5l-3.1-3.6-.4.4v3.2h-2V7.4z"
          />
        </svg>
      );

    case "Express":
    case "Express.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="#0F172A" />
          <text
            x="12"
            y="15.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="800"
          >
            ex
          </text>
        </svg>
      );

    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#3ECF8E"
            d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.245L.411 13.626a.396.396 0 0 0 .316.642H12v8.958a.396.396 0 0 0 .716.245l10.873-13.475a.396.396 0 0 0-.316-.642z"
          />
        </svg>
      );

    case "Firebase":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FFA000" d="M3.89 15.672L6.255.932a.777.777 0 0 1 1.453-.16l2.94 5.568z" />
          <path fill="#F57C00" d="M13.255 7.15l-2.023-3.873a.777.777 0 0 0-1.42.126L3.89 15.672z" />
          <path
            fill="#FFCA28"
            d="M20.11 15.672l-1.92-12.015a.778.778 0 0 0-1.397-.336L3.89 15.672l7.352 4.143a1.556 1.556 0 0 0 1.516 0z"
          />
        </svg>
      );

    case "RESTful APIs":
    case "REST APIs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#FF5722" strokeWidth="2">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4" />
        </svg>
      );

    case "GraphQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#E10098">
          <path d="M12 0l10.392 6v12L12 24 1.608 18V6L12 0zm0 2.309L3.608 7.155v9.69L12 21.691l8.392-4.846v-9.69L12 2.309zM12 5.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 2a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
        </svg>
      );

    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#4169E1"
            d="M12.016 0C5.38 0 0 5.38 0 12.016c0 6.637 5.38 12.017 12.016 12.017 6.637 0 12.017-5.38 12.017-12.017C24.033 5.38 18.653 0 12.016 0zm3.87 17.51c-.6.44-1.38.65-2.28.65-.63 0-1.24-.1-1.81-.31-.57-.2-1.06-.51-1.47-.9-.41-.4-.73-.89-.94-1.46-.22-.57-.3-1.22-.24-1.93.06-.71.26-1.37.6-1.95.34-.58.8-1.04 1.37-1.38.57-.33 1.25-.5 2.01-.5.67 0 1.29.13 1.83.38.54.25.99.6 1.34 1.05l-1.38 1.13c-.23-.3-.51-.53-.84-.69-.33-.16-.71-.24-1.12-.24-.51 0-.96.12-1.34.36-.38.24-.68.57-.89 1-.21.42-.32.92-.32 1.48 0 .54.1 1.02.3 1.43.2.4.49.72.86.95.37.23.82.35 1.35.35.45 0 .86-.09 1.23-.26.37-.17.68-.42.94-.74l1.39 1.04zM8.5 7.5h7v1.8h-4.9v2.1h4.4v1.8h-4.4v3.3H8.5V7.5z"
          />
        </svg>
      );

    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#47A248"
            d="M12 0C11.666 0 11.233.242 11.083.56c-1.399 2.97-6.242 10.36-4.526 16.035 1.235 4.084 4.542 6.557 5.253 7.086.113.084.25.127.387.127.135 0 .27-.043.383-.125.713-.53 4.02-3.004 5.256-7.09 1.714-5.674-3.13-13.064-4.53-16.034C12.756.242 12.332 0 12 0zm.014 3.096c1.614 2.87 4.793 9.07 3.528 13.256-.88 2.915-3.076 4.966-3.528 5.37V3.096z"
          />
        </svg>
      );

    case "Redis":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#DC382D">
          <path d="M22.188 7.391L13.167 2.18c-.722-.417-1.612-.417-2.334 0L1.812 7.391C1.09 7.808.645 8.578.645 9.412v8.176c0 .834.445 1.604 1.167 2.021l9.021 5.211c.361.208.765.313 1.167.313s.806-.104 1.167-.313l9.021-5.211c.722-.417 1.167-1.187 1.167-2.021V9.412c0-.834-.445-1.604-1.167-2.021zM12 4.092l7.464 4.309-3.238 1.87-7.464-4.309L12 4.092zM3.238 9.771L9.75 13.53v7.452l-6.512-3.76V9.771zm17.524 7.452l-6.512 3.76V13.53l6.512-3.759v7.452z" />
        </svg>
      );

    case "Room DB":
    case "Room DB (SQLite)":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#00838F">
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 5.82c-.84.5-2.67 1.18-6 1.18s-5.16-.68-6-1.18V8.71C7.38 9.5 9.53 10 12 10s4.62-.5 6-1.29v2.11zm0 5c-.84.5-2.67 1.18-6 1.18s-5.16-.68-6-1.18v-2.11c1.38.79 3.53 1.29 6 1.29s4.62-.5 6-1.29v2.11z" />
        </svg>
      );

    case "MySQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#4479A1">
          <path d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm-.25 15.75c-3.45 0-6.25-2.8-6.25-6.25s2.8-6.25 6.25-6.25c1.6 0 3.05.6 4.15 1.6l-1.4 1.4c-.75-.7-1.7-1.1-2.75-1.1-2.3 0-4.15 1.85-4.15 4.15s1.85 4.15 4.15 4.15c2.1 0 3.8-1.5 4.1-3.5h-4.1v-2h6.2c.1.4.1.8.1 1.2 0 3.65-2.6 6.35-6.05 6.35z" />
        </svg>
      );

    case "AWS":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#FF9900"
            d="M12.63 15.39c-2.73 0-5.18-1.02-7.14-2.74-.23-.2-.24-.55-.03-.77.2-.22.55-.23.77-.04 1.78 1.55 4.02 2.47 6.4 2.47 3.2 0 6.07-1.44 8.04-3.79.19-.23.53-.26.76-.08.23.19.26.54.07.77-2.18 2.59-5.36 4.18-8.87 4.18z"
          />
          <path
            fill="#FF9900"
            d="M21.98 11.75c-.32.06-.6-.18-.63-.5-.03-.23.1-.46.32-.54l.8-.29c.14-.05.28.02.33.16l.29.8c.08.22-.04.47-.26.55-.22.08-.47-.04-.55-.26l-.15-.42-.15.5z"
          />
          <path
            fill="currentColor"
            d="M7.4 6.2h1.6l2.1 6.8H9.6L9.1 11H6.9l-.5 2H5l2.4-6.8zm1.4 3.6l-.7-2.4-.7 2.4h1.4zm5.5-3.6h1.5l1.3 4.9 1.3-4.9h1.5l-2 6.8h-1.6l-1.3-4.6-1.3 4.6H12.3l-2-6.8z"
          />
        </svg>
      );

    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#2496ED"
            d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.186-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185M23.76 9.89c-.614-.424-1.57-.488-2.38-.344-.127-.584-.46-1.127-.978-1.55-.91-.74-2.164-.913-3.26-.454-.108.045-.213.1-.31.162a.185.185 0 0 0-.077.165v2.986c0 .103.083.186.185.186h.022c.94-.038 1.88.225 2.628.75.894.628 1.408 1.63 1.408 2.748 0 3.73-3.32 6.76-7.416 6.76-2.617 0-4.993-1.246-6.353-3.238-.396-.58-.69-1.228-.865-1.916H.482a.185.185 0 0 0-.185.185C.28 19.34 2.87 22.04 6.78 22.04c4.685 0 8.498-3.46 8.528-7.75.002-.132.062-.256.166-.337 1.848-1.428 4.793-1.04 6.368.188.136.106.326.096.446-.026.47-.48.973-1.2 1.48-2.12.302-.55.513-1.122.617-1.685.023-.127-.05-.25-.17-.294l-.455-.126z" />
        </svg>
      );

    case "Oracle Cloud":
    case "Oracle Cloud (OCI)":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F80000">
          <path d="M16.5 6H7.5C3.36 6 0 9.36 0 13.5S3.36 21 7.5 21h9c4.14 0 7.5-3.36 7.5-7.5S20.64 6 16.5 6zm0 11.5H7.5c-2.21 0-4-1.79-4-4s1.79-4 4-4h9c2.21 0 4 1.79 4 4s-1.79 4-4 4z" />
        </svg>
      );

    case "Google Cloud":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#EA4335"
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"
          />
          <path fill="#4285F4" d="M12 11h3.5v2.5H12z" />
        </svg>
      );

    case "Git":
    case "Git & GitHub":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F05032">
          <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.808 2.585l3.52 3.52a2.028 2.028 0 0 1 1.644 1.637 2.035 2.035 0 0 1-1.045 2.19l3.504 3.504a2.03 2.03 0 0 1 2.18-.948 2.034 2.034 0 0 1 1.435 2.658 2.033 2.033 0 0 1-2.657 1.435 2.033 2.033 0 0 1-.948-2.18l-3.354-3.354v4.542a2.037 2.037 0 0 1 1.135 1.83 2.035 2.035 0 1 1-4.07 0 2.035 2.035 0 0 1 1.517-1.97V9.757a2.035 2.035 0 0 1-1.517-1.97 2.035 2.035 0 0 1 .597-1.427L5.27 2.859.454 7.676a1.5 1.5 0 0 0 0 2.126l10.48 10.48a1.5 1.5 0 0 0 2.124 0l10.488-10.48a1.5 1.5 0 0 0 0-2.126z" />
        </svg>
      );

    case "Linux":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FCC624">
          <path d="M12.003 0c-3.19 0-5.776 2.586-5.776 5.776 0 1.258.404 2.423 1.09 3.367C6.01 10.457 5.12 12.33 5.12 14.4c0 3.738 2.878 6.784 6.51 7.155-.09.34-.145.698-.145 1.066 0 .762.618 1.379 1.38 1.379h.27c.762 0 1.38-.617 1.38-1.379 0-.368-.055-.726-.145-1.066 3.632-.371 6.51-3.417 6.51-7.155 0-2.07-.89-3.943-2.197-5.257.686-.944 1.09-2.109 1.09-3.367C19.923 2.586 17.337 0 14.147 0h-2.144z" />
        </svg>
      );

    case "Vercel":
    case "Vercel & Netlify":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      );

    case "Postman":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF6C37">
          <path d="M13.5 0C6.044 0 0 6.044 0 13.5S6.044 27 13.5 27 27 20.956 27 13.5 20.956 0 13.5 0zm6.75 14.85h-4.05v4.05h-2.7v-4.05H9.45v-2.7h4.05V8.1h2.7v4.05h4.05v2.7z" />
        </svg>
      );

    case "Android":
    case "Android SDK":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#3DDC84">
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.997-3.458a.416.416 0 0 0-.152-.567.416.416 0 0 0-.568.152l-2.022 3.502a11.977 11.977 0 0 0-5.137-1.13c-1.854 0-3.606.403-5.137 1.13L4.837 5.448a.416.416 0 0 0-.568-.152.416.416 0 0 0-.152.567l1.997 3.458C2.688 11.187.343 14.659 0 18.761h24c-.344-4.102-2.689-7.574-6.118-9.44" />
        </svg>
      );

    case "Jetpack MVVM":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#4285F4">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4285F4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "OpenCV":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="7.5" r="4.2" fill="none" stroke="#EA4335" strokeWidth="2.5" />
          <circle cx="7.2" cy="15.8" r="4.2" fill="none" stroke="#34A853" strokeWidth="2.5" />
          <circle cx="16.8" cy="15.8" r="4.2" fill="none" stroke="#4285F4" strokeWidth="2.5" />
        </svg>
      );

    case "TensorFlow":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FF6F00" d="M12.001 0l9.526 5.5v11l-4.763 2.75v-5.5l-4.763 2.75V0z" />
          <path fill="#FFA800" d="M12.001 0v16.5l-4.763-2.75v5.5L2.475 16.5v-11L12.001 0z" />
        </svg>
      );

    case "Scikit-Learn":
    case "Scikit-Learn / ML":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="9" fill="none" stroke="#F89939" strokeWidth="3" />
          <path d="M8 12a4 4 0 0 1 8 0" stroke="#3499CD" strokeWidth="3" fill="none" />
        </svg>
      );

    default:
      return <Cpu className={`${className} text-primary`} />;
  }
};

// ============================================================================
// 2. STRUCTURED TECHNICAL STACK DATA
// ============================================================================
export interface TechItem {
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: typeof Code2;
  items: TechItem[];
}

export const skillCategoriesData: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core software engineering & type-safe development",
    badge: "Java OCP 17 Certified",
    icon: Terminal,
    items: [
      { name: "Java" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Kotlin" },
      { name: "Python" },
      { name: "C++" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Modern, responsive, and performant web interfaces",
    badge: "SaveethaHub Stack",
    icon: Layout,
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Framer Motion" },
      { name: "Redux" },
      { name: "HTML5 / CSS3" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Scalable APIs",
    subtitle: "Server architecture, microservices, and secure auth",
    badge: "REST & Realtime",
    icon: Server,
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "RESTful APIs" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    subtitle: "Relational modeling, offline-first storage & caching",
    badge: "SQL & SQLite FTS4",
    icon: Database,
    items: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Room DB" },
      { name: "MySQL" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    subtitle: "Containerization, cloud infrastructure & CI/CD automation",
    badge: "OCI Certified & CI/CD",
    icon: Cloud,
    items: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Oracle Cloud" },
      { name: "Git & GitHub" },
      { name: "Linux" },
      { name: "Vercel" },
      { name: "Postman" },
    ],
  },
  {
    id: "mobileAi",
    title: "Mobile & Intelligent Systems",
    subtitle: "Native Android apps, computer vision & intelligent tools",
    badge: "Google Play Store",
    icon: Smartphone,
    items: [
      { name: "Android SDK" },
      { name: "Jetpack MVVM" },
      { name: "OpenCV" },
      { name: "TensorFlow" },
      { name: "Scikit-Learn" },
    ],
  },
];

// Marquee items
const marqueeTechs = [
  "Java",
  "React",
  "TypeScript",
  "Next.js",
  "Kotlin",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "AWS",
  "Android",
  "Vite",
  "Supabase",
  "MongoDB",
  "Redis",
  "Firebase",
  "Oracle Cloud",
  "Python",
  "OpenCV",
  "Git",
  "Framer Motion",
  "Linux",
  "GraphQL",
];

// ============================================================================
// 3. INTERACTIVE BENTO CARD (Human-crafted, crisp borders, tactile pills)
// ============================================================================
const BentoCard = ({ category }: { category: SkillCategory }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = category.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative h-full flex flex-col justify-between rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0c1017]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#FF5722]/40 hover:shadow-lg dark:hover:shadow-black/40 group/card overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow tracking mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.08), transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Card Top: Icon, Titles & Credential Badge */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/20 text-[#FF5722] shrink-0 transition-transform duration-200 group-hover/card:scale-105">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-base sm:text-lg text-foreground dark:text-white tracking-tight leading-snug">
                  {category.title}
                </h3>
                <p className="font-grotesk text-xs text-muted-foreground dark:text-slate-400 mt-0.5 line-clamp-1">
                  {category.subtitle}
                </p>
              </div>
            </div>

            {category.badge && (
              <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 shrink-0 hidden sm:inline-block">
                {category.badge}
              </span>
            )}
          </div>

          {/* Flowing, Neat Tech Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {category.items.map((item) => (
              <div
                key={item.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/70 dark:border-white/10 bg-secondary/40 dark:bg-white/[0.03] hover:bg-card dark:hover:bg-white/[0.08] hover:border-[#FF5722]/40 transition-all duration-150 cursor-default shadow-2xs"
              >
                <TechIcon name={item.name} className="w-4 h-4 shrink-0" />
                <span className="font-outfit font-medium text-xs sm:text-[13px] text-foreground dark:text-slate-200 whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN SKILLS SECTION COMPONENT
// ============================================================================
export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative scroll-mt-12 sm:scroll-mt-14 pt-2 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-background/50 border-t border-border/60 dark:border-white/5"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#FF5722]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================================= */}
        {/* SECTION HEADER: Clean, Editorial Title                                    */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto pt-2 sm:pt-4 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 dark:border-white/10 bg-secondary/40 dark:bg-white/[0.03] text-[11px] font-mono tracking-wider text-muted-foreground uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
            Technical Arsenal
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-outfit tracking-tight text-foreground dark:text-white leading-tight">
            Skills &{" "}
            <span className="bg-gradient-to-r from-[#FF5722] via-[#FF6B4A] to-[#f43f5e] bg-clip-text text-transparent">
              Tech
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 font-grotesk mt-1.5 max-w-xl mx-auto">
            Tools, languages, and frameworks used to architect high-throughput applications and scalable systems.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BENTO GRID: 6 Categories of Skills                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {skillCategoriesData.map((category) => (
            <BentoCard key={category.id} category={category} />
          ))}
        </div>

        {/* ========================================================================= */}
        {/* INFINITE TECH MARQUEE: Continuous Band of Brand Logos                     */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden py-3 sm:py-3.5 border-y border-border/70 dark:border-white/10 bg-card/40 dark:bg-white/[0.015] rounded-xl group/marquee">
          {/* Edge Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee group-hover/marquee:[animation-play-state:paused] flex gap-3 sm:gap-4 whitespace-nowrap">
            {[...marqueeTechs, ...marqueeTechs].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono text-muted-foreground hover:text-foreground dark:hover:text-white transition-all duration-200 px-3.5 py-1.5 rounded-lg border border-border/60 dark:border-white/10 bg-background/80 dark:bg-[#0c1017] hover:border-[#FF5722]/40 cursor-default shrink-0 group/tech"
              >
                <TechIcon
                  name={tech}
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/tech:scale-110"
                />
                <span className="font-outfit font-medium">{tech}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
