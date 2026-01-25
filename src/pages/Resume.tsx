import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Printer, Download, Mail, Linkedin, MapPin, Phone } from "lucide-react";

const personalInfo = {
  name: "Satya Sai Pasupuleti",
  title: "Senior Technical Writer",
  email: "satya.pasupuleti@example.com",
  linkedin: "linkedin.com/in/satyapasupuleti",
  location: "United States (Remote)",
  phone: "+1 (555) 123-4567",
};

const summary = `Senior Technical Writer with 5+ years of experience delivering comprehensive documentation for enterprise software platforms. Proven expertise in API documentation, regulatory compliance content, and docs-as-code workflows. Track record of reducing developer onboarding time, improving documentation quality, and supporting successful product launches in high-stakes B2B environments.`;

const experience = [
  {
    role: "Senior Technical Writer",
    company: "Enterprise SaaS Company",
    period: "2023 – Present",
    achievements: [
      "Lead technical writer for core platform products serving 500+ enterprise clients",
      "Reduced developer onboarding time by 60% through comprehensive API documentation overhaul",
      "Established documentation standards and style guides adopted across 3 product teams",
      "Mentor junior writers and conduct documentation reviews for quality assurance",
    ],
  },
  {
    role: "Technical Writer",
    company: "Healthcare Technology Startup",
    period: "2021 – 2023",
    achievements: [
      "Built compliance documentation framework meeting FDA 21 CFR Part 11 and EU Annex 11 standards",
      "Achieved zero compliance findings in two consecutive FDA audits",
      "Reduced documentation-related release delays by 80% through process improvements",
      "Created standardized templates reducing new document creation time by 50%",
    ],
  },
  {
    role: "Technical Writer (Contract)",
    company: "Various Technology Clients",
    period: "2020 – 2021",
    achievements: [
      "Delivered API documentation, user guides, and knowledge bases for B2B software companies",
      "Collaborated with engineering teams to document complex integrations and workflows",
      "Established docs-as-code practices using Git-based workflows and Markdown",
    ],
  },
];

const skills = {
  documentation: [
    "API & Developer Documentation",
    "User Guides & Tutorials",
    "Regulatory Compliance Docs",
    "Release Notes & Changelogs",
    "Knowledge Base Articles",
  ],
  tools: [
    "Markdown / MDX",
    "Git & GitHub",
    "OpenAPI / Swagger",
    "Confluence & Notion",
    "XML / DITA",
  ],
  process: [
    "Docs-as-Code Workflows",
    "Agile / Scrum",
    "Style Guide Development",
    "Content Strategy",
    "Technical SME Interviews",
  ],
};

