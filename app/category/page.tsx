import CategoryGrid from "./components/CategoryGrid";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Categories - Browse by Topic",
  description: "Explore all categories and find content that interests you",
};

export default async function CategoryPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const pageSize = 15;

  // Get all posts with their categories
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      category: true,
      coverImage: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Group posts by category and count them
  const categoryMap = new Map<
    string,
    { count: number; image: string | null }
  >();

  posts.forEach((post) => {
    // Skip posts without category
    if (!post.category) return;

    const existing = categoryMap.get(post.category);

    if (existing) {
      existing.count++;
      // Keep the first image found (which is the latest due to orderBy)
      if (!existing.image && post.coverImage) {
        existing.image = post.coverImage;
      }
    } else {
      categoryMap.set(post.category, {
        count: 1,
        image: post.coverImage || null,
      });
    }
  });

  // Convert to array
  const allCategories = Array.from(categoryMap.entries()).map(
    ([name, data]) => ({
      name,
      count: data.count,
      coverImage: data.image,
    }),
  );

  const total = allCategories.length;
  const totalPages = Math.ceil(total / pageSize);
  const categories = allCategories.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <CategoryGrid
          categories={categories}
          currentPage={page}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </div>
  );
}
