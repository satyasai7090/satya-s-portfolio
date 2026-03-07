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
                <motion.button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`
                    relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300
                    ${isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded-full font-mono transition-colors duration-300
                    ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}
                  `}>
                    {cat.count}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-primary -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </motion.button>
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
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                      whileTap={{ scale: 0.985 }}
                      className="group relative block rounded-xl overflow-hidden aspect-video border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25)]"
                      style={{ boxShadow: "var(--shadow-medium)" }}
                    >
                      <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                      {/* Shimmer overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(105deg,transparent_40%,hsl(var(--primary)/0.08)_45%,hsl(var(--primary)/0.15)_50%,hsl(var(--primary)/0.08)_55%,transparent_60%)] bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_ease-in-out]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-18 h-18 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/40 backdrop-blur-sm"
                          whileHover={{ scale: 1.2, boxShadow: "0 0 40px hsl(var(--primary) / 0.5)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </motion.div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-2 bg-primary/10 px-2.5 py-1 rounded-full backdrop-blur-sm border border-primary/20">Video</span>
                        <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-xl">{item.description}</p>
                      </div>
                    </motion.a>
                  ) : item.type === "blog" ? (
                    /* ── Blog Card: Horizontal ribbon ── */
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-5 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 transition-all duration-500 hover:border-primary/50 hover:bg-card/90 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.2)]"
                      style={{ boxShadow: "var(--shadow-medium)" }}
                    >
                      <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-border/30 group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-md group-hover:shadow-primary/10">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">Blog</span>
                        <h3 className="text-base font-semibold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                      <motion.div
                        className="flex-shrink-0 text-primary"
                        initial={{ opacity: 0, x: -8 }}
                        whileHover={{ rotate: -15 }}
                        animate={{}}
                      >
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      </motion.div>
                    </motion.a>
                  ) : (
                    /* ── Doc Card: 3D Book ── */
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
                      className="group block book-card"
                      style={{ perspective: "1200px" }}
                    >
                      <div
                        className="relative w-[160px] sm:w-[180px] mx-auto"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Page stack (visible when cover opens) */}
                        <div className="absolute inset-0 rounded-r-md rounded-l-sm bg-card border border-border/50">
                          {/* Page lines */}
                          <div className="absolute inset-4 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            <FileText className="w-5 h-5 text-primary/50 mb-1" />
                            <div className="h-[3px] w-3/4 bg-foreground/8 rounded-full" />
                            <div className="h-[3px] w-full bg-foreground/6 rounded-full" />
                            <div className="h-[3px] w-5/6 bg-foreground/6 rounded-full" />
                            <div className="h-[3px] w-2/3 bg-foreground/5 rounded-full" />
                            <div className="mt-auto">
                              <span className="text-[10px] font-medium text-primary/70 group-hover:text-primary transition-colors duration-500">
                                {item.linkLabel} →
                              </span>
                            </div>
                          </div>
                          {/* Page edges on right side */}
                          <div className="absolute top-[3px] right-0 bottom-[3px] w-[6px] flex flex-col justify-between">
                            <div className="h-full bg-gradient-to-l from-border/40 to-transparent rounded-r-sm" />
                          </div>
                        </div>

                        {/* Book Cover - flips open */}
                        <div
                          className="book-cover relative w-full aspect-[3/4] rounded-md overflow-hidden shadow-lg"
                          style={{
                            transformOrigin: "left center",
                            transformStyle: "preserve-3d",
                            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s ease",
                            zIndex: 2,
                          }}
                        >
                          {/* Front face */}
                          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                            <img src={item.cover} alt={item.title} className="w-full h-full object-cover object-top" />
                            {/* Spine highlight */}
                            <div className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/25 via-black/10 to-transparent" />
                            {/* Edge shadow */}
                            <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/12 to-transparent" />
                            {/* Subtle gloss */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
                          </div>
                        </div>

                        {/* Book title below */}
                        <div className="mt-4 text-center px-1">
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-500 line-clamp-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Shadow beneath book */}
                      <div className="w-[140px] sm:w-[160px] h-3 mx-auto mt-1 bg-foreground/6 rounded-[50%] blur-[6px] transition-all duration-700 group-hover:w-[160px] group-hover:sm:w-[180px] group-hover:bg-foreground/10" />
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
