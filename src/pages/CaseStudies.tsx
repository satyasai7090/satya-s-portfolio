import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/shared/AnimatedSection";
import { ImageIcon } from "lucide-react";

interface CaseStudySection {
  heading: string;
  content: string | string[];
  image?: {
    placeholder: string;
    caption: string;
  };
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
      {
        heading: "Context & Constraints",
        content: [
          "RMJ documentation supports multiple product versions and UI variants, each on a separate Git branch. A required post-build script must execute after every MadCap Flare build—but cannot run from MadCap Central.",
          "Publishing must be driven locally. The goal was to automate within these constraints, not bypass them."
        ],
      },
      {
        heading: "Why Obvious Solutions Failed",
        content: "MadCap Central couldn't run the post-build script. Build speed wasn't the issue—manual orchestration was. Publishing 10+ versions meant hours of switching branches, triggering builds, waiting, and verifying."
      },
      {
        heading: "The Key Insight",
        content: "The problem wasn't how builds worked—it was the repetitive manual orchestration. Each branch could be processed independently, preserving version isolation and existing build logic."
      },
      {
        heading: "Designing a Safe Automation Workflow",
        content: "The automation wraps around the existing process without modifying Flare configuration or the post-build script. Branches are processed sequentially—checkout, build, post-process, publish—preserving manual behavior while eliminating human intervention.",
        image: {
          placeholder: "Automation Script Location",
          caption: "Batch automation maintained outside the RMJ repository to enable safe branch switching."
        }
      },
      {
        heading: "Execution in Practice",
        content: "A single PowerShell command takes a list of branches and processes each independently. No manual intervention required during execution.",
        image: {
          placeholder: "CLI Execution",
          caption: "Single command triggering sequential publishing across multiple RMJ versions."
        }
      },
      {
        heading: "Verification & Trust",
        content: "Each publish produces a separate, verifiable build in Flare Online—identical to manual publishing. The automation is transparent; it removes effort without obscuring what happens.",
        image: {
          placeholder: "Flare Online Builds",
          caption: "Independent build IDs in Flare Online confirming version isolation."
        }
      },
      {
        heading: "Impact at Scale",
        content: "Manual effort dropped from hours to minutes of setup. Publishing 10–15 versions became practical and repeatable. The solution scales linearly without added complexity. Publishing shifted from a repetitive task to a controlled, reliable workflow."
      },
    ],
  },
  {
    id: 2,
    title: "Regulatory Compliance Documentation Suite",
    sections: [
      {
        heading: "Context",
        content: "A healthcare technology company developing software for clinical trial management. All documentation required strict adherence to FDA 21 CFR Part 11 and EU Annex 11 compliance standards.",
      },
      {
        heading: "Problem",
        content: "The documentation process was reactive rather than proactive, with compliance reviews happening late in the release cycle. This caused delays, rework, and risk of non-compliance. There was no standardized template system for compliance-critical documents.",
      },
      {
        heading: "Role & Approach",
        content: "Took ownership of building a compliance-first documentation framework. Led the creation of standardized templates, established review workflows, and trained team members on regulatory documentation requirements.",
      },
      {
        heading: "Tools & Collaboration",
        content: "Utilized structured authoring tools, XML-based content management systems, and collaborative review platforms. Worked closely with regulatory affairs, QA, and product teams.",
      },
      {
        heading: "Outcome & Impact",
        content: "Achieved zero compliance findings in two consecutive FDA audits. Reduced documentation-related release delays by 80%. The template system was adopted company-wide and reduced new document creation time by 50%.",
      },
    ],
  },
];

function ImagePlaceholder({ placeholder, caption }: { placeholder: string; caption: string }) {
  return (
    <div className="mt-6 mb-2">
      <div className="bg-muted/50 border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px]">
        <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">[Image Placeholder: {placeholder}]</p>
      </div>
      <p className="text-sm text-muted-foreground mt-3 italic text-center px-4">{caption}</p>
    </div>
  );
}

function renderContent(content: string | string[]) {
  if (Array.isArray(content)) {
    return (
      <div className="space-y-3">
        {content.map((paragraph, idx) => (
          <p key={idx} className="body-default text-muted-foreground">{paragraph}</p>
        ))}
      </div>
    );
  }
  return <p className="body-default text-muted-foreground">{content}</p>;
}

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
          className={`section-padding ${index % 2 === 0 ? "surface-cool" : "surface-accent"}`}
        >
          <div className="container-narrow">
            <AnimatedSection>
              <div className="mb-8">
                <p className="label-caps mb-3">Case Study {study.id}</p>
                <h2 className="heading-section text-foreground">{study.title}</h2>
                {study.subtitle && (
                  <p className="body-large mt-3 text-muted-foreground">{study.subtitle}</p>
                )}
              </div>
            </AnimatedSection>

            <AnimatedContainer className="space-y-8" staggerDelay={0.12}>
              {study.sections.map((section, sectionIndex) => {
                const isOutcome = section.heading.toLowerCase().includes("outcome") || 
                                  section.heading.toLowerCase().includes("impact");
                
                return (
                  <AnimatedItem key={sectionIndex}>
                    {isOutcome ? (
                      <motion.div
                        className="card-elevated border-l-4 border-primary"
                        whileHover={{ scale: 1.02, y: -6 }}
                        whileTap={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-label text-foreground mb-2">{section.heading}</h3>
                        {renderContent(section.content)}
                        {section.image && (
                          <ImagePlaceholder 
                            placeholder={section.image.placeholder} 
                            caption={section.image.caption} 
                          />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 8, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 rounded-xl hover:bg-accent/10 transition-all duration-300 border border-transparent hover:border-primary/20"
                      >
                        <h3 className="text-label text-foreground mb-2">{section.heading}</h3>
                        {renderContent(section.content)}
                        {section.image && (
                          <ImagePlaceholder 
                            placeholder={section.image.placeholder} 
                            caption={section.image.caption} 
                          />
                        )}
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
