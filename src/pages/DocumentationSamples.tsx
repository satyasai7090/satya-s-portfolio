import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Play, Layers } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

import cloudSuiteCover from "@/assets/covers/cloudsuite-crm-cover.jpg";
import pennywiseCover from "@/assets/covers/pennywise-cover.jpg";
import glucometerCover from "@/assets/covers/glucometer-cover.jpg";
import bpm500Cover from "@/assets/covers/bpm500-cover.jpg";
import blogAccessibility from "@/assets/covers/blog-accessibility.jpg";

type CategoryType = "all" | "docs" | "blog" | "video";

interface SampleItem {
  type: CategoryType;
  title: string;
  description: string;
  link: string;
  cover: string;
  linkLabel: string;
  icon: typeof FileText;
}

const allItems: SampleItem[] = [
  // Docs
  { type: "docs", title: "CloudSuite CRM – Release Notes (v3.12.0)", description: "Release notes documenting new features, enhancements, security updates, bug fixes, and upgrade guidance for an enterprise CRM platform.", link: "https://drive.google.com/file/d/1NqGAjfdit373R7D8lEUlSqVx0CkkWbIQ/view?usp=sharing", cover: cloudSuiteCover, linkLabel: "View PDF", icon: FileText },
  { type: "docs", title: "PennyWise App – Quick Start & Walkthrough Guide", description: "End-user onboarding guide designed to help first-time users set up, navigate, and use a consumer budgeting application effectively.", link: "https://drive.google.com/file/d/1oFtabVG21vZkHDByqgaSk5TzO3qUYS30/view?usp=sharing", cover: pennywiseCover, linkLabel: "View PDF", icon: FileText },
  { type: "docs", title: "HealthMate Smart Glucometer – Quick Start Guide", description: "Concise quick start guide enabling users to safely set up, operate, and interpret results from a smart medical device.", link: "https://drive.google.com/file/d/1TUlks_wyXs5AQsC8STfZUVwwXUiX5QPB/view?usp=sharing", cover: glucometerCover, linkLabel: "View PDF", icon: FileText },
  { type: "docs", title: "HealthMate Pro BPM-500 – User Guide", description: "Comprehensive user manual covering operation, troubleshooting, maintenance, safety, and regulatory compliance for a medical device.", link: "https://drive.google.com/file/d/1ydFLLuf_QKNnCxRX7O2eTzWWk2j_xKrm/view?usp=sharing", cover: bpm500Cover, linkLabel: "View PDF", icon: FileText },
  // Blog
  { type: "blog", title: "Designing Documentation for Accessibility", description: "Best practices and strategies for creating inclusive documentation that works for everyone.", link: "https://sites.google.com/view/designingdocumentationforacces/home?authuser=0", cover: blogAccessibility, linkLabel: "Read Blog", icon: ExternalLink },
  // Video
  { type: "video", title: "Product Demo Video – Sample Walkthrough", description: "A sample demo video showcasing product walkthrough and feature highlights, created to demonstrate video documentation skills.", link: "https://youtu.be/ZM9HkCIeRvA", cover: "https://img.youtube.com/vi/ZM9HkCIeRvA/maxresdefault.jpg", linkLabel: "Watch Video", icon: Play },
];

const categories: { key: CategoryType; label: string; icon: typeof Layers; count: number }[] = [
  { key: "all", label: "All Work", icon: Layers, count: allItems.length },
  { key: "docs", label: "Documents", icon: FileText, count: allItems.filter(i => i.type === "docs").length },
  { key: "blog", label: "Blog Posts", icon: ExternalLink, count: allItems.filter(i => i.type === "blog").length },
  { key: "video", label: "Videos", icon: Play, count: allItems.filter(i => i.type === "video").length },
];

const DocumentationSamples = forwardRef<HTMLDivElement>((_, ref) => {
  const [active, setActive] = useState<CategoryType>("all");

  const filtered = active === "all" ? allItems : allItems.filter(i => i.type === active);

  return (
    <PageLayout>
      <PageHero
        label="Samples"
        title="Documentation Samples"
        description="Sample documentation created for imaginary products to demonstrate structure and writing style."
      />

      <section className="section-padding ent-section-1">
        <div className="container-narrow">
          {/* Filter Tabs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-12 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`
                    relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded-full font-mono
                    ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}
                  `}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid gap-6 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            >
              {filtered.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  layout
                  className={item.type === "video" ? "md:col-span-2" : ""}
                >
                  {item.type === "video" ? (
                    /* ── Video Card: 16:9 cinematic ── */
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-xl overflow-hidden aspect-video border border-border/50 transition-all duration-500 hover:border-primary/40"
                      style={{ boxShadow: "var(--shadow-medium)" }}
                    >
                      <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30"
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Play className="w-7 h-7 ml-1" fill="currentColor" />
                        </motion.div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-2 bg-primary/10 px-2 py-1 rounded-full backdrop-blur-sm">Video</span>
                        <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-xl">{item.description}</p>
                      </div>
                    </a>
                  ) : item.type === "blog" ? (
                    /* ── Blog Card: Horizontal ribbon ── */
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 transition-all duration-500 hover:border-primary/40 hover:bg-card/90 hover:translate-x-1"
                      style={{ boxShadow: "var(--shadow-medium)" }}
                    >
                      <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-border/30">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-1.5">Blog</span>
                        <h3 className="text-base font-semibold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </a>
                  ) : (
                    /* ── Doc Card: Compact horizontal ── */
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (window.location.hostname.includes('lovableproject.com') || window.location.hostname.includes('lovable.app')) {
                          e.preventDefault();
                          window.open(item.link, '_blank');
                        }
                      }}
                      className="group flex rounded-xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/90 hover:-translate-y-1"
                      style={{ boxShadow: "var(--shadow-medium)" }}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-28 sm:w-36 flex-shrink-0 overflow-hidden">
                        <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
                        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-2 w-fit">Document</span>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{item.linkLabel}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  );
});
DocumentationSamples.displayName = "DocumentationSamples";

export default DocumentationSamples;
