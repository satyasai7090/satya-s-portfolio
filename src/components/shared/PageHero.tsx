import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, FileText, BookOpen, FileCode, Braces, Terminal } from "lucide-react";

function FloatingIcon({ icon: Icon, className, delay, duration }: {
  icon: React.ElementType;
  className: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.08, 0.08],
        scale: [0, 1, 1],
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay, times: [0, 0.5, 1] },
        scale: { duration: 0.8, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <Icon className="w-full h-full text-primary" strokeWidth={1} style={{ opacity: 0.5 }} />
    </motion.div>
  );
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
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

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={heroRef}
      className="relative py-28 md:py-36 overflow-hidden ent-hero-bg"
    >
      {/* Gradient overlay */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, hsl(var(--ent-gold) / 0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, hsl(var(--ent-section-2) / 0.5) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating icons */}
      <FloatingIcon icon={Code} className="top-[15%] right-[10%] w-8 h-8" delay={0.3} duration={6} />
      <FloatingIcon icon={FileText} className="top-[30%] right-[25%] w-6 h-6" delay={0.7} duration={7} />
      <FloatingIcon icon={BookOpen} className="bottom-[20%] left-[8%] w-7 h-7" delay={1.0} duration={5.5} />
      <FloatingIcon icon={FileCode} className="top-[20%] left-[15%] w-6 h-6" delay={0.5} duration={6.5} />
      <FloatingIcon icon={Braces} className="bottom-[30%] right-[15%] w-7 h-7" delay={0.9} duration={7.5} />
      <FloatingIcon icon={Terminal} className="top-[50%] left-[5%] w-5 h-5" delay={1.3} duration={5} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: "var(--ent-grid-opacity, 0.03)",
          backgroundImage:
            "linear-gradient(hsl(var(--ent-gold) / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ent-gold) / 0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative reveal line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--ent-gold) / 0.3), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="container-narrow relative z-10">
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
            className="heading-display gold-text mb-6"
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
