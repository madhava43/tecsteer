import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import CTABanner from "@/components/sections/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";
import StaggeredBullets from "@/components/ui/StaggeredBullets";

interface ServicePageLayoutProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  icon: React.ReactNode;
  sections: {
    heading: string;
    content?: string;
    bullets?: string[];
  }[];
  benefits?: string[];
  ctaHeading?: string;
  ctaSubtext?: string;
}

export default function ServicePageLayout({
  eyebrow,
  title,
  titleAccent,
  description,
  icon,
  sections,
  benefits,
  ctaHeading,
  ctaSubtext,
}: ServicePageLayoutProps) {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-6 max-w-4xl">
          <AnimateIn direction="scale" delay={0}>
            <div className="w-12 h-12 rounded-xl border border-white/[0.08] flex items-center justify-center text-accent-primary">
              {icon}
            </div>
          </AnimateIn>
          <AnimateIn direction="fade" delay={80}>
            <span className="eyebrow">{eyebrow}</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={160}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              {title}{" "}
              <GradientText>{titleAccent}</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={240}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[52ch]">
              {description}
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={320}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section-padding pt-0">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {sections.map((section, i) => (
              <AnimateIn key={section.heading} direction="up" delay={i * 80}>
                <div className="flex flex-col gap-5 p-8 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 h-full shadow-card">
                  <h2 className="font-syne font-bold text-xl text-text-primary tracking-tight">
                    {section.heading}
                  </h2>
                  {section.content && (
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  {section.bullets && (
                    <StaggeredBullets bullets={section.bullets} />
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <AnimateIn direction="up" delay={0} className="mt-5">
              <div className="p-8 md:p-10 rounded-xl bg-bg-surface border border-white/[0.06] shadow-card">
                <h2 className="font-syne font-bold text-xl text-text-primary mb-6 tracking-tight">
                  Benefits of Working with Us
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StaggeredBullets bullets={benefits} />
                </div>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      <CTABanner
        heading={ctaHeading ?? "Ready to Get Started?"}
        subtext={ctaSubtext ?? "Our experts are ready to help you transform your business with this service."}
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </PageWrapper>
  );
}
