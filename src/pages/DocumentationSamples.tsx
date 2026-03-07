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
  { type: "video", title: "Product Demo Video – Sample Walkthrough", description: "A sample demo video showcasing product walkthrough and feature highlights, created to demonstrate video documentation skills.", link: "https://youtu.be/ZM9HkCIeRvA", cover: "https://img.youtube.com/vi/ZM9HkCIeRvA/maxresdefault.jpg", linkLabel: "Watch Video" },
];

const categories: { key: CategoryType; label: string; icon: typeof Layers; count: number }[] = [
  { key: "all", label: "All Work", icon: Layers, count: allItems.length },
  { key: "docs", label: "Documents", icon: FileText, count: allItems.filter(i => i.type === "docs").length },
  { key: "blog", label: "Blog Posts", icon: ExternalLink, count: allItems.filter(i => i.type === "blog").length },
  { key: "video", label: "Videos", icon: Play, count: allItems.filter(i => i.type === "video").length },
];

/* ── Card renderers ── */

function VideoCard({ item }: { item: SampleItem }) {
  return (
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(105deg,transparent_40%,hsl(var(--primary)/0.08)_45%,hsl(var(--primary)/0.15)_50%,hsl(var(--primary)/0.08)_55%,transparent_60%)] bg-[length:200%_100%] group-hover:animate-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/40 backdrop-blur-sm"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Play className="w-7 h-7 ml-1" fill="currentColor" />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-2 bg-primary/10 px-2.5 py-1 rounded-full backdrop-blur-sm border border-primary/20">Video</span>
        <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-xl">{item.description}</p>
      </div>
    </motion.a>
  );
}

function BlogCard({ item }: { item: SampleItem }) {
  return (
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
        <img src={item.cover} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">Blog</span>
        <h3 className="text-base font-semibold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{item.description}</p>
      </div>
      <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
        <ExternalLink className="w-5 h-5" />
      </div>
    </motion.a>
  );
}

function BookCard({ item }: { item: SampleItem }) {
  const openLink = (e: React.MouseEvent) => {
    if (window.location.hostname.includes('lovableproject.com') || window.location.hostname.includes('lovable.app')) {
      e.preventDefault();
      window.open(item.link, '_blank');
    }
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={openLink}
      className="group block book-card"
      style={{ perspective: "1200px" }}
    >
      <div className="relative mx-auto" style={{ transformStyle: "preserve-3d" }}>
        {/* Page stack behind cover */}
        <div className="absolute inset-0 aspect-[2/3] rounded-r-md rounded-l-[3px] bg-card border border-border/50 overflow-hidden">
          {/* Faux page lines */}
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
          {/* Page edge stack on right */}
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
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 2,
          }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
            <img src={item.cover} alt={item.title} className="w-full h-full object-cover object-top" />
            {/* Spine crease */}
            <div className="absolute inset-y-0 left-0 w-[8px] bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            {/* Right edge */}
            <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-l from-black/15 to-transparent" />
            {/* Top/bottom edge */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-b from-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-t from-black/15 to-transparent" />
            {/* Gloss reflection */}
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

      {/* Ground shadow */}
      <div className="h-[6px] w-[80%] mx-auto mt-2 bg-foreground/5 rounded-[50%] blur-[5px] transition-all duration-700 group-hover:w-[90%] group-hover:bg-foreground/10 group-hover:blur-[7px]" />
    </a>
  );
}

/* ── Page ── */

const DocumentationSamples = forwardRef<HTMLDivElement>((_, ref) => {
  const [active, setActive] = useState<CategoryType>("all");
  const filtered = active === "all" ? allItems : allItems.filter(i => i.type === active);

  const docs = filtered.filter(i => i.type === "docs");
  const nonDocs = filtered.filter(i => i.type !== "docs");

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
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono transition-colors duration-300 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
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

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              className="space-y-12"
            >
              {/* Video & Blog cards */}
              {nonDocs.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {nonDocs.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      className={item.type === "video" ? "md:col-span-2" : ""}
                    >
                      {item.type === "video" ? <VideoCard item={item} /> : <BlogCard item={item} />}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Book shelf for documents */}
              {docs.length > 0 && (
                <div>
                  {active === "all" && (
                    <motion.p variants={itemVariants} className="label-caps mb-8 text-center">Documents</motion.p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 max-w-2xl mx-auto">
                    {docs.map((item) => (
                      <motion.div key={item.title} variants={itemVariants}>
                        <BookCard item={item} />
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
