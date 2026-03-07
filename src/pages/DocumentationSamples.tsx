import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Play } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

import cloudSuiteCover from "@/assets/covers/cloudsuite-crm-cover.jpg";
import pennywiseCover from "@/assets/covers/pennywise-cover.jpg";
import glucometerCover from "@/assets/covers/glucometer-cover.jpg";
import bpm500Cover from "@/assets/covers/bpm500-cover.jpg";
import blogDocToConversation from "@/assets/covers/blog-doc-to-conversation.jpg";
import blogAccessibility from "@/assets/covers/blog-accessibility.jpg";

const documentationSamples = [
  { title: "CloudSuite CRM – Release Notes (v3.12.0)", description: "Release notes documenting new features, enhancements, security updates, bug fixes, and upgrade guidance for an enterprise CRM platform.", pdfLink: "https://drive.google.com/file/d/1NqGAjfdit373R7D8lEUlSqVx0CkkWbIQ/view?usp=sharing", cover: cloudSuiteCover },
  { title: "PennyWise App – Quick Start & Walkthrough Guide", description: "End-user onboarding guide designed to help first-time users set up, navigate, and use a consumer budgeting application effectively.", pdfLink: "https://drive.google.com/file/d/1oFtabVG21vZkHDByqgaSk5TzO3qUYS30/view?usp=sharing", cover: pennywiseCover },
  { title: "HealthMate Smart Glucometer – Quick Start Guide", description: "Concise quick start guide enabling users to safely set up, operate, and interpret results from a smart medical device.", pdfLink: "https://drive.google.com/file/d/1TUlks_wyXs5AQsC8STfZUVwwXUiX5QPB/view?usp=sharing", cover: glucometerCover },
  { title: "HealthMate Pro BPM-500 – User Guide", description: "Comprehensive user manual covering operation, troubleshooting, maintenance, safety, and regulatory compliance for a medical device.", pdfLink: "https://drive.google.com/file/d/1ydFLLuf_QKNnCxRX7O2eTzWWk2j_xKrm/view?usp=sharing", cover: bpm500Cover },
];

const videos = [
  { title: "Product Demo Video – Sample Walkthrough", description: "A sample demo video showcasing product walkthrough and feature highlights, created to demonstrate video documentation skills.", link: "https://youtu.be/ZM9HkCIeRvA", thumbnail: "https://img.youtube.com/vi/ZM9HkCIeRvA/maxresdefault.jpg" },
];

const blogPosts = [
  { title: "Designing Documentation for Accessibility", description: "Best practices and strategies for creating inclusive documentation that works for everyone.", link: "https://sites.google.com/view/designingdocumentationforacces/home?authuser=0", cover: blogAccessibility },
];

const DocumentationSamples = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <PageLayout>
      <PageHero
        label="Samples"
        title="Documentation Samples"
        description="Sample documentation created for imaginary products to demonstrate structure and writing style."
      />

      <section className="section-padding ent-section-1">
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
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[3/4] border border-border/50 transition-all duration-500 hover:border-primary/40"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                <img src={sample.cover} alt={`${sample.title} cover`} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0">
                  <motion.div className="p-3 rounded-xl bg-primary/90 text-primary-foreground w-fit mb-4 shadow-lg shadow-primary/30">
                    <FileText className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {sample.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{sample.description}</p>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg font-semibold"
                  >
                    <a
                      href={sample.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      onClick={(e) => {
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
                <div className="absolute top-3 right-3 text-xs font-mono text-muted-foreground bg-background/60 px-2 py-1 rounded-full backdrop-blur-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding ent-section-2">
        <div className="container-narrow">
          <div className="mb-12">
            <p className="label-caps mb-4">Blog</p>
            <h2 className="heading-section gold-text">Blog Posts</h2>
            <p className="body-large mt-4">Thoughts and insights on technical writing and documentation.</p>
          </div>

          <motion.div
            className="flex flex-col gap-5"
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
                whileHover={{ x: 6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.99 }}
                className="group flex items-center gap-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-500 hover:border-primary/40 hover:bg-card/80"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-border/30">
                  <img src={post.cover} alt={`${post.title} cover`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{post.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="hidden md:inline">Read</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Videos */}
      <section className="section-padding ent-section-1">
        <div className="container-narrow">
          <div className="mb-12">
            <p className="label-caps mb-4">Videos</p>
            <h2 className="heading-section gold-text">Video Samples</h2>
            <p className="body-large mt-4">Demo videos and walkthroughs showcasing product documentation in action.</p>
          </div>

          <motion.div
            className="grid gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {videos.map((video, index) => (
              <motion.a
                key={video.title}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.99 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video border border-border/50 transition-all duration-500 hover:border-primary/40"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                <img src={video.thumbnail} alt={`${video.title} thumbnail`} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{video.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{video.description}</p>
                </div>
                <div className="absolute top-3 right-3 text-xs font-mono text-muted-foreground bg-background/60 px-2 py-1 rounded-full backdrop-blur-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  0{index + 1}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
});
DocumentationSamples.displayName = "DocumentationSamples";

export default DocumentationSamples;
