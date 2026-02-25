import { AnimatedText } from "./AnimatedSection";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({ label, title, description, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center max-w-2xl mx-auto" : ""}>
      {label && (
        <AnimatedText>
          <p className="label-caps mb-4">{label}</p>
        </AnimatedText>
      )}
      <AnimatedText delay={0.1}>
        <h2 className="heading-section gold-text">{title}</h2>
      </AnimatedText>
      {description && (
        <AnimatedText delay={0.2}>
          <p className="body-large mt-4">{description}</p>
        </AnimatedText>
      )}
    </div>
  );
}
