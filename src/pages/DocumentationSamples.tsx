import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Play, Layers } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { containerVariants, itemVariants } from "@/components/shared/AnimatedSection";

import cloudSuiteCover from "@/assets/covers/cloudsuite-crm-cover.jpg";
import pennywiseCover from "@/assets/covers/pennywise-cover.jpg";
import glucometerCover from "@/assets/covers/glucometer-cover.jpg";
import bpm500Cover from "@/assets/covers/bpm500-cover.jpg";
import blogAccessibility from "@/assets/covers/blog-accessibility.jpg";

type CategoryType = "all" | "docs" | "blog" | "video";

interface SampleItem {
  type: "docs" | "blog" | "video";
  title: string;
  description: string;
  link: string;
  cover: string;
  linkLabel: string;
}

const allItems: SampleItem[] = [
  { type: "docs", title: "CloudSuite CRM – Release Notes (v3.12.0)", description: "Release notes documenting new features, enhancements, security updates, bug fixes, and upgrade guidance for an enterprise CRM platform.", link: "https://drive.google.com/file/d/1NqGAjfdit373R7D8lEUlSqVx0CkkWbIQ/view?usp=sharing", cover: cloudSuiteCover, linkLabel: "View PDF" },
  { type: "docs", title: "PennyWise App – Quick Start & Walkthrough Guide", description: "End-user onboarding guide designed to help first-time users set up, navigate, and use a consumer budgeting application effectively.", link: "https://drive.google.com/file/d/1oFtabVG21vZkHDByqgaSk5TzO3qUYS30/view?usp=sharing", cover: pennywiseCover, linkLabel: "View PDF" },
  { type: "docs", title: "HealthMate Smart Glucometer – Quick Start Guide", description: "Concise quick start guide enabling users to safely set up, operate, and interpret results from a smart medical device.", link: "https://drive.google.com/file/d/1TUlks_wyXs5AQsC8STfZUVwwXUiX5QPB/view?usp=sharing", cover: glucometerCover, linkLabel: "View PDF" },
  { type: "docs", title: "HealthMate Pro BPM-500 – User Guide", description: "Comprehensive user manual covering operation, troubleshooting, maintenance, safety, and regulatory compliance for a medical device.", link: "https://drive.google.com/file/d/1ydFLLuf_QKNnCxRX7O2eTzWWk2j_xKrm/view?usp=sharing", cover: bpm500Cover, linkLabel: "View PDF" },
  { type: "blog", title: "Designing Documentation for Accessibility", description: "Best practices and strategies for creating inclusive documentation that works for everyone.", link: "https://sites.google.com/view/designingdocumentationforacces/home?authuser=0", cover: blogAccessibility, linkLabel: "Read Blog" },
  { type: "video", title: "Product Demo Video – Sample Walkthrough", description: "A sample demo video showcasing product walkthrough and feature highlights, created to demonstrate video documentation skills.", link: "https://www.youtube.com/watch?v=ZM9HkCIeRvA", cover: "https://img.youtube.com/vi/ZM9HkCIeRvA/maxresdefault.jpg", linkLabel: "Watch Video" },
];

const categories: { key: CategoryType; label: string; icon: typeof Layers; count: number }[] = [
  { key: "all", label: "All Work", icon: Layers, count: allItems.length },
  { key: "docs", label: "Documents", icon: FileText, count: allItems.filter(i => i.type === "docs").length },
  { key: "blog", label: "Blog Posts", icon: ExternalLink, count: allItems.filter(i => i.type === "blog").length },
  { key: "video", label: "Videos", icon: Play, count: allItems.filter(i => i.type === "video").length },
];

