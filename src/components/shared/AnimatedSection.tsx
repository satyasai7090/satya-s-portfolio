import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "scale" | "slideUp" | "slideRight" | "pop";
}

// Hero-style animation variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const decorativeVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: delay,
    },
  }),
};

const getVariants = (variant: AnimatedSectionProps["variant"]): Variants => {
  switch (variant) {
    case "pop":
      return popVariants;
    case "scale":
      return scaleVariants;
    case "slideRight":
      return slideRightVariants;
    case "slideUp":
    case "fade":
    default:
      return itemVariants;
  }
};

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  variant = "pop"
}: AnimatedSectionProps) {
  const variants = getVariants(variant);
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({ children, className = "", delay = 0 }: Omit<AnimatedSectionProps, "variant">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedImage({ children, className = "", delay = 0 }: Omit<AnimatedSectionProps, "variant">) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Container for staggered children animations
export function AnimatedContainer({ 
  children, 
  className = "",
  staggerDelay = 0.12 
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual item for use inside AnimatedContainer
export function AnimatedItem({ 
  children, 
  className = "",
  variant = "pop"
}: Omit<AnimatedSectionProps, "delay">) {
  const variants = getVariants(variant);
  
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}