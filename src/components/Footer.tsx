import React from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Sparkles 
} from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

// Geographically Authentic Dot-Matrix Map of India with Animated Walking Theme Border
const IndiaMap = () => {
  // SVG boundary perimeter path of India matching user coordinates
  const perimeterPath = `
    M 60.40,38.25
    L 67.60,41.85
    L 70.40,48.33
    L 74.80,63.45
    L 82.00,74.25
    L 89.20,77.85
    L 100.00,81.45
    L 114.40,84.44
    L 118.85,84.35
    L 122.52,75.20
    L 140.61,82.03
    L 148.16,72.17
    L 154.47,68.68
    L 159.06,70.02
    L 162.97,67.72
    L 165.53,71.12
    L 170.00,76.32
    L 168.53,80.69
    L 157.53,83.48
    L 154.67,91.21
    L 147.47,102.81
    L 144.11,108.29
    L 138.82,103.13
    L 135.82,100.29
    L 128.56,86.81
    L 121.61,84.18
    L 119.67,87.89
    L 123.62,90.79
    L 120.20,92.83
    L 121.43,99.59
    L 124.17,108.22
    L 123.39,110.21
    L 112.92,111.28
    L 110.31,118.64
    L 102.43,122.32
    L 96.30,128.77
    L 92.19,132.22
    L 86.73,135.80
    L 86.72,138.32
    L 79.06,141.63
    L 74.87,146.10
    L 76.01,153.22
    L 73.98,162.96
    L 73.95,172.26
    L 68.63,176.70
    L 63.46,183.78
    L 60.40,182.25
    L 56.80,175.05
    L 53.20,167.85
    L 49.60,157.05
    L 46.00,146.25
    L 38.80,135.45
    L 38.80,121.05
    L 38.80,110.25
    L 31.60,106.65
    L 20.80,103.05
    L 13.60,99.45
    L 10.00,99.26
    L 13.65,95.61
    L 25.69,95.62
    L 20.91,83.93
    L 17.32,81.47
    L 23.36,75.73
    L 29.71,76.15
    L 35.44,70.41
    L 38.87,64.85
    L 44.19,59.36
    L 40.51,41.09
    L 43.20,38.73
    L 50.46,39.89
    L 57.60,39.25
    Z
  `;

  return (
    <div className="relative w-14 h-18 sm:w-16 sm:h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0 group">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 180 220" 
        role="img" 
        className="w-full h-full text-foreground/40 dark:text-foreground/30 transition-colors duration-300 group-hover:text-foreground/60"
        aria-label="Dot matrix map of India highlighting Hyderabad, Telangana"
      >
        <defs>
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Subtle Base Border Track of India */}
        <path
          d={perimeterPath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.18"
          strokeWidth="0.85"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Single Animated Walking Border Beam in Website Theme Color */}
        <path
          d={perimeterPath}
          pathLength="100"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.6"
          strokeDasharray="15 85"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="animate-single-beam"
          style={{
            filter: "drop-shadow(0 0 4px hsl(var(--primary)))"
          }}
        />

        {/* Interior Dot Matrix */}
        <g fill="currentColor" opacity="0.45">
          <circle cx="60.40" cy="38.25" r="0.85"/><circle cx="64.00" cy="38.25" r="0.85"/><circle cx="42.40" cy="41.85" r="0.85"/><circle cx="46.00" cy="41.85" r="0.85"/><circle cx="49.60" cy="41.85" r="0.85"/><circle cx="53.20" cy="41.85" r="0.85"/><circle cx="56.80" cy="41.85" r="0.85"/><circle cx="60.40" cy="41.85" r="0.85"/><circle cx="64.00" cy="41.85" r="0.85"/><circle cx="67.60" cy="41.85" r="0.85"/><circle cx="42.40" cy="45.45" r="0.85"/><circle cx="46.00" cy="45.45" r="0.85"/><circle cx="49.60" cy="45.45" r="0.85"/><circle cx="53.20" cy="45.45" r="0.85"/><circle cx="56.80" cy="45.45" r="0.85"/><circle cx="60.40" cy="45.45" r="0.85"/><circle cx="64.00" cy="45.45" r="0.85"/><circle cx="67.60" cy="45.45" r="0.85"/><circle cx="46.00" cy="49.05" r="0.85"/><circle cx="49.60" cy="49.05" r="0.85"/><circle cx="53.20" cy="49.05" r="0.85"/><circle cx="56.80" cy="49.05" r="0.85"/><circle cx="60.40" cy="49.05" r="0.85"/><circle cx="64.00" cy="49.05" r="0.85"/><circle cx="67.60" cy="49.05" r="0.85"/><circle cx="49.60" cy="52.65" r="0.85"/><circle cx="53.20" cy="52.65" r="0.85"/><circle cx="56.80" cy="52.65" r="0.85"/><circle cx="60.40" cy="52.65" r="0.85"/><circle cx="64.00" cy="52.65" r="0.85"/><circle cx="46.00" cy="56.25" r="0.85"/><circle cx="49.60" cy="56.25" r="0.85"/><circle cx="53.20" cy="56.25" r="0.85"/><circle cx="56.80" cy="56.25" r="0.85"/><circle cx="60.40" cy="56.25" r="0.85"/><circle cx="64.00" cy="56.25" r="0.85"/><circle cx="67.60" cy="56.25" r="0.85"/><circle cx="46.00" cy="59.85" r="0.85"/><circle cx="49.60" cy="59.85" r="0.85"/><circle cx="53.20" cy="59.85" r="0.85"/><circle cx="56.80" cy="59.85" r="0.85"/><circle cx="60.40" cy="59.85" r="0.85"/><circle cx="64.00" cy="59.85" r="0.85"/><circle cx="67.60" cy="59.85" r="0.85"/><circle cx="71.20" cy="59.85" r="0.85"/><circle cx="42.40" cy="63.45" r="0.85"/><circle cx="46.00" cy="63.45" r="0.85"/><circle cx="49.60" cy="63.45" r="0.85"/><circle cx="53.20" cy="63.45" r="0.85"/><circle cx="56.80" cy="63.45" r="0.85"/><circle cx="60.40" cy="63.45" r="0.85"/><circle cx="64.00" cy="63.45" r="0.85"/><circle cx="67.60" cy="63.45" r="0.85"/><circle cx="71.20" cy="63.45" r="0.85"/><circle cx="74.80" cy="63.45" r="0.85"/><circle cx="78.40" cy="63.45" r="0.85"/><circle cx="38.80" cy="67.05" r="0.85"/><circle cx="42.40" cy="67.05" r="0.85"/><circle cx="46.00" cy="67.05" r="0.85"/><circle cx="49.60" cy="67.05" r="0.85"/><circle cx="53.20" cy="67.05" r="0.85"/><circle cx="56.80" cy="67.05" r="0.85"/><circle cx="60.40" cy="67.05" r="0.85"/><circle cx="64.00" cy="67.05" r="0.85"/><circle cx="67.60" cy="67.05" r="0.85"/><circle cx="71.20" cy="67.05" r="0.85"/><circle cx="74.80" cy="67.05" r="0.85"/><circle cx="38.80" cy="70.65" r="0.85"/><circle cx="42.40" cy="70.65" r="0.85"/><circle cx="46.00" cy="70.65" r="0.85"/><circle cx="49.60" cy="70.65" r="0.85"/><circle cx="53.20" cy="70.65" r="0.85"/><circle cx="56.80" cy="70.65" r="0.85"/><circle cx="60.40" cy="70.65" r="0.85"/><circle cx="64.00" cy="70.65" r="0.85"/><circle cx="67.60" cy="70.65" r="0.85"/><circle cx="71.20" cy="70.65" r="0.85"/><circle cx="74.80" cy="70.65" r="0.85"/><circle cx="154.00" cy="70.65" r="0.85"/><circle cx="157.60" cy="70.65" r="0.85"/><circle cx="161.20" cy="70.65" r="0.85"/><circle cx="164.80" cy="70.65" r="0.85"/><circle cx="35.20" cy="74.25" r="0.85"/><circle cx="38.80" cy="74.25" r="0.85"/><circle cx="42.40" cy="74.25" r="0.85"/><circle cx="46.00" cy="74.25" r="0.85"/><circle cx="49.60" cy="74.25" r="0.85"/><circle cx="53.20" cy="74.25" r="0.85"/><circle cx="56.80" cy="74.25" r="0.85"/><circle cx="60.40" cy="74.25" r="0.85"/><circle cx="64.00" cy="74.25" r="0.85"/><circle cx="67.60" cy="74.25" r="0.85"/><circle cx="71.20" cy="74.25" r="0.85"/><circle cx="74.80" cy="74.25" r="0.85"/><circle cx="78.40" cy="74.25" r="0.85"/><circle cx="82.00" cy="74.25" r="0.85"/><circle cx="146.80" cy="74.25" r="0.85"/><circle cx="150.40" cy="74.25" r="0.85"/><circle cx="154.00" cy="74.25" r="0.85"/><circle cx="157.60" cy="74.25" r="0.85"/><circle cx="161.20" cy="74.25" r="0.85"/><circle cx="164.80" cy="74.25" r="0.85"/><circle cx="168.40" cy="74.25" r="0.85"/><circle cx="24.40" cy="77.85" r="0.85"/><circle cx="28.00" cy="77.85" r="0.85"/><circle cx="31.60" cy="77.85" r="0.85"/><circle cx="35.20" cy="77.85" r="0.85"/><circle cx="38.80" cy="77.85" r="0.85"/><circle cx="42.40" cy="77.85" r="0.85"/><circle cx="46.00" cy="77.85" r="0.85"/><circle cx="49.60" cy="77.85" r="0.85"/><circle cx="53.20" cy="77.85" r="0.85"/><circle cx="56.80" cy="77.85" r="0.85"/><circle cx="60.40" cy="77.85" r="0.85"/><circle cx="64.00" cy="77.85" r="0.85"/><circle cx="67.60" cy="77.85" r="0.85"/><circle cx="71.20" cy="77.85" r="0.85"/><circle cx="74.80" cy="77.85" r="0.85"/><circle cx="78.40" cy="77.85" r="0.85"/><circle cx="82.00" cy="77.85" r="0.85"/><circle cx="85.60" cy="77.85" r="0.85"/><circle cx="89.20" cy="77.85" r="0.85"/><circle cx="121.60" cy="77.85" r="0.85"/><circle cx="143.20" cy="77.85" r="0.85"/><circle cx="146.80" cy="77.85" r="0.85"/><circle cx="150.40" cy="77.85" r="0.85"/><circle cx="154.00" cy="77.85" r="0.85"/><circle cx="157.60" cy="77.85" r="0.85"/><circle cx="161.20" cy="77.85" r="0.85"/><circle cx="164.80" cy="77.85" r="0.85"/><circle cx="20.80" cy="81.45" r="0.85"/><circle cx="24.40" cy="81.45" r="0.85"/><circle cx="28.00" cy="81.45" r="0.85"/><circle cx="31.60" cy="81.45" r="0.85"/><circle cx="35.20" cy="81.45" r="0.85"/><circle cx="38.80" cy="81.45" r="0.85"/><circle cx="42.40" cy="81.45" r="0.85"/><circle cx="46.00" cy="81.45" r="0.85"/><circle cx="49.60" cy="81.45" r="0.85"/><circle cx="53.20" cy="81.45" r="0.85"/><circle cx="56.80" cy="81.45" r="0.85"/><circle cx="60.40" cy="81.45" r="0.85"/><circle cx="64.00" cy="81.45" r="0.85"/><circle cx="67.60" cy="81.45" r="0.85"/><circle cx="71.20" cy="81.45" r="0.85"/><circle cx="74.80" cy="81.45" r="0.85"/><circle cx="78.40" cy="81.45" r="0.85"/><circle cx="82.00" cy="81.45" r="0.85"/><circle cx="85.60" cy="81.45" r="0.85"/><circle cx="89.20" cy="81.45" r="0.85"/><circle cx="92.80" cy="81.45" r="0.85"/><circle cx="96.40" cy="81.45" r="0.85"/><circle cx="100.00" cy="81.45" r="0.85"/><circle cx="121.60" cy="81.45" r="0.85"/><circle cx="143.20" cy="81.45" r="0.85"/><circle cx="146.80" cy="81.45" r="0.85"/><circle cx="150.40" cy="81.45" r="0.85"/><circle cx="154.00" cy="81.45" r="0.85"/><circle cx="157.60" cy="81.45" r="0.85"/><circle cx="161.20" cy="81.45" r="0.85"/><circle cx="24.40" cy="85.05" r="0.85"/><circle cx="28.00" cy="85.05" r="0.85"/><circle cx="31.60" cy="85.05" r="0.85"/><circle cx="35.20" cy="85.05" r="0.85"/><circle cx="38.80" cy="85.05" r="0.85"/><circle cx="42.40" cy="85.05" r="0.85"/><circle cx="46.00" cy="85.05" r="0.85"/><circle cx="49.60" cy="85.05" r="0.85"/><circle cx="53.20" cy="85.05" r="0.85"/><circle cx="56.80" cy="85.05" r="0.85"/><circle cx="60.40" cy="85.05" r="0.85"/><circle cx="64.00" cy="85.05" r="0.85"/><circle cx="67.60" cy="85.05" r="0.85"/><circle cx="71.20" cy="85.05" r="0.85"/><circle cx="74.80" cy="85.05" r="0.85"/><circle cx="78.40" cy="85.05" r="0.85"/><circle cx="82.00" cy="85.05" r="0.85"/><circle cx="85.60" cy="85.05" r="0.85"/><circle cx="89.20" cy="85.05" r="0.85"/><circle cx="92.80" cy="85.05" r="0.85"/><circle cx="96.40" cy="85.05" r="0.85"/><circle cx="100.00" cy="85.05" r="0.85"/><circle cx="103.60" cy="85.05" r="0.85"/><circle cx="107.20" cy="85.05" r="0.85"/><circle cx="110.80" cy="85.05" r="0.85"/><circle cx="114.40" cy="85.05" r="0.85"/><circle cx="118.00" cy="85.05" r="0.85"/><circle cx="125.20" cy="85.05" r="0.85"/><circle cx="128.80" cy="85.05" r="0.85"/><circle cx="132.40" cy="85.05" r="0.85"/><circle cx="136.00" cy="85.05" r="0.85"/><circle cx="139.60" cy="85.05" r="0.85"/><circle cx="143.20" cy="85.05" r="0.85"/><circle cx="146.80" cy="85.05" r="0.85"/><circle cx="150.40" cy="85.05" r="0.85"/><circle cx="154.00" cy="85.05" r="0.85"/><circle cx="157.60" cy="85.05" r="0.85"/><circle cx="24.40" cy="88.65" r="0.85"/><circle cx="28.00" cy="88.65" r="0.85"/><circle cx="31.60" cy="88.65" r="0.85"/><circle cx="35.20" cy="88.65" r="0.85"/><circle cx="38.80" cy="88.65" r="0.85"/><circle cx="42.40" cy="88.65" r="0.85"/><circle cx="46.00" cy="88.65" r="0.85"/><circle cx="49.60" cy="88.65" r="0.85"/><circle cx="53.20" cy="88.65" r="0.85"/><circle cx="56.80" cy="88.65" r="0.85"/><circle cx="60.40" cy="88.65" r="0.85"/><circle cx="64.00" cy="88.65" r="0.85"/><circle cx="67.60" cy="88.65" r="0.85"/><circle cx="71.20" cy="88.65" r="0.85"/><circle cx="74.80" cy="88.65" r="0.85"/><circle cx="78.40" cy="88.65" r="0.85"/><circle cx="82.00" cy="88.65" r="0.85"/><circle cx="85.60" cy="88.65" r="0.85"/><circle cx="89.20" cy="88.65" r="0.85"/><circle cx="92.80" cy="88.65" r="0.85"/><circle cx="96.40" cy="88.65" r="0.85"/><circle cx="100.00" cy="88.65" r="0.85"/><circle cx="103.60" cy="88.65" r="0.85"/><circle cx="107.20" cy="88.65" r="0.85"/><circle cx="110.80" cy="88.65" r="0.85"/><circle cx="114.40" cy="88.65" r="0.85"/><circle cx="118.00" cy="88.65" r="0.85"/><circle cx="128.80" cy="88.65" r="0.85"/><circle cx="132.40" cy="88.65" r="0.85"/><circle cx="136.00" cy="88.65" r="0.85"/><circle cx="139.60" cy="88.65" r="0.85"/><circle cx="143.20" cy="88.65" r="0.85"/><circle cx="146.80" cy="88.65" r="0.85"/><circle cx="150.40" cy="88.65" r="0.85"/><circle cx="154.00" cy="88.65" r="0.85"/><circle cx="28.00" cy="92.25" r="0.85"/><circle cx="31.60" cy="92.25" r="0.85"/><circle cx="35.20" cy="92.25" r="0.85"/><circle cx="38.80" cy="92.25" r="0.85"/><circle cx="42.40" cy="92.25" r="0.85"/><circle cx="46.00" cy="92.25" r="0.85"/><circle cx="49.60" cy="92.25" r="0.85"/><circle cx="53.20" cy="92.25" r="0.85"/><circle cx="56.80" cy="92.25" r="0.85"/><circle cx="60.40" cy="92.25" r="0.85"/><circle cx="64.00" cy="92.25" r="0.85"/><circle cx="67.60" cy="92.25" r="0.85"/><circle cx="71.20" cy="92.25" r="0.85"/><circle cx="74.80" cy="92.25" r="0.85"/><circle cx="78.40" cy="92.25" r="0.85"/><circle cx="82.00" cy="92.25" r="0.85"/><circle cx="85.60" cy="92.25" r="0.85"/><circle cx="89.20" cy="92.25" r="0.85"/><circle cx="92.80" cy="92.25" r="0.85"/><circle cx="96.40" cy="92.25" r="0.85"/><circle cx="100.00" cy="92.25" r="0.85"/><circle cx="103.60" cy="92.25" r="0.85"/><circle cx="107.20" cy="92.25" r="0.85"/><circle cx="110.80" cy="92.25" r="0.85"/><circle cx="114.40" cy="92.25" r="0.85"/><circle cx="118.00" cy="92.25" r="0.85"/><circle cx="143.20" cy="92.25" r="0.85"/><circle cx="146.80" cy="92.25" r="0.85"/><circle cx="150.40" cy="92.25" r="0.85"/><circle cx="154.00" cy="92.25" r="0.85"/><circle cx="13.60" cy="95.85" r="0.85"/><circle cx="17.20" cy="95.85" r="0.85"/><circle cx="20.80" cy="95.85" r="0.85"/><circle cx="24.40" cy="95.85" r="0.85"/><circle cx="28.00" cy="95.85" r="0.85"/><circle cx="31.60" cy="95.85" r="0.85"/><circle cx="35.20" cy="95.85" r="0.85"/><circle cx="38.80" cy="95.85" r="0.85"/><circle cx="42.40" cy="95.85" r="0.85"/><circle cx="46.00" cy="95.85" r="0.85"/><circle cx="49.60" cy="95.85" r="0.85"/><circle cx="53.20" cy="95.85" r="0.85"/><circle cx="56.80" cy="95.85" r="0.85"/><circle cx="60.40" cy="95.85" r="0.85"/><circle cx="64.00" cy="95.85" r="0.85"/><circle cx="67.60" cy="95.85" r="0.85"/><circle cx="71.20" cy="95.85" r="0.85"/><circle cx="74.80" cy="95.85" r="0.85"/><circle cx="78.40" cy="95.85" r="0.85"/><circle cx="82.00" cy="95.85" r="0.85"/><circle cx="85.60" cy="95.85" r="0.85"/><circle cx="89.20" cy="95.85" r="0.85"/><circle cx="92.80" cy="95.85" r="0.85"/><circle cx="96.40" cy="95.85" r="0.85"/><circle cx="100.00" cy="95.85" r="0.85"/><circle cx="103.60" cy="95.85" r="0.85"/><circle cx="107.20" cy="95.85" r="0.85"/><circle cx="110.80" cy="95.85" r="0.85"/><circle cx="114.40" cy="95.85" r="0.85"/><circle cx="118.00" cy="95.85" r="0.85"/><circle cx="143.20" cy="95.85" r="0.85"/><circle cx="146.80" cy="95.85" r="0.85"/><circle cx="150.40" cy="95.85" r="0.85"/><circle cx="13.60" cy="99.45" r="0.85"/><circle cx="17.20" cy="99.45" r="0.85"/><circle cx="20.80" cy="99.45" r="0.85"/><circle cx="24.40" cy="99.45" r="0.85"/><circle cx="28.00" cy="99.45" r="0.85"/><circle cx="31.60" cy="99.45" r="0.85"/><circle cx="35.20" cy="99.45" r="0.85"/><circle cx="38.80" cy="99.45" r="0.85"/><circle cx="42.40" cy="99.45" r="0.85"/><circle cx="46.00" cy="99.45" r="0.85"/><circle cx="49.60" cy="99.45" r="0.85"/><circle cx="53.20" cy="99.45" r="0.85"/><circle cx="56.80" cy="99.45" r="0.85"/><circle cx="60.40" cy="99.45" r="0.85"/><circle cx="64.00" cy="99.45" r="0.85"/><circle cx="67.60" cy="99.45" r="0.85"/><circle cx="71.20" cy="99.45" r="0.85"/><circle cx="74.80" cy="99.45" r="0.85"/><circle cx="78.40" cy="99.45" r="0.85"/><circle cx="82.00" cy="99.45" r="0.85"/><circle cx="85.60" cy="99.45" r="0.85"/><circle cx="89.20" cy="99.45" r="0.85"/><circle cx="92.80" cy="99.45" r="0.85"/><circle cx="96.40" cy="99.45" r="0.85"/><circle cx="100.00" cy="99.45" r="0.85"/><circle cx="103.60" cy="99.45" r="0.85"/><circle cx="107.20" cy="99.45" r="0.85"/><circle cx="110.80" cy="99.45" r="0.85"/><circle cx="114.40" cy="99.45" r="0.85"/><circle cx="118.00" cy="99.45" r="0.85"/><circle cx="139.60" cy="99.45" r="0.85"/><circle cx="143.20" cy="99.45" r="0.85"/><circle cx="146.80" cy="99.45" r="0.85"/><circle cx="17.20" cy="103.05" r="0.85"/><circle cx="20.80" cy="103.05" r="0.85"/><circle cx="24.40" cy="103.05" r="0.85"/><circle cx="28.00" cy="103.05" r="0.85"/><circle cx="31.60" cy="103.05" r="0.85"/><circle cx="35.20" cy="103.05" r="0.85"/><circle cx="38.80" cy="103.05" r="0.85"/><circle cx="42.40" cy="103.05" r="0.85"/><circle cx="46.00" cy="103.05" r="0.85"/><circle cx="49.60" cy="103.05" r="0.85"/><circle cx="53.20" cy="103.05" r="0.85"/><circle cx="56.80" cy="103.05" r="0.85"/><circle cx="60.40" cy="103.05" r="0.85"/><circle cx="64.00" cy="103.05" r="0.85"/><circle cx="67.60" cy="103.05" r="0.85"/><circle cx="71.20" cy="103.05" r="0.85"/><circle cx="74.80" cy="103.05" r="0.85"/><circle cx="78.40" cy="103.05" r="0.85"/><circle cx="82.00" cy="103.05" r="0.85"/><circle cx="85.60" cy="103.05" r="0.85"/><circle cx="89.20" cy="103.05" r="0.85"/><circle cx="92.80" cy="103.05" r="0.85"/><circle cx="96.40" cy="103.05" r="0.85"/><circle cx="100.00" cy="103.05" r="0.85"/><circle cx="103.60" cy="103.05" r="0.85"/><circle cx="107.20" cy="103.05" r="0.85"/><circle cx="110.80" cy="103.05" r="0.85"/><circle cx="114.40" cy="103.05" r="0.85"/><circle cx="118.00" cy="103.05" r="0.85"/><circle cx="121.60" cy="103.05" r="0.85"/><circle cx="143.20" cy="103.05" r="0.85"/><circle cx="146.80" cy="103.05" r="0.85"/><circle cx="20.80" cy="106.65" r="0.85"/><circle cx="24.40" cy="106.65" r="0.85"/><circle cx="28.00" cy="106.65" r="0.85"/><circle cx="31.60" cy="106.65" r="0.85"/><circle cx="35.20" cy="106.65" r="0.85"/><circle cx="38.80" cy="106.65" r="0.85"/><circle cx="42.40" cy="106.65" r="0.85"/><circle cx="46.00" cy="106.65" r="0.85"/><circle cx="49.60" cy="106.65" r="0.85"/><circle cx="53.20" cy="106.65" r="0.85"/><circle cx="56.80" cy="106.65" r="0.85"/><circle cx="60.40" cy="106.65" r="0.85"/><circle cx="64.00" cy="106.65" r="0.85"/><circle cx="67.60" cy="106.65" r="0.85"/><circle cx="71.20" cy="106.65" r="0.85"/><circle cx="74.80" cy="106.65" r="0.85"/><circle cx="78.40" cy="106.65" r="0.85"/><circle cx="82.00" cy="106.65" r="0.85"/><circle cx="85.60" cy="106.65" r="0.85"/><circle cx="89.20" cy="106.65" r="0.85"/><circle cx="92.80" cy="106.65" r="0.85"/><circle cx="96.40" cy="106.65" r="0.85"/><circle cx="100.00" cy="106.65" r="0.85"/><circle cx="103.60" cy="106.65" r="0.85"/><circle cx="107.20" cy="106.65" r="0.85"/><circle cx="110.80" cy="106.65" r="0.85"/><circle cx="114.40" cy="106.65" r="0.85"/><circle cx="118.00" cy="106.65" r="0.85"/><circle cx="121.60" cy="106.65" r="0.85"/><circle cx="20.80" cy="110.25" r="0.85"/><circle cx="24.40" cy="110.25" r="0.85"/><circle cx="28.00" cy="110.25" r="0.85"/><circle cx="31.60" cy="110.25" r="0.85"/><circle cx="35.20" cy="110.25" r="0.85"/><circle cx="38.80" cy="110.25" r="0.85"/><circle cx="42.40" cy="110.25" r="0.85"/><circle cx="46.00" cy="110.25" r="0.85"/><circle cx="49.60" cy="110.25" r="0.85"/><circle cx="53.20" cy="110.25" r="0.85"/><circle cx="56.80" cy="110.25" r="0.85"/><circle cx="60.40" cy="110.25" r="0.85"/><circle cx="64.00" cy="110.25" r="0.85"/><circle cx="67.60" cy="110.25" r="0.85"/><circle cx="71.20" cy="110.25" r="0.85"/><circle cx="74.80" cy="110.25" r="0.85"/><circle cx="78.40" cy="110.25" r="0.85"/><circle cx="82.00" cy="110.25" r="0.85"/><circle cx="85.60" cy="110.25" r="0.85"/><circle cx="89.20" cy="110.25" r="0.85"/><circle cx="92.80" cy="110.25" r="0.85"/><circle cx="96.40" cy="110.25" r="0.85"/><circle cx="100.00" cy="110.25" r="0.85"/><circle cx="103.60" cy="110.25" r="0.85"/><circle cx="107.20" cy="110.25" r="0.85"/><circle cx="110.80" cy="110.25" r="0.85"/><circle cx="114.40" cy="110.25" r="0.85"/><circle cx="118.00" cy="110.25" r="0.85"/><circle cx="24.40" cy="113.85" r="0.85"/><circle cx="28.00" cy="113.85" r="0.85"/><circle cx="35.20" cy="113.85" r="0.85"/><circle cx="38.80" cy="113.85" r="0.85"/><circle cx="42.40" cy="113.85" r="0.85"/><circle cx="46.00" cy="113.85" r="0.85"/><circle cx="49.60" cy="113.85" r="0.85"/><circle cx="53.20" cy="113.85" r="0.85"/><circle cx="56.80" cy="113.85" r="0.85"/><circle cx="60.40" cy="113.85" r="0.85"/><circle cx="64.00" cy="113.85" r="0.85"/><circle cx="67.60" cy="113.85" r="0.85"/><circle cx="71.20" cy="113.85" r="0.85"/><circle cx="74.80" cy="113.85" r="0.85"/><circle cx="78.40" cy="113.85" r="0.85"/><circle cx="82.00" cy="113.85" r="0.85"/><circle cx="85.60" cy="113.85" r="0.85"/><circle cx="89.20" cy="113.85" r="0.85"/><circle cx="92.80" cy="113.85" r="0.85"/><circle cx="96.40" cy="113.85" r="0.85"/><circle cx="100.00" cy="113.85" r="0.85"/><circle cx="103.60" cy="113.85" r="0.85"/><circle cx="107.20" cy="113.85" r="0.85"/><circle cx="110.80" cy="113.85" r="0.85"/><circle cx="38.80" cy="117.45" r="0.85"/><circle cx="42.40" cy="117.45" r="0.85"/><circle cx="46.00" cy="117.45" r="0.85"/><circle cx="49.60" cy="117.45" r="0.85"/><circle cx="53.20" cy="117.45" r="0.85"/><circle cx="56.80" cy="117.45" r="0.85"/><circle cx="60.40" cy="117.45" r="0.85"/><circle cx="64.00" cy="117.45" r="0.85"/><circle cx="67.60" cy="117.45" r="0.85"/><circle cx="71.20" cy="117.45" r="0.85"/><circle cx="74.80" cy="117.45" r="0.85"/><circle cx="78.40" cy="117.45" r="0.85"/><circle cx="82.00" cy="117.45" r="0.85"/><circle cx="85.60" cy="117.45" r="0.85"/><circle cx="89.20" cy="117.45" r="0.85"/><circle cx="92.80" cy="117.45" r="0.85"/><circle cx="96.40" cy="117.45" r="0.85"/><circle cx="100.00" cy="117.45" r="0.85"/><circle cx="103.60" cy="117.45" r="0.85"/><circle cx="107.20" cy="117.45" r="0.85"/><circle cx="110.80" cy="117.45" r="0.85"/><circle cx="38.80" cy="121.05" r="0.85"/><circle cx="42.40" cy="121.05" r="0.85"/><circle cx="46.00" cy="121.05" r="0.85"/><circle cx="49.60" cy="121.05" r="0.85"/><circle cx="53.20" cy="121.05" r="0.85"/><circle cx="56.80" cy="121.05" r="0.85"/><circle cx="60.40" cy="121.05" r="0.85"/><circle cx="64.00" cy="121.05" r="0.85"/><circle cx="67.60" cy="121.05" r="0.85"/><circle cx="71.20" cy="121.05" r="0.85"/><circle cx="74.80" cy="121.05" r="0.85"/><circle cx="78.40" cy="121.05" r="0.85"/><circle cx="82.00" cy="121.05" r="0.85"/><circle cx="85.60" cy="121.05" r="0.85"/><circle cx="89.20" cy="121.05" r="0.85"/><circle cx="92.80" cy="121.05" r="0.85"/><circle cx="96.40" cy="121.05" r="0.85"/><circle cx="100.00" cy="121.05" r="0.85"/><circle cx="103.60" cy="121.05" r="0.85"/><circle cx="38.80" cy="124.65" r="0.85"/><circle cx="42.40" cy="124.65" r="0.85"/><circle cx="46.00" cy="124.65" r="0.85"/><circle cx="49.60" cy="124.65" r="0.85"/><circle cx="53.20" cy="124.65" r="0.85"/><circle cx="56.80" cy="124.65" r="0.85"/><circle cx="60.40" cy="124.65" r="0.85"/><circle cx="64.00" cy="124.65" r="0.85"/><circle cx="67.60" cy="124.65" r="0.85"/><circle cx="71.20" cy="124.65" r="0.85"/><circle cx="74.80" cy="124.65" r="0.85"/><circle cx="78.40" cy="124.65" r="0.85"/><circle cx="82.00" cy="124.65" r="0.85"/><circle cx="85.60" cy="124.65" r="0.85"/><circle cx="89.20" cy="124.65" r="0.85"/><circle cx="92.80" cy="124.65" r="0.85"/><circle cx="96.40" cy="124.65" r="0.85"/><circle cx="100.00" cy="124.65" r="0.85"/><circle cx="38.80" cy="128.25" r="0.85"/><circle cx="42.40" cy="128.25" r="0.85"/><circle cx="46.00" cy="128.25" r="0.85"/><circle cx="49.60" cy="128.25" r="0.85"/><circle cx="53.20" cy="128.25" r="0.85"/><circle cx="56.80" cy="128.25" r="0.85"/><circle cx="60.40" cy="128.25" r="0.85"/><circle cx="64.00" cy="128.25" r="0.85"/><circle cx="67.60" cy="128.25" r="0.85"/><circle cx="71.20" cy="128.25" r="0.85"/><circle cx="74.80" cy="128.25" r="0.85"/><circle cx="78.40" cy="128.25" r="0.85"/><circle cx="82.00" cy="128.25" r="0.85"/><circle cx="85.60" cy="128.25" r="0.85"/><circle cx="89.20" cy="128.25" r="0.85"/><circle cx="92.80" cy="128.25" r="0.85"/><circle cx="96.40" cy="128.25" r="0.85"/><circle cx="38.80" cy="131.85" r="0.85"/><circle cx="42.40" cy="131.85" r="0.85"/><circle cx="46.00" cy="131.85" r="0.85"/><circle cx="49.60" cy="131.85" r="0.85"/><circle cx="53.20" cy="131.85" r="0.85"/><circle cx="56.80" cy="131.85" r="0.85"/><circle cx="60.40" cy="131.85" r="0.85"/><circle cx="64.00" cy="131.85" r="0.85"/><circle cx="67.60" cy="131.85" r="0.85"/><circle cx="71.20" cy="131.85" r="0.85"/><circle cx="74.80" cy="131.85" r="0.85"/><circle cx="78.40" cy="131.85" r="0.85"/><circle cx="82.00" cy="131.85" r="0.85"/><circle cx="85.60" cy="131.85" r="0.85"/><circle cx="89.20" cy="131.85" r="0.85"/><circle cx="38.80" cy="135.45" r="0.85"/><circle cx="42.40" cy="135.45" r="0.85"/><circle cx="46.00" cy="135.45" r="0.85"/><circle cx="49.60" cy="135.45" r="0.85"/><circle cx="53.20" cy="135.45" r="0.85"/><circle cx="56.80" cy="135.45" r="0.85"/><circle cx="60.40" cy="135.45" r="0.85"/><circle cx="64.00" cy="135.45" r="0.85"/><circle cx="67.60" cy="135.45" r="0.85"/><circle cx="71.20" cy="135.45" r="0.85"/><circle cx="74.80" cy="135.45" r="0.85"/><circle cx="78.40" cy="135.45" r="0.85"/><circle cx="82.00" cy="135.45" r="0.85"/><circle cx="85.60" cy="135.45" r="0.85"/><circle cx="42.40" cy="139.05" r="0.85"/><circle cx="46.00" cy="139.05" r="0.85"/><circle cx="49.60" cy="139.05" r="0.85"/><circle cx="53.20" cy="139.05" r="0.85"/><circle cx="56.80" cy="139.05" r="0.85"/><circle cx="60.40" cy="139.05" r="0.85"/><circle cx="64.00" cy="139.05" r="0.85"/><circle cx="67.60" cy="139.05" r="0.85"/><circle cx="71.20" cy="139.05" r="0.85"/><circle cx="74.80" cy="139.05" r="0.85"/><circle cx="78.40" cy="139.05" r="0.85"/><circle cx="82.00" cy="139.05" r="0.85"/><circle cx="42.40" cy="142.65" r="0.85"/><circle cx="46.00" cy="142.65" r="0.85"/><circle cx="49.60" cy="142.65" r="0.85"/><circle cx="53.20" cy="142.65" r="0.85"/><circle cx="56.80" cy="142.65" r="0.85"/><circle cx="60.40" cy="142.65" r="0.85"/><circle cx="64.00" cy="142.65" r="0.85"/><circle cx="67.60" cy="142.65" r="0.85"/><circle cx="71.20" cy="142.65" r="0.85"/><circle cx="74.80" cy="142.65" r="0.85"/><circle cx="46.00" cy="146.25" r="0.85"/><circle cx="49.60" cy="146.25" r="0.85"/><circle cx="53.20" cy="146.25" r="0.85"/><circle cx="56.80" cy="146.25" r="0.85"/><circle cx="60.40" cy="146.25" r="0.85"/><circle cx="64.00" cy="146.25" r="0.85"/><circle cx="67.60" cy="146.25" r="0.85"/><circle cx="71.20" cy="146.25" r="0.85"/><circle cx="74.80" cy="146.25" r="0.85"/><circle cx="46.00" cy="149.85" r="0.85"/><circle cx="49.60" cy="149.85" r="0.85"/><circle cx="53.20" cy="149.85" r="0.85"/><circle cx="56.80" cy="149.85" r="0.85"/><circle cx="60.40" cy="149.85" r="0.85"/><circle cx="64.00" cy="149.85" r="0.85"/><circle cx="67.60" cy="149.85" r="0.85"/><circle cx="71.20" cy="149.85" r="0.85"/><circle cx="74.80" cy="149.85" r="0.85"/><circle cx="46.00" cy="153.45" r="0.85"/><circle cx="49.60" cy="153.45" r="0.85"/><circle cx="53.20" cy="153.45" r="0.85"/><circle cx="56.80" cy="153.45" r="0.85"/><circle cx="60.40" cy="153.45" r="0.85"/><circle cx="64.00" cy="153.45" r="0.85"/><circle cx="67.60" cy="153.45" r="0.85"/><circle cx="71.20" cy="153.45" r="0.85"/><circle cx="74.80" cy="153.45" r="0.85"/><circle cx="49.60" cy="157.05" r="0.85"/><circle cx="53.20" cy="157.05" r="0.85"/><circle cx="56.80" cy="157.05" r="0.85"/><circle cx="60.40" cy="157.05" r="0.85"/><circle cx="64.00" cy="157.05" r="0.85"/><circle cx="67.60" cy="157.05" r="0.85"/><circle cx="71.20" cy="157.05" r="0.85"/><circle cx="74.80" cy="157.05" r="0.85"/><circle cx="49.60" cy="160.65" r="0.85"/><circle cx="53.20" cy="160.65" r="0.85"/><circle cx="56.80" cy="160.65" r="0.85"/><circle cx="60.40" cy="160.65" r="0.85"/><circle cx="64.00" cy="160.65" r="0.85"/><circle cx="67.60" cy="160.65" r="0.85"/><circle cx="71.20" cy="160.65" r="0.85"/><circle cx="74.80" cy="160.65" r="0.85"/><circle cx="49.60" cy="164.25" r="0.85"/><circle cx="53.20" cy="164.25" r="0.85"/><circle cx="56.80" cy="164.25" r="0.85"/><circle cx="60.40" cy="164.25" r="0.85"/><circle cx="64.00" cy="164.25" r="0.85"/><circle cx="67.60" cy="164.25" r="0.85"/><circle cx="71.20" cy="164.25" r="0.85"/><circle cx="53.20" cy="167.85" r="0.85"/><circle cx="56.80" cy="167.85" r="0.85"/><circle cx="60.40" cy="167.85" r="0.85"/><circle cx="64.00" cy="167.85" r="0.85"/><circle cx="67.60" cy="167.85" r="0.85"/><circle cx="71.20" cy="167.85" r="0.85"/><circle cx="53.20" cy="171.45" r="0.85"/><circle cx="56.80" cy="171.45" r="0.85"/><circle cx="60.40" cy="171.45" r="0.85"/><circle cx="64.00" cy="171.45" r="0.85"/><circle cx="67.60" cy="171.45" r="0.85"/><circle cx="71.20" cy="171.45" r="0.85"/><circle cx="56.80" cy="175.05" r="0.85"/><circle cx="60.40" cy="175.05" r="0.85"/><circle cx="64.00" cy="175.05" r="0.85"/><circle cx="67.60" cy="175.05" r="0.85"/><circle cx="56.80" cy="178.65" r="0.85"/><circle cx="60.40" cy="178.65" r="0.85"/><circle cx="64.00" cy="178.65" r="0.85"/><circle cx="67.60" cy="178.65" r="0.85"/><circle cx="60.40" cy="182.25" r="0.85"/><circle cx="64.00" cy="182.25" r="0.85"/>
        </g>

        <g fill="currentColor" opacity="0.65">
          <circle cx="169.59" cy="74.24" r="0.95"/><circle cx="169.79" cy="75.28" r="0.95"/><circle cx="170.00" cy="76.32" r="0.95"/><circle cx="169.04" cy="76.82" r="0.95"/><circle cx="168.08" cy="77.32" r="0.95"/><circle cx="168.23" cy="78.44" r="0.95"/><circle cx="168.38" cy="79.57" r="0.95"/><circle cx="168.53" cy="80.69" r="0.95"/><circle cx="167.55" cy="80.44" r="0.95"/><circle cx="166.57" cy="80.19" r="0.95"/><circle cx="165.60" cy="79.95" r="0.95"/><circle cx="164.62" cy="79.70" r="0.95"/><circle cx="163.73" cy="80.17" r="0.95"/><circle cx="162.85" cy="80.64" r="0.95"/><circle cx="161.96" cy="81.12" r="0.95"/><circle cx="161.07" cy="81.59" r="0.95"/><circle cx="160.19" cy="82.06" r="0.95"/><circle cx="159.30" cy="82.54" r="0.95"/><circle cx="158.42" cy="83.01" r="0.95"/><circle cx="157.53" cy="83.48" r="0.95"/><circle cx="157.59" cy="84.53" r="0.95"/><circle cx="157.64" cy="85.57" r="0.95"/><circle cx="157.70" cy="86.62" r="0.95"/><circle cx="157.09" cy="87.53" r="0.95"/><circle cx="156.49" cy="88.45" r="0.95"/><circle cx="155.88" cy="89.37" r="0.95"/><circle cx="155.28" cy="90.29" r="0.95"/><circle cx="154.67" cy="91.21" r="0.95"/><circle cx="154.54" cy="92.54" r="0.95"/><circle cx="154.40" cy="93.87" r="0.95"/><circle cx="153.91" cy="94.78" r="0.95"/><circle cx="153.42" cy="95.68" r="0.95"/><circle cx="152.93" cy="96.58" r="0.95"/><circle cx="152.44" cy="97.49" r="0.95"/><circle cx="151.96" cy="98.39" r="0.95"/><circle cx="150.89" cy="98.08" r="0.95"/><circle cx="149.82" cy="97.76" r="0.95"/><circle cx="148.75" cy="97.45" r="0.95"/><circle cx="147.68" cy="97.14" r="0.95"/><circle cx="147.64" cy="98.27" r="0.95"/><circle cx="147.59" cy="99.41" r="0.95"/><circle cx="147.55" cy="100.54" r="0.95"/><circle cx="147.51" cy="101.67" r="0.95"/><circle cx="147.47" cy="102.81" r="0.95"/><circle cx="146.85" cy="103.74" r="0.95"/><circle cx="146.23" cy="104.67" r="0.95"/><circle cx="146.52" cy="105.83" r="0.95"/><circle cx="146.81" cy="107.00" r="0.95"/><circle cx="145.91" cy="107.43" r="0.95"/><circle cx="145.01" cy="107.86" r="0.95"/><circle cx="144.11" cy="108.29" r="0.95"/><circle cx="143.79" cy="107.33" r="0.95"/><circle cx="143.47" cy="106.37" r="0.95"/><circle cx="143.14" cy="105.40" r="0.95"/><circle cx="142.82" cy="104.44" r="0.95"/><circle cx="142.50" cy="103.47" r="0.95"/><circle cx="142.18" cy="102.51" r="0.95"/><circle cx="141.86" cy="101.54" r="0.95"/><circle cx="141.54" cy="100.58" r="0.95"/><circle cx="141.22" cy="99.61" r="0.95"/><circle cx="139.71" cy="99.63" r="0.95"/><circle cx="139.41" cy="100.79" r="0.95"/><circle cx="139.11" cy="101.96" r="0.95"/><circle cx="138.82" cy="103.13" r="0.95"/><circle cx="138.07" cy="102.42" r="0.95"/><circle cx="137.32" cy="101.71" r="0.95"/><circle cx="136.57" cy="101.00" r="0.95"/><circle cx="135.82" cy="100.29" r="0.95"/><circle cx="136.38" cy="99.25" r="0.95"/><circle cx="136.95" cy="98.21" r="0.95"/><circle cx="137.51" cy="97.17" r="0.95"/><circle cx="138.73" cy="97.02" r="0.95"/><circle cx="139.96" cy="96.86" r="0.95"/><circle cx="140.46" cy="95.93" r="0.95"/><circle cx="140.97" cy="95.00" r="0.95"/><circle cx="141.47" cy="94.08" r="0.95"/><circle cx="141.98" cy="93.15" r="0.95"/><circle cx="142.48" cy="92.22" r="0.95"/><circle cx="141.43" cy="91.91" r="0.95"/><circle cx="140.38" cy="91.60" r="0.95"/><circle cx="139.33" cy="91.29" r="0.95"/><circle cx="138.31" cy="91.31" r="0.95"/><circle cx="137.30" cy="91.32" r="0.95"/><circle cx="136.28" cy="91.34" r="0.95"/><circle cx="135.26" cy="91.35" r="0.95"/><circle cx="134.25" cy="91.37" r="0.95"/><circle cx="133.21" cy="91.22" r="0.95"/><circle cx="132.17" cy="91.07" r="0.95"/><circle cx="131.12" cy="90.92" r="0.95"/><circle cx="130.08" cy="90.77" r="0.95"/><circle cx="129.04" cy="90.62" r="0.95"/><circle cx="128.88" cy="89.35" r="0.95"/><circle cx="128.72" cy="88.08" r="0.95"/><circle cx="128.56" cy="86.81" r="0.95"/><circle cx="127.25" cy="86.68" r="0.95"/><circle cx="125.94" cy="86.54" r="0.95"/><circle cx="125.08" cy="86.07" r="0.95"/><circle cx="124.21" cy="85.60" r="0.95"/><circle cx="123.34" cy="85.12" r="0.95"/><circle cx="122.47" cy="84.65" r="0.95"/><circle cx="121.61" cy="84.18" r="0.95"/><circle cx="121.12" cy="85.11" r="0.95"/><circle cx="120.64" cy="86.03" r="0.95"/><circle cx="120.16" cy="86.96" r="0.95"/><circle cx="119.67" cy="87.89" r="0.95"/><circle cx="120.66" cy="88.62" r="0.95"/><circle cx="121.65" cy="89.34" r="0.95"/><circle cx="122.64" cy="90.07" r="0.95"/><circle cx="123.62" cy="90.79" r="0.95"/><circle cx="122.77" cy="91.30" r="0.95"/><circle cx="121.91" cy="91.81" r="0.95"/><circle cx="121.06" cy="92.32" r="0.95"/><circle cx="120.20" cy="92.83" r="0.95"/><circle cx="119.59" cy="93.83" r="0.95"/><circle cx="118.99" cy="94.83" r="0.95"/><circle cx="120.11" cy="95.31" r="0.95"/><circle cx="121.23" cy="95.80" r="0.95"/><circle cx="122.36" cy="96.29" r="0.95"/><circle cx="122.05" cy="97.39" r="0.95"/><circle cx="121.74" cy="98.49" r="0.95"/><circle cx="121.43" cy="99.59" r="0.95"/><circle cx="121.90" cy="100.62" r="0.95"/><circle cx="122.37" cy="101.65" r="0.95"/><circle cx="122.85" cy="102.68" r="0.95"/><circle cx="123.32" cy="103.71" r="0.95"/><circle cx="123.54" cy="104.83" r="0.95"/><circle cx="123.75" cy="105.96" r="0.95"/><circle cx="123.96" cy="107.09" r="0.95"/><circle cx="124.17" cy="108.22" r="0.95"/><circle cx="123.78" cy="109.22" r="0.95"/><circle cx="123.39" cy="110.21" r="0.95"/><circle cx="122.15" cy="110.19" r="0.95"/><circle cx="120.91" cy="110.17" r="0.95"/><circle cx="119.67" cy="110.15" r="0.95"/><circle cx="118.54" cy="110.34" r="0.95"/><circle cx="117.42" cy="110.52" r="0.95"/><circle cx="116.29" cy="110.71" r="0.95"/><circle cx="115.17" cy="110.90" r="0.95"/><circle cx="114.04" cy="111.09" r="0.95"/><circle cx="112.92" cy="111.28" r="0.95"/><circle cx="113.00" cy="112.31" r="0.95"/><circle cx="113.07" cy="113.34" r="0.95"/><circle cx="113.15" cy="114.37" r="0.95"/><circle cx="113.23" cy="115.40" r="0.95"/><circle cx="112.50" cy="116.21" r="0.95"/><circle cx="111.77" cy="117.02" r="0.95"/><circle cx="111.04" cy="117.83" r="0.95"/><circle cx="110.31" cy="118.64" r="0.95"/><circle cx="109.32" cy="119.10" r="0.95"/><circle cx="108.34" cy="119.56" r="0.95"/><circle cx="107.35" cy="120.02" r="0.95"/><circle cx="106.37" cy="120.48" r="0.95"/><circle cx="105.39" cy="120.94" r="0.95"/><circle cx="104.40" cy="121.40" r="0.95"/><circle cx="103.42" cy="121.86" r="0.95"/><circle cx="102.43" cy="122.32" r="0.95"/><circle cx="101.75" cy="123.04" r="0.95"/><circle cx="101.07" cy="123.76" r="0.95"/><circle cx="100.39" cy="124.47" r="0.95"/><circle cx="99.71" cy="125.19" r="0.95"/><circle cx="99.03" cy="125.90" r="0.95"/><circle cx="98.35" cy="126.62" r="0.95"/><circle cx="97.67" cy="127.33" r="0.95"/><circle cx="96.98" cy="128.05" r="0.95"/><circle cx="96.30" cy="128.77" r="0.95"/><circle cx="95.48" cy="129.46" r="0.95"/><circle cx="94.66" cy="130.15" r="0.95"/><circle cx="93.83" cy="130.84" r="0.95"/><circle cx="93.01" cy="131.53" r="0.95"/><circle cx="92.19" cy="132.22" r="0.95"/><circle cx="91.28" cy="132.82" r="0.95"/><circle cx="90.37" cy="133.41" r="0.95"/><circle cx="89.46" cy="134.01" r="0.95"/><circle cx="88.55" cy="134.61" r="0.95"/><circle cx="87.64" cy="135.21" r="0.95"/><circle cx="86.73" cy="135.80" r="0.95"/><circle cx="86.73" cy="137.06" r="0.95"/><circle cx="86.72" cy="138.32" r="0.95"/><circle cx="85.81" cy="138.77" r="0.95"/><circle cx="84.90" cy="139.22" r="0.95"/><circle cx="84.00" cy="139.67" r="0.95"/><circle cx="83.01" cy="140.06" r="0.95"/><circle cx="82.02" cy="140.45" r="0.95"/><circle cx="81.04" cy="140.85" r="0.95"/><circle cx="80.05" cy="141.24" r="0.95"/><circle cx="79.06" cy="141.63" r="0.95"/><circle cx="77.79" cy="141.78" r="0.95"/><circle cx="76.51" cy="141.92" r="0.95"/><circle cx="76.10" cy="142.96" r="0.95"/><circle cx="75.69" cy="144.01" r="0.95"/><circle cx="75.28" cy="145.05" r="0.95"/><circle cx="74.87" cy="146.10" r="0.95"/><circle cx="75.03" cy="147.11" r="0.95"/><circle cx="75.19" cy="148.13" r="0.95"/><circle cx="75.35" cy="149.15" r="0.95"/><circle cx="75.52" cy="150.16" r="0.95"/><circle cx="75.68" cy="151.18" r="0.95"/><circle cx="75.84" cy="152.20" r="0.95"/><circle cx="76.01" cy="153.22" r="0.95"/><circle cx="76.08" cy="154.35" r="0.95"/><circle cx="76.15" cy="155.49" r="0.95"/><circle cx="76.22" cy="156.62" r="0.95"/><circle cx="76.30" cy="157.76" r="0.95"/><circle cx="75.83" cy="158.80" r="0.95"/><circle cx="75.37" cy="159.84" r="0.95"/><circle cx="74.90" cy="160.88" r="0.95"/><circle cx="74.44" cy="161.92" r="0.95"/><circle cx="73.98" cy="162.96" r="0.95"/><circle cx="73.97" cy="163.99" r="0.95"/><circle cx="73.97" cy="165.03" r="0.95"/><circle cx="73.97" cy="166.06" r="0.95"/><circle cx="73.96" cy="167.09" r="0.95"/><circle cx="73.96" cy="168.13" r="0.95"/><circle cx="73.96" cy="169.16" r="0.95"/><circle cx="73.96" cy="170.19" r="0.95"/><circle cx="73.95" cy="171.23" r="0.95"/><circle cx="73.95" cy="172.26" r="0.95"/><circle cx="72.53" cy="172.39" r="0.95"/><circle cx="71.12" cy="172.52" r="0.95"/><circle cx="70.49" cy="173.57" r="0.95"/><circle cx="69.87" cy="174.61" r="0.95"/><circle cx="69.25" cy="175.66" r="0.95"/><circle cx="68.63" cy="176.70" r="0.95"/><circle cx="69.46" cy="177.60" r="0.95"/><circle cx="70.29" cy="178.50" r="0.95"/><circle cx="69.29" cy="178.82" r="0.95"/><circle cx="68.30" cy="179.13" r="0.95"/><circle cx="67.30" cy="179.44" r="0.95"/><circle cx="66.30" cy="179.75" r="0.95"/><circle cx="65.30" cy="180.06" r="0.95"/><circle cx="64.84" cy="180.99" r="0.95"/><circle cx="64.38" cy="181.92" r="0.95"/><circle cx="63.92" cy="182.85" r="0.95"/><circle cx="63.46" cy="183.78" r="0.95"/><circle cx="62.36" cy="184.57" r="0.95"/><circle cx="61.26" cy="185.35" r="0.95"/><circle cx="60.52" cy="184.62" r="0.95"/><circle cx="59.78" cy="183.89" r="0.95"/><circle cx="59.04" cy="183.16" r="0.95"/><circle cx="58.30" cy="182.43" r="0.95"/><circle cx="57.56" cy="181.70" r="0.95"/><circle cx="56.82" cy="180.97" r="0.95"/><circle cx="56.08" cy="180.24" r="0.95"/><circle cx="55.76" cy="179.28" r="0.95"/><circle cx="55.44" cy="178.33" r="0.95"/><circle cx="55.13" cy="177.37" r="0.95"/><circle cx="54.81" cy="176.41" r="0.95"/><circle cx="54.49" cy="175.45" r="0.95"/><circle cx="54.18" cy="174.49" r="0.95"/><circle cx="53.86" cy="173.53" r="0.95"/><circle cx="53.54" cy="172.58" r="0.95"/><circle cx="53.12" cy="171.47" r="0.95"/><circle cx="52.70" cy="170.37" r="0.95"/><circle cx="52.28" cy="169.26" r="0.95"/><circle cx="51.86" cy="168.16" r="0.95"/><circle cx="51.44" cy="167.05" r="0.95"/><circle cx="50.80" cy="166.19" r="0.95"/><circle cx="50.16" cy="165.33" r="0.95"/><circle cx="49.52" cy="164.46" r="0.95"/><circle cx="49.04" cy="163.59" r="0.95"/><circle cx="48.55" cy="162.71" r="0.95"/><circle cx="48.07" cy="161.83" r="0.95"/><circle cx="47.58" cy="160.96" r="0.95"/><circle cx="47.10" cy="160.08" r="0.95"/><circle cx="46.62" cy="159.20" r="0.95"/><circle cx="46.42" cy="158.23" r="0.95"/><circle cx="46.23" cy="157.25" r="0.95"/><circle cx="46.03" cy="156.27" r="0.95"/><circle cx="45.84" cy="155.29" r="0.95"/><circle cx="45.64" cy="154.31" r="0.95"/><circle cx="45.45" cy="153.34" r="0.95"/><circle cx="45.26" cy="152.36" r="0.95"/><circle cx="44.94" cy="151.22" r="0.95"/><circle cx="44.63" cy="150.08" r="0.95"/><circle cx="44.31" cy="148.94" r="0.95"/><circle cx="43.76" cy="148.10" r="0.95"/><circle cx="43.20" cy="147.27" r="0.95"/><circle cx="42.65" cy="146.43" r="0.95"/><circle cx="42.10" cy="145.60" r="0.95"/><circle cx="41.54" cy="144.76" r="0.95"/><circle cx="40.99" cy="143.93" r="0.95"/><circle cx="40.44" cy="143.09" r="0.95"/><circle cx="39.88" cy="142.25" r="0.95"/><circle cx="39.33" cy="141.42" r="0.95"/><circle cx="39.12" cy="140.45" r="0.95"/><circle cx="38.92" cy="139.49" r="0.95"/><circle cx="38.71" cy="138.53" r="0.95"/><circle cx="38.51" cy="137.56" r="0.95"/><circle cx="38.30" cy="136.60" r="0.95"/><circle cx="38.09" cy="135.63" r="0.95"/><circle cx="37.89" cy="134.67" r="0.95"/><circle cx="37.68" cy="133.70" r="0.95"/><circle cx="37.47" cy="132.74" r="0.95"/><circle cx="37.27" cy="131.77" r="0.95"/><circle cx="37.06" cy="130.81" r="0.95"/><circle cx="36.83" cy="129.81" r="0.95"/><circle cx="36.59" cy="128.81" r="0.95"/><circle cx="36.36" cy="127.81" r="0.95"/><circle cx="36.13" cy="126.81" r="0.95"/><circle cx="35.89" cy="125.81" r="0.95"/><circle cx="35.66" cy="124.81" r="0.95"/><circle cx="35.43" cy="123.80" r="0.95"/><circle cx="35.43" cy="122.70" r="0.95"/><circle cx="35.43" cy="121.59" r="0.95"/><circle cx="35.44" cy="120.49" r="0.95"/><circle cx="35.44" cy="119.38" r="0.95"/><circle cx="35.44" cy="118.28" r="0.95"/><circle cx="35.44" cy="117.17" r="0.95"/><circle cx="35.23" cy="116.15" r="0.95"/><circle cx="35.02" cy="115.12" r="0.95"/><circle cx="34.81" cy="114.10" r="0.95"/><circle cx="34.60" cy="113.07" r="0.95"/><circle cx="34.38" cy="112.05" r="0.95"/><circle cx="33.39" cy="112.46" r="0.95"/><circle cx="32.39" cy="112.87" r="0.95"/><circle cx="31.40" cy="113.28" r="0.95"/><circle cx="30.40" cy="113.68" r="0.95"/><circle cx="29.40" cy="114.09" r="0.95"/><circle cx="28.41" cy="114.50" r="0.95"/><circle cx="27.41" cy="114.91" r="0.95"/><circle cx="26.42" cy="115.32" r="0.95"/><circle cx="25.13" cy="115.10" r="0.95"/><circle cx="23.84" cy="114.89" r="0.95"/><circle cx="22.56" cy="114.67" r="0.95"/><circle cx="21.76" cy="113.93" r="0.95"/><circle cx="20.97" cy="113.19" r="0.95"/><circle cx="20.17" cy="112.46" r="0.95"/><circle cx="19.38" cy="111.72" r="0.95"/><circle cx="18.58" cy="110.98" r="0.95"/><circle cx="17.79" cy="110.24" r="0.95"/><circle cx="17.00" cy="109.51" r="0.95"/><circle cx="16.20" cy="108.77" r="0.95"/><circle cx="15.41" cy="108.03" r="0.95"/><circle cx="16.28" cy="107.37" r="0.95"/><circle cx="17.16" cy="106.71" r="0.95"/><circle cx="18.04" cy="106.05" r="0.95"/><circle cx="17.23" cy="104.98" r="0.95"/><circle cx="16.42" cy="103.90" r="0.95"/><circle cx="15.62" cy="103.32" r="0.95"/><circle cx="14.82" cy="102.74" r="0.95"/><circle cx="14.01" cy="102.16" r="0.95"/><circle cx="13.21" cy="101.58" r="0.95"/><circle cx="12.41" cy="101.00" r="0.95"/><circle cx="11.61" cy="100.42" r="0.95"/><circle cx="10.80" cy="99.84" r="0.95"/><circle cx="10.00" cy="99.26" r="0.95"/><circle cx="10.73" cy="98.53" r="0.95"/><circle cx="11.46" cy="97.80" r="0.95"/><circle cx="12.19" cy="97.07" r="0.95"/><circle cx="12.92" cy="96.34" r="0.95"/><circle cx="13.65" cy="95.61" r="0.95"/><circle cx="14.65" cy="95.61" r="0.95"/><circle cx="15.65" cy="95.61" r="0.95"/><circle cx="16.66" cy="95.61" r="0.95"/><circle cx="17.66" cy="95.61" r="0.95"/><circle cx="18.67" cy="95.61" r="0.95"/><circle cx="19.67" cy="95.61" r="0.95"/><circle cx="20.67" cy="95.61" r="0.95"/><circle cx="21.68" cy="95.61" r="0.95"/><circle cx="22.68" cy="95.62" r="0.95"/><circle cx="23.69" cy="95.62" r="0.95"/><circle cx="24.69" cy="95.62" r="0.95"/><circle cx="25.69" cy="95.62" r="0.95"/><circle cx="25.42" cy="94.44" r="0.95"/><circle cx="25.15" cy="93.27" r="0.95"/><circle cx="24.88" cy="92.09" r="0.95"/><circle cx="24.61" cy="90.92" r="0.95"/><circle cx="23.84" cy="90.23" r="0.95"/><circle cx="23.07" cy="89.53" r="0.95"/><circle cx="22.30" cy="88.84" r="0.95"/><circle cx="21.53" cy="88.14" r="0.95"/><circle cx="21.37" cy="87.09" r="0.95"/><circle cx="21.22" cy="86.04" r="0.95"/><circle cx="21.06" cy="84.98" r="0.95"/><circle cx="20.91" cy="83.93" r="0.95"/><circle cx="20.01" cy="83.31" r="0.95"/><circle cx="19.12" cy="82.70" r="0.95"/><circle cx="18.22" cy="82.09" r="0.95"/><circle cx="17.32" cy="81.47" r="0.95"/><circle cx="18.08" cy="80.75" r="0.95"/><circle cx="18.83" cy="80.04" r="0.95"/><circle cx="19.59" cy="79.32" r="0.95"/><circle cx="20.34" cy="78.60" r="0.95"/><circle cx="21.09" cy="77.88" r="0.95"/><circle cx="21.85" cy="77.17" r="0.95"/><circle cx="22.60" cy="76.45" r="0.95"/><circle cx="23.36" cy="75.73" r="0.95"/><circle cx="24.42" cy="75.80" r="0.95"/><circle cx="25.48" cy="75.87" r="0.95"/><circle cx="26.54" cy="75.94" r="0.95"/><circle cx="27.60" cy="76.01" r="0.95"/><circle cx="28.65" cy="76.08" r="0.95"/><circle cx="29.71" cy="76.15" r="0.95"/><circle cx="30.43" cy="75.43" r="0.95"/><circle cx="31.15" cy="74.71" r="0.95"/><circle cx="31.86" cy="74.00" r="0.95"/><circle cx="32.58" cy="73.28" r="0.95"/><circle cx="33.29" cy="72.56" r="0.95"/><circle cx="34.01" cy="71.84" r="0.95"/><circle cx="34.73" cy="71.13" r="0.95"/><circle cx="35.44" cy="70.41" r="0.95"/><circle cx="36.01" cy="69.48" r="0.95"/><circle cx="36.59" cy="68.56" r="0.95"/><circle cx="37.16" cy="67.63" r="0.95"/><circle cx="37.73" cy="66.70" r="0.95"/><circle cx="38.30" cy="65.78" r="0.95"/><circle cx="38.87" cy="64.85" r="0.95"/><circle cx="39.63" cy="64.07" r="0.95"/><circle cx="40.39" cy="63.28" r="0.95"/><circle cx="41.15" cy="62.50" r="0.95"/><circle cx="41.91" cy="61.71" r="0.95"/><circle cx="42.67" cy="60.93" r="0.95"/><circle cx="43.43" cy="60.14" r="0.95"/><circle cx="44.19" cy="59.36" r="0.95"/><circle cx="44.16" cy="58.06" r="0.95"/><circle cx="44.13" cy="56.76" r="0.95"/><circle cx="44.10" cy="55.46" r="0.95"/><circle cx="45.04" cy="54.82" r="0.95"/><circle cx="45.97" cy="54.19" r="0.95"/><circle cx="46.90" cy="53.56" r="0.95"/><circle cx="47.84" cy="52.92" r="0.95"/><circle cx="48.77" cy="52.29" r="0.95"/><circle cx="47.89" cy="51.75" r="0.95"/><circle cx="47.00" cy="51.21" r="0.95"/><circle cx="46.12" cy="50.67" r="0.95"/><circle cx="45.24" cy="50.13" r="0.95"/><circle cx="44.35" cy="49.59" r="0.95"/><circle cx="43.88" cy="48.66" r="0.95"/><circle cx="43.40" cy="47.74" r="0.95"/><circle cx="42.93" cy="46.81" r="0.95"/><circle cx="42.45" cy="45.88" r="0.95"/><circle cx="42.06" cy="44.92" r="0.95"/><circle cx="41.68" cy="43.96" r="0.95"/><circle cx="41.29" cy="43.01" r="0.95"/><circle cx="40.90" cy="42.05" r="0.95"/><circle cx="40.51" cy="41.09" r="0.95"/><circle cx="41.41" cy="40.30" r="0.95"/><circle cx="42.30" cy="39.51" r="0.95"/><circle cx="43.20" cy="38.73" r="0.95"/><circle cx="44.23" cy="38.89" r="0.95"/><circle cx="45.27" cy="39.06" r="0.95"/><circle cx="46.31" cy="39.23" r="0.95"/><circle cx="47.35" cy="39.39" r="0.95"/><circle cx="48.39" cy="39.56" r="0.95"/><circle cx="49.42" cy="39.73" r="0.95"/><circle cx="50.46" cy="39.89" r="0.95"/><circle cx="51.50" cy="40.06" r="0.95"/><circle cx="52.52" cy="39.93" r="0.95"/><circle cx="53.53" cy="39.79" r="0.95"/><circle cx="54.55" cy="39.65" r="0.95"/><circle cx="55.57" cy="39.52" r="0.95"/><circle cx="56.58" cy="39.38" r="0.95"/><circle cx="57.60" cy="39.25" r="0.95"/><circle cx="58.36" cy="38.59" r="0.95"/><circle cx="59.11" cy="37.93" r="0.95"/><circle cx="59.87" cy="37.28" r="0.95"/><circle cx="60.62" cy="36.62" r="0.95"/><circle cx="61.38" cy="35.96" r="0.95"/><circle cx="62.13" cy="35.30" r="0.95"/><circle cx="62.89" cy="34.65" r="0.95"/><circle cx="63.62" cy="35.45" r="0.95"/><circle cx="64.36" cy="36.25" r="0.95"/><circle cx="65.10" cy="37.05" r="0.95"/><circle cx="65.83" cy="37.85" r="0.95"/><circle cx="66.57" cy="38.66" r="0.95"/><circle cx="67.30" cy="39.46" r="0.95"/><circle cx="68.04" cy="40.26" r="0.95"/><circle cx="68.77" cy="41.06" r="0.95"/><circle cx="68.63" cy="42.18" r="0.95"/><circle cx="68.50" cy="43.30" r="0.95"/><circle cx="68.36" cy="44.41" r="0.95"/><circle cx="68.22" cy="45.53" r="0.95"/><circle cx="68.95" cy="46.46" r="0.95"/><circle cx="69.67" cy="47.40" r="0.95"/><circle cx="70.40" cy="48.33" r="0.95"/><circle cx="70.31" cy="49.73" r="0.95"/><circle cx="70.22" cy="51.13" r="0.95"/><circle cx="69.24" cy="50.94" r="0.95"/><circle cx="68.25" cy="50.76" r="0.95"/><circle cx="67.27" cy="50.57" r="0.95"/><circle cx="66.29" cy="50.39" r="0.95"/><circle cx="66.54" cy="51.40" r="0.95"/><circle cx="66.80" cy="52.40" r="0.95"/><circle cx="67.06" cy="53.41" r="0.95"/><circle cx="67.31" cy="54.41" r="0.95"/><circle cx="67.57" cy="55.42" r="0.95"/><circle cx="67.82" cy="56.42" r="0.95"/><circle cx="68.72" cy="57.00" r="0.95"/><circle cx="69.62" cy="57.58" r="0.95"/><circle cx="70.51" cy="58.16" r="0.95"/><circle cx="71.41" cy="58.74" r="0.95"/><circle cx="72.31" cy="59.31" r="0.95"/><circle cx="73.20" cy="59.89" r="0.95"/><circle cx="74.15" cy="60.37" r="0.95"/><circle cx="75.10" cy="60.85" r="0.95"/><circle cx="76.06" cy="61.33" r="0.95"/><circle cx="77.01" cy="61.81" r="0.95"/><circle cx="77.96" cy="62.28" r="0.95"/><circle cx="78.91" cy="62.76" r="0.95"/><circle cx="79.86" cy="63.24" r="0.95"/><circle cx="80.81" cy="63.72" r="0.95"/><circle cx="79.94" cy="64.34" r="0.95"/><circle cx="79.07" cy="64.96" r="0.95"/><circle cx="78.21" cy="65.58" r="0.95"/><circle cx="77.34" cy="66.20" r="0.95"/><circle cx="76.91" cy="67.23" r="0.95"/><circle cx="76.49" cy="68.25" r="0.95"/><circle cx="76.06" cy="69.28" r="0.95"/><circle cx="75.64" cy="70.30" r="0.95"/><circle cx="75.21" cy="71.32" r="0.95"/><circle cx="76.27" cy="71.74" r="0.95"/><circle cx="77.33" cy="72.15" r="0.95"/><circle cx="78.39" cy="72.57" r="0.95"/><circle cx="79.46" cy="72.98" r="0.95"/><circle cx="80.52" cy="73.40" r="0.95"/><circle cx="81.55" cy="73.93" r="0.95"/><circle cx="82.58" cy="74.47" r="0.95"/><circle cx="83.61" cy="75.01" r="0.95"/><circle cx="84.64" cy="75.54" r="0.95"/><circle cx="85.68" cy="76.08" r="0.95"/><circle cx="86.70" cy="76.52" r="0.95"/><circle cx="87.72" cy="76.96" r="0.95"/><circle cx="88.74" cy="77.40" r="0.95"/><circle cx="89.76" cy="77.84" r="0.95"/><circle cx="90.78" cy="78.27" r="0.95"/><circle cx="91.80" cy="78.71" r="0.95"/><circle cx="92.82" cy="79.15" r="0.95"/><circle cx="93.89" cy="79.25" r="0.95"/><circle cx="94.96" cy="79.35" r="0.95"/><circle cx="96.03" cy="79.46" r="0.95"/><circle cx="97.11" cy="79.56" r="0.95"/><circle cx="98.18" cy="79.66" r="0.95"/><circle cx="99.25" cy="79.76" r="0.95"/><circle cx="100.32" cy="79.86" r="0.95"/><circle cx="101.11" cy="80.56" r="0.95"/><circle cx="101.90" cy="81.25" r="0.95"/><circle cx="102.69" cy="81.95" r="0.95"/><circle cx="103.48" cy="82.65" r="0.95"/><circle cx="104.54" cy="82.78" r="0.95"/><circle cx="105.59" cy="82.91" r="0.95"/><circle cx="106.65" cy="83.04" r="0.95"/><circle cx="107.71" cy="83.17" r="0.95"/><circle cx="108.81" cy="83.38" r="0.95"/><circle cx="109.90" cy="83.59" r="0.95"/><circle cx="111.00" cy="83.81" r="0.95"/><circle cx="112.10" cy="84.02" r="0.95"/><circle cx="113.20" cy="84.23" r="0.95"/><circle cx="114.30" cy="84.44" r="0.95"/><circle cx="115.44" cy="84.42" r="0.95"/><circle cx="116.58" cy="84.40" r="0.95"/><circle cx="117.71" cy="84.38" r="0.95"/><circle cx="118.85" cy="84.35" r="0.95"/><circle cx="119.17" cy="83.27" r="0.95"/><circle cx="119.48" cy="82.19" r="0.95"/><circle cx="119.24" cy="81.03" r="0.95"/><circle cx="119.00" cy="79.87" r="0.95"/><circle cx="118.76" cy="78.71" r="0.95"/><circle cx="118.97" cy="77.53" r="0.95"/><circle cx="119.18" cy="76.35" r="0.95"/><circle cx="120.30" cy="75.97" r="0.95"/><circle cx="121.41" cy="75.58" r="0.95"/><circle cx="122.52" cy="75.20" r="0.95"/><circle cx="122.64" cy="76.28" r="0.95"/><circle cx="122.75" cy="77.35" r="0.95"/><circle cx="122.87" cy="78.43" r="0.95"/><circle cx="122.98" cy="79.51" r="0.95"/><circle cx="123.10" cy="80.61" r="0.95"/><circle cx="124.09" cy="81.02" r="0.95"/><circle cx="125.09" cy="81.44" r="0.95"/><circle cx="126.09" cy="81.85" r="0.95"/><circle cx="127.08" cy="82.27" r="0.95"/><circle cx="128.08" cy="82.68" r="0.95"/><circle cx="129.22" cy="82.40" r="0.95"/><circle cx="130.37" cy="82.11" r="0.95"/><circle cx="131.52" cy="81.83" r="0.95"/><circle cx="132.67" cy="81.92" r="0.95"/><circle cx="133.83" cy="82.01" r="0.95"/><circle cx="134.98" cy="82.10" r="0.95"/><circle cx="136.14" cy="82.20" r="0.95"/><circle cx="137.26" cy="82.15" r="0.95"/><circle cx="138.37" cy="82.11" r="0.95"/><circle cx="139.49" cy="82.07" r="0.95"/><circle cx="140.61" cy="82.03" r="0.95"/><circle cx="140.73" cy="80.91" r="0.95"/><circle cx="140.86" cy="79.79" r="0.95"/><circle cx="140.99" cy="78.67" r="0.95"/><circle cx="139.88" cy="77.80" r="0.95"/><circle cx="138.76" cy="76.92" r="0.95"/><circle cx="139.87" cy="76.75" r="0.95"/><circle cx="140.97" cy="76.58" r="0.95"/><circle cx="142.07" cy="76.41" r="0.95"/><circle cx="143.18" cy="76.24" r="0.95"/><circle cx="144.01" cy="75.56" r="0.95"/><circle cx="144.84" cy="74.88" r="0.95"/><circle cx="145.67" cy="74.20" r="0.95"/><circle cx="146.50" cy="73.52" r="0.95"/><circle cx="147.33" cy="72.84" r="0.95"/><circle cx="148.16" cy="72.17" r="0.95"/><circle cx="149.06" cy="71.67" r="0.95"/><circle cx="149.96" cy="71.17" r="0.95"/><circle cx="150.87" cy="70.67" r="0.95"/><circle cx="151.77" cy="70.17" r="0.95"/><circle cx="152.67" cy="69.68" r="0.95"/><circle cx="153.57" cy="69.18" r="0.95"/><circle cx="154.47" cy="68.68" r="0.95"/><circle cx="155.62" cy="69.02" r="0.95"/><circle cx="156.77" cy="69.35" r="0.95"/><circle cx="157.92" cy="69.69" r="0.95"/><circle cx="159.06" cy="70.02" r="0.95"/><circle cx="160.04" cy="69.45" r="0.95"/><circle cx="161.01" cy="68.87" r="0.95"/><circle cx="161.99" cy="68.30" r="0.95"/><circle cx="162.97" cy="67.72" r="0.95"/><circle cx="163.61" cy="68.57" r="0.95"/><circle cx="164.25" cy="69.42" r="0.95"/><circle cx="164.89" cy="70.27" r="0.95"/><circle cx="165.53" cy="71.12" r="0.95"/><circle cx="164.61" cy="72.27" r="0.95"/><circle cx="163.68" cy="73.42" r="0.95"/><circle cx="164.67" cy="73.56" r="0.95"/><circle cx="165.65" cy="73.70" r="0.95"/><circle cx="166.64" cy="73.83" r="0.95"/><circle cx="167.62" cy="73.97" r="0.95"/><circle cx="168.60" cy="74.10" r="0.95"/>
        </g>

        {/* Hyderabad Highlight: 17.3850° N, 78.4867° E (at cx: 66.44, cy: 133.79) */}
        <g filter="url(#glow)">
          <circle cx="66.44" cy="133.79" r="5" className="fill-primary" opacity="0.25" />
          <circle cx="66.44" cy="133.79" r="3.2" className="fill-primary" opacity="0.45" />
          <circle cx="66.44" cy="133.79" r="1.9" className="fill-primary" />
          <circle cx="66.44" cy="133.79" r="0.8" fill="white" />
        </g>
      </svg>

      {/* Animated Radar Beacon on Hyderabad, Telangana */}
      <div 
        className="absolute pointer-events-none"
        style={{
          left: `${(66.44 / 180) * 100}%`,
          top: `${(133.79 / 220) * 100}%`,
          transform: "translate(-50%, -50%)"
        }}
      >
        {/* Radar Ring 1 */}
        <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-primary/30 animate-ping" />
        {/* Radar Ring 2 */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-accent/50 animate-pulse" />
      </div>
    </div>
  );
};

