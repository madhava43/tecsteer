"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import CTABanner from "@/components/sections/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

const topics = [
  {
    id: "it-consulting",
    title: "IT Consulting",
    eyebrow: "Strategy & Guidance",
    description:
      "Your Trusted IT Consulting Partner. Our team of experienced IT consultants provides expert guidance and support to help you navigate the complexities of technology. We partner with you to understand your business goals and deliver tailored solutions that address your specific challenges. Whether you need help with IT strategy, implementation, or management, we're here to help you succeed.",
    highlights: [
      "Technology roadmap planning",
      "IT strategy and architecture",
      "Digital transformation advisory",
      "Vendor selection and management",
      "IT governance and compliance",
    ],
  },
  {
    id: "business-strategy",
    title: "Business Strategy",
    eyebrow: "Growth & Market Position",
    description:
      "Develop and implement strategic plans, market analysis, competitive analysis, and growth strategies. We help organizations identify opportunities, overcome challenges, and build a sustainable competitive advantage in their markets.",
    highlights: [
      "Strategic plan development",
      "Market and competitive analysis",
      "Growth strategy definition",
      "Organizational alignment workshops",
      "KPI frameworks and OKR design",
    ],
  },
  {
    id: "management",
    title: "Management Consulting",
    eyebrow: "Operations & Leadership",
    description:
      "Organizational restructuring, process improvement, change management, and leadership development. We help leaders build the capabilities and structures their organizations need to execute at a higher level.",
    highlights: [
      "Organizational restructuring",
      "Process improvement and lean ops",
      "Change management programs",
      "Leadership development",
      "Performance management systems",
    ],
  },
  {
    id: "financial",
    title: "Financial Consulting",
    eyebrow: "Investment & Risk",
    description:
      "Financial planning, investment strategies, mergers and acquisitions, and risk management. Our advisors work alongside finance teams to drive smarter decisions and optimize resource allocation.",
    highlights: [
      "Financial planning and modeling",
      "Investment strategy",
      "M&A due diligence",
      "Risk assessment and mitigation",
      "Cost optimization analysis",
    ],
  },
  {
    id: "marketing",
    title: "Marketing Consulting",
    eyebrow: "Brand & Growth",
    description:
      "Brand development, market research, digital marketing, and sales strategies. We help companies connect with their audiences more effectively — building brand equity and measurable pipeline.",
    highlights: [
      "Brand strategy and positioning",
      "Market research and segmentation",
      "Digital marketing roadmaps",
      "Content and SEO strategy",
      "Sales and GTM alignment",
    ],
  },
];

export default function Consulting() {
  const [activeTab, setActiveTab] = useState(topics[0]?.id ?? "it-consulting");
  const activeTopic = topics.find((t) => t.id === activeTab);

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-6 max-w-4xl">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">CONSULTING SERVICES</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              Expert Guidance for{" "}
              <GradientText>Every Challenge</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[52ch]">
              At Tecsteer, we provide expert guidance and specialized knowledge to help
              businesses and organizations achieve their goals — from IT strategy to financial
              planning to market positioning.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={300}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
            >
              Schedule a Consultation
              <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Tab layout ── */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">KEY AREAS</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Areas of Consulting
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
            {/* Sidebar */}
            <aside className="flex flex-col gap-1">
              {topics.map((topic, index) => {
                const isActive = activeTab === topic.id;
                const prevId = topics[index - 1]?.id;
                const nextId = topics[index + 1]?.id;
                return (
                  <button
                    key={topic.id}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    onClick={() => setActiveTab(topic.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveTab(topic.id); }
                      if (e.key === "ArrowDown" && nextId) setActiveTab(nextId);
                      if (e.key === "ArrowUp" && prevId) setActiveTab(prevId);
                    }}
                    className={cn(
                      "group flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-150 text-sm",
                      isActive
                        ? "bg-accent-primary/[0.12] text-accent-primary border border-accent-primary/25 font-medium"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04] font-normal"
                    )}
                  >
                    <span>{topic.title}</span>
                    <ChevronRight
                      size={13}
                      className={cn(
                        "transition-transform duration-150 opacity-50",
                        isActive ? "rotate-90 opacity-100" : "group-hover:translate-x-0.5"
                      )}
                    />
                  </button>
                );
              })}
            </aside>

            {/* Content panel */}
            <div
              role="tabpanel"
              className="bg-bg-surface border border-white/[0.06] rounded-xl p-8 md:p-10 shadow-card"
            >
              {activeTopic && (
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-1.5">
                    <span className="eyebrow">{activeTopic.eyebrow}</span>
                    <h2 className="font-syne font-bold text-2xl text-text-primary tracking-tight mt-3" style={{ letterSpacing: "-0.025em" }}>
                      {activeTopic.title}
                    </h2>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[60ch]">
                    {activeTopic.description}
                  </p>
                  {activeTopic.highlights && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-syne font-semibold text-text-primary text-xs uppercase tracking-[0.1em]">
                        Key Offerings
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeTopic.highlights.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm text-text-secondary">
                            <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0 mt-2" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition-colors duration-150 group/link"
                  >
                    Discuss this with our team
                    <ArrowRight size={13} className="transition-transform duration-150 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section className="section-padding border-t border-white/[0.06] bg-bg-deep">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">OUR METHODOLOGY</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                How We Work
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discover", desc: "We listen deeply to understand your challenges, goals, and constraints." },
              { step: "02", title: "Diagnose", desc: "A thorough assessment identifies the root causes and priority opportunities." },
              { step: "03", title: "Design", desc: "We craft a tailored strategy with clear milestones and measurable outcomes." },
              { step: "04", title: "Deliver", desc: "Execution with hands-on support, reporting, and iteration throughout." },
            ].map((phase, i) => (
              <AnimateIn key={phase.step} direction="up" delay={i * 80}>
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full">
                  <span className="font-mono text-3xl font-bold text-white/[0.08] tabular-nums leading-none">
                    {phase.step}
                  </span>
                  <h3 className="font-syne font-semibold text-text-primary text-lg tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{phase.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Let's Solve It Together"
        subtext="Our consultants are ready to help you navigate your toughest technology and business challenges."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </PageWrapper>
  );
}
