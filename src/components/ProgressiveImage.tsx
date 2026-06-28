import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

// Global cache to track which images have already been loaded in this session
const loadedImages = new Set<string>();

export const ProgressiveImage = ({ src, alt, className = "", containerClassName = "", ...props }: ProgressiveImageProps) => {
  // Synchronously initialize as true if already in cache to prevent blur flashing on re-mounts
  const [isLoaded, setIsLoaded] = useState(() => loadedImages.has(src));

  useEffect(() => {
    if (loadedImages.has(src)) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages.add(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Static Skeleton / Blur Placeholder (No more blinking!) */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/30 backdrop-blur-md border border-border/5" />
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(10px)" }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(10px)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${className} ${!isLoaded ? "invisible" : ""}`}
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
