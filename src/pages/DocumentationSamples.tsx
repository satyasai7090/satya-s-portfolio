import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { containerVariants, itemVariants } from "@/components/shared/AnimatedSection";

const documentationSamples = [
  {
    title: "User Guide Excerpt",
    type: "End-User Documentation",
    description: "A sample user guide demonstrating clear task-based writing for a fictional project management tool.",
    link: "#",
  },
  {
    title: "API Endpoint Reference",
    type: "Developer Documentation",
    description: "A sample API documentation snippet showing proper endpoint documentation structure.",
    link: "#",
  },
  {
    title: "Installation Guide",
    type: "Setup Documentation",
    description: "A sample installation guide demonstrating systematic setup instructions.",
    link: "#",
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
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {documentationSamples.map((sample) => (
              <motion.a
                key={sample.title}
                href={sample.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group card-elevated card-hover-glow p-6 flex flex-col border border-transparent"
                whileHover={{ y: -8, borderColor: "hsl(var(--primary) / 0.3)", scale: 1.02 }}
                whileTap={{ y: -4, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    {sample.type}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                </div>
                <h3 className="heading-card text-foreground mb-2 transition-colors duration-200 group-hover:text-primary">
                  {sample.title}
                </h3>
                <p className="body-default text-muted-foreground text-sm flex-1">
                  {sample.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DocumentationSamples;