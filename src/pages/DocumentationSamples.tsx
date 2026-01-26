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
    pdfLink: "#", // Replace with actual PDF path
  },
  {
    title: "PennyWise App – Quick Start & Walkthrough Guide",
    description: "End-user onboarding guide designed to help first-time users set up, navigate, and use a consumer budgeting application effectively.",
    pdfLink: "#", // Replace with actual PDF path
  },
  {
    title: "HealthMate Smart Glucometer – Quick Start Guide",
    description: "Concise quick start guide enabling users to safely set up, operate, and interpret results from a smart medical device.",
    pdfLink: "#", // Replace with actual PDF path
  },
  {
    title: "HealthMate Pro BPM-500 – User Guide",
    description: "Comprehensive user manual covering operation, troubleshooting, maintenance, safety, and regulatory compliance for a medical device.",
    pdfLink: "#", // Replace with actual PDF path
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
            {documentationSamples.map((sample) => (
              <motion.div
                key={sample.title}
                variants={itemVariants}
                className="card-elevated p-6 flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="heading-card text-foreground mb-2">
                      {sample.title}
                    </h3>
                    <p className="body-default text-muted-foreground text-sm">
                      {sample.description}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <a
                      href={sample.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  </Button>
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