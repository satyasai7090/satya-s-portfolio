import { ReactNode, forwardRef } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(({ children }, ref) => {
  return (
    <PageTransition>
      <div ref={ref} className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Navigation />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
});
PageLayout.displayName = "PageLayout";