const education = [
  {
    degree: "Bachelor of Arts in English",
    institution: "University of California",
    year: "2019",
  },
  {
    degree: "Technical Writing Certificate",
    institution: "UC Berkeley Extension",
    year: "2020",
  },
];

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <PageLayout>
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden bg-muted/50 border-b border-border">
        <div className="container-wide py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="heading-small text-foreground">Resume / CV</h1>
            <p className="body-small">Printable version with optimized styles</p>
          </div>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" onClick={handlePrint}>
                <Download className="w-4 h-4 mr-2" />
                Save as PDF
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="resume-content bg-background print:bg-white">
        <div className="container-narrow py-12 print:py-0 print:max-w-none print:px-0">
          {/* Header */}
          <AnimatedSection className="print:animate-none">
            <header className="text-center mb-10 print:mb-6 print:text-left">
              <h1 className="heading-display text-foreground mb-2 print:text-3xl print:mb-1">
                {personalInfo.name}
              </h1>
              <p className="heading-small text-primary mb-4 print:text-lg print:mb-2">
                {personalInfo.title}
              </p>
              <div className="flex flex-wrap justify-center print:justify-start gap-4 print:gap-3 text-muted-foreground">
                <span className="flex items-center gap-1.5 body-small print:text-xs">
                  <Mail className="w-4 h-4 print:w-3 print:h-3" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1.5 body-small print:text-xs">
                  <Linkedin className="w-4 h-4 print:w-3 print:h-3" />
                  {personalInfo.linkedin}
                </span>
                <span className="flex items-center gap-1.5 body-small print:text-xs">
                  <MapPin className="w-4 h-4 print:w-3 print:h-3" />
                  {personalInfo.location}
                </span>
              </div>
            </header>
          </AnimatedSection>

          <div className="divider mb-10 print:mb-4 print:border-foreground/20" />

          {/* Summary */}
          <AnimatedSection delay={0.1} className="print:animate-none">
            <section className="mb-10 print:mb-4">
              <h2 className="heading-card text-foreground mb-4 print:text-lg print:mb-2 print:font-bold">
                Professional Summary
              </h2>
              <p className="body-default text-muted-foreground print:text-sm print:leading-snug">
                {summary}
              </p>
            </section>
          </AnimatedSection>

          {/* Experience */}
          <AnimatedSection delay={0.15} className="print:animate-none">
            <section className="mb-10 print:mb-4">
              <h2 className="heading-card text-foreground mb-6 print:text-lg print:mb-3 print:font-bold">
                Professional Experience
              </h2>
              <div className="space-y-8 print:space-y-3">
                {experience.map((exp, index) => (
                  <div key={index} className="print:break-inside-avoid">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2 print:mb-1">
                      <h3 className="heading-small text-foreground print:text-base print:font-semibold">
                        {exp.role}
                      </h3>
                      <span className="body-small print:text-xs">{exp.period}</span>
                    </div>
                    <p className="text-label text-accent-foreground mb-3 print:text-sm print:mb-1">
                      {exp.company}
                    </p>
                    <ul className="space-y-1.5 print:space-y-0.5">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="body-default text-muted-foreground pl-4 relative print:text-xs print:leading-snug"
                        >
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-primary/50 print:top-1.5 print:w-1 print:h-1" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* Skills */}
          <AnimatedSection delay={0.2} className="print:animate-none">
            <section className="mb-10 print:mb-4">
              <h2 className="heading-card text-foreground mb-6 print:text-lg print:mb-3 print:font-bold">
                Skills & Expertise
              </h2>
              <div className="grid md:grid-cols-3 gap-6 print:gap-4">
                <div className="print:break-inside-avoid">
                  <h3 className="text-label text-foreground mb-3 print:text-sm print:mb-1 print:font-semibold">
                    Documentation Types
                  </h3>
                  <ul className="space-y-1.5 print:space-y-0.5">
                    {skills.documentation.map((skill) => (
                      <li key={skill} className="body-small print:text-xs">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="print:break-inside-avoid">
                  <h3 className="text-label text-foreground mb-3 print:text-sm print:mb-1 print:font-semibold">
                    Tools & Technologies
                  </h3>
                  <ul className="space-y-1.5 print:space-y-0.5">
                    {skills.tools.map((skill) => (
                      <li key={skill} className="body-small print:text-xs">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="print:break-inside-avoid">
                  <h3 className="text-label text-foreground mb-3 print:text-sm print:mb-1 print:font-semibold">
                    Process & Collaboration
                  </h3>
                  <ul className="space-y-1.5 print:space-y-0.5">
                    {skills.process.map((skill) => (
                      <li key={skill} className="body-small print:text-xs">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection delay={0.25} className="print:animate-none">
            <section className="print:break-inside-avoid">
              <h2 className="heading-card text-foreground mb-6 print:text-lg print:mb-3 print:font-bold">
                Education
              </h2>
              <div className="space-y-4 print:space-y-2">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-wrap justify-between items-baseline gap-2">
                    <div>
                      <h3 className="text-label text-foreground print:text-sm">
                        {edu.degree}
                      </h3>
                      <p className="body-small print:text-xs">{edu.institution}</p>
                    </div>
                    <span className="body-small print:text-xs">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </div>
      </div>
    </PageLayout>
  );
};

export default Resume;
