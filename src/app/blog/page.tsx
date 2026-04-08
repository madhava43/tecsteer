import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { posts } from "@/lib/data/blog";
import PageWrapper from "@/components/layout/PageWrapper";
import CTABanner from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stay updated with the latest insights, technology trends, and company news from the Tecsteer team.",
  openGraph: {
    title: "Blog | Tecsteer",
    description: "Stay updated with the latest insights from Tecsteer.",
    url: "https://tecsteer.com/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Blog() {
  if (posts.length === 0) {
    return (
      <PageWrapper>
        <section className="relative py-28 md:py-36 flex flex-col items-center justify-center text-center gap-4">
          <span className="eyebrow">INSIGHTS & ARTICLES</span>
          <h1 className="font-syne font-bold text-text-primary text-3xl tracking-tight">No posts yet</h1>
          <p className="text-text-secondary text-base max-w-[40ch]">
            We&apos;re working on new content. Check back soon.
          </p>
        </section>
      </PageWrapper>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-base relative z-10 flex flex-col items-start gap-5">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">INSIGHTS & ARTICLES</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              The Tecsteer{" "}
              <GradientText>Blog</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg max-w-[44ch]">
              Practical insights on technology, career development, and IT transformation —
              from our team to yours.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Featured post ── */}
      {featured && (
        <section className="pb-6 border-t border-white/[0.06]">
          <div className="container-base pt-10">
            <AnimateIn direction="up" delay={0}>
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative flex flex-col md:flex-row rounded-xl overflow-hidden bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card"
              >
                {featured.image && (
                  <div className="relative w-full md:w-[44%] aspect-video md:aspect-auto min-h-[220px] flex-shrink-0 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 44vw"
                      priority
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <Badge variant="default">{featured.category}</Badge>
                    <span className="text-[11px] text-text-muted font-mono">Featured</span>
                  </div>
                  <h2 className="font-syne font-bold text-xl md:text-2xl text-text-primary tracking-tight group-hover:text-accent-primary transition-colors duration-150" style={{ letterSpacing: "-0.025em" }}>
                    {featured.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 max-w-[55ch]">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted font-mono">
                    <span className="flex items-center gap-1.5"><User size={11} /> {featured.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={11} /> {featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> {featured.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary group-hover:gap-2.5 transition-all duration-150">
                    Read Article
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ── Article grid ── */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-base">
          {rest.length > 0 && (
            <>
              <AnimateIn direction="fade" delay={0}>
                <p className="eyebrow mb-8">MORE ARTICLES</p>
              </AnimateIn>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <AnimateIn key={post.id} direction="up" delay={i * 60}>
                    <article className="h-full">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col rounded-xl overflow-hidden bg-bg-surface border border-white/[0.06] hover:border-white/[0.1] hover:-translate-y-0.5 transition-all duration-200 shadow-card h-full"
                      >
                        {post.image && (
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              loading="lazy"
                              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-3 p-6 flex-1">
                          <Badge variant="category">{post.category}</Badge>
                          <h3 className="font-syne font-semibold text-base text-text-primary group-hover:text-accent-primary transition-colors duration-150 line-clamp-2 tracking-tight">
                            {post.title}
                          </h3>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-text-muted bg-white/[0.04] border border-white/[0.06]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                            <div className="flex items-center gap-3 text-[11px] text-text-muted font-mono">
                              <span className="flex items-center gap-1"><User size={10} /> {post.author}</span>
                              <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                            </div>
                            <ArrowUpRight size={13} className="text-text-muted group-hover:text-accent-primary transition-colors duration-150" />
                          </div>
                        </div>
                      </Link>
                    </article>
                  </AnimateIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTABanner
        heading="Have a Topic in Mind?"
        subtext="Our team covers Salesforce, cloud, cybersecurity, and more. Get in touch to suggest an article or partner on content."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </PageWrapper>
  );
}
