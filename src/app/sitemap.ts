import { MetadataRoute } from "next";
import { posts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tecsteer.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/salesforce",
    "/services/mobile-development",
    "/services/application-services",
    "/services/aws-consulting",
    "/services/web-development",
    "/services/ui-ux-design",
    "/services/data-analytics",
    "/services/cybersecurity",
    "/blog",
    "/careers",
    "/contact",
    "/training",
    "/consulting",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
