import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground backdrop-blur-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.5)]" />
        {eyebrow}
      </div>
      <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-outfit">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base font-grotesk">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
};

export default SectionHeader;