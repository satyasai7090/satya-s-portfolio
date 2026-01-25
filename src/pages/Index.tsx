import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Mail, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, AnimatedImage, AnimatedText } from "@/components/shared/AnimatedSection";
import profilePhoto from "@/assets/profile-photo.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.2,
    },
  },
};

const decorativeVariants = {
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

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.6 + i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[90vh] flex items-center overflow-hidden relative">
        {/* Background decorative elements with parallax */}
        <motion.div 
          className="absolute top-20 right-[10%] w-3 h-3 rounded-full bg-primary/30"
          variants={decorativeVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute top-40 right-[5%] w-2 h-2 rounded-full bg-secondary/50"
          variants={decorativeVariants}
          initial="hidden"
          animate="visible"
          custom={1.0}
          style={{ y: y2 }}
        />
        <motion.div 
          className="absolute bottom-32 left-[8%] w-2 h-2 rounded-full bg-primary/20"
          variants={decorativeVariants}
          initial="hidden"
          animate="visible"
          custom={1.2}
          style={{ y: y3 }}
        />
        
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content - Left Side */}
            <motion.div 
              className="order-2 lg:order-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                variants={itemVariants}
                className="label-caps mb-4 text-accent-foreground"
              >
                Technical Writer
              </motion.p>
              
              <motion.h1 
                variants={itemVariants}
                className="heading-display text-foreground mb-6"
              >
                Hello, I'm<br />
                <span className="text-primary">Sarah Mitchell</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="body-large max-w-xl mb-8"
              >
                Technical Writer with 3+ years of experience supporting enterprise 
                software through structured, compliant, and user-focused documentation.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-10"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/case-studies">
                      View Case Studies
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="hero-outline" size="lg" asChild>
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Professional Links */}
              <div className="flex items-center gap-6">
                {[
                  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", external: true },
                  { href: "mailto:sarah@example.com", icon: Mail, label: "Email", external: false },
                  { href: "/resume.pdf", icon: FileText, label: "Resume", external: false },
                ].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 3 }}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Profile Photo - Right Side */}
            <motion.div 
              className="order-1 lg:order-2 relative"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Main image container */}
                <motion.div 
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-2xl"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={profilePhoto} 
                    alt="Sarah Mitchell - Technical Writer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Floating experience badge */}
                <motion.div 
                  className="absolute -right-4 top-1/3 bg-card shadow-xl rounded-2xl px-5 py-4 border border-border"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.8}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <p className="text-3xl font-display font-semibold text-primary">3+</p>
                  <p className="text-xs text-muted-foreground font-medium">Years<br />Experience</p>
                </motion.div>
                
                {/* Decorative elements with parallax */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-28 h-28 bg-accent rounded-3xl -z-10"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.6}
                  style={{ y: y4, rotate: rotate1 }}
                />
                <motion.div 
                  className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-2xl -z-10"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.7}
                  style={{ y: y5, rotate: rotate2 }}
                />
                <motion.div 
                  className="absolute top-8 -left-3 w-6 h-6 bg-primary/20 rounded-full -z-10"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.0}
                  style={{ y: y3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Brief Overview Section */}
      <section className="section-padding surface-warm">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0}>
              <motion.div 
                className="text-center p-8 bg-card rounded-2xl shadow-sm border border-border/50"
                whileHover={{ y: -4, boxShadow: "0 10px 40px -10px hsl(var(--primary) / 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-4xl font-display font-semibold text-primary mb-2">3+</p>
                <p className="text-muted-foreground font-medium">Years Experience</p>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <motion.div 
                className="text-center p-8 bg-card rounded-2xl shadow-sm border border-border/50"
                whileHover={{ y: -4, boxShadow: "0 10px 40px -10px hsl(var(--primary) / 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-4xl font-display font-semibold text-primary mb-2">500+</p>
                <p className="text-muted-foreground font-medium">Documents Delivered</p>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.div 
                className="text-center p-8 bg-card rounded-2xl shadow-sm border border-border/50"
                whileHover={{ y: -4, boxShadow: "0 10px 40px -10px hsl(var(--primary) / 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-4xl font-display font-semibold text-primary mb-2">10+</p>
                <p className="text-muted-foreground font-medium">Enterprise Projects</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
