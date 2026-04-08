import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "Cybersecurity Services",
  description:
    "Comprehensive cybersecurity services including threat assessment, SOC, incident response, and security training from Tecsteer.",
  openGraph: {
    title: "Cybersecurity Services | Tecsteer",
    url: "https://tecsteer.com/services/cybersecurity",
    type: "website",
  },
};

export default function Cybersecurity() {
  return (
    <ServicePageLayout
      eyebrow="CYBERSECURITY"
      title="Cybersecurity"
      titleAccent="Solutions"
      description="In today's interconnected world, cybersecurity is a necessity. At Tecsteer, we safeguard your digital assets with proactive, comprehensive security solutions."
      icon={<ShieldCheck size={28} />}
      sections={[
        {
          heading: "Our Cybersecurity Services",
          bullets: [
            "Proactive threat monitoring and threat intelligence",
            "Vulnerability and risk assessments",
            "Zero Trust architecture implementation",
            "Cloud security consulting (AWS, Azure, GCP)",
            "Incident response planning and rehearsals",
            "Managed detection and response (MDR)",
            "Security monitoring and SIEM/log management",
            "Employee security awareness training programs",
          ],
        },
        {
          heading: "Protecting What Matters",
          content:
            "Modern threats move fast. Our cybersecurity team combines proactive monitoring, deep expertise, and battle-tested playbooks to keep your organization safe — from perimeter defenses to insider threat detection. We work as an extension of your team, not just a vendor.",
        },
      ]}
      benefits={[
        "Enhanced security posture across your organization",
        "Minimized risk of breaches and data loss",
        "Improved regulatory compliance",
        "Increased business resilience and recovery speed",
        "24/7 monitoring and rapid incident response",
        "Security awareness that turns your team into a defense layer",
      ]}
      ctaHeading="Is Your Organization Secure?"
      ctaSubtext="Start with a security assessment — we will identify your vulnerabilities before attackers do."
    />
  );
}
