import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero, heroItemVariants, heroContainerVariants } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const caseStudies = [
  {
    id: 1,
    title: "Enterprise API Documentation Overhaul",
    context: "A leading B2B SaaS platform providing workflow automation tools for enterprise clients. The platform integrated with dozens of third-party systems and required comprehensive API documentation for developer partners.",
    problem: "The existing API documentation was fragmented across multiple repositories, inconsistent in style, and frequently outdated. Developer onboarding times averaged 3+ weeks, and support tickets related to integration issues consumed significant engineering resources.",
    role: "I was brought in as the sole technical writer responsible for the complete documentation overhaul. This included auditing existing content, establishing new information architecture, and collaborating directly with the API engineering team.",
    tools: "Worked extensively with OpenAPI/Swagger specifications, Git-based docs-as-code workflows, and Markdown. Collaborated daily with backend engineers, product managers, and developer relations.",
    outcome: "Reduced developer onboarding time by 60% (from 3 weeks to under 1 week). Integration-related support tickets dropped by 45% within the first quarter post-launch. The new documentation structure became the template for all future API products.",
  },
  {
    id: 2,
    title: "Regulatory Compliance Documentation Suite",
    context: "A healthcare technology company developing software for clinical trial management. All documentation required strict adherence to FDA 21 CFR Part 11 and EU Annex 11 compliance standards.",
    problem: "The documentation process was reactive rather than proactive, with compliance reviews happening late in the release cycle. This caused delays, rework, and risk of non-compliance. There was no standardized template system for compliance-critical documents.",
    role: "Took ownership of building a compliance-first documentation framework. Led the creation of standardized templates, established review workflows, and trained team members on regulatory documentation requirements.",
    tools: "Utilized structured authoring tools, XML-based content management systems, and collaborative review platforms. Worked closely with regulatory affairs, QA, and product teams.",
    outcome: "Achieved zero compliance findings in two consecutive FDA audits. Reduced documentation-related release delays by 80%. The template system was adopted company-wide and reduced new document creation time by 50%.",
  },
];

const CaseStudies = () => {
  return (
    <PageLayout>
      <PageHero
        label="Portfolio"
        title="Case Studies"
        description="Real-world examples of documentation challenges solved and measurable impact delivered."
      />

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <section
          key={study.id}
          className={`section-padding ${index % 2 === 0 ? "surface-warm" : ""}`}
        >
          <div className="container-narrow">
            <AnimatedSection>
              <div className="mb-8">
                <p className="label-caps mb-3">Case Study {study.id}</p>
                <h2 className="heading-section text-foreground">{study.title}</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection delay={0.1}>
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-lg hover:bg-accent/10 transition-colors duration-200"
                >
                  <h3 className="text-label text-foreground mb-2">Context</h3>
                  <p className="body-default text-muted-foreground">{study.context}</p>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-lg hover:bg-accent/10 transition-colors duration-200"
                >
                  <h3 className="text-label text-foreground mb-2">Problem</h3>
                  <p className="body-default text-muted-foreground">{study.problem}</p>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-lg hover:bg-accent/10 transition-colors duration-200"
                >
                  <h3 className="text-label text-foreground mb-2">Role & Approach</h3>
                  <p className="body-default text-muted-foreground">{study.role}</p>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-lg hover:bg-accent/10 transition-colors duration-200"
                >
                  <h3 className="text-label text-foreground mb-2">Tools & Collaboration</h3>
                  <p className="body-default text-muted-foreground">{study.tools}</p>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <motion.div
                  className="card-elevated border-l-4 border-primary"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-label text-foreground mb-2">Outcome & Impact</h3>
                  <p className="body-default text-foreground">{study.outcome}</p>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}
    </PageLayout>
  );
};

export default CaseStudies;
