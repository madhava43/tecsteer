"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import CTABanner from "@/components/sections/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

const courses = [
  {
    id: "salesforce",
    title: "Salesforce",
    eyebrow: "CRM & Platform Development",
    description:
      "Empowering Careers and Driving Business Success. Our comprehensive Salesforce training programs equip individuals with the skills to launch or advance their Salesforce careers while also empowering businesses to maximize their Salesforce investment. We offer targeted courses covering a wide range of topics, from fundamental administration to advanced development, including preparation for key certifications like Administrator, Developer, and Consultant. Whether you're an individual seeking career growth or a business aiming to optimize Salesforce usage, our training focuses on practical skills and real-world application to drive both personal and organizational success. Explore our course catalog or contact us today to learn more!",
    topics: [
      "Salesforce Administration",
      "Apex Development",
      "Lightning Web Components",
      "Salesforce Data Model & SOQL",
      "CRM Configuration",
      "Certification Preparation (Admin, Dev, Consultant)",
    ],
    duration: "8–12 weeks",
    level: "Beginner to Advanced",
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    eyebrow: "Frontend & Backend Engineering",
    description:
      "Master front-end and back-end technologies to build robust, scalable applications. Our Full Stack program takes you from fundamentals to production-ready skills — covering modern frameworks, APIs, databases, and deployment pipelines.",
    topics: [
      "HTML, CSS, JavaScript & TypeScript",
      "React & Next.js",
      "Node.js & REST APIs",
      "SQL & NoSQL Databases",
      "Cloud Deployment (AWS/GCP)",
      "Git & CI/CD Pipelines",
    ],
    duration: "12–16 weeks",
    level: "Beginner to Intermediate",
  },
  {
    id: "datascience",
    title: "Data Science",
    eyebrow: "Analytics, ML & AI",
    description:
      "Explore data analytics, machine learning, and AI with hands-on projects. You'll build real models, work with real datasets, and come away with a portfolio that demonstrates your ability to solve data problems at scale.",
    topics: [
      "Python for Data Science",
      "Statistical Analysis & Visualization",
      "Machine Learning Algorithms",
      "Deep Learning & Neural Networks",
      "Data Engineering Pipelines",
      "Model Deployment & MLOps",
    ],
    duration: "14–18 weeks",
    level: "Intermediate to Advanced",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    eyebrow: "Threats, Defense & Compliance",
    description:
      "Gain expertise in securing systems, networks, and data from cyber threats. Our program covers offensive and defensive security, compliance frameworks, and hands-on labs that simulate real-world attack and defense scenarios.",
    topics: [
      "Network Security Fundamentals",
      "Ethical Hacking & Penetration Testing",
      "SIEM and Threat Detection",
      "Cloud Security (AWS/Azure)",
      "Compliance Frameworks (SOC 2, HIPAA, ISO 27001)",
      "Incident Response & Forensics",
    ],
    duration: "10–14 weeks",
    level: "Intermediate",
  },
];

export default function Trainings() {
  const [activeTab, setActiveTab] = useState(courses[0]?.id ?? "salesforce");
  const activeCourse = courses.find((c) => c.id === activeTab);

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-6 max-w-4xl">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">TRAINING PROGRAMS</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              Elevate Your Skills{" "}
              <GradientText>With Us</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[52ch]">
              At Tecsteer, we believe in the power of continuous learning. Our comprehensive
              training programs are designed to equip individuals and organizations with the
              skills they need to succeed in today&apos;s dynamic technology landscape.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
              >
                Enroll Now
                <ArrowRight size={14} />
              </Link>
              <Link
                href="#courses"
                className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-transparent text-text-secondary border border-white/[0.12] text-sm font-medium hover:text-text-primary hover:bg-white/[0.04] hover:border-white/[0.18] active:scale-[0.98] transition-all duration-150"
              >
                Browse Courses
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Course selector ── */}
      <section className="section-padding border-t border-white/[0.06]" id="courses">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">AVAILABLE COURSES</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Choose Your Path
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
            {/* Sidebar */}
            <aside className="flex flex-col gap-1">
              {courses.map((course, index) => {
                const isActive = activeTab === course.id;
                const prevId = courses[index - 1]?.id;
                const nextId = courses[index + 1]?.id;
                return (
                  <button
                    key={course.id}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    onClick={() => setActiveTab(course.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveTab(course.id); }
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
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={13} className={isActive ? "text-accent-primary" : "text-text-muted"} />
                      {course.title}
                    </div>
                    <ChevronRight
                      size={13}
                      className={cn(
                        "flex-shrink-0 transition-transform duration-150 opacity-50",
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
              {activeCourse && (
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-1.5">
                    <span className="eyebrow">{activeCourse.eyebrow}</span>
                    <h2 className="font-syne font-bold text-2xl text-text-primary tracking-tight mt-3" style={{ letterSpacing: "-0.025em" }}>
                      {activeCourse.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="mono-tag">{activeCourse.duration}</span>
                      <span className="mono-tag text-accent-primary border-accent-primary/20 bg-accent-primary/[0.08]">{activeCourse.level}</span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[60ch]">
                    {activeCourse.description}
                  </p>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-syne font-semibold text-text-primary text-xs uppercase tracking-[0.1em]">
                      Course Topics
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeCourse.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0 mt-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-md w-fit bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
                  >
                    Enroll in {activeCourse.title}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why learn with us ── */}
      <section className="section-padding border-t border-white/[0.06] bg-bg-deep">
        <div className="container-base">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-12">
              <span className="eyebrow mb-4 block">WHY TECSTEER</span>
              <h2
                className="font-syne font-bold text-text-primary tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Learning That Sticks
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Practitioner-Led", desc: "Every instructor is an active practitioner — not a career trainer. They teach what they actually do." },
              { title: "Hands-On Projects", desc: "Every curriculum is built around real-world projects and scenarios, not just theory." },
              { title: "Certification Ready", desc: "Our programs align with industry certifications so you come out with credentials that matter." },
              { title: "Flexible Formats", desc: "Live cohorts, self-paced, and corporate training — choose what works for your schedule." },
              { title: "Career Support", desc: "Resume review, mock interviews, and job placement assistance to help you land your next role." },
              { title: "Lifetime Access", desc: "Course materials, recordings, and community access remain available after you complete the program." },
            ].map((item, i) => (
              <AnimateIn key={item.title} direction="up" delay={i * 60}>
                <div className="flex flex-col gap-3 p-6 rounded-xl bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full">
                  <h3 className="font-syne font-semibold text-text-primary text-sm">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Level Up?"
        subtext="Join thousands of professionals who have transformed their careers through Tecsteer training."
        primaryLabel="Enroll Today"
        primaryHref="/contact"
        secondaryLabel="View All Courses"
        secondaryHref="#courses"
      />
    </PageWrapper>
  );
}
