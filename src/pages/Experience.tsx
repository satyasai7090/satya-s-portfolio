import { forwardRef } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedContainer, AnimatedItem, containerVariants, itemVariants } from "@/components/shared/AnimatedSection";

const impactStats = [
  { value: "200+", label: "Documents Delivered", description: "User guides, API docs, release notes, and compliance materials" },
  { value: "60%", label: "Onboarding Reduction", description: "Average reduction in user/developer onboarding time" },
  { value: "7+", label: "Product Releases", description: "Documentation delivered for major product releases" },
  { value: "100%", label: "Audit Compliance", description: "Zero findings in regulatory documentation audits" },
];

const experience = [
  {
    role: "Senior Technical Writer",
    company: "Redwood Software",
    period: "Dec 2025 – Present",
    description: "Senior Technical Writer responsible for end-to-end documentation of RunMyJobs, an enterprise workload automation and job scheduling platform. Own and maintain user guides, configuration documentation, and release content for complex scheduling, automation, and integration workflows.",
  },
  {
    role: "Technical Writer",
    company: "Oracle India Pvt. Ltd.",
    period: "Jun 2024 – Nov 2025",
    description: "Technical Writer supporting enterprise healthcare safety software products. Developed and maintained high-quality product documentation including user guides, release notes, and regulatory-compliant content.",
  },
  {
    role: "Product Information Specialist",
    company: "Unisys India Pvt. Ltd.",
    period: "Apr 2023 – Jun 2024",
    description: "Owned and delivered technical documentation for enterprise data exchange and integration solutions. Created and maintained product documentation, configuration guides, and knowledge base content.",
  },
  {
    role: "Technical Writer",
    company: "Cyient Ltd.",
    period: "Dec 2020 – Apr 2023",
    description: "Produced technical documentation for enterprise and industrial software products, including user manuals, installation guides, and process documentation.",
  },
];

const skillCategories = [
  {
    title: "Documentation Types",
    skills: ["API & Developer Documentation", "User Guides & Tutorials", "Installation & Configuration Guides", "Release Notes & Changelogs", "Regulatory & Compliance Documentation", "Knowledge Base Articles", "Internal Process Documentation", "UI / UX Documentation", "Data Exchange & Integration Documentation", "Administrator & Configuration Guides"],
  },
  {
    title: "Tools & Technologies",
    skills: ["Arbortext Editor", "Oxygen XML Editor", "XML / DITA (Structured Authoring)", "MadCap Flare", "Adobe RoboHelp", "Content Management Systems (CMS)", "Jira", "Confluence", "Snagit", "Camtasia"],
  },
  {
    title: "Collaboration & Process",
    skills: ["Agile / Scrum Environments", "SDLC / DDLC", "Cross-functional Team Collaboration", "SME Interviews & Reviews", "Documentation Reviews & Quality Audits", "Style Guide Development & Maintenance", "Content Strategy & Information Architecture", "Release Coordination", "Stakeholder Communication", "AI-assisted Documentation (OpenAI)"],
  },
];

const Experience = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <PageLayout>
      <PageHero
        label="Background"
        title="Experience & Skills"
        description="Five years of delivering documentation that drives clarity, reduces support burden, and meets enterprise standards."
      />

      {/* Professional Impact */}
      <section className="section-padding ent-section-1">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="label-caps mb-3">Impact</p>
              <h2 className="heading-section gold-text">Professional Impact</h2>
            </div>
          </AnimatedSection>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {impactStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="ent-card text-center h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ y: -4, scale: 0.98 }}
              >
                <p className="text-stat text-primary mb-2">{stat.value}</p>
                <p className="text-label text-foreground mb-2">{stat.label}</p>
                <p className="body-small">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding ent-section-2">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-caps mb-3">Experience</p>
            <h2 className="heading-section gold-text mb-10">Professional History</h2>
          </AnimatedSection>
          <AnimatedContainer className="space-y-8" staggerDelay={0.15}>
            {experience.map((exp) => (
              <AnimatedItem key={exp.role}>
                <motion.div
                  className="group relative pl-8 border-l-2 border-border pb-8 last:pb-0 hover:border-primary/50 transition-colors duration-300"
                  whileHover={{ x: 8, scale: 1.01 }}
                  whileTap={{ x: 4, scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary/40 transition-all duration-300 group-hover:bg-primary group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-primary/40" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <h3 className="heading-small text-foreground">{exp.role}</h3>
                    <span className="body-small">{exp.period}</span>
                  </div>
                  <p className="text-label text-primary/80 mb-3">{exp.company}</p>
                  <p className="body-default">{exp.description}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding ent-section-3">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="label-caps mb-3">Skills</p>
              <h2 className="heading-section gold-text">Core Skills & Tools</h2>
            </div>
          </AnimatedSection>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="ent-card h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ y: -4, scale: 0.98 }}
              >
                <h3 className="heading-small text-foreground mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      className="group body-small flex items-center gap-2 p-2 -mx-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-primary/5"
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30 flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-[2] group-hover:shadow-sm group-hover:shadow-primary/40" />
                      <span className="transition-colors duration-200 group-hover:text-foreground">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
});
Experience.displayName = "Experience";

export default Experience;
