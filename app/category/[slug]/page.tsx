import { notFound } from "next/navigation";

import GridCard from "../components/GridCard";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);

  return {
    title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} - Category`,
    description: `Browse all posts in ${categoryName} category`,
  };
}

export default async function CategoryDetailPage(props: CategoryPageProps) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const categoryName = decodeURIComponent(slug);
  const page = Number(searchParams.page) || 1;
  const pageSize = 15;

  // Get posts for this category
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        category: {
          equals: categoryName,
          mode: "insensitive", // case-insensitive search
        },
        published: true,
      },
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        slug: true,
        description: true,
        createdAt: true,
        coverImage: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({
      where: {
        category: {
          equals: categoryName,
          mode: "insensitive",
        },
        published: true,
      },
    }),
  ]);

  // If no posts found, show 404
  if (posts.length === 0 && page === 1) {
    notFound();
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </h1>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "post" : "posts"} found
            </p>
          </div>
          <GridCard
            hideHeader
            currentPage={page}
            posts={posts}
            totalPages={totalPages}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
