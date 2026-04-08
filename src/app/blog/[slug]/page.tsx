import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { posts } from "@/lib/data/blog";
import { Badge } from "@/components/ui/Badge";
import PageWrapper from "@/components/layout/PageWrapper";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Tecsteer`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://tecsteer.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <PageWrapper>
      <article className="py-16 md:py-24">
        {/* Back link */}
        <div className="container-base mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors duration-150 font-mono"
          >
            <ArrowLeft size={13} />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="container-base max-w-3xl mb-10">
          <div className="flex flex-col gap-5">
            <Badge variant="category">{post.category}</Badge>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              {post.title}
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-[60ch]">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-5 text-xs text-text-muted font-mono pt-4 border-t border-white/[0.06]">
              <span className="flex items-center gap-1.5">
                <User size={11} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="container-base max-w-3xl mb-10">
          <div className="w-full h-px bg-white/[0.06]" />
        </div>

        {/* Body */}
        <div className="container-base max-w-3xl">
          <div className="flex flex-col gap-6">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-text-secondary text-base leading-[1.85]"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-text-muted text-[11px] font-mono uppercase tracking-wider mb-1">Written by</p>
              <p className="font-syne font-semibold text-text-primary">{post.author}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-accent-primary text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-glow-sm"
            >
              Get in Touch
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
