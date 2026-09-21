import { useState, useRef, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

// Official Technology Brand SVG Icons with dynamic theme awareness
const TechIcon = ({
  name,
  isDark,
  className = "w-6 h-6 xl:w-7 xl:h-7",
}: {
  name: string;
  isDark: boolean;
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
          <circle
            cx="12"
            cy="12"
            r="11.5"
            fill={isDark ? "#0A0E17" : "#0F172A"}
            stroke={isDark ? "rgba(255,255,255,0.2)" : "#334155"}
            strokeWidth="1"
          />
          <path
            fill="#FFFFFF"
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
    case "Java":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#ED8B00"
            d="M8.851 18.56s-.917.534.667.708c2.309.253 3.796.222 6.551-.253 0 0 .762.434 1.543.766-4.908 1.748-11.233-.075-8.761-1.221zm-1.077-2.618s-1.037.747.536.953c2.909.38 5.753.331 9.479-.443 0 0 .543.348 1.134.618-5.748 1.942-13.626.31-11.149-1.128zm10.743-4.004c.828.917-.468 2.062-.468 2.062s2.21-.954 1.34-2.528c-.897-1.62-3.037-2.023-3.037-2.023s1.337.662 2.165 2.489zm-4.708-8.176s3.149 2.502-1.944 6.32c-4.108 3.056-1.123 4.887 0 6.945-2.825-2.064-4.882-3.921-3.486-5.999 1.954-2.909 6.273-3.978 5.43-7.266zm-4.568 18.428c3.966.257 8.049-.125 11.218-1.503l.429.622c-7.391 3.253-15.827.604-11.647-.881zm13.784-5.385s.896-.649.972-1.171c.076-.522-.303-.84-.908-.522-.605.318-.832.648-.832.648s.53-.159.98.159c.454.318-.212.886-.212.886zM4.62 13.916s-2.083 1.174.568 1.48c4.276.492 8.948.337 14.183-.878 0 0-.909.529-1.969.878-6.479 1.761-15.63.456-12.782-1.48zM14.07 0s3.258 2.59-2.012 6.54c-4.251 3.163-1.162 5.058 0 7.189-2.923-2.137-5.053-4.06-3.608-6.21C10.474 4.509 14.943 3.4 14.07 0z"
          />
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
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#3178C6"
            d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.536 7.634c.83 0 1.54.187 2.13.56.59.373.978.89 1.164 1.55l-2.08.85c-.097-.367-.282-.647-.555-.84-.273-.193-.655-.29-1.145-.29-.63 0-1.135.197-1.515.59-.38.393-.57.94-.57 1.64v.05c0 .7.195 1.25.585 1.65.39.4 1.05.79 1.98 1.17 1.29.53 2.235 1.13 2.835 1.8.6.67.9 1.54.9 2.61v.05c0 1.44-.51 2.575-1.53 3.405-1.02.83-2.39 1.245-4.11 1.245-1.39 0-2.58-.32-3.57-.96-.99-.64-1.59-1.57-1.8-2.79l2.16-.62c.12.69.41 1.2.87 1.53.46.33 1.09.495 1.89.495.73 0 1.325-.19 1.785-.57.46-.38.69-.89.69-1.53v-.05c0-.68-.2-1.22-.6-1.62-.4-.4-1.07-.79-2.01-1.17-1.26-.52-2.18-1.12-2.76-1.8-.58-.68-.87-1.54-.87-2.58v-.05c0-1.37.5-2.465 1.5-3.285 1-.82 2.31-1.23 3.93-1.23zm-9.336.21h7.02v2.01h-2.34v10.98H7.655V9.854H5.325V7.844z"
          />
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
      return (
        <div
          className={`${className} rounded-lg flex items-center justify-center shrink-0 border transition-colors`}
          style={{
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "#F1F5F9",
            borderColor: isDark ? "rgba(255, 255, 255, 0.18)" : "#CBD5E1",
            color: isDark ? "#FFFFFF" : "#0F172A",
          }}
        >
          <span className="font-mono font-bold text-[9px] sm:text-[10px] xl:text-[11px] tracking-tighter">ex</span>
        </div>
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
            fill={isDark ? "#FFFFFF" : "#1E293B"}
            d="M7.4 6.2h1.6l2.1 6.8H9.6L9.1 11H6.9l-.5 2H5l2.4-6.8zm1.4 3.6l-.7-2.4-.7 2.4h1.4zm5.5-3.6h1.5l1.3 4.9 1.3-4.9h1.5l-2 6.8h-1.6l-1.3-4.6-1.3 4.6H12.3l-2-6.8z"
          />
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#2496ED"
            d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.76 9.89c-.614-.424-1.57-.488-2.38-.344-.127-.584-.46-1.127-.978-1.55-.91-.74-2.164-.913-3.26-.454-.108.045-.213.1-.31.162a.185.185 0 00-.077.165v2.986c0 .103.083.186.185.186h.022c.94-.038 1.88.225 2.628.75.894.628 1.408 1.63 1.408 2.748 0 3.73-3.32 6.76-7.416 6.76-2.617 0-4.993-1.246-6.353-3.238-.396-.58-.69-1.228-.865-1.916H.482a.185.185 0 00-.185.185C.28 19.34 2.87 22.04 6.78 22.04c4.685 0 8.498-3.46 8.528-7.75.002-.132.062-.256.166-.337 1.848-1.428 4.793-1.04 6.368.188.136.106.326.096.446-.026.47-.48.973-1.2 1.48-2.12.302-.55.513-1.122.617-1.685.023-.127-.05-.25-.17-.294l-.455-.126z" />
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
    case "Android":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#3DDC84">
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.997-3.458a.416.416 0 0 0-.152-.567.416.416 0 0 0-.568.152l-2.022 3.502a11.977 11.977 0 0 0-5.137-1.13c-1.854 0-3.606.403-5.137 1.13L4.837 5.448a.416.416 0 0 0-.568-.152.416.416 0 0 0-.152.567l1.997 3.458C2.688 11.187.343 14.659 0 18.761h24c-.344-4.102-2.689-7.574-6.118-9.44" />
        </svg>
      );
    case "TensorFlow":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FF6F00" d="M12.001 0l9.526 5.5v11l-4.763 2.75v-5.5l-4.763 2.75V0z" />
          <path fill="#FFA800" d="M12.001 0v16.5l-4.763-2.75v5.5L2.475 16.5v-11L12.001 0z" />
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
    default:
      return null;
  }
};

const skillData = {
  frontend: {
    title: "Frontend",
    subtitle: "Modern Web Interfaces",
    badge: "4 Technologies",
    items: ["React", "Next.js", "Tailwind CSS", "Vite"],
  },
  languages: {
    title: "Languages",
    subtitle: "Core Programming",
    badge: "4 Languages",
    items: ["Java", "Python", "C++", "TypeScript"],
  },
  databases: {
    title: "Databases",
    subtitle: "Data & Caching",
    badge: "3 Systems",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  backend: {
    title: "Backend & APIs",
    subtitle: "Server & Microservices",
    badge: "3 Frameworks",
    items: ["Node.js", "Express", "Firebase"],
  },
  aiMobile: {
    title: "AI & Mobile",
    subtitle: "App & Intelligent Systems",
    badge: "3 Platforms",
    items: ["Android", "TensorFlow", "OpenCV"],
  },
  cloud: {
    title: "Cloud & DevOps",
    subtitle: "Infrastructure & CI/CD",
    badge: "3 Cloud Tools",
    items: ["AWS", "Docker", "Google Cloud"],
  },
};

interface CardMotionConfig {
  cardY: MotionValue<number>;
  cardOpacity: MotionValue<number>;
  cardScale: MotionValue<number>;
  borderOpacity: MotionValue<number>;
  headingY: MotionValue<number>;
  headingOpacity: MotionValue<number>;
  chips: Array<{
    opacity: MotionValue<number>;
    y: MotionValue<number>;
    scale: MotionValue<number>;
  }>;
}

const ScrollMetricText = ({
  text,
  highlight,
  className,
}: {
  text: MotionValue<string>;
  highlight: MotionValue<number>;
  className?: string;
}) => {
  const [val, setVal] = useState<string>(() => text.get());
  const [isHighlighted, setIsHighlighted] = useState(false);

  useMotionValueEvent(text, "change", (latest) => {
    setVal(latest);
  });

  useMotionValueEvent(highlight, "change", (latest) => {
    setIsHighlighted(latest > 0.5);
  });

  return (
    <span
      className={`${className || ""} transition-colors duration-200 ${
        isHighlighted ? "text-[#FF7A45] drop-shadow-[0_0_10px_rgba(240,83,35,0.8)]" : "text-[#F05323]"
      }`}
    >
      {val}
    </span>
  );
};

export const SkillsSection = () => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Instant real-time theme synchronization without requiring page refresh
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        !document.documentElement.classList.contains("light")
      );
    }
    return true;
  });

  useEffect(() => {
    const checkTheme = () => {
      const dark =
        document.documentElement.classList.contains("dark") ||
        !document.documentElement.classList.contains("light");
      setIsDark(dark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", checkTheme);
    window.addEventListener("local-storage", checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkTheme);
      window.removeEventListener("local-storage", checkTheme);
    };
  }, []);

  // Scrubbed Scroll Progress (0 -> 1 as user scrolls into view, reverses naturally when scrolling up)
  // Scrubbed Scroll Progress (0 -> 1 as user scrolls into view, finishes before final nav scroll landing)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 120px"],
  });

  // 1. Title - Mask reveal: translateY(35px) -> 0, clip-path inset(100% 0 0 0) -> inset(0)
  const titleSkillsY = useTransform(scrollYProgress, [0.05, 0.14], [35, 0], { clamp: true });
  const titleSkillsClip = useTransform(
    scrollYProgress,
    [0.05, 0.14],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    { clamp: true }
  );

  const titleAmpY = useTransform(scrollYProgress, [0.07, 0.16], [35, 0], { clamp: true });
  const titleAmpClip = useTransform(
    scrollYProgress,
    [0.07, 0.16],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    { clamp: true }
  );

  const titleTechY = useTransform(scrollYProgress, [0.09, 0.18], [35, 0], { clamp: true });
  const titleTechClip = useTransform(
    scrollYProgress,
    [0.09, 0.18],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    { clamp: true }
  );

  const subtitleY = useTransform(scrollYProgress, [0.12, 0.22], [20, 0], { clamp: true });
  const subtitleClip = useTransform(
    scrollYProgress,
    [0.12, 0.22],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    { clamp: true }
  );
  const subtitleOpacity = useTransform(scrollYProgress, [0.12, 0.20], [0, 1], { clamp: true });

  // 2. Left Rail - Metrics Count-Up & Parallax
  const leftRailY = useTransform(scrollYProgress, [0, 1], [14, -6], { clamp: true });
  const leftRailOpacity = useTransform(scrollYProgress, [0.10, 0.22], [0, 1], { clamp: true });

  const count30Text = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return "30+";
    if (v < 0.14) return "0";
    if (v < 0.18) return "10";
    if (v < 0.22) return "20";
    return "30+";
  });
  const count30Highlight = useTransform(scrollYProgress, [0.14, 0.22, 0.25, 0.32], [0, 0, 1, 0], { clamp: true });
  const count30Scale = useTransform(scrollYProgress, [0.16, 0.26], [0, 1], { clamp: true });

  const count6Text = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return "6";
    if (v < 0.16) return "0";
    if (v < 0.21) return "3";
    return "6";
  });
  const count6Highlight = useTransform(scrollYProgress, [0.16, 0.21, 0.24, 0.31], [0, 0, 1, 0], { clamp: true });
  const count6Scale = useTransform(scrollYProgress, [0.18, 0.28], [0, 1], { clamp: true });

  const infinityScale = useTransform(scrollYProgress, [0.18, 0.28], [0.6, 1], { clamp: true });
  const infinityOpacity = useTransform(scrollYProgress, [0.18, 0.26], [0, 1], { clamp: true });
  const infinityStroke = useTransform(scrollYProgress, [0.18, 0.28], [0, 1], { clamp: true });

  // Left Lower Quote Reveal & Underline
  const quoteY = useTransform(scrollYProgress, [0.45, 0.56], [12, 0], { clamp: true });
  const quoteClip = useTransform(
    scrollYProgress,
    [0.45, 0.56],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    { clamp: true }
  );
  const quoteOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1], { clamp: true });
  const quoteUnderline = useTransform(scrollYProgress, [0.52, 0.62], [0, 1], { clamp: true });

  // 3. Card Assembly Helper
  const createCardConfig = (
    start: number,
    headingStart: number,
    chipsStart: number,
    chipCount: number
  ) => {
    const cardY = useTransform(scrollYProgress, [start, start + 0.07], [20, 0], { clamp: true });
    const cardOpacity = useTransform(scrollYProgress, [start, start + 0.06], [0, 1], { clamp: true });
    const cardScale = useTransform(scrollYProgress, [start, start + 0.07], [0.98, 1], { clamp: true });
    const borderOpacity = useTransform(scrollYProgress, [start, start + 0.05], [0.3, 1], { clamp: true });

    const headingY = useTransform(scrollYProgress, [headingStart, headingStart + 0.04], [8, 0], { clamp: true });
    const headingOpacity = useTransform(scrollYProgress, [headingStart, headingStart + 0.04], [0, 1], { clamp: true });

    const chips = Array.from({ length: chipCount }).map((_, idx) => {
      const chipS = chipsStart + idx * 0.015;
      return {
        opacity: useTransform(scrollYProgress, [chipS, chipS + 0.035], [0, 1], { clamp: true }),
        y: useTransform(scrollYProgress, [chipS, chipS + 0.035], [10, 0], { clamp: true }),
        scale: useTransform(scrollYProgress, [chipS, chipS + 0.035], [0.97, 1], { clamp: true }),
      };
    });

    return { cardY, cardOpacity, cardScale, borderOpacity, headingY, headingOpacity, chips };
  };

  // Top Row Cards Assembly
  const langConfig = createCardConfig(0.20, 0.23, 0.25, 4);
  const frontConfig = createCardConfig(0.23, 0.26, 0.28, 4);
  const backConfig = createCardConfig(0.25, 0.28, 0.30, 3);

  // Bottom Row Cards Assembly
  const dataConfig = createCardConfig(0.42, 0.45, 0.47, 4);
  const cloudConfig = createCardConfig(0.45, 0.48, 0.50, 3);
  const aiConfig = createCardConfig(0.48, 0.51, 0.53, 3);

  // 4. Horizontal Connection System
  const connScaleLeft = useTransform(scrollYProgress, [0.32, 0.44], [0, 1], { clamp: true });
  const nodeScaleLeft = useTransform(scrollYProgress, [0.38, 0.46], [0.4, 1], { clamp: true });
  const nodeGlowLeft = useTransform(
    scrollYProgress,
    [0.38, 0.44, 0.52],
    ["0 0 0px rgba(240,83,35,0)", "0 0 10px rgba(240,83,35,0.8)", "0 0 4px rgba(240,83,35,0.4)"],
    { clamp: true }
  );
  const pulseXLeft = useTransform(scrollYProgress, [0.34, 0.46], [-80, 0], { clamp: true });
  const pulseOpacityLeft = useTransform(scrollYProgress, [0.34, 0.38, 0.42, 0.46], [0, 1, 1, 0], { clamp: true });

  const nexusCrossX = useTransform(scrollYProgress, [0.36, 0.48], [0, 1], { clamp: true });
  const nexusCrossY = useTransform(scrollYProgress, [0.36, 0.48], [0, 1], { clamp: true });

  const connScaleRight = useTransform(scrollYProgress, [0.34, 0.46], [0, 1], { clamp: true });
  const nodeScaleRight = useTransform(scrollYProgress, [0.40, 0.48], [0.4, 1], { clamp: true });
  const nodeGlowRight = useTransform(
    scrollYProgress,
    [0.40, 0.46, 0.54],
    ["0 0 0px rgba(240,83,35,0)", "0 0 10px rgba(240,83,35,0.8)", "0 0 4px rgba(240,83,35,0.4)"],
    { clamp: true }
  );
  const pulseXRight = useTransform(scrollYProgress, [0.36, 0.48], [0, 80], { clamp: true });
  const pulseOpacityRight = useTransform(scrollYProgress, [0.36, 0.40, 0.44, 0.48], [0, 1, 1, 0], { clamp: true });

  // 5. Center Core - BUILD / LEARN / CREATE / REPEAT
  const coreScale = useTransform(scrollYProgress, [0.38, 0.52], [0.7, 1], { clamp: true });
  const coreOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0.25, 1], { clamp: true });

  // Outer dashed ring: rotates once during entrance, then stable! (NO continuous spinning)
  const dashedRingRotate = useTransform(scrollYProgress, [0.38, 0.54], [-70, 0], { clamp: true });
  const dashedRingScale = useTransform(scrollYProgress, [0.38, 0.52], [0.75, 1], { clamp: true });

  const wordBuildY = useTransform(scrollYProgress, [0.40, 0.46], [6, 0], { clamp: true });
  const wordBuildOpacity = useTransform(scrollYProgress, [0.40, 0.46], [0, 1], { clamp: true });
  const dot1Opacity = useTransform(scrollYProgress, [0.42, 0.48], [0, 1], { clamp: true });

  const wordLearnY = useTransform(scrollYProgress, [0.44, 0.50], [6, 0], { clamp: true });
  const wordLearnOpacity = useTransform(scrollYProgress, [0.44, 0.50], [0, 1], { clamp: true });

  const coreDividerScale = useTransform(scrollYProgress, [0.46, 0.52], [0, 1], { clamp: true });

  const wordCreateY = useTransform(scrollYProgress, [0.48, 0.54], [6, 0], { clamp: true });
  const wordCreateOpacity = useTransform(scrollYProgress, [0.48, 0.54], [0, 1], { clamp: true });
  const dot2Opacity = useTransform(scrollYProgress, [0.50, 0.56], [0, 1], { clamp: true });

  const wordRepeatY = useTransform(scrollYProgress, [0.52, 0.58], [6, 0], { clamp: true });
  const wordRepeatOpacity = useTransform(scrollYProgress, [0.52, 0.58], [0, 1], { clamp: true });

  // Center Grid Parallax
  const centerGridY = useTransform(scrollYProgress, [0, 1], [8, 0], { clamp: true });

  // 6. Right Editorial Panel
  const rightRailY = useTransform(scrollYProgress, [0, 1], [16, -8], { clamp: true });
  const rightRailOpacity = useTransform(scrollYProgress, [0.50, 0.60], [0, 1], { clamp: true });

  const wordToolsY = useTransform(scrollYProgress, [0.52, 0.58], [16, 0], { clamp: true });
  const wordToolsClip = useTransform(scrollYProgress, [0.52, 0.58], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], { clamp: true });

  const wordTurnY = useTransform(scrollYProgress, [0.54, 0.60], [16, 0], { clamp: true });
  const wordTurnClip = useTransform(scrollYProgress, [0.54, 0.60], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], { clamp: true });

  const wordIdeasY = useTransform(scrollYProgress, [0.56, 0.62], [16, 0], { clamp: true });
  const wordIdeasClip = useTransform(scrollYProgress, [0.56, 0.62], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], { clamp: true });

  const wordIntoY = useTransform(scrollYProgress, [0.58, 0.64], [16, 0], { clamp: true });
  const wordIntoClip = useTransform(scrollYProgress, [0.58, 0.64], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], { clamp: true });

  const wordImpactY = useTransform(scrollYProgress, [0.60, 0.66], [16, 0], { clamp: true });
  const wordImpactClip = useTransform(scrollYProgress, [0.60, 0.66], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], { clamp: true });

  const impactColor = useTransform(
    scrollYProgress,
    [0.60, 0.64, 0.68],
    [isDark ? "#64748B" : "#94A3B8", isDark ? "#64748B" : "#94A3B8", "#F05323"],
    { clamp: true }
  );
  const impactUnderlineScale = useTransform(scrollYProgress, [0.64, 0.70], [0, 1], { clamp: true });

  const pillar1X = useTransform(scrollYProgress, [0.64, 0.70], [-10, 0], { clamp: true });
  const pillar1Opacity = useTransform(scrollYProgress, [0.64, 0.70], [0, 1], { clamp: true });

  const pillar2X = useTransform(scrollYProgress, [0.67, 0.73], [-10, 0], { clamp: true });
  const pillar2Opacity = useTransform(scrollYProgress, [0.67, 0.73], [0, 1], { clamp: true });

  const pillar3X = useTransform(scrollYProgress, [0.70, 0.76], [-10, 0], { clamp: true });
  const pillar3Opacity = useTransform(scrollYProgress, [0.70, 0.76], [0, 1], { clamp: true });

  const taglineOpacity = useTransform(scrollYProgress, [0.73, 0.80], [0, 1], { clamp: true });

  // 7. Bottom Standards Bar
  const standardsY = useTransform(scrollYProgress, [0.74, 0.82], [12, 0], { clamp: true });
  const standardsOpacity = useTransform(scrollYProgress, [0.74, 0.82], [0, 1], { clamp: true });
  const standardsDotScale = useTransform(scrollYProgress, [0.76, 0.84], [0, 1], { clamp: true });
  const standardsTextX = useTransform(scrollYProgress, [0.78, 0.85], [-6, 0], { clamp: true });
  const standardsTextOpacity = useTransform(scrollYProgress, [0.78, 0.85], [0, 1], { clamp: true });
  const standardsPillScale = useTransform(scrollYProgress, [0.80, 0.86], [0.92, 1], { clamp: true });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] lg:h-screen lg:max-h-screen flex flex-col justify-between items-center pt-2 sm:pt-4 lg:pt-2.5 pb-2.5 lg:pb-3 xl:pb-6 px-3 sm:px-6 lg:px-8 xl:px-12 select-none overflow-x-hidden lg:overflow-y-hidden transition-colors duration-300 border-t scroll-mt-16 sm:scroll-mt-20"
      style={{
        backgroundColor: isDark ? "#06080F" : "#FAFAFC",
        borderColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(226, 232, 240, 0.8)",
      }}
    >
      {/* Ambient background soft glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] blur-3xl pointer-events-none -z-10"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, rgba(240, 83, 35, 0.09) 0%, rgba(147, 51, 234, 0.03) 55%, transparent 75%)"
            : "radial-gradient(circle at center, rgba(240, 83, 35, 0.05) 0%, rgba(249, 115, 22, 0.02) 55%, transparent 75%)",
        }}
      />

      {/* ========================================================================= */}
      {/* 1. TOP HEADING: Skills (Neutral) + Tech (Orange) (Vertical Mask Reveal)     */}
      {/* ========================================================================= */}
      <div className="text-center shrink-0 z-10 mb-2 lg:mb-2 xl:mb-3">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-[32px] xl:text-[42px] font-extrabold font-outfit tracking-tight leading-tight inline-flex items-baseline justify-center gap-2">
            <span className="overflow-hidden inline-block">
              <motion.span
                style={{
                  ...(prefersReducedMotion
                    ? {}
                    : {
                        y: titleSkillsY,
                        clipPath: titleSkillsClip,
                        display: "inline-block",
                      }),
                  color: isDark ? "#F4F4F6" : "#0F172A",
                }}
              >
                Skills
              </motion.span>
            </span>{" "}
            <span className="overflow-hidden inline-block">
              <motion.span
                style={{
                  ...(prefersReducedMotion
                    ? {}
                    : {
                        y: titleAmpY,
                        clipPath: titleAmpClip,
                        display: "inline-block",
                      }),
                  color: isDark ? "#71717A" : "#94A3B8",
                }}
                className="font-light"
              >
                &
              </motion.span>
            </span>{" "}
            <span className="overflow-hidden inline-block">
              <motion.span
                style={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: titleTechY,
                        clipPath: titleTechClip,
                        display: "inline-block",
                      }
                }
                className="text-[#F05323]"
              >
                Tech
              </motion.span>
            </span>
          </h2>
          <div className="overflow-hidden">
            <motion.p
              style={{
                ...(prefersReducedMotion
                  ? {}
                  : {
                      y: subtitleY,
                      clipPath: subtitleClip,
                      opacity: subtitleOpacity,
                    }),
                color: isDark ? "#94A3B8" : "#64748B",
              }}
              className="font-grotesk max-w-xl mx-auto text-xs lg:text-xs xl:text-[15px] mt-0.5 lg:mt-1 leading-relaxed px-4 transition-colors"
            >
              Technologies and tools I work with to build modern, scalable web platforms and software applications.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP COHESIVE CONSTELLATION DASHBOARD                                */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex w-full max-w-5xl xl:max-w-6xl mx-auto items-center justify-center gap-3 xl:gap-5 z-10">
        
        {/* LEFT RAIL: Stats + Editorial Quote */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : {
                  y: leftRailY,
                  opacity: leftRailOpacity,
                }
          }
          className="flex flex-col justify-between h-[390px] xl:h-[460px] 2xl:h-[500px] w-36 xl:w-48 shrink-0 py-1.5 xl:py-2 border-r border-border/50 pr-4 xl:pr-7 z-20"
        >
          <div className="space-y-2.5 xl:space-y-4">
            <div>
              <div className="text-2xl lg:text-[28px] xl:text-[40px] 2xl:text-[42px] font-extrabold font-outfit tracking-tight leading-none">
                <ScrollMetricText text={count30Text} highlight={count30Highlight} />
              </div>
              <div
                className="text-[9.5px] xl:text-xs font-mono tracking-widest mt-1 uppercase font-medium"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                Technologies
              </div>
              <motion.div
                style={{
                  ...(prefersReducedMotion ? {} : { scaleX: count30Scale, transformOrigin: "left" }),
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(226, 232, 240, 0.9)",
                }}
                className="w-7 h-[1.5px] mt-1.5"
              />
            </div>

            <div>
              <div className="text-2xl lg:text-[28px] xl:text-[40px] 2xl:text-[42px] font-extrabold font-outfit tracking-tight leading-none">
                <ScrollMetricText text={count6Text} highlight={count6Highlight} />
              </div>
              <div
                className="text-[9.5px] xl:text-xs font-mono tracking-widest mt-1 uppercase font-medium"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                Domains
              </div>
              <motion.div
                style={{
                  ...(prefersReducedMotion ? {} : { scaleX: count6Scale, transformOrigin: "left" }),
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(226, 232, 240, 0.9)",
                }}
                className="w-7 h-[1.5px] mt-1.5"
              />
            </div>

            <div>
              <motion.div
                style={prefersReducedMotion ? {} : { scale: infinityScale, opacity: infinityOpacity }}
                className="text-2xl lg:text-[28px] xl:text-[40px] 2xl:text-[42px] font-extrabold font-outfit text-[#F05323] tracking-tight leading-none flex items-center"
              >
                <svg
                  className="w-7 h-7 xl:w-9 xl:h-9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.228-8-5.096 0-5.096 8 0 8 5.095 0 7.133-8 12.228-8z"
                    style={prefersReducedMotion ? {} : { pathLength: infinityStroke }}
                  />
                </svg>
              </motion.div>
              <div
                className="text-[9.5px] xl:text-xs font-mono tracking-widest mt-1 uppercase font-medium"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                Learning
              </div>
            </div>
          </div>

          <motion.div
            style={prefersReducedMotion ? {} : { y: quoteY, clipPath: quoteClip, opacity: quoteOpacity }}
            className="pt-1.5"
          >
            <p
              className="font-serif italic text-[11px] xl:text-sm font-normal leading-relaxed"
              style={{ color: isDark ? "#CBD5E1" : "#475569" }}
            >
              &ldquo;Same Tools.
              <br />
              <span className="font-semibold" style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}>
                Bigger Possibilities.
              </span>
              &rdquo;
            </p>
            <svg className="w-14 xl:w-20 h-2 mt-1" viewBox="0 0 64 8" fill="none">
              <motion.path
                d="M2 6C20 1 44 1 62 6"
                stroke="#F05323"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={prefersReducedMotion ? {} : { pathLength: quoteUnderline }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* CENTER: 3-COLUMN ORBITAL ARCHITECTURE */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: centerGridY }}
          className="w-fit shrink-0"
        >
          <div className="grid grid-cols-3 gap-4 xl:gap-6 items-center relative">
            
            {/* COLUMN 1: Languages (Top) -> Circuit Connection -> Databases (Bottom) */}
            <div className="flex flex-col justify-between h-[390px] xl:h-[460px] 2xl:h-[500px]">
              <SkillCard
                id="languages"
                data={skillData.languages}
                isDark={isDark}
                activeCluster={activeCluster}
                setActiveCluster={setActiveCluster}
                motionConfig={langConfig}
                prefersReducedMotion={prefersReducedMotion}
              />
              
              {/* Connector Trace to Center */}
              <div className="h-14 lg:h-16 xl:h-24 flex items-center justify-end pr-1 pointer-events-none relative overflow-hidden">
                <motion.div
                  style={{
                    scaleX: prefersReducedMotion ? 1 : connScaleLeft,
                    transformOrigin: "right",
                    backgroundColor:
                      activeCluster === "languages" || activeCluster === "databases"
                        ? "rgba(240, 83, 35, 0.7)"
                        : isDark
                        ? "rgba(255, 255, 255, 0.09)"
                        : "rgba(0, 0, 0, 0.08)",
                  }}
                  className="w-full h-[1.5px] transition-colors duration-300 relative"
                >
                  {/* Traveling Pulse Node */}
                  {!prefersReducedMotion && (
                    <motion.div
                      style={{
                        x: pulseXLeft,
                        opacity: pulseOpacityLeft,
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#F05323] shadow-[0_0_8px_#F05323] rounded-full pointer-events-none"
                    />
                  )}
                </motion.div>
                <motion.div
                  style={{
                    ...(prefersReducedMotion ? {} : { scale: nodeScaleLeft, boxShadow: nodeGlowLeft }),
                    backgroundColor:
                      activeCluster === "languages" || activeCluster === "databases"
                        ? "#F05323"
                        : isDark
                        ? "#1E293B"
                        : "#CBD5E1",
                    borderColor: "#F05323",
                  }}
                  className="w-2.5 h-2.5 rounded-full border transition-colors duration-300 -mr-1 z-10 shrink-0"
                />
              </div>

              <SkillCard
                id="databases"
                data={skillData.databases}
                isDark={isDark}
                activeCluster={activeCluster}
                setActiveCluster={setActiveCluster}
                motionConfig={dataConfig}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* COLUMN 2: Frontend (Top) -> CENTRAL NEXUS (Center) -> Cloud & DevOps (Bottom) */}
            <div className="flex flex-col justify-between h-[390px] xl:h-[460px] 2xl:h-[500px] items-center relative">
              <div className="w-full">
                <SkillCard
                  id="frontend"
                  data={skillData.frontend}
                  isDark={isDark}
                  activeCluster={activeCluster}
                  setActiveCluster={setActiveCluster}
                  motionConfig={frontConfig}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              {/* CENTRAL VISUAL ANCHOR (The Orbit Nexus) */}
              <div className="h-14 lg:h-16 xl:h-24 flex items-center justify-center relative w-full my-auto">
                {/* Cross-axis connector lines */}
                <motion.div
                  style={{
                    scaleX: prefersReducedMotion ? 1 : nexusCrossX,
                    transformOrigin: "center",
                    backgroundColor: activeCluster
                      ? "rgba(240, 83, 35, 0.6)"
                      : isDark
                      ? "rgba(255, 255, 255, 0.09)"
                      : "rgba(0, 0, 0, 0.08)",
                  }}
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] pointer-events-none transition-colors duration-300"
                />
                <motion.div
                  style={{
                    scaleY: prefersReducedMotion ? 1 : nexusCrossY,
                    transformOrigin: "center",
                    backgroundColor:
                      activeCluster === "frontend" || activeCluster === "cloud"
                        ? "rgba(240, 83, 35, 0.6)"
                        : isDark
                        ? "rgba(255, 255, 255, 0.09)"
                        : "rgba(0, 0, 0, 0.08)",
                  }}
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] pointer-events-none transition-colors duration-300"
                />

                {/* The Core Nexus Circle */}
                <motion.div
                  style={{
                    ...(prefersReducedMotion
                      ? {}
                      : {
                          scale: coreScale,
                          opacity: coreOpacity,
                        }),
                    background: isDark
                      ? "radial-gradient(circle at 45% 45%, #141C2E 0%, #0A0F1A 65%, #180B05 90%, #f05323 100%)"
                      : "radial-gradient(circle at 45% 45%, #FFFFFF 0%, #F8FAFC 70%, #FFF2ED 100%)",
                    border: activeCluster
                      ? "2px solid rgba(240, 83, 35, 1)"
                      : "1.5px solid rgba(240, 83, 35, 0.7)",
                    boxShadow: activeCluster
                      ? "0 0 36px rgba(240, 83, 35, 0.55), inset 0 0 18px rgba(240, 83, 35, 0.35)"
                      : isDark
                      ? "0 0 24px rgba(240, 83, 35, 0.25), inset 0 0 14px rgba(240, 83, 35, 0.15)"
                      : "0 6px 20px rgba(240, 83, 35, 0.2), inset 0 0 12px rgba(240, 83, 35, 0.1)",
                  }}
                  whileHover={{ scale: 1.06 }}
                  className="w-[90px] h-[90px] lg:w-[94px] lg:h-[94px] xl:w-[114px] xl:h-[114px] rounded-full flex flex-col items-center justify-center cursor-pointer relative z-20 transition-[border-color,box-shadow] duration-300 select-none shrink-0"
                >
                  {/* Subtle orbital dash ring around circle - rotates once during entrance, then stable! */}
                  <motion.div
                    style={{
                      ...(prefersReducedMotion
                        ? {}
                        : {
                            rotate: dashedRingRotate,
                            scale: dashedRingScale,
                          }),
                      borderColor: activeCluster ? "rgba(240, 83, 35, 0.6)" : "rgba(240, 83, 35, 0.25)",
                    }}
                    className="absolute -inset-1.5 rounded-full border border-dashed pointer-events-none transition-opacity duration-300"
                  />

                  {activeCluster && skillData[activeCluster as keyof typeof skillData] ? (
                    <motion.div
                      key={activeCluster}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88 }}
                      transition={{ duration: 0.12 }}
                      className="text-center px-2 z-10"
                    >
                      <span className="block font-mono text-[8px] xl:text-[10px] tracking-widest text-[#F05323] uppercase font-bold">
                        EXPLORE
                      </span>
                      <span className="block font-black font-outfit text-[11px] xl:text-sm tracking-tight text-foreground leading-tight mt-0.5 truncate max-w-[76px] xl:max-w-[96px]">
                        {skillData[activeCluster as keyof typeof skillData].title}
                      </span>
                      <span className="block font-mono text-[7.5px] xl:text-[9.5px] tracking-wider text-muted-foreground mt-0.5">
                        {skillData[activeCluster as keyof typeof skillData].items.length} TOOLS
                      </span>
                    </motion.div>
                  ) : (
                    <div className="text-center px-1.5 z-10 flex flex-col items-center justify-center space-y-0.5">
                      <div className="flex items-center gap-1 font-black font-outfit text-[9.5px] lg:text-[10px] xl:text-[12px] tracking-wider leading-none">
                        <motion.span
                          style={{
                            ...(prefersReducedMotion ? {} : { y: wordBuildY, opacity: wordBuildOpacity }),
                            color: isDark ? "#F8FAFC" : "#0F172A",
                          }}
                        >
                          BUILD
                        </motion.span>
                        <motion.span
                          style={prefersReducedMotion ? {} : { opacity: dot1Opacity }}
                          className="text-[#F05323] text-[9px]"
                        >
                          •
                        </motion.span>
                        <motion.span
                          style={{
                            ...(prefersReducedMotion ? {} : { y: wordLearnY, opacity: wordLearnOpacity }),
                            color: isDark ? "#CBD5E1" : "#334155",
                          }}
                        >
                          LEARN
                        </motion.span>
                      </div>
                      <motion.div
                        style={{
                          ...(prefersReducedMotion
                            ? {}
                            : {
                                scaleX: coreDividerScale,
                                transformOrigin: "center",
                              }),
                          background: "linear-gradient(90deg, transparent, rgba(240, 83, 35, 0.7), transparent)",
                        }}
                        className="w-10 xl:w-12 h-[1px]"
                      />
                      <div className="flex items-center gap-1 font-black font-outfit text-[9.5px] lg:text-[10px] xl:text-[12px] tracking-wider leading-none">
                        <motion.span
                          style={{
                            ...(prefersReducedMotion ? {} : { y: wordCreateY, opacity: wordCreateOpacity }),
                            color: isDark ? "#94A3B8" : "#64748B",
                          }}
                        >
                          CREATE
                        </motion.span>
                        <motion.span
                          style={prefersReducedMotion ? {} : { opacity: dot2Opacity }}
                          className="text-[#F05323] text-[9px]"
                        >
                          •
                        </motion.span>
                        <motion.span
                          style={prefersReducedMotion ? {} : { y: wordRepeatY, opacity: wordRepeatOpacity }}
                          className="text-[#F05323] font-black drop-shadow-[0_0_8px_rgba(240,83,35,0.7)]"
                        >
                          REPEAT
                        </motion.span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="w-full">
                <SkillCard
                  id="cloud"
                  data={skillData.cloud}
                  isDark={isDark}
                  activeCluster={activeCluster}
                  setActiveCluster={setActiveCluster}
                  motionConfig={cloudConfig}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>

            {/* COLUMN 3: Backend & APIs (Top) -> Circuit Connection -> AI & Mobile (Bottom) */}
            <div className="flex flex-col justify-between h-[390px] xl:h-[460px] 2xl:h-[500px]">
              <SkillCard
                id="backend"
                data={skillData.backend}
                isDark={isDark}
                activeCluster={activeCluster}
                setActiveCluster={setActiveCluster}
                motionConfig={backConfig}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* Connector Trace to Center */}
              <div className="h-14 lg:h-16 xl:h-24 flex items-center justify-start pl-1 pointer-events-none relative overflow-hidden">
                <motion.div
                  style={{
                    ...(prefersReducedMotion ? {} : { scale: nodeScaleRight, boxShadow: nodeGlowRight }),
                    backgroundColor:
                      activeCluster === "backend" || activeCluster === "aiMobile"
                        ? "#F05323"
                        : isDark
                        ? "#1E293B"
                        : "#CBD5E1",
                    borderColor: "#F05323",
                  }}
                  className="w-2.5 h-2.5 rounded-full border transition-colors duration-300 -ml-1 z-10 shrink-0"
                />
                <motion.div
                  style={{
                    scaleX: prefersReducedMotion ? 1 : connScaleRight,
                    transformOrigin: "left",
                    backgroundColor:
                      activeCluster === "backend" || activeCluster === "aiMobile"
                        ? "rgba(240, 83, 35, 0.7)"
                        : isDark
                        ? "rgba(255, 255, 255, 0.09)"
                        : "rgba(0, 0, 0, 0.08)",
                  }}
                  className="w-full h-[1.5px] transition-colors duration-300 relative"
                >
                  {/* Traveling Pulse Node */}
                  {!prefersReducedMotion && (
                    <motion.div
                      style={{
                        x: pulseXRight,
                        opacity: pulseOpacityRight,
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#F05323] shadow-[0_0_8px_#F05323] rounded-full pointer-events-none"
                    />
                  )}
                </motion.div>
              </div>

              <SkillCard
                id="aiMobile"
                data={skillData.aiMobile}
                isDark={isDark}
                activeCluster={activeCluster}
                setActiveCluster={setActiveCluster}
                motionConfig={aiConfig}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

          </div>
        </motion.div>

        {/* RIGHT RAIL: Editorial Statement & Engineering Highlights */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : {
                  y: rightRailY,
                  opacity: rightRailOpacity,
                }
          }
          className="flex flex-col justify-between h-[390px] xl:h-[460px] 2xl:h-[500px] w-38 xl:w-52 shrink-0 py-1.5 xl:py-2 border-l border-border/50 pl-3.5 xl:pl-4.5 text-left z-20"
        >
          {/* Top: Impact Statement */}
          <div
            className="space-y-1 lg:space-y-1 xl:space-y-1.5 tracking-[0.22em] xl:tracking-[0.25em] font-black font-outfit text-[11px] xl:text-sm 2xl:text-[15px] leading-relaxed"
            style={{ color: isDark ? "#64748B" : "#94A3B8" }}
          >
            <div className="overflow-hidden">
              <motion.div style={prefersReducedMotion ? {} : { y: wordToolsY, clipPath: wordToolsClip }}>
                TOOLS
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div style={prefersReducedMotion ? {} : { y: wordTurnY, clipPath: wordTurnClip }}>
                TURN
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div style={prefersReducedMotion ? {} : { y: wordIdeasY, clipPath: wordIdeasClip }}>
                IDEAS
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div style={prefersReducedMotion ? {} : { y: wordIntoY, clipPath: wordIntoClip }}>
                INTO
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                style={
                  prefersReducedMotion
                    ? { color: "#F05323" }
                    : {
                        y: wordImpactY,
                        clipPath: wordImpactClip,
                        color: impactColor,
                      }
                }
                className="font-black"
              >
                IMPACT
              </motion.div>
            </div>
            <motion.div
              style={
                prefersReducedMotion
                  ? {}
                  : {
                      scaleX: impactUnderlineScale,
                      transformOrigin: "left",
                    }
              }
              className="w-6 xl:w-8 h-[2px] bg-[#F05323] mr-auto mt-1 xl:mt-2"
            />
          </div>

          {/* Middle: Core Engineering Highlights & Capabilities */}
          <div className="space-y-1.5 lg:space-y-2 xl:space-y-3.5 py-0.5">
            {/* Highlight 1: Certified Java */}
            <motion.div
              style={prefersReducedMotion ? {} : { x: pillar1X, opacity: pillar1Opacity }}
              className="group/pillar"
            >
              <div className="flex items-center gap-1.5 text-[10.5px] xl:text-xs font-bold font-outfit tracking-tight text-foreground transition-colors group-hover/pillar:text-[#F05323]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F05323] shrink-0 shadow-[0_0_6px_rgba(240,83,35,0.6)]" />
                <span>Certified Core</span>
              </div>
              <p
                className="text-[9px] xl:text-[10.5px] font-grotesk mt-0.5 leading-snug pl-2.5"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                Oracle Certified Java SE 17
              </p>
            </motion.div>

            {/* Highlight 2: Production Shipped */}
            <motion.div
              style={prefersReducedMotion ? {} : { x: pillar2X, opacity: pillar2Opacity }}
              className="group/pillar"
            >
              <div className="flex items-center gap-1.5 text-[10.5px] xl:text-xs font-bold font-outfit tracking-tight text-foreground transition-colors group-hover/pillar:text-[#F05323]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                <span>Production Shipped</span>
              </div>
              <p
                className="text-[9px] xl:text-[10.5px] font-grotesk mt-0.5 leading-snug pl-2.5"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                UniVault & SaveethaHub
              </p>
            </motion.div>

            {/* Highlight 3: Full-Stack & Cloud */}
            <motion.div
              style={prefersReducedMotion ? {} : { x: pillar3X, opacity: pillar3Opacity }}
              className="group/pillar"
            >
              <div className="flex items-center gap-1.5 text-[10.5px] xl:text-xs font-bold font-outfit tracking-tight text-foreground transition-colors group-hover/pillar:text-[#F05323]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                <span>Full-Stack & Cloud</span>
              </div>
              <p
                className="text-[9px] xl:text-[10.5px] font-grotesk mt-0.5 leading-snug pl-2.5"
                style={{ color: isDark ? "#94A3B8" : "#64748B" }}
              >
                React, Node, Docker & AWS
              </p>
            </motion.div>
          </div>

          {/* Bottom: Continuously Improving Tagline */}
          <motion.div
            style={{
              ...(prefersReducedMotion ? {} : { opacity: taglineOpacity }),
              color: isDark ? "#94A3B8" : "#64748B",
            }}
            className="font-mono text-[9px] xl:text-[10.5px] tracking-wider flex items-center justify-start gap-1.5 pt-0.5 shrink-0"
          >
            <span className="text-[#F05323] font-bold">//</span>
            <span>CONTINUOUSLY IMPROVING</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2B. BOTTOM ARCHITECTURAL & ENGINEERING HIGHLIGHTS BANNER (Fills Bottom)     */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          ...(prefersReducedMotion
            ? {}
            : {
                y: standardsY,
                opacity: standardsOpacity,
              }),
          backgroundColor: isDark ? "rgba(11, 15, 25, 0.75)" : "rgba(255, 255, 255, 0.8)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(226, 232, 240, 0.9)",
        }}
        className="hidden lg:flex items-center justify-between w-full max-w-5xl xl:max-w-6xl mx-auto px-4 xl:px-6 py-1.5 lg:py-2 xl:py-2.5 rounded-xl border backdrop-blur-md mt-2 lg:mt-2.5 xl:mt-5 z-20 transition-all duration-300 shadow-sm shrink-0"
      >
        {/* Left: Engineering Stack Standards */}
        <div className="flex items-center gap-2.5">
          <motion.span
            style={prefersReducedMotion ? {} : { scale: standardsDotScale }}
            className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          />
          <div className="flex items-center gap-2">
            <motion.span
              style={prefersReducedMotion ? {} : { opacity: standardsTextOpacity }}
              className="font-mono text-[9px] xl:text-[11px] font-bold tracking-wider text-[#F05323] uppercase"
            >
              STANDARDS
            </motion.span>
            <span className="text-muted-foreground/40">•</span>
            <motion.span
              style={{
                ...(prefersReducedMotion ? {} : { opacity: standardsTextOpacity, x: standardsTextX }),
                color: isDark ? "#E2E8F0" : "#1E293B",
              }}
              className="font-outfit text-[11px] xl:text-[13px] font-medium tracking-tight"
            >
              Clean Architecture, Microservices, CI/CD Pipelines & Type-Safe APIs
            </motion.span>
          </div>
        </div>

        {/* Right: Quick Tech Highlights */}
        <motion.div
          style={{
            ...(prefersReducedMotion ? {} : { scale: standardsPillScale }),
            color: isDark ? "#94A3B8" : "#64748B",
          }}
          className="flex items-center gap-3.5 font-mono text-[9.5px] xl:text-[11px] tracking-wider"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#F05323] font-bold">//</span>
            <span>PRODUCTION PROVEN</span>
          </span>
          <span
            className="px-2 py-0.5 rounded-md font-bold font-outfit text-[10px] xl:text-[11px]"
            style={{
              backgroundColor: "rgba(240, 83, 35, 0.12)",
              color: "#F05323",
              border: "1px solid rgba(240, 83, 35, 0.25)",
            }}
          >
            READY TO DEPLOY
          </span>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. MOBILE ARCHITECTURE (Immediate skills, readable grid, zero truncation) */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col w-full max-w-xl sm:max-w-2xl mx-auto py-2 sm:py-4 px-1 sm:px-4 gap-4 sm:gap-5 z-10">
        {/* Compact Visual Anchor Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-mono shadow-sm"
            style={{
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.9)",
              borderColor: isDark ? "rgba(240, 83, 35, 0.35)" : "rgba(240, 83, 35, 0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05323] animate-pulse" />
            <span className="font-bold text-[#F05323]">BUILD</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground">LEARN</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">CREATE</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-[#F05323]">REPEAT</span>
          </div>
        </motion.div>

        {/* Clean Mobile Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 divide-x rounded-xl p-2.5 sm:p-3 border text-center w-full shadow-sm"
          style={{
            backgroundColor: isDark ? "rgba(11, 15, 25, 0.6)" : "rgba(255, 255, 255, 0.7)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(226, 232, 240, 0.9)",
            divideColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(226, 232, 240, 0.9)",
          }}
        >
          <div>
            <div className="text-base sm:text-xl font-extrabold font-outfit text-[#F05323]">30+</div>
            <div
              className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase mt-0.5"
              style={{ color: isDark ? "#94A3B8" : "#64748B" }}
            >
              Technologies
            </div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-extrabold font-outfit text-[#F05323]">6</div>
            <div
              className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase mt-0.5"
              style={{ color: isDark ? "#94A3B8" : "#64748B" }}
            >
              Domains
            </div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-extrabold font-outfit text-[#F05323]">∞</div>
            <div
              className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase mt-0.5"
              style={{ color: isDark ? "#94A3B8" : "#64748B" }}
            >
              Learning
            </div>
          </div>
        </motion.div>

        {/* Comfortable Grid of All 6 Categories - 1 col on mobile phone, 2 cols on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full">
          {[
            { id: "languages", data: skillData.languages },
            { id: "frontend", data: skillData.frontend },
            { id: "backend", data: skillData.backend },
            { id: "databases", data: skillData.databases },
            { id: "aiMobile", data: skillData.aiMobile },
            { id: "cloud", data: skillData.cloud },
          ].map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.35, delay: (idx % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <SkillCard
                id={item.id}
                data={item.data}
                isDark={isDark}
                activeCluster={activeCluster}
                setActiveCluster={setActiveCluster}
                isMobile
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Editorial Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 px-1 text-center sm:text-left border-t"
          style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(226, 232, 240, 0.9)" }}
        >
          <p
            className="font-serif italic text-xs sm:text-[13px] leading-snug"
            style={{ color: isDark ? "#CBD5E1" : "#475569" }}
          >
            &ldquo;Same Tools. <span className="font-semibold" style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}>Bigger Possibilities.</span>&rdquo;
          </p>
          <div
            className="text-[10px] sm:text-xs font-mono tracking-wider flex items-center justify-center gap-1.5"
            style={{ color: isDark ? "#94A3B8" : "#64748B" }}
          >
            <span className="text-[#F05323] font-bold">//</span>
            <span>TOOLS TURN IDEAS INTO IMPACT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Reusable SkillCard Component for Perfect Consistency
const SkillCard = ({
  id,
  data,
  isDark,
  activeCluster,
  setActiveCluster,
  isMobile = false,
  motionConfig,
  prefersReducedMotion = false,
}: {
  id: string;
  data: (typeof skillData)[keyof typeof skillData];
  isDark: boolean;
  activeCluster: string | null;
  setActiveCluster: (id: string | null) => void;
  isMobile?: boolean;
  motionConfig?: CardMotionConfig;
  prefersReducedMotion?: boolean | null;
}) => {
  const isActive = activeCluster === id;

  const cardEntranceStyle =
    !isMobile && !prefersReducedMotion && motionConfig
      ? {
          y: motionConfig.cardY,
          opacity: motionConfig.cardOpacity,
          scale: motionConfig.cardScale,
        }
      : undefined;

  return (
    <motion.div
      style={cardEntranceStyle}
      className="w-full relative z-20"
    >
      <div
        onMouseEnter={() => !isMobile && setActiveCluster(id)}
        onMouseLeave={() => !isMobile && setActiveCluster(null)}
        onClick={() => isMobile && setActiveCluster(isActive ? null : id)}
        style={{
          backgroundColor: isActive
            ? isDark
              ? "rgba(18, 24, 38, 0.95)"
              : "#FFFFFF"
            : isDark
            ? "rgba(11, 15, 25, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
          borderColor: isActive
            ? "rgba(240, 83, 35, 0.7)"
            : isDark
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(226, 232, 240, 0.9)",
          boxShadow: isActive
            ? isDark
              ? "0 14px 34px -4px rgba(0, 0, 0, 0.65), 0 0 24px rgba(240, 83, 35, 0.25)"
              : "0 14px 30px -4px rgba(240, 83, 35, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04)"
            : isDark
            ? "0 4px 18px rgba(0, 0, 0, 0.45)"
            : "0 2px 12px rgba(0, 0, 0, 0.04)",
        }}
        className={`rounded-2xl border transition-all duration-300 ease-out relative backdrop-blur-md cursor-pointer group/card overflow-hidden ${
          !isMobile
            ? "hover:-translate-y-1 hover:border-[#F05323]/60 hover:shadow-[0_14px_34px_-4px_rgba(240,83,35,0.22)]"
            : ""
        } ${isMobile ? "p-3.5 sm:p-4" : "p-2.5 lg:p-2.5 xl:p-4"}`}
      >
        {/* Subtle glowing ambient accent line at the top of the card */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 pointer-events-none ${
            isActive ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
          }`}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(240, 83, 35, 0.8), transparent)",
          }}
        />

        <div className={`flex items-center justify-between gap-2 border-b border-border/40 ${isMobile ? "mb-2.5 pb-2" : "mb-1.5 pb-1 xl:mb-2.5 xl:pb-2"}`}>
          <div>
            <motion.h3
              style={{
                ...(!isMobile && !prefersReducedMotion && motionConfig
                  ? {
                      y: motionConfig.headingY,
                      opacity: motionConfig.headingOpacity,
                    }
                  : {}),
                color: isDark ? "#F8FAFC" : "#0F172A",
              }}
              className={`font-outfit font-bold tracking-tight transition-colors duration-200 ${
                isMobile ? "text-[15px] sm:text-base" : "text-xs lg:text-xs xl:text-base"
              }`}
            >
              {data.title}
            </motion.h3>
            <motion.span
              style={{
                ...(!isMobile && !prefersReducedMotion && motionConfig
                  ? {
                      opacity: motionConfig.headingOpacity,
                    }
                  : {}),
                color: isDark ? "#94A3B8" : "#64748B",
              }}
              className={`font-grotesk tracking-tight leading-none block ${
                isMobile ? "text-[11px] sm:text-xs mt-1" : "text-[9px] xl:text-[10.5px] mt-0.5"
              }`}
            >
              {data.subtitle}
            </motion.span>
          </div>
          <span
            className={`font-mono font-semibold tracking-tight transition-all duration-200 shrink-0 ${
              isMobile
                ? "text-[10px] sm:text-xs px-2 py-0.5 rounded-md"
                : "text-[9px] lg:text-[9.5px] xl:text-xs px-1.5 py-0.5 xl:px-2.5 xl:py-1 rounded-md"
            } ${
              isActive ? "scale-105" : "group-hover/card:scale-105"
            }`}
            style={{
              backgroundColor: isActive
                ? "rgba(240, 83, 35, 0.15)"
                : isDark
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(0, 0, 0, 0.05)",
              color: isActive ? "#F05323" : isDark ? "#94A3B8" : "#64748B",
              border: isActive
                ? "1px solid rgba(240, 83, 35, 0.35)"
                : "1px solid transparent",
            }}
          >
            {data.badge}
          </span>
        </div>

        <div className={`grid grid-cols-2 ${isMobile ? "gap-2 sm:gap-2.5" : "gap-1.5 lg:gap-1.5 xl:gap-2.5"}`}>
          {data.items.map((item, idx) => {
            const isSpanTwo = data.items.length === 3 && idx === 2;
            const chipAnim = motionConfig?.chips?.[idx];

            return (
              <motion.div
                key={item}
                style={
                  !isMobile && !prefersReducedMotion && chipAnim
                    ? {
                        opacity: chipAnim.opacity,
                        y: chipAnim.y,
                        scale: chipAnim.scale,
                      }
                    : undefined
                }
                className={isSpanTwo ? "col-span-2" : ""}
              >
                <div
                  className={`flex items-center rounded-xl border transition-all duration-200 ease-out group/chip cursor-default ${
                    isSpanTwo ? "justify-center" : ""
                  } ${
                    isMobile
                      ? "gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 active:scale-[0.98]"
                      : "gap-1.5 lg:gap-1.5 xl:gap-2 px-2 lg:px-2 xl:px-3 py-1 lg:py-1 xl:py-2 hover:-translate-y-0.5"
                  } ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-[#F05323]/50 hover:shadow-[0_4px_14px_rgba(240,83,35,0.15)]"
                      : "bg-slate-100/80 border-slate-200/90 hover:bg-white hover:border-[#F05323]/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <TechIcon
                    name={item}
                    isDark={isDark}
                    className={`${
                      isMobile
                        ? "w-5 h-5 sm:w-5.5 sm:h-5.5"
                        : "w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5"
                    } shrink-0 transition-transform duration-200 ease-out group-hover/chip:scale-110`}
                  />
                  <span
                    className={`font-medium font-outfit tracking-tight whitespace-nowrap transition-colors duration-200 ${
                      isMobile
                        ? "text-xs sm:text-[13px]"
                        : "text-[11px] lg:text-[11px] xl:text-[13.5px]"
                    } ${
                      isDark
                        ? "text-slate-200 group-hover/chip:text-white"
                        : "text-slate-700 group-hover/chip:text-[#0F172A]"
                    }`}
                  >
                    {item}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsSection;
