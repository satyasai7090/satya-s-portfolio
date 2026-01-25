import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, AnimatedText } from "@/components/shared/AnimatedSection";

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

const documentationSamples = [
  {
    title: "User Guide Excerpt",
    type: "End-User Documentation",
    description: "A sample user guide section demonstrating clear task-based writing for a fictional project management tool.",
    preview: `## Creating Your First Project

To create a new project in Nexus, follow these steps:

1. Navigate to the **Dashboard** and click **New Project**.
2. Enter a project name (maximum 100 characters).
3. Select a project template or start from scratch.
4. Configure team permissions in the **Access** tab.
5. Click **Create** to finalize.

> **Note:** Project names must be unique within your organization.`,
  },
  {
    title: "API Endpoint Reference",
    type: "Developer Documentation",
    description: "A sample API documentation snippet showing proper endpoint documentation structure.",
    preview: `## POST /api/v1/projects

Creates a new project resource.

**Request Headers**
| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Bearer token |
| Content-Type | Yes | application/json |

**Request Body**
\`\`\`json
{
  "name": "My Project",
  "template_id": "tpl_001",
  "team_ids": ["team_abc"]
}
\`\`\``,
  },
  {
    title: "Installation Guide",
    type: "Setup Documentation",
    description: "A sample installation guide demonstrating systematic setup instructions.",
    preview: `## Prerequisites

Before installing DataSync Pro, ensure your system meets these requirements:

- **Operating System:** Windows 10+, macOS 12+, or Ubuntu 20.04+
- **Memory:** Minimum 8GB RAM (16GB recommended)
- **Storage:** 500MB available disk space
- **Network:** Stable internet connection for license activation

## Installation Steps

1. Download the installer from your account portal.
2. Run the installer with administrator privileges.
3. Accept the license agreement.
4. Choose installation directory (default recommended).
5. Complete setup and launch the application.`,
  },
];

const CaseStudies = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedText>
            <p className="label-caps mb-4">Portfolio</p>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h1 className="heading-display text-foreground mb-6">
              Case Studies
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="body-large">
              Real-world examples of documentation challenges solved and 
              measurable impact delivered.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <section 
          key={study.id} 
          className={`section-padding ${index % 2 === 0 ? 'surface-warm' : ''}`}
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
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Context</h3>
                  <p className="body-default text-muted-foreground">{study.context}</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.15}>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Problem</h3>
                  <p className="body-default text-muted-foreground">{study.problem}</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Role & Approach</h3>
                  <p className="body-default text-muted-foreground">{study.role}</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.25}>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Tools & Collaboration</h3>
                  <p className="body-default text-muted-foreground">{study.tools}</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <div className="card-elevated border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">Outcome & Impact</h3>
                  <p className="body-default text-foreground">{study.outcome}</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Documentation Samples */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeader
            label="Samples"
            title="Selected Documentation Samples"
            description="Sample documentation created for imaginary products to demonstrate structure and writing style."
          />
          
          <div className="mt-12 space-y-8">
            {documentationSamples.map((sample, index) => (
              <AnimatedSection key={sample.title} delay={index * 0.1}>
                <div className="card-elevated">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="heading-subsection text-foreground">{sample.title}</h3>
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                      {sample.type}
                    </span>
                  </div>
                  <p className="body-default text-muted-foreground mb-6">{sample.description}</p>
                  <div className="bg-muted/50 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-mono">
                      {sample.preview}
                    </pre>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudies;
