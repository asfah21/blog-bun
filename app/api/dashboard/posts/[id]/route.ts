import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

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
