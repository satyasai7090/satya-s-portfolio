import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section ref={heroRef} className="section-padding relative overflow-hidden">
      {/* Decorative elements with parallax */}
      <motion.div
        className="absolute top-12 right-[15%] w-4 h-4 rounded-full bg-primary/25"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.4}
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-24 right-[8%] w-2 h-2 rounded-full bg-secondary/50"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.6}
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-12 left-[10%] w-3 h-3 rounded-full bg-accent/40"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.8}
        style={{ y: y3 }}
      />
      <motion.div
        className="absolute top-20 left-[5%] w-16 h-16 rounded-2xl bg-primary/5 -z-10"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.5}
        style={{ y: y2, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-8 right-[12%] w-12 h-12 rounded-xl bg-secondary/10 -z-10"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        custom={0.7}
        style={{ y: y1, rotate: rotate2 }}
      />

      <div className="container-narrow">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p 
            variants={heroItemVariants} 
            className="label-caps mb-4"
          >
            {label}
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="heading-display text-foreground mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            variants={heroItemVariants} 
            className="body-large max-w-2xl"
          >
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