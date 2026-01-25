import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero, heroItemVariants } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

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

const DocumentationSamples = () => {
  return (
    <PageLayout>
      <PageHero
        label="Samples"
        title="Documentation Samples"
        description="Sample documentation created for imaginary products to demonstrate structure and writing style."
      />

      <section className="section-padding surface-warm">
        <div className="container-narrow">
          <div className="space-y-8">
            {documentationSamples.map((sample, index) => (
              <AnimatedSection key={sample.title} delay={index * 0.1}>
                <motion.div
                  className="card-elevated card-hover-glow"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="heading-card text-foreground">{sample.title}</h3>
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
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DocumentationSamples;