/* ── Video: Monitor/Screen ── */
function VideoCard({ item }: { item: SampleItem }) {
  const openLink = () => {
    window.open(item.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={openLink}
      className="group block video-card w-full text-left"
      aria-label={`Open video: ${item.title}`}
      style={{ perspective: "1000px" }}
    >
        {/* Screen frame */}
        <div
          className="video-screen relative rounded-lg overflow-hidden bg-foreground/90"
          style={{
            transformOrigin: "center bottom",
            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s ease",
            padding: "6px 6px 6px 6px",
          }}
        >
          <div className="relative aspect-video rounded-[4px] overflow-hidden">
            <img src={item.cover} alt={item.title} className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
              </div>
            </div>
            {/* Screen glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent group-hover:from-white/4 transition-all duration-700" />
          </div>
          {/* Bottom bezel with indicator */}
          <div className="flex justify-center pt-[5px] pb-[2px]">
            <div className="w-[6px] h-[6px] rounded-full bg-foreground/30 group-hover:bg-primary/80 transition-colors duration-500" />
          </div>
        </div>

        {/* Stand */}
        <div className="flex flex-col items-center">
          <div className="w-[3px] h-3 bg-foreground/40" />
          <div className="w-14 h-[3px] bg-foreground/35 rounded-full" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 text-center px-1">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-500 line-clamp-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {item.title}
        </h3>
      </div>
      <div className="h-[6px] w-[60%] mx-auto mt-2 bg-foreground/5 rounded-[50%] blur-[5px] transition-all duration-700 group-hover:w-[70%] group-hover:bg-foreground/10" />
    </a>
  );
}

/* ── Blog: Magazine ── */
function BlogCard({ item }: { item: SampleItem }) {
  const openLink = (e: React.MouseEvent) => {
    if (window.location.hostname.includes('lovableproject.com') || window.location.hostname.includes('lovable.app')) {
      e.preventDefault();
      window.open(item.link, '_blank');
    }
  };
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={openLink} className="group block magazine-card" style={{ perspective: "1000px" }}>
      <div className="relative mx-auto">
        <div
          className="magazine-cover relative aspect-[3/4] rounded-sm overflow-hidden"
          style={{
            transformOrigin: "bottom center",
            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s ease",
          }}
        >
          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
          {/* Magazine masthead */}
          <div className="absolute top-0 left-0 right-0 px-3 pt-2.5 pb-6 bg-gradient-to-b from-background/85 via-background/40 to-transparent">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary font-bold">Blog</span>
          </div>
          {/* Bottom read indicator */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/85 to-transparent flex items-end justify-between">
            <span className="text-[10px] font-medium text-primary/70 group-hover:text-primary transition-colors duration-500">{item.linkLabel}</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors duration-500" />
          </div>
          {/* Center fold crease */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/[0.04]" />
          {/* Edge shadows */}
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-r from-black/12 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-l from-black/12 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-black/8" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/10" />
          {/* Gloss */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/6 group-hover:from-white/5 transition-all duration-700" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 text-center px-1">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-500 line-clamp-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {item.title}
        </h3>
      </div>
      <div className="h-[6px] w-[80%] mx-auto mt-2 bg-foreground/5 rounded-[50%] blur-[5px] transition-all duration-700 group-hover:w-[90%] group-hover:bg-foreground/10" />
    </a>
  );
}

/* ── Document: 3D Book ── */
function BookCard({ item }: { item: SampleItem }) {
  const openLink = (e: React.MouseEvent) => {
    if (window.location.hostname.includes('lovableproject.com') || window.location.hostname.includes('lovable.app')) {
      e.preventDefault();
      window.open(item.link, '_blank');
    }
  };

  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={openLink} className="group block book-card" style={{ perspective: "1200px" }}>
      <div className="relative mx-auto" style={{ transformStyle: "preserve-3d" }}>
        {/* Page stack behind cover */}
        <div className="absolute inset-0 aspect-[2/3] rounded-r-md rounded-l-[3px] bg-card border border-border/50 overflow-hidden">
          <div className="absolute inset-5 flex flex-col justify-center gap-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
            <FileText className="w-5 h-5 text-primary/40 mb-2" />
            <div className="h-[2px] w-[70%] bg-foreground/8 rounded-full" />
            <div className="h-[2px] w-full bg-foreground/6 rounded-full" />
            <div className="h-[2px] w-[85%] bg-foreground/6 rounded-full" />
            <div className="h-[2px] w-[60%] bg-foreground/5 rounded-full" />
            <div className="h-[2px] w-[75%] bg-foreground/5 rounded-full" />
            <div className="mt-auto flex items-center gap-1 text-[10px] font-medium text-primary/60 group-hover:text-primary transition-colors duration-500">
              <span>{item.linkLabel}</span>
              <span>→</span>
            </div>
          </div>
          <div className="absolute top-1 right-0 bottom-1 w-[5px]">
            <div className="absolute inset-0 flex flex-col gap-[1px]">
              <div className="flex-1 bg-border/30 rounded-r-[1px]" />
              <div className="flex-1 bg-border/20 rounded-r-[1px]" />
              <div className="flex-1 bg-border/15 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Book Cover */}
        <div
          className="book-cover relative aspect-[2/3] rounded-md overflow-hidden"
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d", transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s cubic-bezier(0.22, 1, 0.36, 1)", zIndex: 2 }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
            <img src={item.cover} alt={item.title} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-y-0 left-0 w-[8px] bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-l from-black/15 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-b from-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-t from-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/8 group-hover:from-white/5 transition-all duration-700" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 text-center px-1">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-500 line-clamp-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {item.title}
        </h3>
      </div>
      <div className="h-[6px] w-[80%] mx-auto mt-2 bg-foreground/5 rounded-[50%] blur-[5px] transition-all duration-700 group-hover:w-[90%] group-hover:bg-foreground/10 group-hover:blur-[7px]" />
    </a>
  );
}

/* ── Page ── */
const DocumentationSamples = forwardRef<HTMLDivElement>((_, ref) => {
  const [active, setActive] = useState<CategoryType>("all");
  const filtered = active === "all" ? allItems : allItems.filter(i => i.type === active);

  const docs = filtered.filter(i => i.type === "docs");
  const blogs = filtered.filter(i => i.type === "blog");
  const videos = filtered.filter(i => i.type === "video");

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
            className="flex flex-wrap gap-3 mb-14 justify-center"
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
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/50"}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono transition-colors duration-300 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {cat.count}
                  </span>
                  {isActive && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 rounded-full bg-primary -z-10" transition={{ type: "spring", stiffness: 400, damping: 28 }} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              className="space-y-16"
            >
              {/* Documents shelf */}
              {docs.length > 0 && (
                <div>
                  {active === "all" && <motion.p variants={itemVariants} className="label-caps mb-8 text-center">Documents</motion.p>}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 max-w-2xl mx-auto">
                    {docs.map((item) => (
                      <motion.div key={item.title} variants={itemVariants}>
                        <BookCard item={item} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos shelf */}
              {videos.length > 0 && (
                <div>
                  {active === "all" && <motion.p variants={itemVariants} className="label-caps mb-8 text-center">Videos</motion.p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 max-w-xl mx-auto">
                    {videos.map((item) => (
                      <motion.div key={item.title} variants={itemVariants}>
                        <VideoCard item={item} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog shelf */}
              {blogs.length > 0 && (
                <div>
                  {active === "all" && <motion.p variants={itemVariants} className="label-caps mb-8 text-center">Blog Posts</motion.p>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 max-w-2xl mx-auto">
                    {blogs.map((item) => (
                      <motion.div key={item.title} variants={itemVariants}>
                        <BlogCard item={item} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  );
});
DocumentationSamples.displayName = "DocumentationSamples";

export default DocumentationSamples;
