import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Mail, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, AnimatedImage, AnimatedText } from "@/components/shared/AnimatedSection";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <AnimatedText>
                <p className="label-caps mb-4 text-accent">Technical Writer</p>
              </AnimatedText>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-display text-foreground mb-6"
              >
                Sarah Mitchell
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="body-large max-w-xl mb-8"
              >
                Technical Writer with 3+ years of experience supporting enterprise 
                software through structured, compliant, and user-focused documentation.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to="/case-studies">
                    View Case Studies
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
              
              {/* Professional Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-6"
              >
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="mailto:sarah@example.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
                <a 
                  href="/resume.pdf"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Resume</span>
                </a>
              </motion.div>
            </div>
            
            {/* Profile Photo */}
            <AnimatedImage className="order-1 lg:order-2" delay={0.2}>
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-2xl">
                  <img 
                    src={profilePhoto} 
                    alt="Sarah Mitchell - Technical Writer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-xl -z-10" />
              </div>
            </AnimatedImage>
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
