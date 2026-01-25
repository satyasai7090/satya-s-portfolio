import { ReactNode } from "react";
import { motion } from "framer-motion";

export const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const heroItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const decorativeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay: delay,
    },
  }),
};

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({ label, title, description, children }: PageHeroProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-12 right-[15%] w-3 h-3 rounded-full bg-primary/20"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.6}
      />
      <motion.div
        className="absolute top-24 right-[8%] w-2 h-2 rounded-full bg-secondary/40"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.8}
      />
      <motion.div
        className="absolute bottom-8 left-[10%] w-2 h-2 rounded-full bg-accent/30"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={1.0}
      />

      <div className="container-narrow">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={heroItemVariants} className="label-caps mb-4">
            {label}
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="heading-display text-foreground mb-6"
          >
            {title}
          </motion.h1>
          <motion.p variants={heroItemVariants} className="body-large">
            {description}
          </motion.p>
          {children && (
            <motion.div variants={heroItemVariants} className="mt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
