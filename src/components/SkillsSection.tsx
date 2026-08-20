import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Cpu,
  Terminal,
  CheckCircle2,
  Activity,
  Box,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Globe,
    badge: "Primary",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3", "Vite", "Framer Motion"],
  },
  {
    id: "java-core",
    title: "Java & Core",
    icon: Terminal,
    badge: "OCP Certified",
    skills: ["Java SE 17", "Data Structures & DSA", "OOP Principles", "Python", "C / C++"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Server,
    badge: "Server-Side",
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Supabase", "JWT / OAuth"],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    badge: "SQL & NoSQL",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL"],
  },
  {
    id: "devops-cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    badge: "OCI Certified",
    skills: ["AWS", "Docker", "OCI Cloud", "Git / GitHub", "CI/CD Pipelines", "Linux"],
  },
  {
    id: "ai-mobile",
    title: "AI & Mobile",
    icon: Cpu,
    badge: "Android & ML",
    skills: ["Android (Kotlin)", "OpenCV", "Machine Learning", "Pandas", "TensorFlow", "UniVault App"],
  },
];

const coreProficiencies = [
  { name: "React / Next.js", level: 90 },
  { name: "Java SE 17 (OCP Certified)", level: 87 },
  { name: "TypeScript", level: 85 },
  { name: "Data Structures & Algorithms", level: 84 },
  { name: "Node.js & Express", level: 82 },
  { name: "Cloud & DevOps (AWS/OCI/Docker)", level: 78 },
];

const techMarquee = [
  "React", "TypeScript", "Next.js", "Java 17", "Python", "Node.js", "AWS", "Docker",
  "PostgreSQL", "MongoDB", "Tailwind CSS", "Kotlin", "Git", "Figma", "Redis", "GraphQL",
  "TensorFlow", "Supabase", "Linux", "Firebase", "Vercel", "OpenCV",
];

