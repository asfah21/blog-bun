import { prisma } from "@/lib/prisma";

export interface Category {
  name: string;
  id: string;
  link?: string;
  count?: number;
}

export async function getCategories() {
  try {
    // Group by category and count posts
    const categoryCounts = await prisma.post.groupBy({
      by: ["category"],
      where: { published: true },
      _count: {
        category: true,
      },
    });

    // Map and normalize categories (handle potential case variants in DB)
    const categoryMap = new Map<
      string,
      { name: string; id: string; count: number }
    >();

    // Helper to capitalize first letter of each word
    const toTitleCase = (str: string) =>
      str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

    for (const item of categoryCounts) {
      if (!item.category) continue;

      const rawName = item.category.trim();
      const id = rawName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const count = item._count.category;

      if (categoryMap.has(id)) {
        const existing = categoryMap.get(id)!;

        existing.count += count;
      } else {
        categoryMap.set(id, {
          name: toTitleCase(rawName),
          id,
          count,
        });
      }
    }

    const categories = Array.from(categoryMap.values())
      .map((cat) => ({
        ...cat,
        link: `/category/${encodeURIComponent(cat.name.toLowerCase().trim())}`,
      }))
      .sort((a, b) => b.count - a.count); // Sort by highest count

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);

    return [];
  }
}
