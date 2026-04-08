import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import StatsRow from "@/components/sections/StatsRow";
import CTABanner from "@/components/sections/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tecsteer — our mission, vision, and the core values that drive everything we do in IT services and consulting.",
  openGraph: {
    title: "About Us | Tecsteer",
    description: "Learn about Tecsteer — our mission, vision, and the core values that drive everything we do.",
    url: "https://tecsteer.com/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const values = [
  { label: "Innovation", desc: "We embrace change and continuously seek better ways to solve complex technology challenges for our clients." },
  { label: "Integrity", desc: "Honesty and transparency underpin every engagement — we deliver on our promises, no exceptions." },
  { label: "Customer-Centric Approach", desc: "Your goals shape everything we do. We listen deeply and build solutions around your specific needs." },
  { label: "Teamwork", desc: "Collaboration across disciplines produces the strongest outcomes. We work as one, clients included." },
  { label: "Commitment to Excellence", desc: "We hold ourselves to the highest standards in code quality, design, communication, and delivery." },
];

export default function About() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-6">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">ABOUT TECSTEER</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              Empowering Innovation &{" "}
              <GradientText>Excellence in IT</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[52ch]">
              Tecsteer is a global IT services company dedicated to helping businesses
              transform, grow, and lead through technology.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={300}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
            >
              Work With Us
              <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Mission + Vision ── */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimateIn direction="left" delay={0}>
              <div className="relative flex flex-col gap-5 p-8 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Target size={18} className="text-accent-primary" />
                  </div>
                  <h2 className="font-syne font-bold text-xl text-text-primary tracking-tight">Our Mission</h2>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[55ch]">
                  Our mission is to deliver cutting-edge technology solutions that empower
                  businesses to innovate and grow. We strive to create sustainable and
                  impactful solutions tailored to our clients&apos; needs — solutions that
                  drive real, measurable outcomes.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0}>
              <div className="relative flex flex-col gap-5 p-8 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Eye size={18} className="text-accent-primary" />
                  </div>
                  <h2 className="font-syne font-bold text-xl text-text-primary tracking-tight">Our Vision</h2>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[55ch]">
                  To be a global leader in IT services, enabling businesses worldwide to
                  achieve excellence and sustainability through technology. We envision a
                  future where every organization — regardless of size — can harness the
                  power of the right technology partner.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-white/[0.06] bg-bg-deep">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <StatsRow />
          </AnimateIn>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">WHAT WE STAND FOR</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight mb-4"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Our Core Values
              </h2>
              <p className="text-text-secondary leading-relaxed text-base max-w-[50ch]">
                Five principles that define how we work, how we communicate,
                and how we measure success.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, i) => (
              <AnimateIn key={value.label} direction="up" delay={i * 60}>
                <div className="flex flex-col gap-3 p-6 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-medium text-text-muted tabular-nums">
                      0{i + 1}
                    </span>
                    <h3 className="font-syne font-semibold text-text-primary text-base">
                      {value.label}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Join the Tecsteer Family"
        subtext="Whether you are a business looking for transformation or a talent ready to build the future — we want to connect."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Careers"
        secondaryHref="/careers"
      />
    </PageWrapper>
  );
}
