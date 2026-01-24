import GridCard from "./components/GridCard";

import { prisma } from "@/lib/prisma";

export default async function BlogClientPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 15;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        slug: true,
        description: true,
        createdAt: true,
        coverImage: true,
        category: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return <GridCard currentPage={page} posts={posts} totalPages={totalPages} />;
}