// 3D Animated Tech Core / Orb (Matches Website Primary & Accent CSS Variables)
const TechOrb = () => {
  return (
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex items-center justify-center flex-shrink-0 group">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/35 transition-all duration-500" />

      {/* Central 3D Glowing Core */}
      <div className="relative w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-gradient-to-tr from-primary via-accent to-primary/80 shadow-[0_0_12px_hsl(var(--primary)/0.7),inset_0_2px_4px_rgba(255,255,255,0.6)] animate-pulse [animation-duration:3s]" />

      {/* Orbital Ring 1 */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite] pointer-events-none opacity-85" viewBox="0 0 64 64">
        <ellipse 
          cx="32" 
          cy="32" 
          rx="25" 
          ry="9" 
          fill="none" 
          stroke="url(#orbRing1)" 
          strokeWidth="1.5" 
          strokeDasharray="4 2"
          transform="rotate(-25 32 32)" 
        />
        <defs>
          <linearGradient id="orbRing1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbital Ring 2 */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite_reverse] pointer-events-none opacity-75" viewBox="0 0 64 64">
        <ellipse 
          cx="32" 
          cy="32" 
          rx="25" 
          ry="9" 
          fill="none" 
          stroke="url(#orbRing2)" 
          strokeWidth="1.5" 
          strokeDasharray="3 3"
          transform="rotate(35 32 32)" 
        />
        <defs>
          <linearGradient id="orbRing2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Sparkle micro-particles */}
      <Sparkles className="absolute -top-0.5 -right-0.5 w-3 h-3 text-primary animate-pulse" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))] animate-ping" />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-border/70 bg-background overflow-hidden pt-3 pb-3 sm:pt-4 sm:pb-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        
        {/* Main Floating Footer Card Layout (No outer outline box, compact padding) */}
        <div className="relative rounded-xl sm:rounded-2xl lg:rounded-2xl bg-card/60 p-2.5 sm:p-3 lg:p-4 transition-all duration-300">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 lg:gap-0 lg:divide-x lg:divide-border/60 items-center">
            
            {/* 1. Identity & Signature Bio Section (Mobile: full, SM: Col 1, LG: Cols 1-4) */}
            <div className="sm:col-span-1 lg:col-span-4 flex flex-col justify-center lg:pr-4">
              <h3 className="font-signature text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight tracking-wide">
                Mohan Reddy
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground font-grotesk mt-0.5 leading-snug">
                Building solutions that make an impact.
              </p>
              <div className="h-0.5 w-7 sm:w-8 bg-gradient-to-r from-primary to-accent rounded-full mt-1 sm:mt-1.5" />
            </div>

            {/* 2. Let's Connect Socials (SM: Col 2 Top-Right, LG: Cols 9-10) */}
            <div className="sm:col-span-1 lg:col-span-2 lg:order-3 flex items-center justify-between sm:justify-end lg:justify-start lg:flex-col lg:items-start lg:px-4 py-0.5 lg:py-0">
              <div className="flex flex-col sm:items-end lg:items-start">
                <span className="text-[11px] sm:text-xs font-semibold text-foreground font-outfit mb-1">
                  Let's Connect
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://github.com/ComradeMohan"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Mohan Reddy's GitHub Profile"
                    onClick={() => trackEvent("click", "social", "github_footer")}
                    className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground hover:text-primary transition-all duration-300 flex items-center justify-center group"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mmohanreddy/"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Mohan Reddy's LinkedIn Profile"
                    onClick={() => trackEvent("click", "social", "linkedin_footer")}
                    className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground hover:text-primary transition-all duration-300 flex items-center justify-center group"
                  >
                    <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://x.com/ComradeMohan"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Mohan Reddy's Twitter / X Profile"
                    onClick={() => trackEvent("click", "social", "twitter_footer")}
                    className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground hover:text-primary transition-all duration-300 flex items-center justify-center group"
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="mailto:madhiremohanreddy@gmail.com"
                    aria-label="Send Email to Mohan Reddy"
                    onClick={() => trackEvent("click", "contact", "email_footer")}
                    className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground hover:text-primary transition-all duration-300 flex items-center justify-center group"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Value Proposition & Tech Orb (SM: Col 1 Bottom-Left, LG: Cols 5-8) */}
            <div className="sm:col-span-1 lg:col-span-4 lg:order-2 flex items-center gap-2.5 sm:gap-3 lg:px-4">
              <TechOrb />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground font-outfit tracking-tight leading-snug">
                  Turning Ideas into Real-World Solutions
                </h4>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground font-grotesk mt-0.5 leading-snug">
                  I craft digital experiences that are fast, scalable and user-focused.
                </p>
              </div>
            </div>

            {/* 4. Exact India Dot Matrix Map & Hyderabad Location (SM: Col 2 Bottom-Right, LG: Cols 11-12) */}
            <div className="sm:col-span-1 lg:col-span-2 lg:order-4 flex items-center justify-start sm:justify-end lg:justify-start gap-2 sm:gap-2.5 lg:pl-4">
              <IndiaMap />
              <div className="flex flex-col text-left">
                <span className="font-outfit font-semibold text-[11px] sm:text-xs text-foreground whitespace-nowrap">
                  Hyderabad, Telangana
                </span>
                <span className="font-grotesk text-[10px] sm:text-[11px] text-muted-foreground">
                  India
                </span>
                <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-primary mt-0.5 font-medium">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary fill-primary/30" />
                  <span>500081</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SEO Navigation & Quick Links */}
        <nav 
          className="flex flex-wrap justify-center items-center gap-x-3.5 sm:gap-x-5 gap-y-1 mt-2.5 sm:mt-3.5 text-[10px] sm:text-[11px] font-grotesk text-muted-foreground" 
          aria-label="Footer Quick Navigation"
        >
          <a href="/#home" className="hover:text-primary transition-colors">Home</a>
          <Link to="/about" className="hover:text-primary transition-colors">About Me</Link>
          <a href="/#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="/#projects" className="hover:text-primary transition-colors">Projects</a>
          <Link to="/case-study/saveethahub" className="hover:text-primary transition-colors">SaveethaHub</Link>
          <Link to="/case-study/univault" className="hover:text-primary transition-colors">UniVault</Link>
          <Link to="/developer" className="hover:text-primary transition-colors">Developer Profile</Link>
          <Link to="/resume" className="hover:text-primary transition-colors">Resume</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Technical Blog</Link>
        </nav>

        {/* Copyright notice */}
        <p className="text-[10px] text-muted-foreground/70 font-grotesk text-center mt-1.5 sm:mt-2">
          © {new Date().getFullYear()} <span className="text-primary font-semibold font-outfit">@comrademohan</span>. All rights reserved. Built with precision and passion.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
