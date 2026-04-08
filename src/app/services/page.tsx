import type { Metadata } from "next";
import { Cloud, Smartphone, Layers, Server, Code2, Palette, BarChart3, ShieldCheck } from "lucide-react";
import { services } from "@/lib/data/services";
import ServiceCard from "@/components/sections/ServiceCard";
import PageWrapper from "@/components/layout/PageWrapper";
import CTABanner from "@/components/sections/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Tecsteer's full range of IT services: Salesforce, mobile development, AWS consulting, cybersecurity, and more.",
  openGraph: {
    title: "Our Services | Tecsteer",
    description: "Explore Tecsteer's full range of IT services.",
    url: "https://tecsteer.com/services",
    type: "website",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  salesforce: <Cloud size={20} />,
  "mobile-development": <Smartphone size={20} />,
  "application-services": <Layers size={20} />,
  "aws-consulting": <Server size={20} />,
  "web-development": <Code2 size={20} />,
  "ui-ux-design": <Palette size={20} />,
  "data-analytics": <BarChart3 size={20} />,
  cybersecurity: <ShieldCheck size={20} />,
};

export default function Services() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-5">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">WHAT WE OFFER</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              Services Built for{" "}
              <GradientText>Modern Business</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg max-w-[44ch]">
              From Salesforce and cloud infrastructure to cybersecurity and UI/UX —
              end-to-end technology solutions for growing organizations.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <AnimateIn direction="fade" delay={0}>
            <p className="eyebrow mb-8">ALL SERVICES</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <AnimateIn key={service.id} direction="up" delay={i * 50}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={iconMap[service.id]}
                  link={service.href}
                  size="large"
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Get Started?"
        subtext="Our team is ready to help you find the right technology solution for your business challenges."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Training"
        secondaryHref="/training"
      />
    </PageWrapper>
  );
}
