import { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import GridCard, { GridCardPost } from "@/app/category/components/GridCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const decodedQ = decodeURIComponent(q || "");

  if (!decodedQ) {
    return {
      title: "Search - LISTOFONT",
      description: "Search for fonts and posts",
    };
  }

  return {
    title: `Search results for "${decodedQ}" - LISTOFONT`,
    description: `Search results for "${decodedQ}" on LISTOFONT`,
  };
}

export default async function SearchPage(props: SearchPageProps) {
  const { q, page: pageParam } = await props.searchParams;
  const query = decodeURIComponent(q || "");

  // If no query, we can either show all posts or just show an empty state prompting to search.
  // Given "jika tidak ada yang relate maka tampilkn keterangan not found",
  // implied expectation is likely displaying results for a query.
  // If query is empty, I'll show "Please enter a search term" or similar, or just 0 results.

  const page = Number(pageParam) || 1;
  const pageSize = 15;

  let posts: GridCardPost[] = [];
  let total = 0;

  if (query.trim()) {
    [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        select: {
          title: true,
          slug: true,
          description: true,
          createdAt: true,
          coverImage: true,
          // category: true, // GridCardPost doesn't need category, but it's fine
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.post.count({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
    ]);
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {query ? `Search Results: ${query}` : "Search"}
            </h1>
            {query && (
              <p className="text-muted-foreground">
                {total} {total === 1 ? "post" : "posts"} found
              </p>
            )}
          </div>

          {query.trim() === "" ? (
            <div className="text-center py-20">
              <p className="text-xl text-default-500">
                Please enter a keyword to search.
              </p>
            </div>
          ) : posts.length > 0 ? (
            <GridCard
              hideHeader
              currentPage={page}
              posts={posts}
              totalPages={totalPages}
            />
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center">
              <p className="text-2xl font-semibold mb-2">Not Found</p>
              <p className="text-default-500">
                {`We couldn't find any posts matching "${query}"`}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
