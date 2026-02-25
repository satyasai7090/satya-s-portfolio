import { useRef, useEffect, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, FileText, Code, BookOpen, FileCode, Braces, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.png";

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, inView]);

  return { count, ref };
}

const FloatingIcon = forwardRef<HTMLDivElement, {
  icon: React.ElementType;
  className: string;
  delay: number;
  duration: number;
}>(({ icon: Icon, className, delay, duration }, ref) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.07, 0.07],
        scale: [0, 1, 1],
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay, times: [0, 0.5, 1] },
        scale: { duration: 0.8, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <Icon className="w-full h-full text-primary" strokeWidth={1} />
    </motion.div>
  );
});
FloatingIcon.displayName = "FloatingIcon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  },
};

const metricVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 1.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const doc5 = useCounter(5, 1800);
  const doc200 = useCounter(200, 2200);
  const proj7 = useCounter(7, 1600);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden ent-hero-bg"
    >
      {/* Animated gradient overlay */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, hsl(var(--ent-gold) / 0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, hsl(var(--ent-section-2) / 0.5) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating icons */}
      <FloatingIcon icon={Code} className="top-[12%] right-[8%] w-10 h-10" delay={0.5} duration={6} />
      <FloatingIcon icon={FileText} className="top-[25%] right-[22%] w-8 h-8" delay={1.0} duration={7} />
      <FloatingIcon icon={BookOpen} className="bottom-[20%] right-[15%] w-9 h-9" delay={1.5} duration={5.5} />
      <FloatingIcon icon={FileCode} className="top-[15%] left-[5%] w-7 h-7" delay={0.8} duration={6.5} />
      <FloatingIcon icon={Braces} className="bottom-[30%] left-[12%] w-8 h-8" delay={1.2} duration={7.5} />
      <FloatingIcon icon={Terminal} className="top-[60%] right-[5%] w-6 h-6" delay={1.8} duration={5} />

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

      <div className="container-wide relative z-10 py-12 md:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[85vh]">
          {/* Left — Profile Photo */}
          <motion.div
            className="order-2 lg:order-1 relative flex items-center justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            style={{ y: photoY }}
          >
            <div className="relative max-w-sm mx-auto lg:max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />

              <motion.div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-primary/20"
                style={{ boxShadow: "var(--shadow-elevated)" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={profilePhoto}
                  alt="Satya Sai Pasupuleti — Technical Writer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 pointer-events-none" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -right-3 top-1/3 backdrop-blur-md shadow-xl rounded-2xl px-5 py-4 border ent-card"
                style={{
                  backgroundColor: "hsl(var(--ent-badge-bg) / 0.9)",
                  borderColor: "hsl(var(--ent-badge-border) / 0.2)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <p className="text-3xl font-semibold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>5+</p>
                <p className="text-xs text-muted-foreground font-medium">Years<br />Experience</p>
              </motion.div>

              {/* Decorative shapes */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-3xl -z-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 5, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.7 },
                  scale: { duration: 0.6, delay: 0.7 },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-muted/30 rounded-2xl -z-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, -4, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.8 },
                  scale: { duration: 0.6, delay: 0.8 },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            className="order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={itemVariants} className="label-caps mb-5">
              Senior Technical Writer
            </motion.p>

            <motion.h1 variants={itemVariants} className="heading-display gold-text mb-5 leading-[1.1]">
              Satya Sai<br />Pasupuleti
            </motion.h1>

            <motion.h2 variants={itemVariants} className="body-large mb-4 font-light">
              Crafting Clarity in Complex Tech
            </motion.h2>

            <motion.h3 variants={itemVariants} className="body-small mb-8" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
              API Guides&ensp;·&ensp;Release Notes&ensp;·&ensp;User Docs for SaaS Leaders
            </motion.h3>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12 text-base rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ent-gold)/0.4)]"
                >
                  <Link to="/documentation-samples">
                    View Docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-medium px-8 h-12 text-base rounded-xl transition-all duration-300"
                >
                  <a
                    href="https://drive.google.com/file/d/1EbbJkW94T3EXT_Y3dWEcT66H5fRRSkov/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Metrics */}
            <div className="flex flex-wrap gap-6 md:gap-10">
              {[
                { counter: doc5, ref: doc5.ref, label: "Years\nExperience", suffix: "+" },
                { counter: doc200, ref: doc200.ref, label: "Documents\nDelivered", suffix: "+" },
                { counter: proj7, ref: proj7.ref, label: "Enterprise\nProjects", suffix: "+" },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  className="text-center min-w-[90px]"
                  variants={metricVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <span
                    ref={metric.ref}
                    className="block text-3xl md:text-4xl font-semibold text-primary"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {metric.counter.count}{metric.suffix}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-pre-line leading-tight mt-1 block">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
