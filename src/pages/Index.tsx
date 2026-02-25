import { forwardRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";

const Index = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <PageLayout ref={ref}>
      <HeroSection />
    </PageLayout>
  );
});
Index.displayName = "Index";

export default Index;
