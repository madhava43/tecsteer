import type { Metadata } from "next";
import { Layers } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "Application Services",
  description:
    "Custom application development, maintenance, testing, and modernization services from Tecsteer.",
  openGraph: {
    title: "Application Services | Tecsteer",
    url: "https://tecsteer.com/services/application-services",
    type: "website",
  },
};

export default function ApplicationServices() {
  return (
    <ServicePageLayout
      eyebrow="APPLICATION SERVICES"
      title="Application"
      titleAccent="Services"
      description="Streamline your operations with custom application solutions. From development to maintenance, we keep your applications running at peak performance."
      icon={<Layers size={28} />}
      sections={[
        {
          heading: "What We Offer",
          bullets: [
            "Custom application design and development",
            "Application modernization and legacy migration",
            "API development and integration",
            "Ongoing maintenance and support",
            "Performance monitoring and optimization",
            "Automated testing and quality assurance",
          ],
        },
        {
          heading: "Why Tecsteer?",
          bullets: [
            "Full lifecycle application ownership",
            "Agile methodology for adaptable delivery",
            "Deep expertise across multiple tech stacks",
            "Dedicated support with clear SLAs",
            "Transparent communication and reporting",
            "Scalable architectures built for growth",
          ],
        },
      ]}
      benefits={[
        "Tailored solutions built around your specific workflows",
        "Modern, scalable architectures that grow with your business",
        "Reduced operational overhead through automation",
        "Rapid iteration and deployment via CI/CD pipelines",
        "Clear SLAs and dedicated support teams",
        "Full documentation and knowledge transfer",
      ]}
      ctaHeading="Need a Custom Application?"
      ctaSubtext="Tell us about your requirements and we will design a solution that fits your business perfectly."
    />
  );
}
