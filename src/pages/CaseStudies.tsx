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
          "RMJ documentation supports multiple product versions and UI variants. Each version is maintained on a separate Git branch, and publishing must result in independently verifiable builds in Flare Online.",
          "A key constraint shapes this entire workflow: RMJ documentation relies on a required post-build script that must execute after the MadCap Flare build completes. This post-build step cannot currently be executed directly from MadCap Central. As a result, publishing must be driven locally through Flare Desktop or an equivalent CLI workflow.",
          "The goal of this project was to work within these constraints, not remove or bypass them."
        ],
      },
      {
        heading: "Why the Obvious Solutions Failed",
        content: [
          "Publishing directly from MadCap Central could not be used because the required post-build script would not execute. Reducing build time was not the real solution either—the per-version build duration was acceptable.",
          "The true bottleneck emerged when publishing many versions. Manual repetition—switching branches, triggering builds, waiting, verifying—consumed hours of active oversight. This was an orchestration problem, not a build problem."
        ],
      },
      {
        heading: "The Key Insight",
        content: [
          "The problem was not how RMJ documentation was built. The problem was the manual orchestration of publishing multiple versions.",
          "Each version already existed in its own branch and could be treated independently. Automation needed to respect version isolation, independent verification, and the existing build and post-build logic without modification."
        ],
      },
      {
        heading: "Designing a Safe Automation Workflow",
        content: [
          "The automation wraps around the existing RMJ publishing process rather than replacing it. No changes were made to Flare project configuration. No changes were made to the required post-build script.",
          "Publishing remains sequential and version-isolated. Each branch is checked out, built, post-processed, and published before moving to the next. This preserves the exact behavior of manual publishing while removing the need for constant human intervention."
        ],
        image: {
          placeholder: "Automation Script Location",
          caption: "Batch publishing automation maintained outside the RMJ repository to allow safe branch switching without risking content loss or cross-version contamination."
        }
      },
      {
        heading: "Execution in Practice",
        content: [
          "Publishing is triggered via a single PowerShell command. An explicit list of RMJ branches is provided as input. Each branch is processed independently and sequentially, with no manual intervention required during execution.",
          "The script handles branch switching, build invocation, post-build execution, and upload to Flare Online—all in a single unattended run."
        ],
        image: {
          placeholder: "CLI Execution",
          caption: "Single command triggering sequential publishing across multiple RMJ versions."
        }
      },
      {
        heading: "Verification & Trust",
        content: [
          "Each publish produces a separate build with its own build ID in Flare Online. Builds are visible and verifiable through the standard Flare Online interface. Output is identical to manual Flare Desktop publishing—because it uses the same underlying process.",
          "This transparency was essential for adoption. The automation does not obscure what happens; it simply removes the need to do it manually."
        ],
        image: {
          placeholder: "Flare Online Builds",
          caption: "Independent build IDs visible in Flare Online, confirming version isolation and successful publishing."
        }
      },
      {
        heading: "Impact at Scale",
        content: [
          "Per-version build time remains unchanged—automation does not speed up individual builds. What it eliminates is hours of active oversight. Manual effort is reduced from continuous monitoring to minutes of initial setup.",
          "Publishing 10–15 versions becomes practical and repeatable. The solution scales linearly as RMJ grows, without added complexity or new tooling dependencies.",
          "Publishing shifted from a repetitive manual task to a controlled, reliable workflow."
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Enterprise API Documentation Overhaul",
    sections: [
      {
        heading: "Context",
        content: "A leading B2B SaaS platform providing workflow automation tools for enterprise clients. The platform integrated with dozens of third-party systems and required comprehensive API documentation for developer partners.",
      },
      {
        heading: "Problem",
        content: "The existing API documentation was fragmented across multiple repositories, inconsistent in style, and frequently outdated. Developer onboarding times averaged 3+ weeks, and support tickets related to integration issues consumed significant engineering resources.",
      },
      {
        heading: "Role & Approach",
        content: "I was brought in as the sole technical writer responsible for the complete documentation overhaul. This included auditing existing content, establishing new information architecture, and collaborating directly with the API engineering team.",
      },
      {
        heading: "Tools & Collaboration",
        content: "Worked extensively with OpenAPI/Swagger specifications, Git-based docs-as-code workflows, and Markdown. Collaborated daily with backend engineers, product managers, and developer relations.",
      },
      {
        heading: "Outcome & Impact",
        content: "Reduced developer onboarding time by 60% (from 3 weeks to under 1 week). Integration-related support tickets dropped by 45% within the first quarter post-launch. The new documentation structure became the template for all future API products.",
      },
    ],
  },
  {
    id: 3,
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
