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
    company: "Enterprise SaaS Company",
    period: "2023 – Present",
    description: "Lead technical writer for core platform products. Own end-to-end documentation for API products, developer portals, and enterprise integrations. Mentor junior writers and establish documentation standards.",
  },
  {
    role: "Technical Writer",
    company: "Healthcare Technology Startup",
    period: "2021 – 2023",
    description: "Sole documentation owner for clinical software platform. Built compliance documentation framework meeting FDA and EU regulatory requirements. Reduced documentation-related release delays by 80%.",
  },
  {
    role: "Technical Writer (Contract)",
    company: "Various Technology Clients",
    period: "2020 – 2021",
    description: "Contract documentation work for B2B software companies. Projects included API documentation, user guides, and knowledge base development.",
  },
];

const skillCategories = [
  {
    title: "Documentation Types",
    skills: [
      "API & Developer Documentation",
      "User Guides & Tutorials",
      "Regulatory & Compliance Docs",
      "Release Notes & Changelogs",
      "Knowledge Base Articles",
      "Internal Process Documentation",
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      "Markdown / MDX",
      "Git & GitHub",
      "OpenAPI / Swagger",
      "Docs-as-Code Workflows",
      "Confluence & Notion",
      "XML / DITA (Structured Authoring)",
    ],
  },
  {
    title: "Collaboration & Process",
    skills: [
      "Agile / Scrum Environments",
      "Cross-functional Team Work",
      "Technical SME Interviews",
      "Documentation Reviews",
      "Style Guide Development",
      "Content Strategy",
    ],
  },
];

const Experience = () => {
  return (
    <PageLayout>
      <PageHero
        label="Background"
        title="Experience & Skills"
        description="Three years of delivering documentation that drives clarity, reduces support burden, and meets enterprise standards."
      />

      {/* Professional Impact */}
      <section className="section-padding surface-warm">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="label-caps mb-3">Impact</p>
              <h2 className="heading-section text-foreground">Professional Impact</h2>
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
                className="card-elevated card-hover-glow text-center h-full border border-transparent"
                whileHover={{ y: -8, borderColor: "hsl(var(--primary) / 0.3)", scale: 1.02 }}
                whileTap={{ y: -4, scale: 0.98 }}
              >
                <p className="text-stat text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-label text-foreground mb-2">{stat.label}</p>
                <p className="body-small">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-caps mb-3">Experience</p>
            <h2 className="heading-section text-foreground mb-10">Professional History</h2>
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
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary/60 transition-all duration-300 group-hover:bg-primary group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-primary/40" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <h3 className="heading-small text-foreground">
                      {exp.role}
                    </h3>
                    <span className="body-small">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-label text-accent-foreground mb-3">{exp.company}</p>
                  <p className="body-default text-muted-foreground">{exp.description}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding surface-warm">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="label-caps mb-3">Skills</p>
              <h2 className="heading-section text-foreground">Core Skills & Tools</h2>
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
                className="card-elevated card-hover-glow h-full border border-transparent"
                whileHover={{ y: -8, borderColor: "hsl(var(--primary) / 0.3)", scale: 1.02 }}
                whileTap={{ y: -4, scale: 0.98 }}
              >
                <h3 className="heading-small text-foreground mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <motion.li 
                      key={skill} 
                      className="group body-small flex items-center gap-2 p-2 -mx-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-primary/5"
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-[2] group-hover:shadow-sm group-hover:shadow-primary/40" />
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
};

export default Experience;