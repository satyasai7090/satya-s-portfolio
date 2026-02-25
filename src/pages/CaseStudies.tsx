import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/shared/AnimatedSection";

import automationScriptLocation from "@/assets/case-study/automation-script-location.jpeg";
import cliExecution from "@/assets/case-study/cli-execution.jpeg";
import flareOnlineBuilds from "@/assets/case-study/flare-online-builds.jpeg";

interface CaseStudySection {
  heading: string;
  content: string | string[];
  image?: { src: string; caption: string };
}

interface CaseStudy {
  id: number;
  title: string;
  subtitle?: string;
  sections: CaseStudySection[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Automated RMJ Documentation Publishing Pipeline",
    subtitle: "Reducing manual publishing effort while preserving the existing RMJ build process",
    sections: [
      { heading: "Context & Constraints", content: ["RMJ documentation supports multiple product versions and UI variants, each on a separate Git branch. A required post-build script must execute after every MadCap Flare build—but cannot run from MadCap Central.", "Publishing must be driven locally. The goal was to automate within these constraints, not bypass them."] },
      { heading: "Why Obvious Solutions Failed", content: "MadCap Central couldn't run the post-build script. Build speed wasn't the issue—manual orchestration was. Publishing 10+ versions meant hours of switching branches, triggering builds, waiting, and verifying." },
      { heading: "The Key Insight", content: "The problem wasn't how builds worked—it was the repetitive manual orchestration. Each branch could be processed independently, preserving version isolation and existing build logic." },
      { heading: "Designing a Safe Automation Workflow", content: "The automation wraps around the existing process without modifying Flare configuration or the post-build script. Branches are processed sequentially—checkout, build, post-process, publish—preserving manual behavior while eliminating human intervention.", image: { src: automationScriptLocation, caption: "Batch automation maintained outside the RMJ repository to enable safe branch switching." } },
      { heading: "Execution in Practice", content: "A single PowerShell command takes a list of branches and processes each independently. No manual intervention required during execution.", image: { src: cliExecution, caption: "Single command triggering sequential publishing across multiple RMJ versions." } },
      { heading: "Verification & Trust", content: "Each publish produces a separate, verifiable build in Flare Online—identical to manual publishing. The automation is transparent; it removes effort without obscuring what happens.", image: { src: flareOnlineBuilds, caption: "Independent build IDs in Flare Online confirming version isolation." } },
      { heading: "Impact at Scale", content: "Manual effort dropped from hours to minutes of setup. Publishing 10–15 versions became practical and repeatable. The solution scales linearly without added complexity. Publishing shifted from a repetitive task to a controlled, reliable workflow." },
    ],
  },
];

function CaseStudyImage({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="mt-6 mb-2">
      <motion.div
        className="rounded-xl overflow-hidden border border-border/50 bg-muted/20"
        style={{ boxShadow: "var(--shadow-elevated)" }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <img src={src} alt={caption} className="w-full h-auto object-contain max-h-[500px]" loading="lazy" />
      </motion.div>
      <p className="text-sm text-muted-foreground mt-3 italic text-center px-4">{caption}</p>
    </div>
  );
}

function renderContent(content: string | string[]) {
  if (Array.isArray(content)) {
    return (
      <div className="space-y-3">
        {content.map((paragraph, idx) => (
          <p key={idx} className="body-default">{paragraph}</p>
        ))}
      </div>
    );
  }
  return <p className="body-default">{content}</p>;
}

const CaseStudies = () => {
  return (
    <PageLayout>
      <PageHero
        label="Portfolio"
        title="Case Studies"
        description="Real-world examples of documentation challenges solved and measurable impact delivered."
      />

      {caseStudies.map((study, index) => (
        <section
          key={study.id}
          className={`section-padding ${index % 2 === 0 ? "ent-section-1" : "ent-section-2"}`}
        >
          <div className="container-narrow">
            <AnimatedSection>
              <div className="mb-8">
                <p className="label-caps mb-3">Case Study {study.id}</p>
                <h2 className="heading-section gold-text">{study.title}</h2>
                {study.subtitle && (
                  <p className="body-large mt-3">{study.subtitle}</p>
                )}
              </div>
            </AnimatedSection>

            <AnimatedContainer className="space-y-8" staggerDelay={0.12}>
              {study.sections.map((section, sectionIndex) => {
                const isOutcome = section.heading.toLowerCase().includes("outcome") || section.heading.toLowerCase().includes("impact");
                return (
                  <AnimatedItem key={sectionIndex}>
                    {isOutcome ? (
                      <motion.div
                        className="ent-card border-l-4 !border-l-primary"
                        whileHover={{ scale: 1.02, y: -6 }}
                        whileTap={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="heading-small text-foreground mb-2">{section.heading}</h3>
                        {renderContent(section.content)}
                        {section.image && <CaseStudyImage src={section.image.src} caption={section.image.caption} />}
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 8, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 rounded-xl transition-all duration-300 border border-transparent hover:border-primary/20 hover:bg-primary/5"
                      >
                        <h3 className="heading-small text-foreground mb-2">{section.heading}</h3>
                        {renderContent(section.content)}
                        {section.image && <CaseStudyImage src={section.image.src} caption={section.image.caption} />}
                      </motion.div>
                    )}
                  </AnimatedItem>
                );
              })}
            </AnimatedContainer>
          </div>
        </section>
      ))}
    </PageLayout>
  );
};

export default CaseStudies;
