import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, FileText, BookOpen, FileCode, Braces, Terminal } from "lucide-react";

// Floating icon for page heroes
function FloatingIcon({ icon: Icon, className, delay, duration }: {
  icon: React.ElementType;
  className: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className={`absolute opacity-[0.05] ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 0.05,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <Icon className="w-full h-full text-[#d4af37]" strokeWidth={1} />
    </motion.div>
  );
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(212,175,55,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(15,52,96,0.3) 0%, transparent 70%)",
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

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-narrow relative z-10">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={heroItemVariants}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-4"
          >
            {label}
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="mb-6 leading-[1.1] tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 600,
              background: "linear-gradient(135deg, #d4af37 0%, #f5d670 40%, #d4af37 70%, #b8962e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            className="text-lg md:text-xl leading-relaxed text-gray-300/80 max-w-2xl"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
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

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
