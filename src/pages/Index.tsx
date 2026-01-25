import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
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
                Sarah Mitchell
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
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </motion.span>
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
            
            {/* Profile Photo */}
            <motion.div 
              className="order-1 lg:order-2"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <motion.div 
                  className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={profilePhoto} 
                    alt="Sarah Mitchell - Technical Writer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Decorative elements with staggered animation */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-2xl -z-10"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.7}
                />
                <motion.div 
                  className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-xl -z-10"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.9}
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
              <div className="text-center p-6">
                <p className="text-4xl font-display font-medium text-foreground mb-2">3+</p>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="text-center p-6">
                <p className="text-4xl font-display font-medium text-foreground mb-2">500+</p>
                <p className="text-muted-foreground">Documents Delivered</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center p-6">
                <p className="text-4xl font-display font-medium text-foreground mb-2">10+</p>
                <p className="text-muted-foreground">Enterprise Projects</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
