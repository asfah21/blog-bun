import { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://listofont.com";

  // Fetch all published posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  // Fetch all unique categories from published posts
  const categoriesRaw = await prisma.post.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });

  const categories = categoriesRaw.map((c) => c.category);

  // Map posts to sitemap entries
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Map categories to sitemap entries
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Static routes
  const routes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/blog", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/category", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/disclaimer", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "/policy", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...routes, ...blogPosts, ...categoryPages];
}
