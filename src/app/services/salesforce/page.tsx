import type { Metadata } from "next";
import { Cloud } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "Salesforce Solutions",
  description:
    "Expert Salesforce CRM implementation, customization, and support services from Tecsteer's certified consultants.",
  openGraph: {
    title: "Salesforce Solutions | Tecsteer",
    description: "Expert Salesforce CRM implementation and customization services.",
    url: "https://tecsteer.com/services/salesforce",
    type: "website",
  },
};

export default function Salesforce() {
  return (
    <ServicePageLayout
      eyebrow="SALESFORCE SERVICES"
      title="Salesforce"
      titleAccent="Solutions"
      description="Empower your business with Salesforce CRM solutions tailored to your needs. From implementation to customization, we ensure seamless integration with your business processes."
      icon={<Cloud size={28} />}
      sections={[
        {
          heading: "Why Choose Salesforce?",
          content:
            "Salesforce is the world's leading CRM platform, offering a suite of tools to manage customer relationships, streamline sales processes, and enhance productivity. We provide expert guidance to help you harness the full potential of Salesforce.",
        },
        {
          heading: "Our Expertise",
          bullets: [
            "Custom Salesforce implementation and configuration",
            "Integration with third-party systems",
            "Salesforce App Development",
            "Data migration and management",
            "Ongoing support and training",
            "Certification-level Apex, LWC, and Visualforce development",
          ],
        },
      ]}
      benefits={[
        "Seamless implementation with minimal downtime",
        "Solutions tailored to your unique business requirements",
        "Enhanced productivity and ROI from your Salesforce investment",
        "Certified consultants with deep Salesforce expertise",
        "End-to-end support from strategy to go-live",
        "Post-deployment training and optimization",
      ]}
      ctaHeading="Ready to Transform with Salesforce?"
      ctaSubtext="Our certified Salesforce consultants will guide you from strategy to go-live and beyond."
    />
  );
}
