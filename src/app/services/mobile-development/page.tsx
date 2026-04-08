import type { Metadata } from "next";
import { Smartphone } from "lucide-react";
import ServicePageLayout from "@/components/sections/ServicePageLayout";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description:
    "Cross-platform and native mobile app development for iOS and Android from Tecsteer.",
  openGraph: {
    title: "Mobile App Development | Tecsteer",
    url: "https://tecsteer.com/services/mobile-development",
    type: "website",
  },
};

export default function MobileDevelopment() {
  return (
    <ServicePageLayout
      eyebrow="MOBILE DEVELOPMENT"
      title="Mobile App"
      titleAccent="Development"
      description="Build cutting-edge mobile applications for iOS and Android. From concept to deployment, our team delivers high-performance, user-centric mobile experiences."
      icon={<Smartphone size={28} />}
      sections={[
        {
          heading: "Our Mobile Services",
          bullets: [
            "Native iOS and Android application development",
            "Cross-platform development with React Native or Flutter",
            "UI/UX design for mobile",
            "Performance testing and quality assurance",
            "App Store and Play Store submission",
            "Post-launch maintenance and updates",
          ],
        },
        {
          heading: "Why Choose Tecsteer?",
          bullets: [
            "Experienced team with cross-platform expertise",
            "Agile development for fast, iterative delivery",
            "End-to-end project ownership from design to launch",
            "Ongoing support and maintenance after launch",
            "Performance-optimized builds for all device sizes",
            "Accessibility-first design approach",
          ],
        },
      ]}
      benefits={[
        "High-performance native and cross-platform apps",
        "Intuitive user experiences that drive retention",
        "Fast iteration with agile methodology",
        "Full project ownership — design to App Store",
        "Ongoing support and feature development",
        "Platform-specific optimizations for iOS and Android",
      ]}
      ctaHeading="Got a Mobile App Idea?"
      ctaSubtext="Our team can take your concept from wireframe to launch on both iOS and Android."
    />
  );
}
