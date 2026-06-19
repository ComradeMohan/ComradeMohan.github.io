import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const GlassCard = ({
  children,
  className = "",
  hoverEffect = true,
  delay = 0,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`glass rounded-xl p-6 backdrop-blur-xl ${
        hoverEffect ? "hover:neon-glow transition-all duration-300 hover:scale-105" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
