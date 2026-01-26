import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

const documentationSamples = [
  {
    title: "CloudSuite CRM – Release Notes (v3.12.0)",
    description: "Release notes documenting new features, enhancements, security updates, bug fixes, and upgrade guidance for an enterprise CRM platform.",
    pdfLink: "/docs/CloudSuite_CRM_Release_Notes.pdf",
  },
  {
    title: "PennyWise App – Quick Start & Walkthrough Guide",
    description: "End-user onboarding guide designed to help first-time users set up, navigate, and use a consumer budgeting application effectively.",
    pdfLink: "/docs/PennyWise_Quick_Start_Guide.pdf",
  },
  {
    title: "HealthMate Smart Glucometer – Quick Start Guide",
    description: "Concise quick start guide enabling users to safely set up, operate, and interpret results from a smart medical device.",
    pdfLink: "/docs/HealthMate_Glucometer_Quick_Start.pdf",
  },
  {
    title: "HealthMate Pro BPM-500 – User Guide",
    description: "Comprehensive user manual covering operation, troubleshooting, maintenance, safety, and regulatory compliance for a medical device.",
    pdfLink: "/docs/HealthMate_BPM500_User_Guide.pdf",
  },
];

const DocumentationSamples = () => {
  return (
    <PageLayout>
      <PageHero
        label="Samples"
        title="Documentation Samples"
        description="Sample documentation created for imaginary products to demonstrate structure and writing style."
      />

      <section className="section-padding surface-cool">
        <div className="container-narrow">
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {documentationSamples.map((sample, index) => (
              <motion.div
                key={sample.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative card-hover-glow p-6 flex flex-col cursor-pointer overflow-hidden"
              >
                {/* Decorative gradient overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                {/* Animated corner accent */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative flex items-start gap-4 mb-4">
                  {/* Icon with enhanced hover effect */}
                  <motion.div 
                    className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileText className="w-6 h-6" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="heading-card text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {sample.title}
                    </h3>
                    <p className="body-default text-muted-foreground text-sm leading-relaxed">
                      {sample.description}
                    </p>
                  </div>
                </div>
                
                {/* Bottom section with animated button */}
                <div className="relative mt-auto pt-4 border-t border-border/50 group-hover:border-primary/20 transition-colors duration-300">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/20"
                  >
                    <a
                      href={sample.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>View PDF</span>
                      <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </Button>
                </div>
                
                {/* Subtle index indicator */}
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-300">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DocumentationSamples;