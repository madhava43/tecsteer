"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { jobs, type JobPost } from "@/lib/data/careers";
import dynamic from "next/dynamic";
const ApplyModal = dynamic(() => import("@/components/sections/ApplyModal"), { ssr: false });
import PageWrapper from "@/components/layout/PageWrapper";
import CTABanner from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";

function JobCard({
  job,
  onApply,
}: {
  job: JobPost;
  onApply: (job: JobPost) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-5 p-7 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200 shadow-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-syne font-bold text-lg text-text-primary tracking-tight">{job.title}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{job.department}</Badge>
            <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
              <MapPin size={10} />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
              <Briefcase size={10} />
              {job.type}
            </span>
          </div>
        </div>
        <button
          onClick={() => onApply(job)}
          className="flex-shrink-0 inline-flex items-center gap-2 h-9 px-5 rounded-md bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
        >
          Apply Now
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed max-w-[65ch]">{job.description}</p>

      {/* Toggle requirements */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary font-mono transition-colors duration-150"
        style={{ minWidth: "unset", minHeight: "unset" }}
      >
        {expanded ? (
          <><ChevronUp size={12} /> Hide requirements</>
        ) : (
          <><ChevronDown size={12} /> View requirements</>
        )}
      </button>

      {expanded && (
        <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-5">
          <div>
            <h3 className="font-syne font-semibold text-xs text-text-muted uppercase tracking-[0.1em] mb-3">
              Requirements
            </h3>
            <ul className="flex flex-col gap-2">
              {job.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0 mt-2" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {job.niceToHave && job.niceToHave.length > 0 && (
            <div>
              <h3 className="font-syne font-semibold text-xs text-text-muted uppercase tracking-[0.1em] mb-3">
                Nice to Have
              </h3>
              <ul className="flex flex-col gap-2">
                {job.niceToHave.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <div className="w-1 h-1 rounded-full bg-text-muted flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-text-muted font-mono">Posted: {job.postedDate}</p>
        </div>
      )}
    </div>
  );
}

const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [activeDept, setActiveDept] = useState("All");

  const filteredJobs = activeDept === "All" ? jobs : jobs.filter((j) => j.department === activeDept);

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-6">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">JOIN OUR TEAM</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              Build the Future{" "}
              <GradientText>With Us</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[52ch]">
              Join a team of passionate technologists, consultants, and builders who are
              transforming how businesses use technology — and advancing their own careers
              in the process.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Culture ── */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">WHY TECSTEER</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                A Place to Do Your Best Work
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Meaningful Work", desc: "Work on problems that matter — helping real businesses transform through technology." },
              { title: "Continuous Learning", desc: "Access to training programs, certifications, and a culture that rewards curiosity." },
              { title: "Remote Friendly", desc: "Flexible working arrangements that support your lifestyle and productivity." },
              { title: "Inclusive Culture", desc: "Diverse perspectives make us stronger. Everyone belongs at Tecsteer." },
            ].map((item, i) => (
              <AnimateIn key={item.title} direction="up" delay={i * 60}>
                <div className="flex flex-col gap-3 p-6 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full">
                  <span className="font-mono text-[11px] font-medium text-text-muted tabular-nums">0{i + 1}</span>
                  <h3 className="font-syne font-semibold text-text-primary text-sm">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open positions ── */}
      <section className="section-padding border-t border-white/[0.06] bg-bg-deep">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">CURRENT OPENINGS</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight mb-4"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Open Positions
              </h2>
              <p className="text-text-secondary text-base max-w-[48ch]">
                Don&apos;t see your role? Send us your resume anyway — we&apos;re always looking
                for exceptional talent.
              </p>
            </div>
          </AnimateIn>

          {/* Department filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
                style={{
                  background: activeDept === dept ? "rgba(0, 102, 255, 0.15)" : "rgba(255,255,255,0.04)",
                  border: activeDept === dept ? "1px solid rgba(0, 102, 255, 0.4)" : "1px solid rgba(255,255,255,0.08)",
                  color: activeDept === dept ? "#6699FF" : "#8896B3",
                }}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, i) => (
                <AnimateIn key={job.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 50}>
                  <JobCard job={job} onApply={(j) => setSelectedJob(j)} />
                </AnimateIn>
              ))
            ) : (
              <p className="text-text-muted text-sm font-mono py-8 text-center">
                No openings in this department right now.
              </p>
            )}
          </div>

          <div className="flex justify-start mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-150 group/link"
            >
              Send your resume
              <ArrowRight size={13} className="transition-transform duration-150 group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Don't See Your Role?"
        subtext="We are always looking for exceptional people. Send us your story and we will reach out when we have the right opportunity."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
      />

      {selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </PageWrapper>
  );
}
