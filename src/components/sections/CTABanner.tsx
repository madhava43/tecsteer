import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  heading = "Ready to Transform Your Business?",
  subtext = "Partner with Tecsteer and unlock the full potential of your technology investment.",
  primaryLabel = "Get Started",
  primaryHref = "/contact",
  secondaryLabel = "Explore Services",
  secondaryHref = "/services",
}: CTABannerProps) {
  return (
    <section className="section-padding">
      <div className="container-base">
        {/* Single top border line — no glow orbs, no grid backgrounds */}
        <div className="border-t border-white/[0.06] pt-16 md:pt-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-xl">
            <h2
              className="font-syne font-bold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
            >
              {heading}
            </h2>
            <p className="text-text-secondary leading-relaxed text-base">{subtext}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-accent-primary text-white font-medium text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm whitespace-nowrap"
            >
              {primaryLabel}
              <ArrowRight size={14} />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-transparent text-text-secondary border border-white/[0.12] font-medium text-sm hover:text-text-primary hover:bg-white/[0.04] hover:border-white/[0.18] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
