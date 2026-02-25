import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, AnimatedContainer, AnimatedItem, containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Check } from "lucide-react";

const sectionBg = {
  primary: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  secondary: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
  tertiary: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)",
};

const About = () => {
  return (
    <PageLayout>
      <PageHero
        label="About"
        title="How I Work"
        description="I specialize in creating clear, accurate, and user-focused documentation for complex enterprise software environments."
      />

      {/* Professional Overview */}
      <section className="py-20 md:py-28" style={{ background: sectionBg.primary }}>
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-3">Overview</p>
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #d4af37 0%, #f5d670 40%, #d4af37 70%, #b8962e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Professional Background
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg">
              <motion.p
                className="text-base leading-relaxed text-gray-300/80 mb-6"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                With over five years of experience in technical writing, I've had the privilege of working within complex, enterprise-grade software environments where precision, compliance, and user clarity are paramount. My work has spanned regulatory-driven industries and high-stakes B2B platforms, where documentation isn't just helpful—it's mission-critical.
              </motion.p>
              <motion.p
                className="text-base leading-relaxed text-gray-300/80"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                I take ownership of documentation from ideation to delivery, ensuring that every piece of content serves both the user's immediate needs and the organization's long-term goals for quality and consistency.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How I Work */}
      <section className="py-20 md:py-28" style={{ background: sectionBg.secondary }}>
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-3">Approach</p>
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #d4af37 0%, #f5d670 40%, #d4af37 70%, #b8962e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              How I Approach Documentation
            </h2>
          </AnimatedSection>
          <AnimatedContainer className="space-y-8" staggerDelay={0.15}>
            {[
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
            ].map((item) => (
              <AnimatedItem key={item.title}>
                <motion.div
                  className="group rounded-xl p-6 md:p-8 border border-[#d4af37]/10 cursor-pointer transition-all duration-300"
                  style={{ background: "rgba(212, 175, 55, 0.03)" }}
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(212, 175, 55, 0.3)",
                    scale: 1.01,
                    boxShadow: "0 15px 50px -12px rgba(212, 175, 55, 0.15)",
                  }}
                  whileTap={{ y: -3, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-xl md:text-2xl font-medium tracking-tight text-gray-100 mb-4 transition-colors duration-200 group-hover:text-[#d4af37]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-400" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* What I Bring */}
      <section className="py-20 md:py-28" style={{ background: sectionBg.tertiary }}>
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 mb-3">Value</p>
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #d4af37 0%, #f5d670 40%, #d4af37 70%, #b8962e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              What I Bring to Teams
            </h2>
          </AnimatedSection>
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              "Reliability in complex, high-stakes environments",
              "Meticulous attention to accuracy and detail",
              "Strong ownership and accountability",
              "Experience mentoring junior writers",
              "Acting lead experience on documentation initiatives",
              "Recognition for documentation excellence",
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-[#d4af37]/20"
                whileHover={{ x: 6, scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.05)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#d4af37]/10 flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#d4af37]/30">
                  <Check className="w-3.5 h-3.5 text-[#d4af37]/60 transition-colors duration-300 group-hover:text-[#1a1a2e]" />
                </div>
                <p className="text-base text-gray-300 transition-colors group-hover:text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
