import React from "react";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

interface RelatedPostsProps {
  category: string;
  currentPostId: string;
  authorName?: string | null;
}

export default async function RelatedPosts({
  category,
  currentPostId,
  authorName,
}: RelatedPostsProps) {
  const relatedPosts = await prisma.post.findMany({
    where: {
      category: category,
      id: { not: currentPostId },
      published: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
    },
  });

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-2 border-none">
      <h3 className="text-lg font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">
        More {category} {authorName ? `by ${authorName}` : ""}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            className="group flex flex-col items-center"
            href={`/blog/${post.slug}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 border border-neutral-100 dark:border-neutral-700">
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={post.coverImage}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center p-4 text-center">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {post.title}
                  </span>
                </div>
              )}
            </div>
            <h4 className="mt-2 text-md font-medium text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors text-center">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
