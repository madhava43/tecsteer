import type { Metadata } from "next";
import { Code2 } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "Custom web development services including responsive sites, e-commerce, APIs, and web applications from Tecsteer.",
  openGraph: {
    title: "Web Development Services | Tecsteer",
    url: "https://tecsteer.com/services/web-development",
    type: "website",
  },
};

export default function WebDevelopment() {
  return (
    <ServicePageLayout
      eyebrow="WEB DEVELOPMENT"
      title="Web"
      titleAccent="Development"
      description="Build responsive, fast, and secure web applications. From simple landing pages to complex enterprise portals, we deliver web solutions that drive results."
      icon={<Code2 size={28} />}
      sections={[
        {
          heading: "What We Build",
          bullets: [
            "Custom website development and redesigns",
            "E-commerce platforms and storefronts",
            "Web applications and SaaS products",
            "RESTful and GraphQL APIs",
            "Responsive and mobile-first designs",
            "CMS integration (WordPress, Contentful, Sanity)",
          ],
        },
        {
          heading: "Our Approach",
          bullets: [
            "Performance-first development with measurable results",
            "Accessibility and SEO best practices built in",
            "Modern frameworks: Next.js, React, TypeScript",
            "Secure coding standards and regular audits",
            "Design-to-code collaboration with pixel-perfect delivery",
            "Continuous delivery and post-launch support",
          ],
        },
      ]}
      benefits={[
        "Fast-loading, performant websites",
        "Built for accessibility and SEO from day one",
        "Modern tech stack: Next.js, React, TypeScript",
        "Mobile-first responsive design",
        "Secure and maintainable codebases",
        "Full lifecycle support — design to deployment",
      ]}
      ctaHeading="Let's Build Something Great"
      ctaSubtext="From landing pages to complex web applications — our team delivers web solutions that perform."
    />
  );
}
