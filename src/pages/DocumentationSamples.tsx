import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

// Import cover images
import cloudSuiteCover from "@/assets/covers/cloudsuite-crm-cover.jpg";
import pennywiseCover from "@/assets/covers/pennywise-cover.jpg";
import glucometerCover from "@/assets/covers/glucometer-cover.jpg";
import bpm500Cover from "@/assets/covers/bpm500-cover.jpg";
import blogDocToConversation from "@/assets/covers/blog-doc-to-conversation.jpg";
import blogAccessibility from "@/assets/covers/blog-accessibility.jpg";

const documentationSamples = [
  {
    title: "CloudSuite CRM – Release Notes (v3.12.0)",
    description: "Release notes documenting new features, enhancements, security updates, bug fixes, and upgrade guidance for an enterprise CRM platform.",
    pdfLink: "https://drive.google.com/file/d/1NqGAjfdit373R7D8lEUlSqVx0CkkWbIQ/view?usp=sharing",
    cover: cloudSuiteCover,
    accentColor: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
  },
  {
    title: "PennyWise App – Quick Start & Walkthrough Guide",
    description: "End-user onboarding guide designed to help first-time users set up, navigate, and use a consumer budgeting application effectively.",
    pdfLink: "https://drive.google.com/file/d/1oFtabVG21vZkHDByqgaSk5TzO3qUYS30/view?usp=sharing",
    cover: pennywiseCover,
    accentColor: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
  },
  {
    title: "HealthMate Smart Glucometer – Quick Start Guide",
    description: "Concise quick start guide enabling users to safely set up, operate, and interpret results from a smart medical device.",
    pdfLink: "https://drive.google.com/file/d/1TUlks_wyXs5AQsC8STfZUVwwXUiX5QPB/view?usp=sharing",
    cover: glucometerCover,
    accentColor: "from-cyan-500/20 to-sky-500/20",
    borderColor: "border-cyan-200/50 dark:border-cyan-800/30",
  },
  {
    title: "HealthMate Pro BPM-500 – User Guide",
    description: "Comprehensive user manual covering operation, troubleshooting, maintenance, safety, and regulatory compliance for a medical device.",
    pdfLink: "https://drive.google.com/file/d/1ydFLLuf_QKNnCxRX7O2eTzWWk2j_xKrm/view?usp=sharing",
    cover: bpm500Cover,
    accentColor: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-200/50 dark:border-rose-800/30",
  },
];

const blogPosts = [
  {
    title: "Documentation to Conversation",
    description: "Exploring how to transform static documentation into interactive conversational experiences.",
    link: "https://sites.google.com/view/documentation-to-conversation/home",
    cover: blogDocToConversation,
  },
  {
    title: "Designing Documentation for Accessibility",
    description: "Best practices and strategies for creating inclusive documentation that works for everyone.",
    link: "https://sites.google.com/view/designingdocumentationforacces/home?authuser=0",
    cover: blogAccessibility,
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

      <section className="section-padding surface-cool">
        <div className="container-narrow">
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {documentationSamples.map((sample, index) => (
              <motion.div
                key={sample.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer aspect-[3/4] shadow-[0_4px_20px_rgba(0,0,0,0.08),0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),0_16px_60px_rgba(0,0,0,0.08)] transition-all duration-500 border-2 ${sample.borderColor}`}
              >
                {/* Subtle gradient accent frame */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sample.accentColor} z-0`} />
                
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-50 pointer-events-none z-10" />
                
                {/* Document edge effect */}
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-black/5 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-black/5 to-transparent z-10" />
                
                {/* Cover Image */}
                <img
                  src={sample.cover}
                  alt={`${sample.title} cover`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dark overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0">
                  {/* Icon */}
                  <motion.div 
                    className="p-3 rounded-xl bg-primary/90 text-primary-foreground w-fit mb-4 shadow-lg shadow-primary/30"
                  >
                    <FileText className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                    {sample.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                    {sample.description}
                  </p>
                  
                  {/* Button */}
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-lg"
                  >
                    <a
                      href={sample.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      onClick={(e) => {
                        // Fallback for blocked popups in preview
                        if (window.location.hostname.includes('lovableproject.com') || window.location.hostname.includes('lovable.app')) {
                          e.preventDefault();
                          window.open(sample.pdfLink, '_blank');
                        }
                      }}
                    >
                      <span>View PDF</span>
                      <span>→</span>
                    </a>
                  </Button>
                </div>
                
                {/* Subtle index indicator - always visible */}
                <div className="absolute top-3 right-3 text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeader
            label="Blog"
            title="Blog Posts"
            description="Thoughts and insights on technical writing and documentation."
          />
          
          <motion.div 
            className="grid gap-6 md:grid-cols-2 mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {blogPosts.map((post, index) => (
              <motion.a
                key={post.title}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[3/4] shadow-[0_4px_20px_rgba(0,0,0,0.08),0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),0_16px_60px_rgba(0,0,0,0.08)] transition-all duration-500 border border-border/40"
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-50 pointer-events-none z-10" />
                
                {/* Document edge effect */}
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-black/5 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-black/5 to-transparent z-10" />
                
                {/* Cover Image */}
                <img
                  src={post.cover}
                  alt={`${post.title} cover`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dark overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0">
                  {/* Icon */}
                  <motion.div 
                    className="p-3 rounded-xl bg-primary/90 text-primary-foreground w-fit mb-4 shadow-lg shadow-primary/30"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  {/* Button */}
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Read Blog</span>
                      <span>→</span>
                    </span>
                  </Button>
                </div>
                
                {/* Subtle index indicator - always visible */}
                <div className="absolute top-3 right-3 text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  0{index + 1}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DocumentationSamples;
