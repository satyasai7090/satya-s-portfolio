import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, BookOpen, Code } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/* ── Typewriter titles ── */
const titles = [
  "Crafting Clarity in Complex Tech",
  "API Guides That Developers Love",
  "Release Notes That Drive Adoption",
];

/* ── Stats data ── */
const stats = [
  { value: "5+", label: "Years Experience", icon: Zap },
  { value: "200+", label: "Documents Delivered", icon: FileText },
  { value: "7+", label: "Enterprise Projects", icon: BookOpen },
  { value: "10+", label: "Products Documented", icon: Code },
];

/* ── Animated dot grid ── */
const gridDots = Array.from({ length: 80 }, (_, i) => ({
  x: (i % 10) * 11,
  y: Math.floor(i / 10) * 12.5,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
}));

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2000) {
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

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 800], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1200], [-5, 5]);

  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, titleIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Counter hooks for stats
  const stat0 = useCounter(5, 1800);
  const stat1 = useCounter(200, 2200);
  const stat2 = useCounter(7, 1600);
  const stat3 = useCounter(10, 1900);
  const counterRefs = [stat0, stat1, stat2, stat3];

  return (
    <section
      className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden ent-hero-bg"
      onMouseMove={handleMouseMove}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          {gridDots.map((dot, i) => (
            <motion.circle
              key={i}
              cx={`${dot.x}%`}
              cy={`${dot.y}%`}
              r="1.5"
              fill="currentColor"
              className="text-primary"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Geometric accent shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -top-16 -right-16 w-64 h-64 border border-primary/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] border border-primary/[0.08] rounded-full"
        />

        {/* Gradient orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl"
        />
      </div>

      <div className="container-wide px-6 py-8 relative z-10">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">
              Open to Opportunities
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col items-center text-center">
          {/* Name + tagline + pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 max-w-3xl"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-muted-foreground tracking-widest uppercase mb-3 font-medium"
              >
                Senior Technical Writer
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="font-display tracking-tight"
              >
                <span className="block text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold text-foreground">
                  Hi, I'm{" "}
                  <span className="relative inline-block">
                    <span className="gold-text">Satya Sai</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="absolute -bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full origin-left"
                    />
                  </span>
                </span>
                <span className="block text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold gold-text mt-1">
                  Pasupuleti
                </span>
              </motion.h1>
            </div>

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="h-16 flex items-center justify-center"
            >
              <p className="text-xl text-foreground/80 font-display font-medium">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"
                />
              </p>
            </motion.div>

            {/* Skill pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {["API Docs", "Release Notes", "User Guides", "Knowledge Base", "SaaS", "Developer Portals"].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 pt-2 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  asChild
                  className="rounded-full px-8 group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <Link to="/documentation-samples">
                    View Docs
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 group hover:border-primary/50 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1EbbJkW94T3EXT_Y3dWEcT66H5fRRSkov/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4 mr-1 transition-transform group-hover:-translate-y-0.5" />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Photo section - centered below content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 relative"
          >
            <motion.div
              style={{ rotateX, rotateY, perspective: 1000 }}
              className="relative w-56 mx-auto"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-2xl"
                style={{
                  background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.2), transparent 30%, hsl(var(--primary) / 0.15), transparent 60%, hsl(var(--primary) / 0.1), transparent)",
                }}
              />

              {/* Photo container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-card to-primary/10 border border-border shadow-gold">
                <img
                  src={profilePhoto}
                  alt="Satya Sai Pasupuleti — Technical Writer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-card via-card/90 to-transparent">
                  <p className="text-base font-display font-semibold text-foreground">Satya Sai Pasupuleti</p>
                  <p className="text-xs text-muted-foreground">Senior Technical Writer</p>
                </div>
              </div>

              {/* Floating widget - Experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="absolute -left-16 top-6 bg-card/95 backdrop-blur-md rounded-xl border border-border shadow-gold px-3 py-2 cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary font-display font-bold leading-none">5+</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">Years Exp.</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating widget - Projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="absolute -right-14 bottom-24 bg-card/95 backdrop-blur-md rounded-xl border border-border shadow-gold px-3 py-2 cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary font-display font-bold leading-none">7+</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">Projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating mini doc widget */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08 }}
                className="absolute -left-10 bottom-12 bg-card/95 backdrop-blur-md rounded-xl border border-border shadow-gold p-2.5 cursor-default"
              >
                <div className="flex items-end gap-1 h-6">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.5 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                      className="w-1.5 rounded-full bg-primary/60"
                    />
                  ))}
                </div>
                <p className="text-[9px] text-muted-foreground mt-1 text-center">Docs</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => {
            const counter = counterRefs[i];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative group p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-gold transition-all duration-300 cursor-default"
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl text-primary font-display font-bold">
                  <span ref={counter.ref}>{counter.count}</span>
                  {s.value.replace(/[\d]/g, "")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                <motion.div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary/0 group-hover:bg-primary/30 rounded-full transition-colors duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
