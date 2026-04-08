"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp, Users } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";
import GlitchText from "@/components/ui/GlitchText";
import MagneticButton from "@/components/ui/MagneticButton";

// Dynamic imports for below-fold components — load after hero paints
const StatsRow = dynamic(() => import("@/components/sections/StatsRow"));
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"));
const ParallaxText = dynamic(() => import("@/components/ui/ParallaxText"), { ssr: false });
import { useTypewriter } from "@/hooks/useTypewriter";
import { blurFadeIn, wordFadeUp, wordChild } from "@/lib/textAnimations";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

// Service icon map
const serviceIcons: Record<string, React.ReactNode> = {
  salesforce: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>,
  "mobile-development": <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
  "application-services": <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>,
  "aws-consulting": <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" /></svg>,
  "web-development": <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  "ui-ux-design": <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  "data-analytics": <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  cybersecurity: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
};

const techStack = [
  "Salesforce", "AWS", "React", "Node.js", "TypeScript", "Python",
  "iOS", "Android", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
  "Figma", "Next.js", "GraphQL", "Terraform",
];

const TYPEWRITER_WORDS = ["IT Transformation", "Cloud Infrastructure", "DevOps Solutions", "IT Consulting"];

// Headline words animation
const headline = "Your Partner in";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 60);
    const t2 = setTimeout(() => setHeadlineVisible(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Typewriter starts after headline plays (~1s)
  const [typewriterReady, setTypewriterReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTypewriterReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const { displayText } = useTypewriter(
    typewriterReady ? TYPEWRITER_WORDS : [],
    80, 40, 2500
  );

  return (
    <main id="main-content" className="min-h-screen bg-bg-base">

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen-safe flex items-center justify-center overflow-hidden pt-14 w-full max-w-full">
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Breathing glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[480px] bg-accent-primary rounded-full pointer-events-none glow-breathe"
          style={{ filter: "blur(120px)" }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-0 py-24 max-w-5xl">

          {/* Eyebrow — glitch effect */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0 }}
            className="mb-8"
          >
            <GlitchText
              text="IT Staffing · Consulting · Staff Augmentation"
              className="eyebrow"
              autoPlay
              delayMs={600}
            />
          </m.div>

          {/* Headline — word-by-word blur fade */}
          <h1
            className="font-syne font-extrabold text-text-primary w-full"
            style={{
              fontSize: "clamp(2rem, 8vw, 5.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            <m.span
              initial="hidden"
              animate={headlineVisible ? "visible" : "hidden"}
              variants={wordFadeUp}
              style={{ display: "inline" }}
              aria-label={headline}
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
                  <m.span variants={wordChild} style={{ display: "inline-block" }}>
                    {word}
                    {"\u00A0"}
                  </m.span>
                </span>
              ))}
            </m.span>
            {" "}
            <m.span
              initial={{ opacity: 0 }}
              animate={headlineVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.4 }}
              style={{ display: "inline-block" }}
            >
              <GradientText variant="blue">
                {typewriterReady ? (
                  <>
                    {displayText}
                    <span className="typewriter-cursor" aria-hidden>|</span>
                  </>
                ) : (
                  TYPEWRITER_WORDS[0]
                )}
              </GradientText>
            </m.span>
          </h1>

          {/* Description */}
          <m.p
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={blurFadeIn}
            transition={{ delay: 0.8 }}
            className="text-text-secondary leading-relaxed mt-8"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", maxWidth: "44ch" }}
          >
            Empowering businesses worldwide with cutting-edge technology solutions —
            from Salesforce and AWS to mobile apps and cybersecurity.
          </m.p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3 mt-10">
            <div style={{ overflow: "hidden" }}>
              <m.div
                initial={{ y: "100%" }}
                animate={mounted ? { y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
              >
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-accent-primary text-white font-medium text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm shimmer-btn"
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </Link>
                </MagneticButton>
              </m.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <m.div
                initial={{ y: "100%" }}
                animate={mounted ? { y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-transparent text-text-secondary border border-white/[0.12] font-medium text-sm hover:text-text-primary hover:bg-white/[0.04] hover:border-white/[0.18] active:scale-[0.98] transition-all duration-150"
                >
                  View Services
                </Link>
              </m.div>
            </div>
          </div>

          {/* Social proof */}
          <m.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-14 pt-8 border-t border-white/[0.06]"
          >
            {[
              { icon: <TrendingUp size={12} />, label: "10+ Years Experience" },
              { icon: <Users size={12} />, label: "50+ Clients Served" },
              { icon: <Zap size={12} />, label: "100+ Projects Delivered" },
              { icon: <Shield size={12} />, label: "Enterprise Grade Security" },
            ].map((chip) => (
              <div key={chip.label} className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                <span className="text-text-muted">{chip.icon}</span>
                {chip.label}
              </div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SERVICES — Linear list layout
      ════════════════════════════════════════════════ */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
            <AnimateIn direction="up" delay={0}>
              <div className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-6">
                <span className="eyebrow">WHAT WE DO</span>
                <h2
                  className="font-syne font-bold text-text-primary tracking-tight"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
                >
                  Comprehensive IT Solutions
                </h2>
                <p className="text-text-secondary leading-relaxed text-base max-w-[42ch]">
                  From strategy to execution — we deliver the full spectrum of technology
                  services your business needs to thrive.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-150 group/link"
                >
                  See all services
                  <ArrowRight size={13} className="transition-transform duration-150 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </AnimateIn>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {services.map((service, i) => (
                <AnimateIn key={service.id} direction="up" delay={i * 50}>
                  <Link
                    href={service.href}
                    className={cn(
                      "group flex items-center gap-4 py-5",
                      "rounded-lg -mx-3 px-3",
                      "border-l-2 border-transparent",
                      "hover:border-accent-primary hover:bg-white/[0.02]",
                      "transition-all duration-150"
                    )}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors duration-150">
                      {serviceIcons[service.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-syne font-semibold text-[0.9375rem] text-text-primary leading-snug">
                        {service.title}
                      </div>
                      <div className="text-sm text-text-secondary mt-0.5 leading-relaxed">
                        {service.description}
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150"
                    />
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PARALLAX BANNER — decorative
      ════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.04] overflow-hidden">
        <ParallaxText
          topText="TECHNOLOGY  ·  INNOVATION  ·  SOLUTIONS  ·  EXCELLENCE"
          bottomText="SALESFORCE  ·  AWS  ·  CLOUD  ·  SECURITY  ·  MOBILE"
        />
      </div>

      {/* ════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-bg-deep">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <StatsRow />
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════════════════ */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimateIn direction="left" delay={0}>
              <div className="flex flex-col gap-6">
                <span className="eyebrow">WHY CHOOSE US</span>
                <h2
                  className="font-syne font-bold text-text-primary tracking-tight"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
                >
                  Built on Trust,{" "}
                  <GradientText variant="warm">Driven by Results</GradientText>
                </h2>
                <p className="text-text-secondary leading-relaxed text-base max-w-[48ch]">
                  At Tecsteer, we believe technology should be an enabler, not an obstacle.
                  We partner with you to understand your business goals and deliver tailored
                  solutions — from implementation to ongoing support.
                </p>
                <div className="flex flex-col gap-3 mt-2">
                  {[
                    "Transparency and integrity in every engagement",
                    "Certified consultants with deep domain expertise",
                    "End-to-end delivery — strategy to execution",
                    "Dedicated support and continuous improvement",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm text-text-secondary">
                      <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0 mt-2" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={60}>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Transparency", desc: "Clear communication at every stage of every engagement." },
                  { label: "Reliability", desc: "Consistent delivery you can count on, every time." },
                  { label: "Inclusivity", desc: "Diverse perspectives produce better outcomes for clients." },
                  { label: "Integrity", desc: "Doing the right thing, always, without exception." },
                  { label: "Customer Focus", desc: "Your success is the only metric that matters to us." },
                ].map((value, i) => (
                  <m.div
                    key={value.label}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-200"
                  >
                    <span className="font-mono text-[11px] font-medium text-text-muted mt-0.5 flex-shrink-0 tabular-nums">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="font-syne font-semibold text-text-primary text-sm mb-1">
                        {value.label}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </m.div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TECHNOLOGIES
      ════════════════════════════════════════════════ */}
      <section className="section-padding border-t border-white/[0.06] bg-bg-deep">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <p className="text-[11px] text-text-muted uppercase tracking-[0.15em] font-mono mb-8">
              Technologies we work with
            </p>
          </AnimateIn>
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
            className="flex flex-wrap gap-2"
          >
            {techStack.map((tech) => (
              <m.span
                key={tech}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-mono text-text-secondary bg-white/[0.03] border border-white/[0.06] hover:text-text-primary hover:border-white/[0.1] transition-colors duration-150 cursor-default"
              >
                {tech}
              </m.span>
            ))}
          </m.div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