const TechIcon = ({ name, className = "w-3.5 h-3.5 shrink-0" }: { name: string; className?: string }) => {
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
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.536 7.634c.83 0 1.54.187 2.13.56.59.373.978.89 1.164 1.55l-2.08.85c-.097-.367-.282-.647-.555-.84-.273-.193-.655-.29-1.145-.29-.63 0-1.135.197-1.515.59-.38.393-.57.94-.57 1.64v.05c0 .7.195 1.25.585 1.65.39.4 1.05.79 1.98 1.17 1.29.53 2.235 1.13 2.835 1.8.6.67.9 1.54.9 2.61v.05c0 1.44-.51 2.575-1.53 3.405-1.02.83-2.39 1.245-4.11 1.245-1.39 0-2.58-.32-3.57-.96-.99-.64-1.59-1.57-1.8-2.79l2.16-.62c.12.69.41 1.2.87 1.53.46.33 1.09.495 1.89.495.73 0 1.325-.19 1.785-.57.46-.38.69-.89.69-1.53v-.05c0-.68-.2-1.22-.6-1.62-.4-.4-1.07-.79-2.01-1.17-1.26-.52-2.18-1.12-2.76-1.8-.58-.68-.87-1.54-.87-2.58v-.05c0-1.37.5-2.465 1.5-3.285 1-.82 2.31-1.23 3.93-1.23zm-9.336.21h7.02v2.01h-2.34v10.98H7.655V9.854H5.325V7.844z"/>
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current text-foreground`}>
          <path d="M18.665 21.978l-7.392-9.614v9.614H9.006V2.022h2.267l7.392 9.614V2.022h2.267v19.956h-2.267zm-13.33 0l-5.335-6.93v6.93H0V2.022h2.267l5.335 6.93V2.022h2.267v19.956H5.335z"/>
        </svg>
      );
    case "Java 17":
    case "Java SE 17":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#ED8B00" d="M8.851 18.56s-.917.534.667.708c2.309.253 3.796.222 6.551-.253 0 0 .762.434 1.543.766-4.908 1.748-11.233-.075-8.761-1.221zm-1.077-2.618s-1.037.747.536.953c2.909.38 5.753.331 9.479-.443 0 0 .543.348 1.134.618-5.748 1.942-13.626.31-11.149-1.128zm10.743-4.004c.828.917-.468 2.062-.468 2.062s2.21-.954 1.34-2.528c-.897-1.62-3.037-2.023-3.037-2.023s1.337.662 2.165 2.489zm-4.708-8.176s3.149 2.502-1.944 6.32c-4.108 3.056-1.123 4.887 0 6.945-2.825-2.064-4.882-3.921-3.486-5.999 1.954-2.909 6.273-3.978 5.43-7.266zm-4.568 18.428c3.966.257 8.049-.125 11.218-1.503l.429.622c-7.391 3.253-15.827.604-11.647-.881zm13.784-5.385s.896-.649.972-1.171c.076-.522-.303-.84-.908-.522-.605.318-.832.648-.832.648s.53-.159.98.159c.454.318-.212.886-.212.886zM4.62 13.916s-2.083 1.174.568 1.48c4.276.492 8.948.337 14.183-.878 0 0-.909.529-1.969.878-6.479 1.761-15.63.456-12.782-1.48zM14.07 0s3.258 2.59-2.012 6.54c-4.251 3.163-1.162 5.058 0 7.189-2.923-2.137-5.053-4.06-3.608-6.21C10.474 4.509 14.943 3.4 14.07 0z"/>
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3776AB" d="M11.914 0C5.824 0 6.19 2.65 6.19 2.65l.006 2.744h5.81v.827H3.92S0 5.766 0 11.892c0 6.124 3.42 5.918 3.42 5.918h2.04v-2.868s-.11-3.42 3.366-3.42h5.77s3.256.052 3.256-3.15V3.15S18.39 0 11.914 0zm-3.21 1.884a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02z"/>
          <path fill="#FFD43B" d="M12.086 24c6.09 0 5.724-2.65 5.724-2.65l-.006-2.744h-5.81v-.827h8.086s3.92.455 3.92-5.67c0-6.125-3.42-5.92-3.42-5.92h-2.04v2.87s.11 3.42-3.366 3.42h-5.77s-3.256-.053-3.256 3.15v5.228S5.61 24 12.086 24zm3.21-1.884a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z"/>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#5FA04E" d="M12 1.6l8.8 5.1v10.6L12 22.4 3.2 17.3V6.7L12 1.6zm0 2.3L5.2 8.4v7.2L12 19.6l6.8-4V8.4L12 3.9zm-1 3.5h2v4.2l3.4-3.4h2.4l-3.8 3.8 4 4.5h-2.5l-3.1-3.6-.4.4v3.2h-2V7.4z"/>
        </svg>
      );
    case "AWS":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FF9900" d="M12.63 15.39c-2.73 0-5.18-1.02-7.14-2.74-.23-.2-.24-.55-.03-.77.2-.22.55-.23.77-.04 1.78 1.55 4.02 2.47 6.4 2.47 3.2 0 6.07-1.44 8.04-3.79.19-.23.53-.26.76-.08.23.19.26.54.07.77-2.18 2.59-5.36 4.18-8.87 4.18z"/>
          <path fill="#FF9900" d="M21.98 11.75c-.32.06-.6-.18-.63-.5-.03-.23.1-.46.32-.54l.8-.29c.14-.05.28.02.33.16l.29.8c.08.22-.04.47-.26.55-.22.08-.47-.04-.55-.26l-.15-.42-.15.5z"/>
          <path fill="#232F3E" className="dark:fill-white" d="M7.4 6.2h1.6l2.1 6.8H9.6L9.1 11H6.9l-.5 2H5l2.4-6.8zm1.4 3.6l-.7-2.4-.7 2.4h1.4zm5.5-3.6h1.5l1.3 4.9 1.3-4.9h1.5l-2 6.8h-1.6l-1.3-4.6-1.3 4.6H12.3l-2-6.8z"/>
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.76 9.89c-.614-.424-1.57-.488-2.38-.344-.127-.584-.46-1.127-.978-1.55-.91-.74-2.164-.913-3.26-.454-.108.045-.213.1-.31.162a.185.185 0 00-.077.165v2.986c0 .103.083.186.185.186h.022c.94-.038 1.88.225 2.628.75.894.628 1.408 1.63 1.408 2.748 0 3.73-3.32 6.76-7.416 6.76-2.617 0-4.993-1.246-6.353-3.238-.396-.58-.69-1.228-.865-1.916H.482a.185.185 0 00-.185.185C.28 19.34 2.87 22.04 6.78 22.04c4.685 0 8.498-3.46 8.528-7.75.002-.132.062-.256.166-.337 1.848-1.428 4.793-1.04 6.368.188.136.106.326.096.446-.026.47-.48.973-1.2 1.48-2.12.302-.55.513-1.122.617-1.685.023-.127-.05-.25-.17-.294l-.455-.126z"/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#4169E1" d="M12.016 0C5.38 0 0 5.38 0 12.016c0 6.637 5.38 12.017 12.016 12.017 6.637 0 12.017-5.38 12.017-12.017C24.033 5.38 18.653 0 12.016 0zm3.87 17.51c-.6.44-1.38.65-2.28.65-.63 0-1.24-.1-1.81-.31-.57-.2-1.06-.51-1.47-.9-.41-.4-.73-.89-.94-1.46-.22-.57-.3-1.22-.24-1.93.06-.71.26-1.37.6-1.95.34-.58.8-1.04 1.37-1.38.57-.33 1.25-.5 2.01-.5.67 0 1.29.13 1.83.38.54.25.99.6 1.34 1.05l-1.38 1.13c-.23-.3-.51-.53-.84-.69-.33-.16-.71-.24-1.12-.24-.51 0-.96.12-1.34.36-.38.24-.68.57-.89 1-.21.42-.32.92-.32 1.48 0 .54.1 1.02.3 1.43.2.4.49.72.86.95.37.23.82.35 1.35.35.45 0 .86-.09 1.23-.26.37-.17.68-.42.94-.74l1.39 1.04zM8.5 7.5h7v1.8h-4.9v2.1h4.4v1.8h-4.4v3.3H8.5V7.5z"/>
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#47A248" d="M12 0C11.666 0 11.233.242 11.083.56c-1.399 2.97-6.242 10.36-4.526 16.035 1.235 4.084 4.542 6.557 5.253 7.086.113.084.25.127.387.127.135 0 .27-.043.383-.125.713-.53 4.02-3.004 5.256-7.09 1.714-5.674-3.13-13.064-4.53-16.034C12.756.242 12.332 0 12 0zm.014 3.096c1.614 2.87 4.793 9.07 3.528 13.256-.88 2.915-3.076 4.966-3.528 5.37V3.096z"/>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
    case "Kotlin":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#7F52FF" d="M24 24H0V0h24L12 12Z"/>
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#F05032" d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.126 0L8.808 2.585l3.52 3.52a2.028 2.028 0 011.644 1.637 2.035 2.035 0 01-1.045 2.19l3.504 3.504a2.03 2.03 0 012.18-.948 2.034 2.034 0 011.435 2.658 2.033 2.033 0 01-2.657 1.435 2.033 2.033 0 01-.948-2.18l-3.354-3.354v4.542a2.037 2.037 0 011.135 1.83 2.035 2.035 0 11-4.07 0 2.035 2.035 0 011.517-1.97V9.757a2.035 2.035 0 01-1.517-1.97 2.035 2.035 0 01.597-1.427L5.27 2.859.454 7.676a1.5 1.5 0 000 2.126l10.48 10.48a1.5 1.5 0 002.124 0l10.488-10.48a1.5 1.5 0 000-2.126z"/>
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#F24E1E" d="M12 12a4 4 0 1 1-4-4 4 4 0 0 1 4 4z"/>
          <path fill="#FF7262" d="M8 4a4 4 0 0 1 4 4v4H8a4 4 0 1 1 0-8z"/>
          <path fill="#1ABCFE" d="M16 12a4 4 0 0 0-4-4v8a4 4 0 0 0 4-4z"/>
          <path fill="#0ACF83" d="M8 16a4 4 0 0 0 4 4v-4H8a4 4 0 0 0 0 4z"/>
          <path fill="#A259FF" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4V4z"/>
        </svg>
      );
    case "Redis":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#DC382D" d="M22.08 6.42L13.19.24a2.31 2.31 0 00-2.38 0L1.92 6.42A2.31 2.31 0 00.73 8.4v7.2a2.31 2.31 0 001.19 1.98l8.89 6.18a2.31 2.31 0 002.38 0l8.89-6.18a2.31 2.31 0 001.19-1.98V8.4a2.31 2.31 0 00-1.19-1.98zM12 2.61l7.15 4.97-3.03 2.11L9.04 4.76 12 2.61zm-8.89 5.8l2.96-2.06 7.15 4.97-2.96 2.06L3.11 8.41zm9.89 12.98l-7.15-4.97v-4.12l7.15 4.97v4.12zm8-4.12l-7.15 4.97v-4.12l7.15-4.97v4.12z"/>
        </svg>
      );
    case "GraphQL":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#E10098" d="M12 0l10.392 6v12L12 24 1.608 18V6L12 0zm0 2.309L3.608 7.155v9.69L12 21.691l8.392-4.846v-9.69L12 2.309zM12 5.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 2a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/>
        </svg>
      );
    case "TensorFlow":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FF6F00" d="M1.292 5.856L11.54 0v24l-4.095-2.397V7.57l-6.153 3.6zM22.708 5.856L12.46 0v24l4.095-2.397V7.57l6.153 3.6z"/>
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3ECF8E" d="M21.362 9.354H12V.396a.396.396 0 00-.716-.245L.411 13.626a.396.396 0 00.316.642H12v8.958a.396.396 0 00.716.245l10.873-13.475a.396.396 0 00-.316-.642z"/>
        </svg>
      );
    case "Linux":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FCC624" d="M12.003 0c-3.19 0-5.776 2.586-5.776 5.776 0 1.258.404 2.423 1.09 3.367C6.01 10.457 5.12 12.33 5.12 14.4c0 3.738 2.878 6.784 6.51 7.155-.09.34-.145.698-.145 1.066 0 .762.618 1.379 1.38 1.379h.27c.762 0 1.38-.617 1.38-1.379 0-.368-.055-.726-.145-1.066 3.632-.371 6.51-3.417 6.51-7.155 0-2.07-.89-3.943-2.197-5.257.686-.944 1.09-2.109 1.09-3.367C19.923 2.586 17.337 0 14.147 0h-2.144z"/>
        </svg>
      );
    case "Firebase":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FFCA28" d="M3.89 15.672L6.255.461A.54.54 0 0 1 7.23.235l3.52 6.643-6.86 8.794z"/>
          <path fill="#FFA000" d="M14.14 7.632l-3.39-6.4a.54.54 0 0 0-.96 0L3.89 15.672l10.25-8.04z"/>
          <path fill="#F57C00" d="M20.11 15.672L17.745 3.461a.54.54 0 0 0-.975-.226l-6.99 12.437 10.33 0z"/>
          <path fill="#FFCA28" d="M12.44 23.638a1.5 1.5 0 0 1-1.63 0L.11 17.21a.54.54 0 0 1-.09-.853l11.63-14.7a.54.54 0 0 1 .9 0l11.34 14.7a.54.54 0 0 1-.09.853l-11.36 6.428z"/>
        </svg>
      );
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current text-foreground`}>
          <path d="M24 22.525H0l12-21.05 12 21.05z"/>
        </svg>
      );
    case "OpenCV":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="7" r="4" fill="#5C8DBC" />
          <circle cx="6" cy="17" r="4" fill="#EE1C25" />
          <circle cx="18" cy="17" r="4" fill="#00A651" />
        </svg>
      );
    default:
      return <Box className={`${className} text-primary/70`} />;
  }
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="pb-12 sm:pb-16 scroll-mt-20 md:scroll-mt-24 relative overflow-hidden bg-background/50">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit tracking-tight mb-3">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-3" />
          <p className="text-muted-foreground font-grotesk max-w-xl mx-auto text-sm sm:text-base">
            Technologies and tools I work with to build modern, scalable applications.
          </p>
        </motion.div>

        {/* COMPACT BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {skillCategories.map((cat, index) => {
            const IconComponent = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SpotlightCard
                  spotlightColor="hsl(var(--primary) / 0.16)"
                  className="p-5 relative group h-full"
                >
                  {/* Top Bar: Icon, Title, Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground font-outfit text-base sm:text-lg">
                        {cat.title}
                      </h3>
                    </div>
                    {cat.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.04, y: -1 }}
                        className="text-xs px-3 py-1.5 rounded-lg font-mono border bg-secondary/70 text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/30 group-hover:border-primary/20 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* CORE PROFICIENCY LINES */}
        <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-card/60 border border-border/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground font-outfit">
              Core <span className="text-primary">Proficiency</span>
            </h3>
          </div>

          <div className="space-y-4">
            {coreProficiencies.map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                  <span className="font-medium text-foreground font-outfit flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {item.name}
                  </span>
                  <span className="font-mono font-bold text-primary">{item.level}%</span>
                </div>
                <div className="h-2.5 bg-secondary/80 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.06, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH MARQUEE */}
        <div className="relative overflow-hidden py-4 border-t border-b border-border/70 bg-card/30 rounded-xl">
          <div className="animate-marquee flex gap-6 whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground transition-all duration-200 px-3.5 py-1.5 rounded-lg border border-border/50 bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-sm group cursor-default"
              >
                <TechIcon name={tech} className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
