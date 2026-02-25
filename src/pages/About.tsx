import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedContainer, AnimatedItem, containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Check } from "lucide-react";

const approaches = [
  {
    title: "Structure First",
    desc: "Every documentation project begins with a clear understanding of the information architecture. I map out content hierarchies, user journeys, and cross-references before writing a single word. This ensures consistency across all deliverables and makes future updates manageable.",
  },
  {
    title: "User-Centered Writing",
    desc: "I write with the end user in mind—whether that's a developer integrating an API, an administrator configuring a system, or an end user navigating a new feature. Understanding the audience's technical level and goals shapes every decision, from terminology to task structure.",
  },
  {
    title: "Collaborative Process",
    desc: "Great documentation requires close collaboration with product managers, engineers, QA, and support teams. I embed myself within cross-functional teams, participate in sprint ceremonies, and maintain open channels for feedback and review throughout the development cycle.",
  },
];

const values = [
  "Reliability in complex, high-stakes environments",
  "Meticulous attention to accuracy and detail",
  "Strong ownership and accountability",
  "Experience mentoring junior writers",
  "Acting lead experience on documentation initiatives",
  "Recognition for documentation excellence",
];

const About = () => {
  return (
    <PageLayout>
      <PageHero
        label="About"
        title="How I Work"
        description="I specialize in creating clear, accurate, and user-focused documentation for complex enterprise software environments."
      />

      {/* Professional Overview */}
      <section className="section-padding ent-section-1">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-caps mb-3">Overview</p>
            <h2 className="heading-section gold-text mb-8">Professional Background</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <motion.p
                className="body-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                With over five years of experience in technical writing, I've had the privilege of working within complex, enterprise-grade software environments where precision, compliance, and user clarity are paramount. My work has spanned regulatory-driven industries and high-stakes B2B platforms, where documentation isn't just helpful—it's mission-critical.
              </motion.p>
              <motion.p
                className="body-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                I take ownership of documentation from ideation to delivery, ensuring that every piece of content serves both the user's immediate needs and the organization's long-term goals for quality and consistency.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How I Work */}
      <section className="section-padding ent-section-2">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-caps mb-3">Approach</p>
            <h2 className="heading-section gold-text mb-8">How I Approach Documentation</h2>
          </AnimatedSection>
          <AnimatedContainer className="space-y-6" staggerDelay={0.15}>
            {approaches.map((item, index) => (
              <AnimatedItem key={item.title}>
                <motion.div
                  className="group ent-card cursor-pointer"
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ y: -3, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
                  <h3 className="heading-card text-foreground mb-4 transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="body-default">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* What I Bring */}
      <section className="section-padding ent-section-3">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="label-caps mb-3">Value</p>
            <h2 className="heading-section gold-text mb-8">What I Bring to Teams</h2>
          </AnimatedSection>
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {values.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 border border-transparent hover:border-primary/20 hover:bg-primary/5"
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/30">
                  <Check className="w-3.5 h-3.5 text-primary/60 transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <p className="body-default text-foreground">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
