import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    const id = params.id;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (e: any) {
    console.error("GET Error:", e);

    return NextResponse.json(
      { error: e.message || "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    const id = params.id;

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("DELETE Error:", e);

    return NextResponse.json(
      { error: e.message || "Failed to delete" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();

    const {
      title,
      slug,
      content,
      description,
      metaTitle,
      metaDescription,
      category,
      tags,
      link,
      buy,
      published,
    } = body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        description,
        metaTitle,
        metaDescription,
        category,
        tags,
        link,
        buy,
        published,
      },
    });

    return NextResponse.json({ ok: true, post: updatedPost });
  } catch (e: any) {
    console.error("PUT Error:", e);

    return NextResponse.json(
      { error: e.message || "Failed to update" },
      { status: 500 },
    );
  }
}
