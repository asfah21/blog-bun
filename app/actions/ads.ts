"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAds() {
    try {
        const ads = await prisma.ad.findMany({
            where: { isActive: true },
        });
        return { success: true, data: ads };
    } catch (error) {
        console.error("Failed to fetch ads:", error);
        return { success: false, error: "Failed to fetch ads" };
    }
}

export async function getAllAds() {
    try {
        const ads = await prisma.ad.findMany();
        return { success: true, data: ads };
    } catch (error) {
        console.error("Failed to fetch all ads:", error);
        return { success: false, error: "Failed to fetch ads" };
    }
}

export async function upsertAd(position: string, data: { imageUrl: string; linkUrl?: string; isActive: boolean }) {
    try {
        const ad = await prisma.ad.upsert({
            where: { position },
            update: {
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl,
                isActive: data.isActive,
            },
            create: {
                position,
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl,
                isActive: data.isActive,
            },
        });

        revalidatePath("/blog/[slug]"); // Revalidate blog pages
        revalidatePath("/dashboard/ads"); // Revalidate admin page

        return { success: true, data: ad };
    } catch (error) {
        console.error("Failed to upsert ad:", error);
        return { success: false, error: "Failed to save ad" };
    }
}
