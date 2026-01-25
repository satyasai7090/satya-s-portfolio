import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, AnimatedText } from "@/components/shared/AnimatedSection";
import { Check } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedText>
            <p className="label-caps mb-4">About</p>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h1 className="heading-display text-foreground mb-6">
              How I Work
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="body-large">
              I specialize in creating clear, accurate, and user-focused documentation 
              for complex enterprise software environments.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Professional Overview */}
      <section className="section-padding surface-warm">
        <div className="container-narrow">
          <SectionHeader
            label="Overview"
            title="Professional Background"
          />
          <AnimatedSection className="mt-10">
            <div className="prose prose-lg">
              <p className="body-default text-muted-foreground leading-relaxed mb-6">
                With over three years of experience in technical writing, I've had the privilege 
                of working within complex, enterprise-grade software environments where precision, 
                compliance, and user clarity are paramount. My work has spanned regulatory-driven 
                industries and high-stakes B2B platforms, where documentation isn't just helpful—it's 
                mission-critical.
              </p>
              <p className="body-default text-muted-foreground leading-relaxed">
                I take ownership of documentation from ideation to delivery, ensuring that every 
                piece of content serves both the user's immediate needs and the organization's 
                long-term goals for quality and consistency.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How I Work */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeader
            label="Approach"
            title="How I Approach Documentation"
          />
          <div className="mt-10 space-y-8">
            <AnimatedSection delay={0}>
              <div className="card-elevated">
                <h3 className="heading-subsection text-foreground mb-4">Structure First</h3>
                <p className="body-default text-muted-foreground">
                  Every documentation project begins with a clear understanding of the information 
                  architecture. I map out content hierarchies, user journeys, and cross-references 
                  before writing a single word. This ensures consistency across all deliverables 
                  and makes future updates manageable.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <div className="card-elevated">
                <h3 className="heading-subsection text-foreground mb-4">User-Centered Writing</h3>
                <p className="body-default text-muted-foreground">
                  I write with the end user in mind—whether that's a developer integrating an API, 
                  an administrator configuring a system, or an end user navigating a new feature. 
                  Understanding the audience's technical level and goals shapes every decision, 
                  from terminology to task structure.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="card-elevated">
                <h3 className="heading-subsection text-foreground mb-4">Collaborative Process</h3>
                <p className="body-default text-muted-foreground">
                  Great documentation requires close collaboration with product managers, engineers, 
                  QA, and support teams. I embed myself within cross-functional teams, participate 
                  in sprint ceremonies, and maintain open channels for feedback and review throughout 
                  the development cycle.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What I Bring */}
      <section className="section-padding surface-warm">
        <div className="container-narrow">
          <SectionHeader
            label="Value"
            title="What I Bring to Teams"
          />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              "Reliability in complex, high-stakes environments",
              "Meticulous attention to accuracy and detail",
              "Strong ownership and accountability",
              "Experience mentoring junior writers",
              "Acting lead experience on documentation initiatives",
              "Recognition for documentation excellence",
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="flex items-start gap-3 p-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <p className="body-default text-foreground">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
