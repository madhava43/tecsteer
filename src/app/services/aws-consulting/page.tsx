import type { Metadata } from "next";
import { Server } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "AWS Cloud Consulting",
  description:
    "Expert AWS cloud strategy, migration, and managed services from Tecsteer's certified AWS consultants.",
  openGraph: {
    title: "AWS Cloud Consulting | Tecsteer",
    url: "https://tecsteer.com/services/aws-consulting",
    type: "website",
  },
};

export default function AWSConsulting() {
  return (
    <ServicePageLayout
      eyebrow="AWS CLOUD SERVICES"
      title="AWS"
      titleAccent="Consulting"
      description="Get expert advice on AWS architecture, cloud migration, and cost optimization. We help you build secure, scalable, and efficient cloud infrastructure on Amazon Web Services."
      icon={<Server size={28} />}
      sections={[
        {
          heading: "Our AWS Services",
          bullets: [
            "Cloud strategy and architecture design",
            "Cloud migration and modernization",
            "Serverless and containerized application development",
            "DevOps and CI/CD pipeline setup",
            "Cost optimization and right-sizing",
            "Security, compliance, and IAM review",
          ],
        },
        {
          heading: "Why Cloud with AWS?",
          content:
            "Amazon Web Services is the world's most comprehensive and broadly adopted cloud platform, offering over 200 services from data centers globally. Our certified AWS consultants help you leverage the right services for your specific needs — whether you're migrating legacy workloads or building cloud-native applications from the ground up.",
        },
      ]}
      benefits={[
        "Reduce infrastructure costs significantly",
        "Improve scalability, availability, and resilience",
        "Accelerate time-to-market for new features",
        "Strengthen your security posture in the cloud",
        "Expert guidance from certified AWS professionals",
        "Ongoing managed services and support",
      ]}
      ctaHeading="Ready to Move to AWS?"
      ctaSubtext="Our certified AWS architects will design and implement a cloud strategy tailored to your business."
    />
  );
}
