import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedContainer, AnimatedItem, containerVariants, itemVariants } from "@/components/shared/AnimatedSection";

const sectionBg = {
  primary: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  secondary: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
  tertiary: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)",
};

const goldGradient = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #d4af37 0%, #f5d670 40%, #d4af37 70%, #b8962e 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

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
    description: "Senior Technical Writer responsible for end-to-end documentation of RunMyJobs, an enterprise workload automation and job scheduling platform. Own and maintain user guides, configuration documentation, and release content for complex scheduling, automation, and integration workflows. Collaborate closely with product managers, engineers, and QA teams to translate technical concepts into clear, structured, and user-focused documentation. Contribute to documentation standards, consistency, and continuous improvement of the overall documentation experience for enterprise customers.",
  },
  {
    role: "Technical Writer",
    company: "Oracle India Pvt. Ltd.",
    period: "Jun 2024 – Nov 2025",
    description: "Technical Writer supporting enterprise healthcare safety software products. Developed and maintained high-quality product documentation including user guides, release notes, and regulatory-compliant content. Worked closely with cross-functional teams to ensure documentation accuracy, compliance, and alignment with product releases in a regulated environment.",
  },
  {
    role: "Product Information Specialist",
    company: "Unisys India Pvt. Ltd.",
    period: "Apr 2023 – Jun 2024",
    description: "Owned and delivered technical documentation for enterprise data exchange and integration solutions. Created and maintained product documentation, configuration guides, and knowledge base content. Collaborated with engineering and support teams to improve documentation quality, usability, and consistency across releases.",
  },
  {
    role: "Technical Writer",
    company: "Cyient Ltd.",
    period: "Dec 2020 – Apr 2023",
    description: "Produced technical documentation for enterprise and industrial software products, including user manuals, installation guides, and process documentation. Supported documentation lifecycle activities and worked closely with subject matter experts to ensure clarity, accuracy, and adherence to documentation standards.",
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

const Experience = () => {
  return (
    <PageLayout>
      <PageHero
        label="Background"
        title="Experience & Skills"
        description="Three years of delivering documentation that drives clarity, reduces support burden, and meets enterprise standards."
      />

      {/* Professional Impact */}
      <section className="py-20 md:py-28" style={{ background: sectionBg.primary }}>
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-3">Impact</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight" style={goldGradient}>
                Professional Impact
              </h2>
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
                className="text-center h-full rounded-xl p-6 md:p-8 border border-[#d4af37]/10 transition-all duration-300"
                style={{ background: "rgba(212, 175, 55, 0.03)" }}
                whileHover={{ y: -8, borderColor: "rgba(212, 175, 55, 0.3)", scale: 1.02, boxShadow: "0 15px 50px -12px rgba(212, 175, 55, 0.15)" }}
                whileTap={{ y: -4, scale: 0.98 }}
              >
                <p
                  className="text-4xl md:text-5xl font-medium mb-2 text-[#d4af37]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-200 mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {stat.label}
                </p>
                <p className="text-sm text-gray-500" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 md:py-28" style={{ background: sectionBg.secondary }}>
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-3">Experience</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-10" style={goldGradient}>
              Professional History
            </h2>
          </AnimatedSection>
          <AnimatedContainer className="space-y-8" staggerDelay={0.15}>
            {experience.map((exp) => (
              <AnimatedItem key={exp.role}>
                <motion.div
                  className="group relative pl-8 border-l-2 border-[#d4af37]/20 pb-8 last:pb-0 hover:border-[#d4af37]/50 transition-colors duration-300"
                  whileHover={{ x: 8, scale: 1.01 }}
                  whileTap={{ x: 4, scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-[#d4af37]/40 transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-[#d4af37]/40" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <h3 className="text-lg md:text-xl font-medium tracking-tight text-gray-100" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {exp.role}
                    </h3>
                    <span className="text-sm text-gray-500" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#d4af37]/80 mb-3" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {exp.company}
                  </p>
                  <p className="text-base leading-relaxed text-gray-400" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {exp.description}
                  </p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 md:py-28" style={{ background: sectionBg.tertiary }}>
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-3">Skills</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight" style={goldGradient}>
                Core Skills & Tools
              </h2>
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
                className="h-full rounded-xl p-6 md:p-8 border border-[#d4af37]/10 transition-all duration-300"
                style={{ background: "rgba(212, 175, 55, 0.03)" }}
                whileHover={{ y: -8, borderColor: "rgba(212, 175, 55, 0.3)", scale: 1.02, boxShadow: "0 15px 50px -12px rgba(212, 175, 55, 0.15)" }}
                whileTap={{ y: -4, scale: 0.98 }}
              >
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-gray-100 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      className="group text-sm flex items-center gap-2 p-2 -mx-2 rounded-md cursor-pointer transition-colors duration-200"
                      whileHover={{ x: 6, scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30 flex-shrink-0 transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-[2] group-hover:shadow-sm group-hover:shadow-[#d4af37]/40" />
                      <span className="text-gray-400 transition-colors duration-200 group-hover:text-gray-200" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {skill}
                      </span>
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
