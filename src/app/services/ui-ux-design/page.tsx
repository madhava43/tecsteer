import type { Metadata } from "next";
import { Palette } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "UI/UX Design Services",
  description:
    "User-centered UI/UX design services including research, prototyping, and design systems from Tecsteer.",
  openGraph: {
    title: "UI/UX Design Services | Tecsteer",
    url: "https://tecsteer.com/services/ui-ux-design",
    type: "website",
  },
};

export default function UIUXDesign() {
  return (
    <ServicePageLayout
      eyebrow="UI/UX DESIGN"
      title="UI/UX"
      titleAccent="Design"
      description="Design intuitive, accessible, and visually compelling user interfaces. We put your users first to create experiences that delight and convert."
      icon={<Palette size={28} />}
      sections={[
        {
          heading: "Our Design Services",
          bullets: [
            "User research and persona development",
            "Information architecture and user flows",
            "Wireframing and interactive prototyping",
            "Visual UI design and branding alignment",
            "Usability testing and iteration",
            "Accessibility (WCAG) compliance",
            "Design system creation and maintenance",
          ],
        },
        {
          heading: "Why Good UX Matters",
          bullets: [
            "Higher user engagement and retention",
            "Reduced support costs through intuitive design",
            "Improved conversion rates and business outcomes",
            "Consistent brand experience across platforms",
            "Faster onboarding and reduced training needs",
            "Products users actually love to use",
          ],
        },
      ]}
      benefits={[
        "Research-driven design decisions, not guesswork",
        "Pixel-perfect, developer-ready design handoffs",
        "Accessibility compliance from day one",
        "Scalable design systems for consistency",
        "Usability testing that validates before you build",
        "Seamless collaboration with your engineering team",
      ]}
      ctaHeading="Design That Converts"
      ctaSubtext="Our design team blends aesthetics with function — creating interfaces that users love and businesses measure in results."
    />
  );
}
